import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Dropdown from "@/components/FilterSearch/Dropdown";
import Topbar from "@/components/Topbar/Topbar";
import Footer from "@/components/Footer";

export async function getStaticProps({ locale }:any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["terms"]))
    }
  };
}

export default function Home() {
  const { t } = useTranslation();
 
  return (
<>
<Topbar/>
    <div className=" flex justify-between">

      <div className="w-[80%] p-20">
<b>{t("terms:title1")}</b>
<br/>
<p>{t("terms:termsOfService1")}</p><br/>
<p>{t("terms:termsOfService2")}</p><br/>
<b>{t("terms:title2")}</b><br/>
<p>{t("terms:useOfService1")}</p><br/>
<p>{t("terms:useOfService2")}</p><br/>
<p>{t("terms:useOfService3")}</p><br/>
<p>{t("terms:useOfService4")}</p><br/>
<b>{t("terms:title3")}</b><br/>
<p>{t("terms:accInfo1")}</p><br/>
<p>{t("terms:accInfo2")}</p><br/>
<p>{t("terms:accInfo3")}</p><br/>
<p>{t("terms:accInfo4")}</p><br/>


<b>{t("terms:title4")}</b><br/>
<p>{t("terms:banking")}</p><br/>

<b>{t("terms:title5")}</b><br/>
<p>{t("terms:others1")}</p><br/>
<p>{t("terms:others2")}</p><br/>
<p>{t("terms:others4")}</p><br/>
<p>{t("terms:others3")}</p><br/>

</div>
    <Dropdown terms={true}/>


</div> 
<Footer/>
</>
  );
}













