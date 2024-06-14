"use client";

import { useLanguageContext } from "@/contexts/language-context";
import Image from "next/image";
import gifImage from "/public/Animation.gif"; // Ensure you have the correct path

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
          {translations.aboutContent &&
            translations.aboutContent
              .split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
        </div>

        <div className="py-4">
          <Image src={gifImage} alt="Example usage GIF" />
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
