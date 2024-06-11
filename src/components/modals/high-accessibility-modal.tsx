"use client";

import { ThemeSwitcher } from "@/components/controls/theme-switcher";
import { LanguageSwitcher } from "@/components/controls/language-switcher";
import { FontSizeSwitcher } from "@/components/controls/font-size-switcher";
import { useLanguageContext } from "@/contexts/language-context";

const HighAccessibilityModal = () => {
  const { translations } = useLanguageContext();
  return (
    <dialog
      id="accessibility"
      className="modal modal-bottom sm:modal-middle"
      aria-label={translations.accessibility}
    >
      <div className="modal-box">
        <h2 className="font-bold select-none">{translations.accessibility}</h2>

        <div className="py-4">
          <LanguageSwitcher />
          <br />
          <ThemeSwitcher />
          <br />
          <FontSizeSwitcher />
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

export default HighAccessibilityModal;
