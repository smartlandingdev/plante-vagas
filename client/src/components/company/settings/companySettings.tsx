import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Lock, PencilLine, Trash2, KeyRound, Building2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useUser } from "../userContextCompany";

const inputBase = "w-full border rounded-sm mt-1 p-1 pl-4 transition-all duration-200";
const inputLocked = `${inputBase} bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200`;
const inputEditable = `${inputBase} bg-white text-gray-800 border-2 border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200`;

type Tab = "dados" | "senha" | "conta";

export default function CompanySettings() {
  const { UserData } = useUser();
  const user = UserData.user;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<Tab>("dados");

  // --- Dados da empresa ---
  const [editandoDados, setEditandoDados] = useState(false);
  const [salvandoDados, setSalvandoDados] = useState(false);
  const [formDados, setFormDados] = useState({
    phone: user.phone ?? "",
    description: user.description ?? "",
  });

  const handleSalvarDados = async () => {
    setSalvandoDados(true);
    const id = toast.loading("Salvando dados...");
    try {
      // await updateCompany(formDados); — integrar com backend
      await new Promise((r) => setTimeout(r, 600));
      setEditandoDados(false);
      toast.success("Dados atualizados com sucesso", { id });
    } catch (e: any) {
      toast.error("Erro ao atualizar dados", { id, description: e.message });
    } finally {
      setSalvandoDados(false);
    }
  };

  // --- Alterar senha ---
  const [salvandoSenha, setSalvandoSenha] = useState(false);
  const [formSenha, setFormSenha] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  });

  const handleSalvarSenha = async () => {
    if (!formSenha.senhaAtual || !formSenha.novaSenha) {
      toast.error("Preencha a senha atual e a nova senha");
      return;
    }
    if (formSenha.novaSenha !== formSenha.confirmarSenha) {
      toast.error("A nova senha e a confirmação não coincidem");
      return;
    }
    setSalvandoSenha(true);
    const id = toast.loading("Atualizando senha...");
    try {
      // await updateCompanyPassword(formSenha); — integrar com backend
      await new Promise((r) => setTimeout(r, 600));
      setFormSenha({ senhaAtual: "", novaSenha: "", confirmarSenha: "" });
      toast.success("Senha atualizada com sucesso", { id });
    } catch (e: any) {
      toast.error("Erro ao atualizar senha", { id, description: e.message });
    } finally {
      setSalvandoSenha(false);
    }
  };

  // --- Excluir conta ---
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = async () => {
    const id = toast.loading("Excluindo conta...");
    try {
      // await deleteCompany(); — integrar com backend
      await new Promise((r) => setTimeout(r, 600));
      localStorage.clear();
      toast.success("Conta excluída com sucesso", { id });
      navigate("/login");
    } catch (e: any) {
      toast.error("Erro ao excluir conta", { id, description: e.message });
    }
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "dados", label: "Editar dados", icon: <Building2 size={16} /> },
    { key: "senha", label: "Alterar senha", icon: <KeyRound size={16} /> },
    { key: "conta", label: "Excluir conta", icon: <Trash2 size={16} /> },
  ];

  return (
    <div className="flex flex-col p-8 md:p-20 lg:p-28 w-full bg-MediumGray max-w-5xl mx-auto font-SecondFont">
      <h1 className="text-2xl font-PrimaryFont text-deepGreen mb-6">Configurações da conta</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-200 pb-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white border border-b-0 border-gray-200 text-deepGreen"
                : "text-gray-500 hover:text-deepGreen"
            } ${tab.key === "conta" ? "ml-auto text-red-500 hover:text-red-700" : ""}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Editar dados */}
      {activeTab === "dados" && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-deepGreen">Dados da empresa</h2>
            {!editandoDados ? (
              <button
                onClick={() => {
                  setFormDados({ phone: user.phone ?? "", description: user.description ?? "" });
                  setEditandoDados(true);
                }}
                className="flex items-center gap-1 text-sm text-deepGreen border border-deepGreen px-3 py-1.5 rounded-lg hover:bg-paleGreen"
              >
                <PencilLine size={14} />
                Editar
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditandoDados(false)}
                  className="text-sm border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSalvarDados}
                  disabled={salvandoDados}
                  className="text-sm bg-deepGreen text-white px-3 py-1.5 rounded-lg hover:bg-green-900 disabled:opacity-60"
                >
                  {salvandoDados ? "Salvando..." : "Salvar"}
                </button>
              </div>
            )}
          </div>

          {!editandoDados && (
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 mb-4">
              <PencilLine size={14} />
              Clique em <strong>Editar</strong> para alterar os dados da empresa.
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1">
                  <label className="text-sm text-gray-600">Razão social</label>
                  {editandoDados && (
                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-1">
                      <Lock size={11} /> Não editável
                    </span>
                  )}
                </div>
                <input type="text" disabled value={user.socialReason} className={inputLocked} />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1">
                  <label className="text-sm text-gray-600">CNPJ</label>
                  {editandoDados && (
                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-1">
                      <Lock size={11} /> Não editável
                    </span>
                  )}
                </div>
                <input type="text" disabled value={user.cnpj} className={inputLocked} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-1">
                  <label className="text-sm text-gray-600">Nome fantasia</label>
                  {editandoDados && (
                    <span className="flex items-center gap-1 text-xs text-gray-400 ml-1">
                      <Lock size={11} /> Não editável
                    </span>
                  )}
                </div>
                <input type="text" disabled value={user.fantasyName} className={inputLocked} />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm text-gray-600">Telefone</label>
                <input
                  type="text"
                  value={editandoDados ? formDados.phone : user.phone}
                  disabled={!editandoDados}
                  onChange={(e) => setFormDados((f) => ({ ...f, phone: e.target.value }))}
                  className={editandoDados ? inputEditable : inputLocked}
                  placeholder={editandoDados ? "Digite o telefone" : ""}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600">Descrição da empresa</label>
              <textarea
                value={editandoDados ? formDados.description : user.description}
                disabled={!editandoDados}
                onChange={(e) => setFormDados((f) => ({ ...f, description: e.target.value }))}
                rows={4}
                className={`${editandoDados ? inputEditable : inputLocked} resize-none`}
                placeholder={editandoDados ? "Descreva sua empresa..." : ""}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <label className="text-sm text-gray-600">Email</label>
                {editandoDados && (
                  <span className="flex items-center gap-1 text-xs text-gray-400 ml-1">
                    <Lock size={11} /> Não editável
                  </span>
                )}
              </div>
              <input type="text" disabled value={user.email} className={`${inputLocked} md:w-1/2`} />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Alterar senha */}
      {activeTab === "senha" && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-deepGreen mb-4">Alterar senha</h2>
          <div className="flex flex-col gap-4 max-w-md">
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 border border-gray-200 rounded-md px-3 py-2">
              <Lock size={14} />
              Preencha os campos abaixo para alterar sua senha de acesso.
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Senha atual *</label>
              <input
                type="password"
                value={formSenha.senhaAtual}
                onChange={(e) => setFormSenha((f) => ({ ...f, senhaAtual: e.target.value }))}
                className={inputEditable}
                placeholder="Digite sua senha atual"
                autoComplete="current-password"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Nova senha *</label>
              <input
                type="password"
                value={formSenha.novaSenha}
                onChange={(e) => setFormSenha((f) => ({ ...f, novaSenha: e.target.value }))}
                className={inputEditable}
                placeholder="Digite a nova senha"
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1">Confirmar nova senha *</label>
              <input
                type="password"
                value={formSenha.confirmarSenha}
                onChange={(e) => setFormSenha((f) => ({ ...f, confirmarSenha: e.target.value }))}
                className={inputEditable}
                placeholder="Repita a nova senha"
                autoComplete="new-password"
              />
            </div>
            <button
              onClick={handleSalvarSenha}
              disabled={salvandoSenha}
              className="bg-deepGreen text-white px-6 py-2 rounded-lg hover:bg-green-900 font-PrimaryFont font-semibold disabled:opacity-60 w-fit"
            >
              {salvandoSenha ? "Salvando..." : "Salvar nova senha"}
            </button>
          </div>
        </div>
      )}

      {/* Tab: Excluir conta */}
      {activeTab === "conta" && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-red-100">
          <h2 className="text-lg font-medium text-red-700 mb-4">Excluir conta da empresa</h2>
          <div className="max-w-lg">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-700 font-medium mb-1">Atenção: esta ação é irreversível</p>
              <p className="text-sm text-red-600">
                Ao excluir sua conta, todos os dados da empresa, vagas publicadas e candidaturas serão
                permanentemente removidos. Esta ação não pode ser desfeita.
              </p>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              <strong>Empresa:</strong> {user.fantasyName || user.name}
              <br />
              <strong>CNPJ:</strong> {user.cnpj}
            </p>
            <button
              onClick={() => setConfirmDeleteOpen(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-SecondFont"
            >
              <Trash2 size={16} />
              Excluir conta permanentemente
            </button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Excluir conta da empresa"
        description="Tem certeza que deseja excluir a conta da empresa? Todos os dados, vagas e candidaturas serão removidos. Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
      />
    </div>
  );
}
