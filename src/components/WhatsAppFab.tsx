import { useState } from "react";
import { FAB_MESSAGE, waLink } from "../data/site";
import { useScrollFrame } from "../hooks/motion";
import { WhatsAppIcon } from "./Icons";

/** Floating WhatsApp button, shown once the intro has scrolled away. */
export default function WhatsAppFab() {
  const [show, setShow] = useState(false);
  useScrollFrame(() => {
    const intro = document.getElementById("intro");
    setShow(!intro || intro.getBoundingClientRect().bottom < innerHeight * .4);
  });
  return (
    <a className={`wa-fab${show ? " show" : ""}`} href={waLink(FAB_MESSAGE)} target="_blank" rel="noopener" aria-label="WhatsApp'tan bize yazın">
      <WhatsAppIcon />
      <span className="wa-badge" aria-hidden="true">1</span>
      <span className="wa-tip">Bize yazın</span>
    </a>
  );
}
