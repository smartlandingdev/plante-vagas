import { useState } from "react";
import { useSearchParams } from "react-router";
import { XCircle } from "lucide-react";
import EtapasDisplay from "./etapasDisplay";
import { EtapaProcessoSeletivo, Vaga } from "@/services/vaga";

const VAGAS_FAKE: Record<number, Vaga> = {
  1: {
    id: 1,
    nome: "Desenvolvedor Frontend",
    cargo: "Engenheiro de Software",
    descricao: "Buscamos um desenvolvedor frontend apaixonado por criar interfaces modernas.",
    salario: 6500,
    beneficios: [{ id: 1, nome: "Vale Refeição" }, { id: 2, nome: "Plano de Saúde" }],
    etapas: [
      { id: 1, nome: "Triagem de Currículo", descricao: "Análise inicial do perfil do candidato.", status: "aberta" },
      { id: 2, nome: "Teste Técnico", descricao: "Desafio de código com prazo de 3 dias.", status: "aberta" },
      { id: 3, nome: "Entrevista RH", descricao: "Conversa com o time de pessoas.", status: "aberta" },
    ],
    empresaId: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  2: {
    id: 2,
    nome: "Designer UX/UI",
    cargo: "Designer",
    descricao: "Procuramos designer criativo para criar experiências incríveis.",
    salario: 5800,
    beneficios: [{ id: 4, nome: "Vale Refeição" }],
    etapas: [
      { id: 4, nome: "Análise de Portfólio", descricao: "Revisão do portfólio enviado.", status: "aberta" },
      { id: 5, nome: "Entrevista Técnica", descricao: "Apresentação de case design.", status: "aberta" },
    ],
    empresaId: 1,
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
  },
};

const MainManagementProcess = () => {
  const [searchParams] = useSearchParams();
  const vagaId = searchParams.get("vagaId");

  const vagaInicial = vagaId ? (VAGAS_FAKE[Number(vagaId)] ?? VAGAS_FAKE[1]) : VAGAS_FAKE[1];
  const [vaga, setVaga] = useState<Vaga | null>(vagaInicial);
  const loading = false;
  const [erro] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [nomeEtapa, setNomeEtapa] = useState("");
  const [descricaoEtapa, setDescricaoEtapa] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erroForm, setErroForm] = useState("");
  const [processoEncerrado, setProcessoEncerrado] = useState(false);
  const [confirmEncerrar, setConfirmEncerrar] = useState(false);

  const etapas: EtapaProcessoSeletivo[] = vaga?.etapas ?? [];

  const handleMoverCima = (id: number) => {
    setVaga((prev) => {
      if (!prev) return prev;
      const idx = prev.etapas.findIndex((e) => e.id === id);
      if (idx <= 0) return prev;
      const novas = [...prev.etapas];
      [novas[idx - 1], novas[idx]] = [novas[idx], novas[idx - 1]];
      return { ...prev, etapas: novas };
    });
  };

  const handleMoverBaixo = (id: number) => {
    setVaga((prev) => {
      if (!prev) return prev;
      const idx = prev.etapas.findIndex((e) => e.id === id);
      if (idx === -1 || idx >= prev.etapas.length - 1) return prev;
      const novas = [...prev.etapas];
      [novas[idx], novas[idx + 1]] = [novas[idx + 1], novas[idx]];
      return { ...prev, etapas: novas };
    });
  };

  const handleAdicionarEtapa = async () => {
    if (!nomeEtapa.trim()) {
      setErroForm("O nome da etapa é obrigatório.");
      return;
    }
    setSalvando(true);
    setErroForm("");
    try {
      const nova: EtapaProcessoSeletivo = {
        id: Date.now(),
        nome: nomeEtapa.trim(),
        descricao: descricaoEtapa.trim(),
        status: "aberta",
      };
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

  if (processoEncerrado) {
    return (
      <div className="flex flex-col items-center justify-center bg-paleGreen mt-20 font-SecondFont py-20 gap-6 px-6 text-center">
        <XCircle size={48} className="text-gray-400" />
        <h1 className="text-2xl text-gray-600">Processo seletivo encerrado</h1>
        <p className="text-gray-500 text-sm max-w-md">
          O processo seletivo para <strong>{vaga?.nome}</strong> foi encerrado. Nenhuma nova etapa pode ser adicionada.
        </p>
        <button
          onClick={() => { setProcessoEncerrado(false); setConfirmEncerrar(false); }}
          className="border border-deepGreen text-deepGreen px-6 py-2 rounded-lg hover:bg-paleGreen font-PrimaryFont"
        >
          Reabrir processo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-paleGreen mt-20 font-SecondFont py-10 sm:py-15 gap-6 sm:gap-8 px-6 sm:px-0">
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-2xl justify-between">
        <h1 className="text-2xl text-center sm:text-left max-w-[600px]">
          Etapas do processo seletivo — {vaga?.nome} ({vaga?.cargo})
        </h1>

        {!confirmEncerrar ? (
          <button
            onClick={() => setConfirmEncerrar(true)}
            className="flex items-center gap-2 border border-red-400 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 font-SecondFont text-sm whitespace-nowrap"
          >
            <XCircle size={16} />
            Encerrar processo
          </button>
        ) : (
          <div className="flex flex-col items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-700">Confirmar encerramento?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmEncerrar(false)}
                className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={() => setProcessoEncerrado(true)}
                className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
              >
                Encerrar
              </button>
            </div>
          </div>
        )}
      </div>

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
          onMoverCima={handleMoverCima}
          onMoverBaixo={handleMoverBaixo}
        />
      )}
    </div>
  );
};

export default MainManagementProcess;
