import { useEffect, useState } from "react";
import feather from "feather-icons";
import { MapPin, UserCheck, Briefcase, Clipboard, DollarSign, X } from "lucide-react";

const VagasProcess = (props: {
  name: string;
  cidade: string;
  postada: string;
  pcd: any;
  regime: string;
  contratacao: string;
  salario: any;
}) => {
  const [cancelando, setCancelando] = useState(false);
  const [cancelado, setCancelado] = useState(false);

  useEffect(() => {
    feather.replace();
  }, []);

  if (cancelado) return null;

  return (
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 gap-4 p-4 sm:p-6 rounded-lg w-full max-w-3xl mx-auto shadow-md">
      <div className="flex flex-col">
        <h1 className="font-PrimaryFont text-2xl font-bold mb-6">
          {props.name}
        </h1>

        <div className="flex flex-wrap font-SecondFont gap-4 font-bold my-2">
          <div className="flex items-center gap-1">
            <MapPin />
            <span>{props.cidade}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin />
            <span>Postada a {props.postada} horas</span>
          </div>
        </div>

        <hr className="text-deepGreen my-2" />

        <div className="flex flex-wrap font-SecondFont font-bold gap-4 my-2">
          {props.pcd && (
            <div className="flex items-center gap-1">
              <UserCheck />
              <span>PCD</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Briefcase />
            <span>{props.regime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clipboard />
            <span>{props.contratacao}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign />
            <span>{props.salario}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-6 md:mt-0 gap-3">
        <button className="bg-deepGreen text-white px-6 py-3 rounded-lg hover:bg-green-900 font-semibold font-PrimaryFont w-full">
          ACOMPANHAR PROCESSO
        </button>

        {!cancelando ? (
          <button
            onClick={() => setCancelando(true)}
            className="flex items-center justify-center gap-2 border border-red-500 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 font-SecondFont text-sm w-full"
          >
            <X size={16} />
            Cancelar candidatura
          </button>
        ) : (
          <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col gap-3">
            <p className="text-sm text-red-700 font-SecondFont text-center">
              Tem certeza que deseja cancelar sua candidatura?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setCancelando(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 font-SecondFont"
              >
                Voltar
              </button>
              <button
                onClick={() => setCancelado(true)}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 font-SecondFont"
              >
                Confirmar cancelamento
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VagasProcess;
