function HistoryBox({ title, id, description, icon, amount, children }) {
  return (
    <>
      <div onClick={() => document.getElementById(id).showModal()} className="border-2 p-5 hover:shadow cursor-pointer max-w-xs">
        <div className="flex gap-3 justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex gap-1 items-center">
            {icon}
            <span className="text-black/30">{amount}</span>
          </div>
        </div>
        <p className="text-sm mt-1">{description}</p>
      </div>

      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box w-96">
          <div className="">{children}</div>
          <div className="modal-action">
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
}

export default HistoryBox;
