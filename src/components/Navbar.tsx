import { Icon } from "@iconify/react";
import LogoApp from '@/assets/images/logo.png';

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md flex items-center max-lg:justify-between lg:justify-end">
      <div className="px-2 justify-center items-center gap-4 max-lg:flex lg:hidden">
        <img src={LogoApp} alt="Logo" className="w-10 h-auto" />
        <div className="h-6 border border-solid border-gray-500 my-2.5"></div>
        <h2 className="font-bold">Data Populasi</h2>
      </div>
      <div className="py-4 flex gap-2 pr-4">
        <div className="w-6 h-6 bg-greenme rounded-full text-center">
          <Icon icon="ic:baseline-person" className="text-white mx-auto mt-[3px]"/>
        </div>
        <span>Malwa Auliya</span>
      </div>
    </nav>
  );
}

export default Navbar