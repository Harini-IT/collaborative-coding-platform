
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Dropdown from "@/components/FilterSearch/Dropdown";



export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["privacyPolicy"]))
    }
  };
}

export default function Home() {
  const { t } = useTranslation();
  
  return (
    <div className="p-20 flex justify-between">

      <div className="w-[85%]">
<b>{t("privacyPolicy:title1")}</b><br/>
<p>{t("privacyPolicy:policy1")}</p><br/>

<b>{t("privacyPolicy:title2")}</b><br/>
<p>{t("privacyPolicy:policy2")}</p><br/>

<b>{t("privacyPolicy:title3")}</b><br/>
<p>{t("privacyPolicy:policy3")}</p><br/>

<b>{t("privacyPolicy:title4")}</b><br/>
<p>{t("privacyPolicy:policy4")}</p><br/>

<b>{t("privacyPolicy:title5")}</b><br/>
<p>{t("privacyPolicy:policy5")}</p><br/>

<b>{t("privacyPolicy:title6")}</b><br/>
<p>{t("privacyPolicy:policy6")}</p><br/>

<b>{t("privacyPolicy:title7")}</b><br/>
<p>{t("privacyPolicy:policy7")}</p><br/>



</div>

<Dropdown terms={false}/>
</div>
  );
}





