import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { hashPassword } from "../../utils/hashPassword";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const hashedPassword = hashPassword(password);
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: hashedPassword }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error("Erro ao validar login", {
          description: errorData.message || "Erro ao fazer login",
          duration: 3000,
        });
        setIsLoading(false);
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("userType", data.userType);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("refreshToken", data.refreshToken);

      toast.success("Login realizado com sucesso!", {
        duration: 2000,
      });

      if (data.userType === "company") {
        navigate("/empresa/perfil");
      } else if (data.userType === "candidate") {
        navigate("/candidato/perfil");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("Erro de conexão");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm p-8 sm:p-10 rounded-2xl shadow-xl
               border border-white/50 font-SecondFont text-gray-800"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-paleGreen rounded-2xl flex items-center justify-center mx-auto mb-4">
          <LogIn size={28} className="text-deepGreen" />
        </div>
        <h2 className="text-2xl font-bold text-deepGreen font-PrimaryFont">Bem-vindo de volta</h2>
        <p className="text-gray-600 mt-2">Entre com suas credenciais</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-center text-sm">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu@email.com"
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl
                       text-gray-800 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-mediumGreen focus:border-transparent
                       transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Sua senha"
              className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl
                       text-gray-800 placeholder-gray-400
                       focus:outline-none focus:ring-2 focus:ring-mediumGreen focus:border-transparent
                       transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600
                       transition-colors duration-200"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right">
          <a
            href="#"
            className="text-sm text-mediumGreen hover:text-deepGreen transition-colors duration-200"
          >
            Esqueceu sua senha?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-deepGreen text-white
                   py-4 rounded-xl font-semibold text-lg
                   hover:bg-mediumGreen transition-all duration-300
                   hover:shadow-lg hover:shadow-deepGreen/30
                   disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Entrando...
            </>
          ) : (
            <>
              <LogIn size={20} />
              ENTRAR
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
