import { useState, useMemo } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import CandidatesDisplay from "./candidatesDisplay";

type Candidato = {
  id: number;
  nome: string;
  cidade: string;
  estado: string;
  imagem: string;
  competencias: string[];
  descricao: string;
};

const TODOS_CANDIDATOS: Candidato[] = [
  {
    id: 1,
    nome: "Ana Souza",
    cidade: "São Paulo",
    estado: "SP",
    imagem: "https://randomuser.me/api/portraits/women/44.jpg",
    competencias: ["React", "TypeScript", "Figma", "Scrum"],
    descricao:
      "Desenvolvedora frontend apaixonada por criar interfaces intuitivas e acessíveis. Atua com React e TypeScript, sempre buscando aplicar boas práticas de design de interface e experiência do usuário.",
  },
  {
    id: 2,
    nome: "Carlos Mendes",
    cidade: "Belo Horizonte",
    estado: "MG",
    imagem: "https://randomuser.me/api/portraits/men/32.jpg",
    competencias: ["Node.js", "Python", "Docker", "PostgreSQL"],
    descricao:
      "Engenheiro de software com foco em backend e infraestrutura escalável. Possui experiência sólida com desenvolvimento de APIs REST em Node.js e Python.",
  },
  {
    id: 3,
    nome: "Juliana Lima",
    cidade: "Curitiba",
    estado: "PR",
    imagem: "https://randomuser.me/api/portraits/women/68.jpg",
    competencias: ["UX/UI", "HTML", "CSS", "Adobe XD"],
    descricao:
      "Especialista em experiência do usuário, com foco em design centrado no ser humano. Trabalha na criação de fluxos e interfaces funcionais e visualmente atrativas.",
  },
];

export default function MainCandidates() {
  const [busca, setBusca] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroCompetencia, setFiltroCompetencia] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [ordenacao, setOrdenacao] = useState("recentes");

  const estadosUnicos = [...new Set(TODOS_CANDIDATOS.map((c) => c.estado))];
  const competenciasUnicas = [...new Set(TODOS_CANDIDATOS.flatMap((c) => c.competencias))];

  const candidatosFiltrados = useMemo(() => {
    let lista = [...TODOS_CANDIDATOS];

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      lista = lista.filter(
        (c) =>
          c.nome.toLowerCase().includes(termo) ||
          c.cidade.toLowerCase().includes(termo) ||
          c.competencias.some((comp) => comp.toLowerCase().includes(termo))
      );
    }

    if (filtroEstado) {
      lista = lista.filter((c) => c.estado === filtroEstado);
    }

    if (filtroCompetencia) {
      lista = lista.filter((c) => c.competencias.includes(filtroCompetencia));
    }

    if (ordenacao === "nome_asc") lista.sort((a, b) => a.nome.localeCompare(b.nome));
    if (ordenacao === "nome_desc") lista.sort((a, b) => b.nome.localeCompare(a.nome));

    return lista;
  }, [busca, filtroEstado, filtroCompetencia, ordenacao]);

  const limparFiltros = () => {
    setBusca("");
    setFiltroEstado("");
    setFiltroCompetencia("");
  };

  const temFiltrosAtivos = busca || filtroEstado || filtroCompetencia;

  return (
    <>
      <div className="bg-paleGreen mt-20 font-SecondFont px-4 sm:px-14 md:px-20 lg:px-14 xl:px-[55px] py-6 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
          <h1 className="text-xl sm:text-2xl">
            Candidatos a vaga
            <span className="ml-2 text-sm text-gray-500 font-normal">
              ({candidatosFiltrados.length})
            </span>
          </h1>
          <select
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            className="bg-oliveGreen text-white px-3 py-2 rounded-md cursor-pointer"
          >
            <option value="recentes">Mais recentes</option>
            <option value="antigos">Mais antigos</option>
            <option value="relevantes">Mais relevantes</option>
            <option value="nome_asc">Nome (A-Z)</option>
            <option value="nome_desc">Nome (Z-A)</option>
          </select>
        </div>

        {/* Barra de busca */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome, cidade ou competência..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-mediumGreen focus:border-transparent font-SecondFont text-sm"
            />
          </div>
          <button
            onClick={() => setMostrarFiltros((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-SecondFont text-sm font-medium transition-colors ${
              mostrarFiltros || temFiltrosAtivos
                ? "bg-deepGreen text-white border-deepGreen"
                : "bg-white text-gray-700 border-gray-200 hover:border-deepGreen"
            }`}
          >
            <Filter size={16} />
            Filtros
            {temFiltrosAtivos && (
              <span className="bg-white text-deepGreen text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {[busca, filtroEstado, filtroCompetencia].filter(Boolean).length}
              </span>
            )}
            <ChevronDown size={14} className={`transition-transform ${mostrarFiltros ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Painel de filtros */}
        {mostrarFiltros && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 flex flex-col sm:flex-row gap-4 flex-wrap">
            <div className="flex flex-col gap-1 min-w-[160px]">
              <label className="text-xs text-gray-500 font-medium">Estado</label>
              <select
                value={filtroEstado}
                onChange={(e) => setFiltroEstado(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-SecondFont focus:outline-none focus:ring-2 focus:ring-mediumGreen"
              >
                <option value="">Todos os estados</option>
                {estadosUnicos.map((e) => (
                  <option key={e} value={e}>{e}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 min-w-[180px]">
              <label className="text-xs text-gray-500 font-medium">Competência</label>
              <select
                value={filtroCompetencia}
                onChange={(e) => setFiltroCompetencia(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm font-SecondFont focus:outline-none focus:ring-2 focus:ring-mediumGreen"
              >
                <option value="">Todas as competências</option>
                {competenciasUnicas.map((comp) => (
                  <option key={comp} value={comp}>{comp}</option>
                ))}
              </select>
            </div>

            {temFiltrosAtivos && (
              <div className="flex items-end">
                <button
                  onClick={limparFiltros}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-SecondFont"
                >
                  <X size={14} />
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        )}

        {candidatosFiltrados.length === 0 ? (
          <div className="py-16 text-center text-gray-500 font-SecondFont">
            Nenhum candidato encontrado com os filtros aplicados.
          </div>
        ) : (
          <div className="px-0 sm:px-10 md:px-20 lg:px-16 xl:px-[70px] py-8 sm:py-20">
            <CandidatesDisplay candidates={candidatosFiltrados} />
          </div>
        )}
      </div>
    </>
  );
}
