import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import EtapasDisplay from "./etapasDisplay";
import { getVagaById, addEtapa, EtapaProcessoSeletivo, Vaga } from "@/services/vaga";

const MainManagementProcess = () => {
  const [searchParams] = useSearchParams();
  const vagaId = searchParams.get("vagaId");

  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [nomeEtapa, setNomeEtapa] = useState("");
  const [descricaoEtapa, setDescricaoEtapa] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroForm, setErroForm] = useState("");

  useEffect(() => {
    if (!vagaId) {
      setErro("Nenhuma vaga selecionada.");
      setLoading(false);
      return;
    }
    getVagaById(Number(vagaId))
      .then(setVaga)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, [vagaId]);

  const etapas: EtapaProcessoSeletivo[] = vaga?.etapas ?? [];

  const handleAdicionarEtapa = async () => {
    if (!nomeEtapa.trim()) {
      setErroForm("O nome da etapa é obrigatório.");
      return;
    }
    setSalvando(true);
    setErroForm("");
    try {
      const nova = await addEtapa(Number(vagaId), {
        nome: nomeEtapa.trim(),
        descricao: descricaoEtapa.trim(),
      });
      setVaga((prev) => prev ? { ...prev, etapas: [...prev.etapas, nova] } : prev);
      setNomeEtapa("");
      setDescricaoEtapa("");
      setShowForm(false);
    } catch (e: any) {
      setErroForm(e.message || "Erro ao adicionar etapa");
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40 font-SecondFont">
        <p>Carregando...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="flex justify-center items-center mt-40 font-SecondFont">
        <p className="text-red-500">{erro}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-paleGreen mt-20 font-SecondFont py-10 sm:py-15 gap-6 sm:gap-8 px-6 sm:px-0">
      <h1 className="text-2xl text-center max-w-[600px]">
        Etapas do processo seletivo — {vaga?.nome} ({vaga?.cargo})
      </h1>

      <button
        onClick={() => setShowForm((prev) => !prev)}
        className="bg-oliveGreen h-20 w-20 sm:h-30 sm:w-30 cursor-pointer rounded-lg text-4xl sm:text-6xl text-deepGreen shadow-md"
      >
        +
      </button>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-10 w-full max-w-2xl flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Nova etapa</h2>

          <div className="flex flex-col">
            <label>Nome da etapa</label>
            <input
              type="text"
              value={nomeEtapa}
              onChange={(e) => setNomeEtapa(e.target.value)}
              className="border-1 rounded-sm mt-1 p-1 pl-4 bg-gray-50 shadow-sm"
            />
          </div>

          <div className="flex flex-col">
            <label>Descrição da etapa</label>
            <textarea
              value={descricaoEtapa}
              onChange={(e) => setDescricaoEtapa(e.target.value)}
              className="border-1 rounded-sm mt-1 p-2 pl-4 bg-gray-50 shadow-sm h-32 resize-none"
            />
          </div>

          {erroForm && <p className="text-red-500 text-sm">{erroForm}</p>}

          <div className="flex justify-end gap-4">
            <button
              onClick={() => { setShowForm(false); setErroForm(""); }}
              className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 font-PrimaryFont"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdicionarEtapa}
              disabled={salvando}
              className="bg-deepGreen text-white px-6 py-2 rounded-lg hover:bg-green-900 font-PrimaryFont font-semibold disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Adicionar"}
            </button>
          </div>
        </div>
      )}

      {etapas.length === 0 ? (
        <p className="text-gray-500">Nenhuma etapa cadastrada ainda.</p>
      ) : (
        <EtapasDisplay
          etapas={etapas}
          onExcluir={(id) =>
            setVaga((prev) =>
              prev ? { ...prev, etapas: prev.etapas.filter((e) => e.id !== id) } : prev
            )
          }
          onAtualizar={(atualizada) =>
            setVaga((prev) =>
              prev ? { ...prev, etapas: prev.etapas.map((e) => e.id === atualizada.id ? atualizada : e) } : prev
            )
          }
        />
      )}
    </div>
  );
};

export default MainManagementProcess;
