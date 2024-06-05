"use client";

type navItemProps = {
  id: string;
  text: string;
};

const NavItem = ({ id, text }: navItemProps) => {
  return (
    <button
      className="block px-3 my-2.5 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
      onClick={() => {
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
