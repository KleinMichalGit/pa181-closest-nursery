"use client";

type navItemProps = {
  id: string;
  text: string;
  toggleDropdown?: () => void;
};

const NavItem = ({ id, text, toggleDropdown }: navItemProps) => {
  return (
    <button
      className="block px-3 my-2.5 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:hover:bg-transparent"
      onClick={() => {
        if (toggleDropdown) {
          toggleDropdown();
        }
        const modal = document.getElementById(id) as HTMLDialogElement;
        if (modal) {
          modal.showModal();
        }
      }}
    >
      {text}
    </button>
  );
};

export default NavItem;
