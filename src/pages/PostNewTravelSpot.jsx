import NavbarStick from '../components/NavbarStick';
import InputGroup from '../components/InputGroup';
import SelectGroup from '../components/SelectGroup';
import DragNDropFIle from '../components/DragNDropFile';

function PostNewTravelSpot() {
  return (
    <>
      <NavbarStick />
      <div className="my-7">
        <form action="/" method="post" className="grid grid-flow-row grid-cols-2 gap-5 p-7 mx-7 border-2 hover:shadow">
          <div className="col-span-2">
            <h2 className="font-bold text-2xl">Objek Wisata Baru</h2>
            <p className="col-span-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facilis?</p>
          </div>
          <div className="col-span-2">
            <DragNDropFIle label="Foto / Gambar" name="photos" />
          </div>
          <InputGroup label="Nama Objek Wisata" name="place-name" />
          <SelectGroup label="Provinsi" name="province" options={[{ value: 'test', output: 'test' }]} />
          <InputGroup label="Deskripsi" name="description" isTextArea={true} />
          <InputGroup label="Alamat Lengkap" name="full-address" isTextArea={true} />
          <SelectGroup label="Kabupaten / Kota" name="city" options={[{ value: 'test', output: 'test' }]} />
          <InputGroup label="Fasilitas" name="facility" />
          <button type="submit" className="btn btn-primary rounded-full capitalize text-base col-span-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PostNewTravelSpot;
