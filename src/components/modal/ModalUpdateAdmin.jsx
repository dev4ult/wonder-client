import { useState } from 'react';

import InputGroup from '../InputGroup';
import SelectGroup from '../SelectGroup';
import DragNDropFIle from '../DragNDropFile';
import DefaultUserPhoto from '../DefaultUserPhoto';
import { IoClose } from 'react-icons/io5';

const UserPhotoUrl = import.meta.env.VITE_USERPHOTOURL;

function ModalUpdateAdmin({ data, isLoaded, form, setForm, onSubmit, onConfirmDelete }) {
  const [formOpen, setFormOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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
      photo: URL.createObjectURL(file),
    }));
  }

  const UpdateForm = () => {
    return (
      <>
        <h2 className="badge badge-neutral badge-md">Edit Data Admin</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-5 my-4">
          <div className="col-span-2 flex gap-3 justify-between">
            <DragNDropFIle label="Foto Profil" name="photo" onChange={onPhotoUpload} />
            {photo != null ? (
              <div className="text-center">
                <span className="text-black/30 text-sm">Preview</span>
                <img src={photo} className="w-24 h-24 border-2 rounded" alt="profil" />
              </div>
            ) : (
              <div className="text-center">
                <span className="text-black/30 text-sm">Preview</span>
                <DefaultUserPhoto size="4.8rem" isRoundedFull={false} className="rounded" />
              </div>
            )}
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
            simpan perubahan
          </button>
          <button type="button" onClick={setFormOpen.bind(null, false)} className="btn btn-sm btn-neutral capitalize btn-outline rounded-full">
            kembali
          </button>
        </div>
      </>
    );
  };

  const DeleteConfirm = () => {
    return (
      <>
        <h2 className="text-error">Apakah anda yakin untuk menghapus user admin ini?</h2>
        <div className="modal-action">
          <button
            type="button"
            onClick={() => {
              setDeleteConfirm(false);
              document.getElementById('modal-detail').close();
              onConfirmDelete();
            }}
            className="btn btn-sm rounded-full capitalize btn-error"
          >
            Iya
          </button>
          <button type="button" onClick={setDeleteConfirm.bind(null, false)} className="btn btn-sm rounded-full capitalize btn-outline">
            Tidak
          </button>
        </div>
      </>
    );
  };

  return (
    <dialog id="modal-detail" className="modal">
      <form onSubmit={onSubmit} method="dialog" className={`modal-box relative ${formOpen ? 'max-w-xl' : undefined}`}>
        {data != null && isLoaded ? (
          formOpen ? (
            UpdateForm()
          ) : deleteConfirm ? (
            DeleteConfirm()
          ) : (
            <>
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                  {data.user.foto != null ? <img src={`${UserPhotoUrl}/${data.user.foto}`} className="w-14 h-14 border-2 rounded" alt="profil" /> : <DefaultUserPhoto size="3rem" isRoundedFull={false} className="rounded" />}
                  <div>
                    <h3 className="font-bold text-lg">{data.nama_lengkap}</h3>
                    <p className="text-sm text-black/30">
                      <span className="badge badge-ghost">{data.no_telepon}</span>
                    </p>
                  </div>
                </div>
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
                  <p className="font-medium">{data.jenis_kelamin == 'male' ? 'Laki-laki' : 'Perempuan'}</p>
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
              <hr className="my-3" />

              <div className="modal-action">
                <button type="button" onClick={setFormOpen.bind(null, true)} className="btn btn-sm btn-warning rounded-full capitalize">
                  Edit
                </button>
                <button type="button" onClick={setDeleteConfirm.bind(null, true)} className="btn btn-sm btn-error btn-outline rounded-full capitalize">
                  Hapus
                </button>
                <button
                  onClick={() => {
                    document.getElementById('modal-detail').close();
                  }}
                  className="btn btn-sm btn-square btn-neutral btn-outline rounded-full capitalize absolute top-5 right-5"
                >
                  <IoClose size="1.2rem" />
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
