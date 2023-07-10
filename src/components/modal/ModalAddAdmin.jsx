import InputGroup from '../InputGroup';
import SelectGroup from '../SelectGroup';
import DragNDropFIle from '../DragNDropFile';

function ModalAddAdmin({ form, setForm, onSubmit }) {
  const { fullname, gender, address, phone, nik, username, email, password, role } = form;

  function onChangeGroup(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onPhotoUpload(e) {
    console.log(e.target.files);
    setForm((prev) => ({
      ...prev,
      photo: e.target.files[0],
    }));
  }

  return (
    <dialog id="modal-add" className="modal">
      <form onSubmit={onSubmit} encType="multipart/form-data" method="dialog" className="modal-box max-w-xl">
        <h2 className="badge badge-neutral badge-md">Tambah Data Admin</h2>
        <div className="grid grid-flow-row grid-cols-2 gap-5 my-4">
          <div className="col-span-2">
            {/* <DragNDropFIle label="Foto Profil" name="photo" onChange={onPhotoUpload} /> */}
            <input type="file" name="photo" onChange={onPhotoUpload} />
          </div>
          <InputGroup label="Nama Lengkap" name="fullname" placeholder="Isi Nama Lengkap" value={fullname} onChange={onChangeGroup} />
          <InputGroup label="Nomor Telepon" name="phone" placeholder="Isi Nomor Telepon" value={phone} onChange={onChangeGroup} />
          <InputGroup label="NIK" name="nik" type="number" placeholder="Isi NIK" value={nik} onChange={onChangeGroup} />
          <SelectGroup
            label="Jenis Kelamin"
            name="gender"
            optionList={[
              { id: 'female', name: 'Perempuan' },
              { id: 'male', name: 'Laki-laki' },
            ]}
            value={gender}
            onChange={onChangeGroup}
          />
          <div className="col-span-2">
            <InputGroup label="Alamat" isTextArea={true} name="address" placeholder="Isi Alamat" value={address} onChange={onChangeGroup} />
          </div>
          <hr className="col-span-2" />
          <InputGroup label="Username" name="username" placeholder="Isi Username" value={username} onChange={onChangeGroup} />
          <InputGroup label="Email" type="email" name="email" placeholder="Isi Email" value={email} onChange={onChangeGroup} />
          <InputGroup label="Password" type="password" name="password" placeholder="Isi Password" value={password} onChange={onChangeGroup} />
          <SelectGroup
            label="Role"
            name="role"
            optionList={[
              { id: 'admin', name: 'Admin' },
              { id: 'superadmin', name: 'Superadmin' },
            ]}
            value={role}
            onChange={onChangeGroup}
          />
        </div>
        <div className="flex gap-2 justify-end">
          <button type="submit" className="btn btn-sm btn-success capitalize rounded-full">
            submit
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById('modal-add').close();
            }}
            className="btn btn-sm btn-neutral btn-outline capitalize rounded-full"
          >
            tutup
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default ModalAddAdmin;
