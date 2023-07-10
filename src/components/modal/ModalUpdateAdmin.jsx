import { useState } from 'react';

import InputGroup from '../InputGroup';
import SelectGroup from '../SelectGroup';
import DragNDropFIle from '../DragNDropFile';
import DefaultUserPhoto from '../DefaultUserPhoto';

function ModalUpdateAdmin({ data, isLoaded, form, setForm, onSubmit }) {
  const [formOpen, setFormOpen] = useState(false);

  const { photo, fullname, gender, address, phone, nik } = form;

  function onTextChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onGenderSelect(e) {
    const { value } = e.target;

    setForm((prev) => ({
      ...prev,
      gender: value,
    }));
  }

  function onPhotoUpload(file) {
    setForm((prev) => ({
      ...prev,
      photo: file,
    }));
  }

  const UpdateForm = () => {
    return (
      <>
        <h2 className="badge badge-neutral badge-md">Edit Data Admin</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-5 my-4">
          <div className="col-span-2">
            <DragNDropFIle label="Foto Profil" name="photo" onChange={onPhotoUpload} />
          </div>
          <InputGroup label="Nama Lengkap" name="fullname" placeholder="Isi Nama Lengkap" value={fullname} onChange={onTextChange} />
          <InputGroup label="Nomor Telepon" name="phone" placeholder="Isi Nomor Telepon" value={phone} onChange={onTextChange} />
          <InputGroup label="NIK" name="nik" type="number" placeholder="Isi NIK" value={nik} onChange={onTextChange} />
          <SelectGroup
            label="Jenis Kelamin"
            name="gender"
            optionList={[
              { id: 'female', name: 'Perempuan' },
              { id: 'male', name: 'Laki-laki' },
            ]}
            value={gender}
            onChange={onGenderSelect}
          />
          <div className="col-span-2">
            <InputGroup label="Alamat" isTextArea={true} name="fullname" placeholder="Isi Alamat" value={address} onChange={onTextChange} />
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <button type="submit" className="btn btn-sm btn-warning capitalize rounded-full">
            update
          </button>
          <button type="button" onClick={setFormOpen.bind(null, false)} className="btn btn-sm btn-neutral capitalize btn-outline rounded-full">
            kembali
          </button>
        </div>
      </>
    );
  };

  return (
    <dialog id="modal-detail" className="modal">
      <form onSubmit={onSubmit} method="dialog" className={`modal-box ${formOpen ? 'max-w-xl' : undefined}`}>
        {data != null && isLoaded ? (
          formOpen ? (
            UpdateForm()
          ) : (
            <>
              <div className="flex gap-3 items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{data.nama_lengkap}</h3>
                  <p className="text-sm text-black/30">
                    <span className="badge badge-info">{data.no_telepon}</span>
                  </p>
                </div>
                <DefaultUserPhoto size="3rem" isRoundedFull={false} className="rounded" />
              </div>
              <hr className="my-3" />
              <div className="grid grid-flow-row grid-cols-2 gap-2">
                <div>
                  <label className="text-sm text-black/30">Username</label>
                  <p className="font-medium">{data.user.username}</p>
                </div>
                <div>
                  <label className="text-sm text-black/30">Email</label>
                  <p className="font-medium">{data.user.email}</p>
                </div>
                <div>
                  <label className="text-sm text-black/30">NIK</label>
                  <p className="font-medium">{data.nik}</p>
                </div>
                <div>
                  <label className="text-sm text-black/30">Jenis Kelamin</label>
                  <p className="font-medium">{data.jenis_kelamin}</p>
                </div>
                <div>
                  <label className="text-sm text-black/30">Bio</label>
                  <p className="font-medium">{data.user.bio ? data.user.bio : '...'}</p>
                </div>
                <div>
                  <label className="text-sm text-black/30">Alamat</label>
                  <p className="font-medium">{data.alamat}</p>
                </div>
              </div>
              <div className="modal-action">
                <button type="button" onClick={setFormOpen.bind(null, true)} className="btn btn-sm btn-warning rounded-full capitalize">
                  Edit
                </button>
                <button
                  onClick={() => {
                    document.getElementById('modal-detail').close();
                  }}
                  className="btn btn-sm btn-neutral btn-outline rounded-full capitalize"
                >
                  Tutup
                </button>
              </div>
            </>
          )
        ) : (
          <h2>FETCHING ADMIN DETAIL...</h2>
        )}
      </form>
    </dialog>
  );
}

export default ModalUpdateAdmin;
