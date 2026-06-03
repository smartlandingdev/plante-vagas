import { useEffect, useState } from "react";
import logoEmpresa from "../../../assets/images/images.png";
import Board from "./board";
import { useUser } from "../userContextCompany";
import { getVagasByEmpresa, Vaga } from "@/services/vaga";

export default function MainCompanyProfile() {
  const { UserData } = useUser();
  const user = UserData.user;
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVagasByEmpresa()
      .then(setVagas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-12 px-4 sm:px-8 lg:px-20 xl:px-40 2xl:px-80 gap-6 flex flex-col">
      <p className="text-lg font-medium">
        Veja como os usuários enxergam seu perfil.
      </p>

      <div>
        <Board
          name={user?.fantasyName ?? user?.name ?? ""}
          imagem={logoEmpresa}
          descricao_curta={user?.description ?? ""}
          descricao_longa={user?.description ?? ""}
          vagas={vagas}
          loadingVagas={loading}
        />
      </div>
    </div>
  );
}
