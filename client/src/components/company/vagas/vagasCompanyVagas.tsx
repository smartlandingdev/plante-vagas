import { useState } from "react";
import VagaVagas from "./vagaVagas";
import { Vaga } from "@/services/vaga";

type Props = {
  vagas: Vaga[];
};

export default function VagasCompanyVagas({ vagas: vagasIniciais }: Props) {
  const [vagas, setVagas] = useState<Vaga[]>(vagasIniciais);
  const [statusMap, setStatusMap] = useState<Record<number, "aberta" | "fechada">>({});

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

  return (
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
  );
}
