import { Briefcase, DollarSign, Tag, CheckCircle, RotateCcw, Copy } from "lucide-react";
import { useNavigate } from "react-router";
import { Vaga } from "@/services/vaga";

type Props = {
  vaga: Vaga;
  status: "aberta" | "fechada";
  onFinalizar: (id: number) => void;
  onReabrir: (id: number) => void;
  onDuplicar: (id: number) => void;
};

const VagaVagas = ({ vaga, status, onFinalizar, onReabrir, onDuplicar }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-white flex flex-col md:flex-row gap-8 p-6 sm:p-8 md:p-12 rounded-lg w-full max-w-3xl mx-auto shadow-md ${status === "fechada" ? "opacity-70" : ""}`}>
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <h1 className="font-PrimaryFont text-xl sm:text-2xl font-bold break-words">
            {vaga.nome}
          </h1>
          <span className={`text-xs px-2 py-1 rounded-full font-SecondFont font-medium ${status === "aberta" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
            {status === "aberta" ? "Aberta" : "Encerrada"}
          </span>
        </div>

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
          <div className="flex flex-wrap font-SecondFont gap-3 my-2 text-sm">
            {vaga.beneficios.map((b) => (
              <div key={b.id} className="flex items-center gap-1 font-bold">
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

      <div className="flex flex-col items-stretch justify-center gap-3 w-full md:w-48 mt-4 md:mt-6 shrink-0">
        {status === "aberta" && (
          <button
            onClick={() => navigate(`/empresa/gerenciar-processo?vagaId=${vaga.id}`)}
            className="bg-deepGreen text-white px-4 py-2 rounded-lg hover:bg-green-900 font-PrimaryFont font-semibold text-sm text-center"
          >
            Gerenciar processo
          </button>
        )}
        <button
          onClick={() => navigate(`/empresa/criar-vaga?vagaId=${vaga.id}`)}
          className="font-semibold font-PrimaryFont underline cursor-pointer text-sm text-center"
        >
          Editar vaga
        </button>

        <hr className="border-gray-200" />

        <button
          onClick={() => onDuplicar(vaga.id)}
          className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 font-SecondFont text-xs"
        >
          <Copy size={14} />
          Duplicar vaga
        </button>

        {status === "aberta" ? (
          <button
            onClick={() => onFinalizar(vaga.id)}
            className="flex items-center justify-center gap-2 border border-orange-400 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 font-SecondFont text-xs"
          >
            <CheckCircle size={14} />
            Finalizar vaga
          </button>
        ) : (
          <button
            onClick={() => onReabrir(vaga.id)}
            className="flex items-center justify-center gap-2 border border-green-500 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50 font-SecondFont text-xs"
          >
            <RotateCcw size={14} />
            Reabrir vaga
          </button>
        )}
      </div>
    </div>
  );
};

export default VagaVagas;
