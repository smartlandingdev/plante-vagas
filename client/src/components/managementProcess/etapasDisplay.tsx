import Etapa from "./etapa";
import { EtapaProcessoSeletivo } from "@/services/vaga";

type Props = {
  etapas: EtapaProcessoSeletivo[];
  onExcluir: (id: number) => void;
  onAtualizar: (etapa: EtapaProcessoSeletivo) => void;
  onMoverCima: (id: number) => void;
  onMoverBaixo: (id: number) => void;
};

export default function EtapasDisplay({ etapas, onExcluir, onAtualizar, onMoverCima, onMoverBaixo }: Props) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {etapas.map((etapa, index) => (
        <Etapa
          key={etapa.id}
          etapa={etapa}
          index={index + 1}
          isFirst={index === 0}
          isLast={index === etapas.length - 1}
          onExcluir={onExcluir}
          onAtualizar={onAtualizar}
          onMoverCima={onMoverCima}
          onMoverBaixo={onMoverBaixo}
        />
      ))}
    </div>
  );
}
