import { useState } from "react";
import { useNavigate } from "react-router";
import { useVagaCreate } from "../../VagaCreateContext";
import { createVaga, updateVaga } from "@/services/vaga";

interface EtapaForm {
  nome: string;
  descricao: string;
}

const Etapas = ({ vagaId }: { vagaId?: number }) => {
  const isEdit = !!vagaId;
  const [etapas, setEtapas] = useState<EtapaForm[]>([{ nome: "", descricao: "" }]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const maxCaracteres = 5000;
  const navigate = useNavigate();
  const { data } = useVagaCreate();

  const updateEtapa = (index: number, field: keyof EtapaForm, value: string) => {
    setEtapas((prev) =>
      prev.map((e, i) => (i === index ? { ...e, [field]: value } : e))
    );
  };

  const adicionarEtapa = () => {
    setEtapas((prev) => [...prev, { nome: "", descricao: "" }]);
  };

  const handleProximo = async () => {
    const primeiraVazia = etapas.find((e) => !e.nome.trim());
    if (primeiraVazia) {
      setErro("Todas as etapas precisam ter um nome.");
      return;
    }
    setLoading(true);
    setErro("");
    try {
      const payload = {
        nome: data.nome,
        cargo: data.cargo,
        descricao: data.descricao,
        salario: data.salario
          ? parseFloat(data.salario.replace(/[^0-9,.]/g, "").replace(",", "."))
          : undefined,
        beneficios: data.beneficio ? [{ nome: data.beneficio }] : [],
        etapas: etapas.map((e) => ({ nome: e.nome.trim(), descricao: e.descricao.trim() })),
      };

      if (isEdit) {
        await updateVaga(vagaId, payload);
      } else {
        await createVaga(payload);
      }
      navigate("/empresa/vagas");
    } catch (e: any) {
      setErro(e.message || "Erro ao salvar vaga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-8 md:p-36 lg:p-40 w-full bg-MediumGray max-w-6xl mx-auto font-SecondFont">
      <h1 className="text-2xl my-2">Preencha as etapas do processo seletivo</h1>
      <h2 className="text-xl my-2">Definição de etapas</h2>

      <div className="flex flex-col gap-10 mt-6">
        {etapas.map((etapa, index) => (
          <div key={index} className="flex flex-col gap-4">
            <span className="font-semibold">Etapa {index + 1}</span>

            <div className="flex flex-col w-full">
              <label>Nome da etapa</label>
              <input
                type="text"
                value={etapa.nome}
                onChange={(e) => updateEtapa(index, "nome", e.target.value)}
                className="w-full border-1 rounded-sm mt-1 p-1 pl-4 bg-white shadow-md"
              />
            </div>

            <div className="flex flex-col w-full">
              <label>Descrição da etapa</label>
              <textarea
                value={etapa.descricao}
                onChange={(e) => updateEtapa(index, "descricao", e.target.value)}
                maxLength={maxCaracteres}
                className="w-full h-36 border-1 rounded-sm mt-1 p-2 pl-4 bg-white shadow-md resize-none"
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {etapa.descricao.length}/{maxCaracteres}
              </div>
            </div>

            {index < etapas.length - 1 && <hr className="mt-2" />}
          </div>
        ))}
      </div>

      <button
        onClick={adicionarEtapa}
        className="mt-8 border-2 border-deepGreen text-deepGreen px-6 py-3 rounded-lg font-PrimaryFont font-semibold hover:bg-deepGreen hover:text-white transition-colors w-fit"
      >
        + Adicionar mais uma etapa
      </button>

      {erro && <p className="text-red-500 text-sm mt-4">{erro}</p>}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleProximo}
          disabled={loading}
          className="bg-deepGreen text-white px-8 py-3 rounded-lg cursor-pointer hover:bg-green-900 font-PrimaryFont font-semibold disabled:opacity-60"
        >
          {loading ? "Salvando..." : isEdit ? "SALVAR ALTERAÇÕES" : "PRÓXIMO"}
        </button>
      </div>
    </div>
  );
};

export default Etapas;
