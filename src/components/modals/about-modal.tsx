"use client";

const AboutModal = () => {
  return (
    <dialog id="about" className="modal sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg select-none">
          About PA181 Closest Nursery
        </h3>

        <div className="py-4">
          <p>content</p>
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

export default AboutModal;
