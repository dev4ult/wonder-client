import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProvinces, getCities, reset } from '../features/region/regionSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import InputGroup from '../components/InputGroup';
import SelectGroup from '../components/SelectGroup';
import DragNDropFIle from '../components/DragNDropFile';

function PostNewTravelSpot() {
  const { provinces, cities, isSuccessfull } = useSelector((state) => state.region);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    province: '',
    city: '',
    description: '',
    facilities: '',
  });

  useEffect(() => {
    dispatch(getProvinces());

    dispatch(reset());
  }, []);

  function provinceSelected(e) {
    const { value: provinceId } = e.target;
    const provinceName = document.querySelector(`option[value="${provinceId}"]`).textContent;

    setForm((prev) => ({
      ...prev,
      province: provinceName,
    }));

    dispatch(getCities(provinceId));

    dispatch(reset());
  }

  function citySelected(e) {
    const { value: cityId } = e.target;
    const cityName = document.querySelector(`option[value="${cityId}"]`).textContent;

    setForm((prev) => ({
      ...prev,
      city: cityName,
    }));
  }

  function changeInputText(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

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
          <InputGroup label="Nama Objek Wisata" name="name" placeholder="Hutan Durian Runtuh" onChange={changeInputText} />
          <SelectGroup label="Provinsi" name="province" optionList={provinces} onChange={provinceSelected} />
          <InputGroup label="Deskripsi" name="description" placeholder="Tempatnya sangat sejuk..." isTextArea={true} onChange={changeInputText} />
          <InputGroup label="Alamat Lengkap" name="full-address" placeholder="Jalan Kampung Durian Runtuh..." isTextArea={true} onChange={changeInputText} />
          <SelectGroup label="Kabupaten / Kota" name="city" optionList={cities} onChange={citySelected} />
          <InputGroup label="Fasilitas" name="facilities" placeholder="Kamar mandi 4x, ..." onChange={changeInputText} />
          <button type="submit" className="btn btn-primary rounded-full capitalize text-base col-span-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PostNewTravelSpot;
