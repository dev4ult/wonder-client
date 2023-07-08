import { useState } from 'react';
import { BiSolidDashboard, BiSolidUser } from 'react-icons/bi';
import { HiMenuAlt2 } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdArticle } from 'react-icons/md';

import AsideNavList from './AsideNavList';

function AsideNavbar() {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="fixed bottom-10 right-10">
      <div className="rounded border-2">
        <AsideNavList name="Dashboard" isOpen={open} linkTo="/dashboard">
          <BiSolidDashboard size="1.5rem" />
        </AsideNavList>
        <AsideNavList name="Kelola User" isOpen={open} linkTo="/manage_user">
          <BiSolidUser size="1.5rem" />
        </AsideNavList>
        <AsideNavList name="Kelola Artikel" isOpen={open} linkTo="/manage_article">
          <MdArticle size="1.5rem" />
        </AsideNavList>
        <div className={`${open ? 'bg-black/80' : 'bg-white'} border-t-2 p-3 cursor-pointer relative z-10`} onClick={toggleOpen}>
          <HiMenuAlt2 size="1.5rem" className={`text-black ${open ? 'hidden' : ''}`} />
          <IoMdClose size="1.5rem" className={`text-white flex gap-2 ${open ? '' : 'hidden'}`} />
        </div>
      </div>
    </div>
  );
}

export default AsideNavbar;
