import { useState, useRef } from "react";
import { useCurriculum } from "../curriculumContext";
import { useUser } from "../userContext";
import {
  User,
  Briefcase,
  GraduationCap,
  Languages,
  Award,
  Star,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  Upload,
  FileText,
  CheckCircle,
  X,
} from "lucide-react";

const formatDate = (iso: string) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
};

const idiomaLabel: Record<string, string> = {
  portugues: "Português", ingles: "Inglês", espanhol: "Espanhol",
  frances: "Francês", alemao: "Alemão", italiano: "Italiano",
  mandarim: "Mandarim", japones: "Japonês", coreano: "Coreano",
  arabe: "Árabe", russo: "Russo",
};

const nivelLabel: Record<string, string> = {
  basico: "Básico", intermediario: "Intermediário", avancado: "Avançado",
  fluente: "Fluente / Proficiência", nativo: "Nativo",
};

const nivelFormacaoLabel: Record<string, string> = {
  fundamental: "Ensino Fundamental", medio: "Ensino Médio",
  tecnico: "Ensino Técnico", superior: "Ensino Superior",
  posgraduacao: "Pós-Graduação", mestrado: "Mestrado", doutorado: "Doutorado",
};

function SectionTitle({ icon: Icon, title }: { icon: any; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-5 h-5 text-deepGreen shrink-0" />
      <h2 className="text-lg font-medium text-deepGreen">{title}</h2>
      <hr className="flex-1 border-deepGreen opacity-30" />
    </div>
  );
}

function EmptySection({ message }: { message: string }) {
  return (
    <p className="text-gray-400 text-sm italic py-2">{message}</p>
  );
}

