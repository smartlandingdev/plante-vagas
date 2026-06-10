import CompanySettings from "@/components/company/settings/companySettings";
import HeaderCompany from "@/components/home-page/headers/headerCompany";

const CompanySettingsPage = () => {
  return (
    <>
      <header><HeaderCompany /></header>
      <main>
        <CompanySettings />
      </main>
    </>
  );
};

export default CompanySettingsPage;
