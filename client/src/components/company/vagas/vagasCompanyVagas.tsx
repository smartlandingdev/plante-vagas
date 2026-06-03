import VagaVagas from "./vagaVagas";
import { Vaga } from "@/services/vaga";

type Props = {
  vagas: Vaga[];
};

export default function VagasCompanyVagas({ vagas }: Props) {
  return (
    <div className="flex flex-col gap-8">
      {vagas.map((vaga, index) => (
        <VagaVagas key={index} vaga={vaga} />
      ))}
    </div>
  );
}
