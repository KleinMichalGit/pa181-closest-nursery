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
          {translations.aboutContent && translations.aboutContent.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="py-4">
          <img src="/path/to/example-usage.gif" alt="Example usage GIF" />
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

