import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getVagasByEmpresa, Vaga } from "@/services/vaga";
import VagaVagas from "./vagaVagas";

export default function MainCompanyVagas() {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getVagasByEmpresa()
      .then(setVagas)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mt-20 bg-paleGreen font-SecondFont py-10 px-6 sm:px-10 md:px-20 lg:px-43">
        <span className="text-lg sm:text-xl">Vagas Abertas</span>
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
              <VagaVagas key={vaga.id} vaga={vaga} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
