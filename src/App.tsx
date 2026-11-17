import { useEffect, useState } from "react";
import { useReveal } from "./hooks/motion";
import { useLang } from "./i18n";
import Splash from "./components/Splash";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Doctor from "./components/Doctor";
import Why from "./components/Why";
import Timeline from "./components/Timeline";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Quote from "./components/Quote";
import Reviews from "./components/Reviews";
import Interviews from "./components/Interviews";
import Faq from "./components/Faq";
import AnalysisForm from "./components/AnalysisForm";
import Footer from "./components/Footer";
import WhatsAppFab from "./components/WhatsAppFab";
import ConsentBanner from "./components/ConsentBanner";

export default function App() {
  const { t } = useLang();
  // The scalp map and the form share the Norwood stage; "0" (unsure) only exists in the form.
  const [mapStage, setMapStage] = useState(4);
  const [formStage, setFormStage] = useState(4);
  useReveal();
  useEffect(() => {
    if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
  }, []);

  const pickOnMap = (n: number) => { setMapStage(n); setFormStage(n); };
  const pickInForm = (n: number) => { setFormStage(n); if (n >= 1) setMapStage(n); };

  return (
    <>
      <a className="skip" href="#icerik">{t("İçeriğe geç")}</a>
      <Splash />
      <Header />
      <main id="icerik">
        <Hero stage={mapStage} onStageChange={pickOnMap} />
        <Doctor />
        <Why />
        <Timeline />
        <Services />
        <Pricing />
        <Quote />
        <Reviews />
        <Interviews />
        <Faq />
        <AnalysisForm stage={formStage} onStageChange={pickInForm} />
      </main>
      <Footer />
      <WhatsAppFab />
      <ConsentBanner />
    </>
  );
}
