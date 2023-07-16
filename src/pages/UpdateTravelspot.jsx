import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProvinces, getCities, reset as resetRegionState } from '../features/region/regionSlice';
import { updateTravelSpot, getTravelSpotDetailAdmin, reset as resetTravelspotState } from '../features/travelspot/travelSpotSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import InputGroup from '../components/InputGroup';
import SelectGroup from '../components/SelectGroup';
import DragNDropFIle from '../components/DragNDropFile';
import MarkdownEditor from '../components/MarkdownEditor';
import GoBackLink from '../components/GoBackLink';

const PostPictureUrl = import.meta.env.VITE_POSTPICTUREURL;

function PostNewTravelSpot() {
  const { travelSpot, errorMessages, isError, isSuccessfull, message } = useSelector((state) => state.travelspot);
  const { provinces, cities, isSuccessfull: getRegionSuccess } = useSelector((state) => state.region);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: travelspot_id } = useParams();

  const [form, setForm] = useState({
    photos: [],
    name: '',
    address: '',
    province: '',
    city: '',
    description: '',
    facilities: '',
    provinceId: '',
    cityId: '',
    country: '',
    scope: '',
    content: '',
  });

  useEffect(() => {
    const token_id = user.w_token_id;

    dispatch(getProvinces());
    dispatch(getTravelSpotDetailAdmin({ travelspot_id, token_id }));

    dispatch(resetRegionState());
    // dispatch(resetTravelspotState());
  }, []);

  useEffect(() => {
    if (isSuccessfull && travelSpot != null) {
      const { foto, nama, alamat_lengkap, provinsi, kab_kota, deskripsi, fasilitas, negara, lingkup, konten_blog } = travelSpot;

      let photos = [];
      if (foto[0] != '') {
        for (let i = 0; i < foto.length; i++) {
          photos.push(foto[i]);
        }
      }

      let facilities = '';
      for (let i = 0; i < fasilitas.length; i++) {
        facilities += fasilitas[i] + (i == fasilitas.length ? ',' : '');
      }

      setForm((prev) => ({
        ...prev,
        photos,
        name: nama,
        address: alamat_lengkap,
        province: provinsi,
        city: kab_kota,
        description: deskripsi,
        facilities,
        country: negara,
        scope: lingkup,
        content: konten_blog,
      }));
    }
  }, [travelSpot, isSuccessfull]);

  useEffect(() => {
    if (provinces.length != 0 && getRegionSuccess && travelSpot != null) {
      const { provinsi } = travelSpot;
      const indexOfProvince = provinces.findIndex((item) => item.name == provinsi.toUpperCase());
      const provinceId = provinces[indexOfProvince].id;

      setForm((prev) => ({
        ...prev,
        provinceId,
      }));

      dispatch(getCities(provinceId));

      dispatch(resetRegionState());
    }
  }, [provinces, getRegionSuccess, travelSpot]);

  useEffect(() => {
    if (cities.length != 0 && travelSpot != null && getRegionSuccess) {
      const { kab_kota } = travelSpot;
      const indexOfCity = cities.findIndex((item) => item.name == kab_kota);

      if (indexOfCity != -1) {
        setForm((prev) => ({
          ...prev,
          cityId: cities[indexOfCity].id,
        }));
      }
    }
  }, [cities, travelSpot, getRegionSuccess]);

  useEffect(() => {
    if (isError) {
      if (errorMessages.length != 0) {
        errorMessages.forEach((message) => toast.error(message));
      }

      if (message != '') {
        toast.error(message);
      }
    }
  }, [isError, errorMessages]);

  useEffect(() => {
    if (isSuccessfull && message != '') {
      toast.success(message);

      const token_id = user.w_token_id;

      dispatch(getTravelSpotDetailAdmin({ travelspot_id, token_id }));
      dispatch(resetTravelspotState());
    }
  }, [isSuccessfull, message]);

  function onProvinceSelect(e) {
    const { value: provinceId } = e.target;
    const provinceName = document.querySelector(`option[value="${provinceId}"]`).textContent;

    setForm((prev) => ({
      ...prev,
      province: provinceName,
      provinceId,
    }));

    dispatch(getCities(provinceId));

    dispatch(resetRegionState());
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

  function onScopeSelect(e) {
    const { value: scope } = e.target;

    setForm((prev) => ({
      ...prev,
      scope,
      country: scope == 'nasional' ? 'Indonesia' : prev.country,
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

    dispatch(updateTravelSpot({ form, travelspot_id, token_id: user.w_token_id }));
  }

  function onFileChange(files) {
    setForm((prev) => {
      const newPhotos = [];

      for (let i = 0; i < files.length; i++) {
        newPhotos.push(files[i]);
      }

      return { ...prev, photos: newPhotos };
    });
  }

  const PreviewImages = () => {
    return form.photos.map((photo, index) => <img key={index} src={typeof photo == 'string' ? `${PostPictureUrl}/${photo}` : URL.createObjectURL(photo)} className="w-52 h-40 bg-cover" alt="gambar" />);
  };

  const { photos, name, address, description, facilities, provinceId, cityId, country, scope, content } = form;

  return (
    <>
      <NavbarStick />
      <div className="my-7">
        <GoBackLink to="/manage_travelspot" />
        <form onSubmit={onSubmitForm} className="grid grid-flow-row grid-cols-2 gap-5 p-7 border-2 mt-3">
          <div className="col-span-2">
            <h2 className="font-bold text-2xl">Objek Wisata Baru</h2>
            <p className="col-span-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, facilis?</p>
          </div>
          <div className="col-span-2">
            {photos.length != 0 && (
              <>
                <h3 className="text-center mb-2 text-black/30 text-sm">Image Preview</h3>
                <div className="flex flex-wrap gap-3 justify-center">{PreviewImages()}</div>
              </>
            )}
            <DragNDropFIle label="Foto / Gambar" name="photo" isMultiple onChange={onFileChange} />
          </div>
          <InputGroup label="Nama Objek Wisata" name="name" placeholder="Hutan Durian Runtuh" onChange={onTextChange} value={name} />

          {/* Provinsi */}
          <SelectGroup label="Provinsi" name="province" optionList={provinces} onChange={onProvinceSelect} value={provinceId} />

          <InputGroup label="Deskripsi" name="description" placeholder="Tempatnya sangat sejuk..." isTextArea={true} onChange={onTextChange} value={description} />

          <InputGroup label="Alamat Lengkap" name="address" placeholder="Jalan Kampung Durian Runtuh..." isTextArea={true} onChange={onTextChange} value={address} />

          {/* Kabupaten atau Kota */}
          <SelectGroup label="Kabupaten / Kota" name="city" optionList={cities} onChange={onCitySelect} value={cityId} />

          <InputGroup label="Fasilitas" name="facilities" placeholder="Kamar mandi 4x, ..." onChange={onTextChange} value={facilities} />
          <SelectGroup
            label="Lingkup"
            name="scope"
            optionList={[
              { id: 'nasional', name: 'Lokal' },
              { id: 'internasional', name: 'Internasional' },
            ]}
            onChange={onScopeSelect}
            value={scope}
          />
          <InputGroup label="Negara" name="country" placeholder="Indonesia..." onChange={onTextChange} value={country} disabled={scope == 'nasional'} />
          <MarkdownEditor
            className="col-span-2"
            value={content}
            onChange={(e) => {
              setForm((prev) => ({
                ...prev,
                content: e.target.value,
              }));
            }}
            name="blog"
          />
          <button type="submit" className="btn btn-primary rounded-full capitalize text-base col-span-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default PostNewTravelSpot;
