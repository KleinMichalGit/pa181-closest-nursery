"use client";

type setIsPositionVisible = {
  setIsPositionVisible: (value: boolean) => void;
};

const SideMenu = ({ setIsPositionVisible }: setIsPositionVisible) => {
  return (
    <aside className="side-menu">
      <ul>
        <li>
          <button
            className="btn btn-primary"
            onClick={() => setIsPositionVisible(true)}
          >
            Add your position
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default SideMenu;
