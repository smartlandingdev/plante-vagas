import { useState } from "react";
import { useNavigate } from "react-router";
import { Vaga } from "@/services/vaga";
import VagaVagas from "./vagaVagas";

const VAGAS_FAKE: Vaga[] = [
  {
    id: 1,
    nome: "Desenvolvedor Frontend",
    cargo: "Engenheiro de Software",
    descricao: "Buscamos um desenvolvedor frontend apaixonado por criar interfaces modernas e responsivas. Experiência com React e TypeScript desejável.",
    salario: 6500,
    beneficios: [{ id: 1, nome: "Vale Refeição" }, { id: 2, nome: "Plano de Saúde" }, { id: 3, nome: "Home Office" }],
    etapas: [
      { id: 1, nome: "Triagem de Currículo", descricao: "Análise inicial do perfil.", status: "aberta" },
      { id: 2, nome: "Teste Técnico", descricao: "Desafio de código com prazo de 3 dias.", status: "aberta" },
      { id: 3, nome: "Entrevista RH", descricao: "Conversa com o time de pessoas.", status: "aberta" },
    ],
    empresaId: 1,
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    nome: "Designer UX/UI",
    cargo: "Designer",
    descricao: "Procuramos designer criativo para criar experiências incríveis para nossos usuários. Conhecimento em Figma é obrigatório.",
    salario: 5800,
    beneficios: [{ id: 4, nome: "Vale Refeição" }, { id: 5, nome: "Gympass" }],
    etapas: [
      { id: 4, nome: "Análise de Portfólio", descricao: "Revisão do portfólio enviado.", status: "aberta" },
      { id: 5, nome: "Entrevista Técnica", descricao: "Apresentação de case design.", status: "aberta" },
    ],
    empresaId: 1,
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-01-15T00:00:00.000Z",
  },
];

export default function MainCompanyVagas() {
  const navigate = useNavigate();
  const [vagas, setVagas] = useState<Vaga[]>(VAGAS_FAKE);
  const [statusMap, setStatusMap] = useState<Record<number, "aberta" | "fechada">>({});
  const loading = false;

  const getStatus = (id: number) => statusMap[id] ?? "aberta";

  const handleFinalizar = (id: number) =>
    setStatusMap((prev) => ({ ...prev, [id]: "fechada" }));

  const handleReabrir = (id: number) =>
    setStatusMap((prev) => ({ ...prev, [id]: "aberta" }));

  const handleDuplicar = (id: number) => {
    const original = vagas.find((v) => v.id === id);
    if (!original) return;
    const novaId = Date.now();
    const duplicada: Vaga = {
      ...original,
      id: novaId,
      nome: `${original.nome} (cópia)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      beneficios: original.beneficios.map((b) => ({ ...b })),
      etapas: original.etapas.map((e) => ({ ...e, id: Date.now() + Math.random() })),
    };
    setVagas((prev) => [...prev, duplicada]);
  };

  const abertas = vagas.filter((v) => getStatus(v.id) === "aberta");
  const fechadas = vagas.filter((v) => getStatus(v.id) === "fechada");

  return (
    <>
      <div className="mt-20 bg-paleGreen font-SecondFont py-10 px-6 sm:px-10 md:px-20 lg:px-43">
        <span className="text-lg sm:text-xl">Vagas Abertas ({abertas.length})</span>
      </div>

      <br />

      <div className="flex flex-col bg-paleGreen font-SecondFont py-10 px-6 sm:px-10 md:px-20 lg:px-43 justify-center">
        <div className="flex justify-center mb-10">
          <button
            onClick={() => navigate("/empresa/criar-vaga")}
            className="bg-oliveGreen h-30 w-30 cursor-pointer rounded-lg text-6xl text-deepGreen shadow-md"
          >
            +
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Carregando vagas...</p>
        ) : vagas.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma vaga cadastrada ainda.</p>
        ) : (
          <div className="flex flex-col gap-8">
            {vagas.map((vaga) => (
              <VagaVagas
                key={vaga.id}
                vaga={vaga}
                status={getStatus(vaga.id)}
                onFinalizar={handleFinalizar}
                onReabrir={handleReabrir}
                onDuplicar={handleDuplicar}
              />
            ))}
          </div>
        )}

        {fechadas.length > 0 && (
          <p className="text-sm text-gray-500 text-center mt-6">
            {fechadas.length} vaga(s) encerrada(s) exibida(s) acima.
          </p>
        )}
      </div>
    </>
  );
}
