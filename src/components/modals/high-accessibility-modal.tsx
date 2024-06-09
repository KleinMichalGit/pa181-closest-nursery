import { ThemeSwitcher } from "@/components/controls/theme-switcher";
import { LanguageSwitcher } from "@/components/controls/language-switcher";
import { FontSizeSwitcher } from "@/components/controls/font-size-switcher";

const HighAccessibilityModal = () => {
  return (
    <dialog id="accessibility" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg select-none">High Accessibility</h3>

        <div className="py-4">
          <LanguageSwitcher />
          <br />
          <ThemeSwitcher />
          <br />
          <FontSizeSwitcher />
        </div>

        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-secondary">close</button>
          </form>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default HighAccessibilityModal;
