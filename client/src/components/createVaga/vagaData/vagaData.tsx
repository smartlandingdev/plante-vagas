import { useState } from "react";
import { useNavigate } from "react-router";
import { useVagaCreate } from "../VagaCreateContext";
import { updateVaga } from "@/services/vaga";


const VagaData = ({ onProximo, vagaId }: { onProximo: () => void; vagaId?: number }) => {
  const isEdit = !!vagaId;
  const { data, setData } = useVagaCreate();
  const [erros, setErros] = useState<{ nome?: string; cargo?: string; descricao?: string }>({});
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const maxCaracteres = 5000;

  const validate = () => {
    const novosErros: { nome?: string; cargo?: string; descricao?: string } = {};
    if (!data.nome.trim()) novosErros.nome = "Campo obrigatório";
    if (!data.cargo.trim()) novosErros.cargo = "Campo obrigatório";
    if (!data.descricao.trim()) novosErros.descricao = "Campo obrigatório";
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleProximo = () => {
    if (!validate()) return;
    onProximo();
  };

  const handleSalvar = async () => {
    if (!validate()) return;
    setLoading(true);
    setErro("");
    try {
      await updateVaga(vagaId!, {
        nome: data.nome,
        cargo: data.cargo,
        descricao: data.descricao,
        salario: data.salario
          ? parseFloat(data.salario.replace(/[^0-9,.]/g, "").replace(",", "."))
          : undefined,
        beneficios: data.beneficio ? [{ nome: data.beneficio }] : [],
      });
      navigate("/empresa/vagas");
    } catch (e: any) {
      setErro(e.message || "Erro ao salvar vaga");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col p-8 md:p-36 lg:p-40 w-full bg-MediumGray max-w-6xl mx-auto font-SecondFont">
        <h1 className="text-2xl my-4">Preencha os dados da vaga</h1>

        <div className="flex flex-col my-8 gap-6">

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col w-full">
              <label>Título da vaga</label>
              <input
                type="text"
                value={data.nome}
                onChange={(e) => setData({ nome: e.target.value })}
                className={`w-full border-1 rounded-sm mt-1 p-1 pl-4 bg-white shadow-md ${erros.nome ? "border-red-500" : ""}`}
              />
              {erros.nome && <span className="text-red-500 text-xs mt-1">{erros.nome}</span>}
            </div>
            <div className="flex flex-col w-full">
              <label>Cargo</label>
              <input
                type="text"
                value={data.cargo}
                onChange={(e) => setData({ cargo: e.target.value })}
                className={`w-full border-1 rounded-sm mt-1 p-1 pl-4 bg-white shadow-md ${erros.cargo ? "border-red-500" : ""}`}
              />
              {erros.cargo && <span className="text-red-500 text-xs mt-1">{erros.cargo}</span>}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col w-full">
              <label>Benefícios</label>
              <select
                value={data.beneficio}
                onChange={(e) => setData({ beneficio: e.target.value })}
                className="bg-white shadow-md border-1 rounded-sm mt-1 p-1 pl-4"
              >
                <option value="">Selecione</option>
                <option>Vale Transporte + Vale Refeição</option>
                <option>Vale Transporte + Vale Alimentação + Plano de Saúde</option>
                <option>A combinar</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label>Salário <span className="text-gray-400 text-sm">(opcional)</span></label>
              <input
                type="text"
                value={data.salario}
                onChange={(e) => setData({ salario: e.target.value })}
                placeholder="Ex: R$ 2.500,00 ou A combinar"
                className="w-full border-1 rounded-sm mt-1 p-1 pl-4 bg-white shadow-md"
              />
            </div>
          </div>

        </div>

        <hr className="my-8" />

        <div className="flex flex-col w-full">
          <label>Descrição da vaga</label>
          <textarea
            value={data.descricao}
            onChange={(e) => setData({ descricao: e.target.value })}
            maxLength={maxCaracteres}
            className={`w-full h-50 border-1 rounded-sm mt-1 p-2 pl-4 bg-white shadow-md resize-none ${erros.descricao ? "border-red-500" : ""}`}
          />
          <div className="flex justify-between mt-1">
            {erros.descricao
              ? <span className="text-red-500 text-xs">{erros.descricao}</span>
              : <span />
            }
            <span className="text-gray-500 text-sm">{data.descricao.length}/{maxCaracteres}</span>
          </div>
        </div>

        {erro && <p className="text-red-500 text-sm mt-4">{erro}</p>}

        <div className="flex justify-end mt-8">
          {isEdit ? (
            <button
              onClick={handleSalvar}
              disabled={loading}
              className="bg-deepGreen text-white px-8 py-3 rounded-lg font-PrimaryFont font-semibold hover:bg-green-900 disabled:opacity-60"
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
            </button>
          ) : (
            <button
              onClick={handleProximo}
              className="bg-deepGreen text-white px-8 py-3 rounded-lg font-PrimaryFont font-semibold hover:bg-green-900"
            >
              Próximo
            </button>
          )}
        </div>

      </div>
    </>
  );
};

export default VagaData;
