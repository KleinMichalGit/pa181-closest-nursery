const HighAccessibilityModal = () => {
  return (
    <dialog id="accessibility" className="modal sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg select-none">High Accessibility</h3>

        <div className="py-4">
          <p>language</p>
          <p>color theme</p>
          <p> font size</p>
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
