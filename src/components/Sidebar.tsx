import { Icon } from "@iconify/react";
import LogoApp from '@/assets/images/logo.png';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-full p-4 flex flex-col shadow-lg p4 z-11 fixed lg:block max-lg:hidden">
      <div className="flex justify-center items-center space-x-3 mb-6">
        <img src={LogoApp} alt="Logo" className="w-30 h-auto" />
      </div>
      <nav className="flex flex-col h-screen space-y-2 text-[16px]">
        <a href="/" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-200 rounded bg-blueme-300">
          <Icon icon="ic:outline-area-chart" />
          <span className="ml-3">Data Populasi</span>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar