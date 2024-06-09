"use client";

import { useLanguageContext } from "@/contexts/language-context";

const AboutModal = () => {
  const { translations } = useLanguageContext();
  return (
    <dialog id="about" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg select-none">{translations.about}</h3>

        <div className="py-4">
          <p>{translations.aboutContent}</p>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-secondary">{translations.close}</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>{translations.close}</button>
      </form>
    </dialog>
  );
};

export default AboutModal;
