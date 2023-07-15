import React from 'react';

function ModalUpdateTravelspot({ data }) {
  const { id, nama, deskripsi, alamat_lengkap, kab_kota, provinsi, negara, lingkup, fasilitas, foto, jumlah_like, jumlah_komen } = data;

  return (
    <dialog id="modal-detail-travelspot" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">{nama}</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
}

export default ModalUpdateTravelspot;
