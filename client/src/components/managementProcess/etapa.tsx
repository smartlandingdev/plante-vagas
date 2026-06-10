import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronUp, ChevronDown } from "lucide-react";
import { EtapaProcessoSeletivo, deleteEtapa, updateEtapaService } from "@/services/vaga";

type EtapaProps = {
  etapa: EtapaProcessoSeletivo;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  onExcluir: (id: number) => void;
  onAtualizar: (etapa: EtapaProcessoSeletivo) => void;
  onMoverCima: (id: number) => void;
  onMoverBaixo: (id: number) => void;
};

const Etapa = ({ etapa, index, isFirst, isLast, onExcluir, onAtualizar, onMoverCima, onMoverBaixo }: EtapaProps) => {
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(etapa.nome);
  const [descricao, setDescricao] = useState(etapa.descricao);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [erro, setErro] = useState("");

  const handleSalvar = async () => {
    if (!nome.trim()) {
      setErro("O nome da etapa é obrigatório.");
      return;
    }
    setSalvando(true);
    setErro("");
    try {
      const atualizada = await updateEtapaService(etapa.id, { nome: nome.trim(), descricao: descricao.trim() });
      onAtualizar(atualizada);
      setEditando(false);
    } catch (e: any) {
      setErro(e.message || "Erro ao salvar etapa");
    } finally {
      setSalvando(false);
    }
  };

  const handleExcluir = async () => {
    setExcluindo(true);
    try {
      await deleteEtapa(etapa.id);
      onExcluir(etapa.id);
    } finally {
      setExcluindo(false);
    }
  };

  if (editando) {
    return (
      <div className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 font-SecondFont w-full max-w-[1200px] mx-auto">
        <h2 className="text-xl font-semibold mb-6">Editar etapa {index}</h2>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label>Nome da etapa</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="border-1 rounded-sm mt-1 p-1 pl-4 bg-gray-50 shadow-sm"
            />
          </div>

          <div className="flex flex-col">
            <label>Descrição da etapa</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="border-1 rounded-sm mt-1 p-2 pl-4 bg-gray-50 shadow-sm h-36 resize-none"
            />
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <div className="flex justify-end gap-4 mt-2">
            <button
              onClick={() => { setEditando(false); setNome(etapa.nome); setDescricao(etapa.descricao); setErro(""); }}
              className="px-6 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100 font-PrimaryFont"
            >
              Cancelar
            </button>
            <button
              onClick={handleSalvar}
              disabled={salvando}
              className="bg-deepGreen text-white px-6 py-2 rounded-lg hover:bg-green-900 font-PrimaryFont font-semibold disabled:opacity-60"
            >
              {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 font-SecondFont w-full max-w-[1200px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <button
              onClick={() => onMoverCima(etapa.id)}
              disabled={isFirst}
              title="Mover para cima"
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronUp size={16} />
            </button>
            <button
              onClick={() => onMoverBaixo(etapa.id)}
              disabled={isLast}
              title="Mover para baixo"
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronDown size={16} />
            </button>
          </div>
          <h1 className="text-xl break-words">{etapa.nome}</h1>
        </div>

        <div className="flex gap-2 sm:gap-4 -translate-y-8 sm:translate-y-0">
          <span className="bg-MediumGray p-2 rounded">{index}</span>
          <span className="bg-lightBrown p-2 rounded text-sm">{etapa.status}</span>
        </div>
      </div>

      <hr className="my-4" />

      <p className="p-4 sm:p-6 md:p-10 break-words">{etapa.descricao}</p>

      <div className="flex flex-col sm:flex-row gap-4 justify-end w-full">
        <button
          onClick={() => navigate("/empresa/candidatos")}
          className="bg-deepGreen text-sm text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-green-900 font-PrimaryFont w-full sm:w-auto"
        >
          ANALISAR RESPOSTAS
        </button>

        <button
          onClick={() => setEditando(true)}
          className="bg-oliveGreen text-sm text-deepGreen px-4 py-2 rounded-lg cursor-pointer hover:bg-yellow-200 font-PrimaryFont w-full sm:w-auto"
        >
          EDITAR ETAPA
        </button>

        <button
          onClick={handleExcluir}
          disabled={excluindo}
          className="bg-red-900 text-sm text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-950 font-PrimaryFont w-full sm:w-auto disabled:opacity-60"
        >
          {excluindo ? "EXCLUINDO..." : "EXCLUIR ETAPA"}
        </button>
      </div>
    </div>
  );
};

export default Etapa;
