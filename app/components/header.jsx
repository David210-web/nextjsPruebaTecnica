import Image, { StaticImageData } from "next/image";
import React from "react";


function Header({ Imagen }) {
  return (
    <div className="bg-slate-50 d-block">
      <Image src={Imagen} alt="Boxful Logo" width={130} height={40} className="mb-8" />
    </div>
  );
};

export default Header;
