import { useState } from "react";
import { useNavigate } from "react-router";
import { Menu, X } from "lucide-react"; // Ícones para abrir/fechar menu

import logo from "../../../assets/images/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-3 px-4 sm:px-6 w-full fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center max-w-[1600px] mx-auto">
        {/* Logo */}
        <div className="flex justify-start">
          <img
            src={logo}
            alt="Logo"
            className="h-12 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Botão de menu no mobile */}
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="hidden sm:flex flex-1 gap-10 text-deepGreen font-medium font-SecondFont justify-center items-center">
          <a
            onClick={() => navigate("/empresa/perfil")}
            className="hover:text-green-700 cursor-pointer"
          >
            PERFIL
          </a>
          <a
            onClick={() => navigate("/empresa/vagas")}
            className="hover:text-green-700 cursor-pointer"
          >
            VAGAS
          </a>
        </nav>
      </div>

      {menuOpen && (
        <nav className="sm:hidden mt-2 flex flex-col items-center gap-4 text-deepGreen font-medium font-SecondFont bg-white py-4 rounded shadow">
          <a
            onClick={() => {
              navigate("/empresa/perfil");
              setMenuOpen(false);
            }}
            className="hover:text-green-700 cursor-pointer"
          >
            PERFIL
          </a>
          <a
            onClick={() => {
              navigate("/empresa/vagas");
              setMenuOpen(false);
            }}
            className="hover:text-green-700 cursor-pointer"
          >
            VAGAS
          </a>
        </nav>
      )}
    </header>
  );
}
