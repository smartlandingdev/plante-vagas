import * as React from "react";
import { User, Clipboard, AlignJustify, Briefcase, UserCheck, LogOut, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { NavMain } from "@/components/ui/nav-main";
import { NavUser } from "@/components/ui/nav-user";

import { Sidebar, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from "@/components/ui/sidebar";

export function AppSidebar({
  activeTab,
  setActiveTab,
  ...props
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
} & React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "Perfil",
        url: "/profile",
        icon: User,
        onClick: () => setActiveTab("perfil"),
        items: [
          {
            title: "Meus Dados",
            url: "#",
            onClick: () => setActiveTab("meus-dados"),
          },
          {
            title: "Endereço",
            url: "#",
            onClick: () => setActiveTab("endereco"),
          },
          {
            title: "Informações de login",
            url: "#",
            onClick: () => setActiveTab("informacoes-login"),
          },
        ],
      },
      {
        title: "Curriculo",
        url: "#",
        icon: Clipboard,
        onClick: () => setActiveTab("curriculo"),
        items: [
          {
            title: "Visualizar Currículo",
            url: "#",
            icon: Eye,
            onClick: () => setActiveTab("visualizar-curriculo"),
          },
          {
            title: "Informações Pessoais",
            url: "#",
            onClick: () => setActiveTab("informacoes-pessoais"),
          },
          {
            title: "Formação Academica",
            url: "#",
            onClick: () => setActiveTab("formacao-academica"),
          },
          {
            title: "Experiência Profissional",
            url: "#",
            onClick: () => setActiveTab("experiencia-profissional"),
          },
          {
            title: "Idioma",
            url: "#",
            onClick: () => setActiveTab("idioma"),
          },
          {
            title: "Certificados",
            url: "#",
            onClick: () => setActiveTab("certificados"),
          },
          {
            title: "Diferenciais",
            url: "#",
            onClick: () => setActiveTab("diferenciais"),
          },
        ],
      },
      {
        title: "Processos Seletivos",
        url: "#",
        icon: AlignJustify,
        onClick: () => setActiveTab("processos-seletivos"),
      },
    ],
  };

  return (
    <Sidebar
      className="flex top-20 h-[calc(100svh-5rem)] font-SecondFont"
      collapsible="icon"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut />
              Sair da conta
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}


export function AppSidebarCreate({
  activeTab,
  setActiveTab,
  ...props
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
} & React.ComponentProps<typeof Sidebar>) {
  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },

    navMain: [
      {
        title: "Dado da vaga",
        url: "/empresa/criar-vaga",
        icon: Briefcase,
        onClick: () => setActiveTab("criarVaga"),
      },
      {
        title: "Processo seletivo",
        url: "#",
        icon:UserCheck,
        onClick: () => setActiveTab("processoSeletivo"),
        items: [
          {
            title: "Etapas",
            url: "#",
            onClick: () => setActiveTab("etapas"),
          }
        ],
      }
    ],
  };

  return (
    <Sidebar
      className="flex top-20 h-[calc(100svh-5rem)] font-SecondFont"
      collapsible="icon"
      {...props}
    >
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
