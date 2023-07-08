import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getProvinces, getCities, reset } from '../features/region/regionSlice';
import { newTravelSpot } from '../features/travelspot/travelSpotSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import InputGroup from '../components/InputGroup';
import SelectGroup from '../components/SelectGroup';
import DragNDropFIle from '../components/DragNDropFile';

function PostNewTravelSpot() {
  const { provinces, cities } = useSelector((state) => state.region);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    photos: null,
    name: '',
    address: '',
    province: '',
    city: '',
    description: '',
    facilities: '',
    provinceId: -1,
    citiesId: -1,
  });

  useEffect(() => {
    dispatch(getProvinces());

    dispatch(reset());
  }, []);

  function onProvinceSelect(e) {
    const { value: provinceId } = e.target;
    const provinceName = document.querySelector(`option[value="${provinceId}"]`).textContent;

    setForm((prev) => ({
      ...prev,
      province: provinceName,
      provinceId,
    }));

    dispatch(getCities(provinceId));

    dispatch(reset());
  }

  function onCitySelect(e) {
    const { value: cityId } = e.target;
    const cityName = document.querySelector(`option[value="${cityId}"]`).textContent;

    setForm((prev) => ({
      ...prev,
      city: cityName,
      cityId,
    }));
  }

  function onTextChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmitForm(e) {
    e.preventDefault();

    const { w_token_id: token_id } = user;
    dispatch(newTravelSpot({ form, token_id }));
  }

  function onFileChange(files) {
    setForm((prev) => ({
      ...prev,
      photos: files,
    }));
  }

  // useEffect(() => {
  //   if (form.photos) {
  //     console.log(form.photos[0].name);
  //   }
  // }, [form]);

  const { provinceId, cityId } = form;

  return (
    <>
      <NavbarStick />
      <div className="my-7">
        <form onSubmit={onSubmitForm} className="grid grid-flow-row grid-cols-2 gap-5 p-7 mx-7 border-2 hover:shadow">
          <div className="col-span-2">
            <h2 className="font-bold text-2xl">Objek Wisata Baru</h2>
            <p className="col-span-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facilis?</p>
          </div>
          <div className="col-span-2">
            <DragNDropFIle label="Foto / Gambar" name="photos" onChange={onFileChange} />
          </div>
          <InputGroup label="Nama Objek Wisata" name="name" placeholder="Hutan Durian Runtuh" onChange={onTextChange} />
          <SelectGroup label="Provinsi" name="province" optionList={provinces} onChange={onProvinceSelect} value={provinceId} />
          <InputGroup label="Deskripsi" name="description" placeholder="Tempatnya sangat sejuk..." isTextArea={true} onChange={onTextChange} />
          <InputGroup label="Alamat Lengkap" name="address" placeholder="Jalan Kampung Durian Runtuh..." isTextArea={true} onChange={onTextChange} />
          <SelectGroup label="Kabupaten / Kota" name="city" optionList={cities} onChange={onCitySelect} value={cityId} />
          <InputGroup label="Fasilitas" name="facilities" placeholder="Kamar mandi 4x, ..." onChange={onTextChange} />
          <button type="submit" className="btn btn-primary rounded-full capitalize text-base col-span-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PostNewTravelSpot;
