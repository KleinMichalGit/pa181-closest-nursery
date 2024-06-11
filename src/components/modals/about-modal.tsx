"use client";

import { useLanguageContext } from "@/contexts/language-context";

const AboutModal = () => {
  const { translations } = useLanguageContext();
  return (
    <dialog
      id="about"
      className="modal modal-bottom sm:modal-middle"
      aria-label={translations.about}
    >
      <div className="modal-box">
        <h2 className="font-bold text-lg select-none">{translations.about}</h2>

        <div className="py-4">
          <p>{translations.aboutContent}</p>
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-secondary" type="submit">
              {translations.close}
            </button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit">{translations.close}</button>
      </form>
    </dialog>
  );
};

export default AboutModal;