export default function CurriculumView() {
  const { curriculum, existCurriculum } = useCurriculum();
  const { UserData } = useUser();
  const { user } = UserData;

  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [extraindo, setExtraindo] = useState(false);
  const [extraido, setExtraido] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setExtraido(false);
    }
  };

  const handleExtrair = () => {
    if (!pdfFile) return;
    setExtraindo(true);
    setTimeout(() => {
      setExtraindo(false);
      setExtraido(true);
    }, 1800);
  };

  const handleRemoverPdf = () => {
    setPdfFile(null);
    setExtraido(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const addr = user.Address;
  const location = [addr?.city, addr?.state].filter(Boolean).join(" — ");

  const pdfUploadSection = (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8">
      <div className="flex items-center gap-2 mb-3">
        <Upload size={18} className="text-deepGreen" />
        <h2 className="text-base font-medium text-deepGreen">Importar currículo via PDF</h2>
      </div>

      {!pdfFile ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl py-8 cursor-pointer hover:border-mediumGreen hover:bg-paleGreen/20 transition-all duration-200"
        >
          <FileText size={32} className="text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Clique para selecionar um PDF</p>
          <p className="text-xs text-gray-400 mt-1">Somente arquivos .pdf</p>
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handlePdfChange}
          />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg px-4 py-3">
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-deepGreen" />
              <div>
                <p className="text-sm font-medium text-gray-700">{pdfFile.name}</p>
                <p className="text-xs text-gray-400">{(pdfFile.size / 1024).toFixed(1)} KB</p>
              </div>
            </div>
            <button onClick={handleRemoverPdf} className="text-gray-400 hover:text-red-500">
              <X size={16} />
            </button>
          </div>

          {!extraido ? (
            <button
              onClick={handleExtrair}
              disabled={extraindo}
              className="bg-deepGreen text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-900 disabled:opacity-60 flex items-center gap-2 w-fit"
            >
              {extraindo ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  Extraindo informações...
                </>
              ) : (
                <>
                  <Upload size={14} />
                  Extrair informações do PDF
                </>
              )}
            </button>
          ) : (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-sm">
              <CheckCircle size={16} />
              Informações extraídas com sucesso! Revise os campos abaixo.
            </div>
          )}
        </div>
      )}
    </div>
  );

  if (!existCurriculum) {
    return (
      <div className="flex flex-col p-8 md:p-36 lg:p-40 w-full bg-MediumGray max-w-6xl mx-auto font-SecondFont">
        {pdfUploadSection}
        <div className="flex flex-col items-center justify-center text-center gap-4 py-12">
          <Star className="w-12 h-12 text-deepGreen opacity-40" />
          <h1 className="text-xl text-DeepGray">Seu currículo ainda não foi criado.</h1>
          <p className="text-gray-500 text-sm">Preencha as seções de currículo no menu lateral para começar, ou importe um PDF acima.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8 md:p-36 lg:p-40 w-full bg-MediumGray max-w-6xl mx-auto font-SecondFont">

      {pdfUploadSection}

      {/* Cabeçalho */}
      <div className="bg-paleGreen border border-deepGreen rounded-md p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-deepGreen">{user.name || "—"}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mt-3 text-sm text-DeepGray">
          {user.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" /> {user.email}
            </span>
          )}
          {user.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" /> {user.phone}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {location}
            </span>
          )}
        </div>
        {user.disablePerson === "yes" && (
          <span className="inline-block mt-3 text-xs px-2 py-1 bg-deepGreen text-white rounded-full">
            PcD
          </span>
        )}
      </div>

      {/* Informações Pessoais */}
      <div className="mb-8">
        <SectionTitle icon={User} title="Informações Pessoais" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-DeepGray">
          {user.dateNasc && (
            <div>
              <span className="text-gray-400 block text-xs mb-1">Data de Nascimento</span>
              {new Date(user.dateNasc).toLocaleDateString("pt-BR")}
            </div>
          )}
          {user.gender && (
            <div>
              <span className="text-gray-400 block text-xs mb-1">Gênero</span>
              {{ feminino: "Feminino", masculino: "Masculino", outro: "Outro", prefiroNaoDizer: "Prefiro não dizer" }[user.gender] || user.gender}
            </div>
          )}
          {addr && (
            <div>
              <span className="text-gray-400 block text-xs mb-1">Endereço</span>
              {[addr.street, addr.number, addr.district, addr.city, addr.state].filter(Boolean).join(", ")}
            </div>
          )}
        </div>
      </div>

      {/* Experiência Profissional */}
      <div className="mb-8">
        <SectionTitle icon={Briefcase} title="Experiência Profissional" />
        {curriculum.experiencias.length === 0 ? (
          <EmptySection message="Nenhuma experiência profissional cadastrada." />
        ) : (
          <div className="flex flex-col gap-4">
            {curriculum.experiencias.map((exp: any, i: number) => (
              <div key={i} className="bg-paleGreen border border-deepGreen rounded-md p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <p className="font-medium text-DeepGray">{exp.cargo}</p>
                    <p className="text-sm text-gray-600">{exp.empresa}</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                    <CalendarDays className="w-3 h-3" />
                    {formatDate(exp.inicioData)} — {exp.empregoAtual ? "Atual" : formatDate(exp.fimData)}
                  </span>
                </div>
                {exp.descricao && (
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{exp.descricao}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Formação Acadêmica */}
      <div className="mb-8">
        <SectionTitle icon={GraduationCap} title="Formação Acadêmica" />
        {curriculum.formacoes.length === 0 ? (
          <EmptySection message="Nenhuma formação acadêmica cadastrada." />
        ) : (
          <div className="flex flex-col gap-4">
            {curriculum.formacoes.map((form: any, i: number) => (
              <div key={i} className="bg-paleGreen border border-deepGreen rounded-md p-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <p className="font-medium text-DeepGray">{form.curso}</p>
                    <p className="text-sm text-gray-600">{form.nomeInstituicao}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {nivelFormacaoLabel[form.nivelFormacao] || form.nivelFormacao}
                      {form.grauFormacao ? ` · ${form.grauFormacao}` : ""}
                      {form.status ? ` · ${form.status}` : ""}
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-gray-500 shrink-0">
                    <CalendarDays className="w-3 h-3" />
                    {formatDate(form.inicioData)} — {formatDate(form.fimData) || "Atual"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Idiomas */}
      <div className="mb-8">
        <SectionTitle icon={Languages} title="Idiomas" />
        {curriculum.idiomas.length === 0 ? (
          <EmptySection message="Nenhum idioma cadastrado." />
        ) : (
          <div className="flex flex-wrap gap-3">
            {curriculum.idiomas.map((idioma: any, i: number) => (
              <div key={i} className="bg-paleGreen border border-deepGreen rounded-md px-4 py-2 text-sm">
                <span className="font-medium text-DeepGray">{idiomaLabel[idioma.idioma] || idioma.idioma}</span>
                <span className="text-gray-500"> · {nivelLabel[idioma.nivel] || idioma.nivel}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificados */}
      <div className="mb-8">
        <SectionTitle icon={Award} title="Certificados" />
        {curriculum.certificados.length === 0 ? (
          <EmptySection message="Nenhum certificado cadastrado." />
        ) : (
          <div className="flex flex-col gap-4">
            {curriculum.certificados.map((cert: any, i: number) => (
              <div key={i} className="bg-paleGreen border border-deepGreen rounded-md p-4">
                <p className="font-medium text-DeepGray">{cert.certificate_name}</p>
                <p className="text-sm text-gray-600">{cert.nomeInstituicao}</p>
                {cert.descricao && (
                  <p className="text-sm text-gray-500 mt-1">{cert.descricao}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Diferenciais */}
      <div className="mb-4">
        <SectionTitle icon={Star} title="Diferenciais" />
        {curriculum.diferenciais.length === 0 ? (
          <EmptySection message="Nenhum diferencial cadastrado." />
        ) : (
          <div className="flex flex-wrap gap-2">
            {curriculum.diferenciais.map((dif: any, i: number) => (
              <span
                key={i}
                className="bg-paleGreen border border-deepGreen text-DeepGray text-sm px-3 py-1 rounded-full"
              >
                {dif.descricao}
              </span>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
