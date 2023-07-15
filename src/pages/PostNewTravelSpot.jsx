import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getProvinces, getCities, reset } from '../features/region/regionSlice';
import { addTravelSpot, reset as resetTravelspot } from '../features/travelspot/travelSpotSlice';

import NavbarStick from '../components/navbar/NavbarStick';
import InputGroup from '../components/InputGroup';
import SelectGroup from '../components/SelectGroup';
import DragNDropFIle from '../components/DragNDropFile';
import MarkdownEditor from '../components/MarkdownEditor';
import GoBackLink from '../components/GoBackLink';

function PostNewTravelSpot() {
  const { errorMessages, isError, isSuccessfull, message } = useSelector((state) => state.travelspot);
  const { provinces, cities } = useSelector((state) => state.region);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    content: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni minima velit eaque commodi labore temporibus. Quibusdam obcaecati, soluta tempora, ipsam laboriosam modi, reiciendis et repudiandae ratione doloribus quisquam voluptatum nesciunt. Quaerat sunt excepturi odit perspiciatis inventore officiis pariatur nam magni. Libero ducimus voluptatem sint placeat, eaque blanditiis id quidem velit!\n\n### Sub Judul 1\nLorem ipsum dolor sit amet consectetur adipisicing elit. Odit similique quasi aliquid quia sed error dignissimos, hic commodi perspiciatis assumenda dicta culpa velit nulla suscipit distinctio praesentium nostrum sint doloremque eveniet, molestias non. Quis, tempore quisquam magni accusantium voluptatem porro tenetur, dicta doloribus temporibus culpa hic quidem sit a eaque quas ad maiores! Saepe labore impedit soluta? Hic incidunt eaque accusamus ut maxime dolor nesciunt ad minus facilis nam laborum, cumque tenetur ipsam ducimus tempore esse? Impedit maxime temporibus odio commodi sint quia id quo iusto perspiciatis repellat dolores ad, cumque est porro reiciendis incidunt. Totam ipsam impedit sunt recusandae.\n\n### Sub Judul 2\nLorem ipsum dolor sit amet consectetur adipisicing elit. Odit similique quasi aliquid quia sed error dignissimos, hic commodi perspiciatis assumenda dicta culpa velit nulla suscipit distinctio praesentium nostrum sint doloremque eveniet, molestias non. Quis, tempore quisquam magni accusantium voluptatem porro tenetur, dicta doloribus temporibus culpa hic quidem sit a eaque quas ad maiores! Saepe labore impedit soluta? Hic incidunt eaque accusamus ut maxime dolor nesciunt ad minus facilis nam laborum.`,
  });

  useEffect(() => {
    dispatch(getProvinces());

    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isError && errorMessages.length != 0) {
      errorMessages.forEach((message) => toast.error(message));
    }
  }, [isError, errorMessages]);

  useEffect(() => {
    if (isSuccessfull && message != '') {
      toast.success(message);

      navigate('/manage_travelspot');

      dispatch(resetTravelspot());
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

    const { w_token_id: token_id } = user;
    dispatch(addTravelSpot({ form, token_id }));
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
    return form.photos.map((photo, index) => <img key={index} src={URL.createObjectURL(photo)} className="w-52 h-40 bg-cover" alt="gambar" />);
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
            <DragNDropFIle label="Foto / Gambar" name="photo" isMultiple onChange={onFileChange} required />
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
                content: e,
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
