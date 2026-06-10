import { useState } from "react";
import { Building2, Shield, Lightbulb, GraduationCap, Megaphone, Users, Heart, Send, ArrowRight, MapPin, Calendar, Globe } from "lucide-react";

const aboutCompany = {
  title: "Sobre a Empresa",
  content: [
    "A Afubra, ou Associação dos Produtores de Algodão do Brasil, é uma entidade que representa os interesses dos produtores de algodão no país. Fundada com o objetivo de promover o desenvolvimento do setor, a Afubra atua em diversas frentes, incluindo a defesa de políticas públicas, a realização de pesquisas e o fomento à capacitação dos agricultores.",
    "A associação busca fortalecer a cadeia produtiva do algodão, promovendo a troca de conhecimentos e inovações entre os produtores. A Afubra foi fundada para atender às demandas dos produtores de algodão, um dos pilares do agronegócio brasileiro. Com sede em Goiás, a associação atua como uma voz unificada para os agricultores, promovendo o fortalecimento do setor.",
  ],
  stats: [
    { icon: Calendar, label: "Fundação", value: "1985" },
    { icon: MapPin, label: "Sede", value: "Goiás, BR" },
    { icon: Users, label: "Associados", value: "5.000+" },
    { icon: Globe, label: "Atuação", value: "Nacional" },
  ],
};

const companyValues = [
  {
    icon: Shield,
    label: "Defesa de Interesses",
    description: "Representação ativa junto a órgãos governamentais e promoção de legislações favoráveis ao setor.",
  },
  {
    icon: Lightbulb,
    label: "Pesquisa e Desenvolvimento",
    description: "Colaboração com instituições para fomentar inovações na produção de algodão.",
  },
  {
    icon: GraduationCap,
    label: "Capacitação",
    description: "Cursos, workshops e treinamentos sobre práticas agrícolas e tendências do mercado.",
  },
  {
    icon: Megaphone,
    label: "Promoção e Marketing",
    description: "Campanhas para valorizar o algodão brasileiro no mercado interno e externo.",
  },
  {
    icon: Users,
    label: "Networking",
    description: "Espaço para produtores se conectarem e formarem parcerias estratégicas.",
  },
];

const CompanyInfoPage = () => {
  const [favoritada, setFavoritada] = useState(false);

  return (
    <div className="space-y-8">
      {/* Company Overview */}
      <section>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-paleGreen rounded-xl flex items-center justify-center">
              <Building2 size={20} className="text-deepGreen" />
            </div>
            <h3 className="text-lg font-bold text-deepGreen font-PrimaryFont">
              {aboutCompany.title}
            </h3>
          </div>
          <button
            onClick={() => setFavoritada((prev) => !prev)}
            title={favoritada ? "Remover dos favoritos" : "Favoritar empresa"}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-SecondFont text-sm font-medium transition-all duration-200 ${
              favoritada
                ? "bg-red-50 border-red-300 text-red-600 hover:bg-red-100"
                : "bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500"
            }`}
          >
            <Heart size={16} className={favoritada ? "fill-red-500 text-red-500" : ""} />
            {favoritada ? "Favoritada" : "Favoritar empresa"}
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          {aboutCompany.content.map((paragraph, index) => (
            <p
              key={index}
              className="font-SecondFont text-gray-700 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {aboutCompany.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-4 text-center
                       hover:border-mediumGreen/30 hover:shadow-md transition-all duration-300"
            >
              <stat.icon size={24} className="text-mediumGreen mx-auto mb-2" />
              <div className="text-xl font-bold text-deepGreen font-PrimaryFont">{stat.value}</div>
              <div className="text-sm text-gray-500 font-SecondFont">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Company Values */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-paleGreen rounded-xl flex items-center justify-center">
            <Heart size={20} className="text-deepGreen" />
          </div>
          <h3 className="text-lg font-bold text-deepGreen font-PrimaryFont">
            Valores da Empresa
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companyValues.map((value, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-xl p-5
                       hover:border-mediumGreen/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-paleGreen rounded-xl flex items-center justify-center mb-4
                            group-hover:bg-mediumGreen transition-colors duration-300">
                <value.icon size={24} className="text-deepGreen group-hover:text-white transition-colors duration-300" />
              </div>
              <h4 className="font-bold text-deepGreen font-SecondFont mb-2">
                {value.label}
              </h4>
              <p className="text-sm text-gray-600 font-SecondFont leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section className="pt-4">
        <div className="bg-gradient-to-r from-mediumGreen to-deepGreen rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-white font-PrimaryFont mb-2">
                Junte-se à Afubra
              </h3>
              <p className="text-white/80 font-SecondFont max-w-xl">
                Se você é apaixonado pelo agronegócio e deseja fazer parte de uma equipe que
                valoriza a inovação e a sustentabilidade, candidate-se e venha fazer parte da nossa missão!
              </p>
            </div>
            <button
              className="group flex items-center gap-3 bg-white text-deepGreen px-8 py-4 rounded-xl
                       font-SecondFont font-bold text-lg hover:bg-paleGreen transition-all duration-300
                       hover:shadow-lg hover:scale-105 whitespace-nowrap"
            >
              <Send size={20} />
              CANDIDATAR-SE
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyInfoPage;
