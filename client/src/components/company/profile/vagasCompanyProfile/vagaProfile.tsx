import { Briefcase, DollarSign, Tag } from "lucide-react";
import { useNavigate } from "react-router";
import { Vaga } from "@/services/vaga";

const VagaProfile = ({ vaga }: { vaga: Vaga }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white flex flex-col md:flex-row gap-8 p-6 sm:p-8 md:p-12 rounded-lg w-full max-w-3xl mx-auto shadow-md">
      <div className="flex flex-col flex-1">
        <h1 className="font-PrimaryFont text-xl sm:text-2xl font-bold mb-4 break-words">
          {vaga.nome}
        </h1>

        <div className="flex flex-wrap font-SecondFont gap-4 font-bold mb-2 text-sm">
          <div className="flex items-center gap-1">
            <Briefcase className="w-4 h-4" />
            <span>{vaga.cargo}</span>
          </div>
          {vaga.salario && (
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              <span>R$ {vaga.salario.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
            </div>
          )}
        </div>

        <hr className="border-t border-deepGreen my-2" />

        {vaga.beneficios.length > 0 && (
          <div className="flex flex-wrap font-SecondFont gap-3 my-2 text-sm font-bold">
            {vaga.beneficios.map((b) => (
              <div key={b.id} className="flex items-center gap-1">
                <Tag className="w-4 h-4" />
                <span>{b.nome}</span>
              </div>
            ))}
          </div>
        )}

        <p className="font-SecondFont mt-4 text-sm leading-relaxed break-words">
          {vaga.descricao}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-2 w-full md:w-auto">
        <button
          onClick={() => navigate(`/empresa/criar-vaga?vagaId=${vaga.id}`)}
          className="bg-deepGreen text-white px-6 py-3 rounded-lg hover:bg-green-900 font-semibold font-PrimaryFont w-full md:w-auto"
        >
          EDITAR VAGA
        </button>
        <button className="font-semibold font-PrimaryFont underline cursor-pointer mt-2">
          Ver candidatos
        </button>
      </div>
    </div>
  );
};

export default VagaProfile;
