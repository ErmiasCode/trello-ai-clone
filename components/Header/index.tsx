"use client"

import { useBoardStore } from "@/store/BoardStore";

import Image from "next/image";
import Avatar from "react-avatar";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Header = () => {
  const [searchString, setSearchString] = useBoardStore((state) => [
    state.searchString,
    state.setSearchString,
  ]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/5 mb-16">

        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-black to-white rounded-md filter blur-3xl opacity-50 -z-50" />

        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Trello-logo-blue.svg/2560px-Trello-logo-blue.svg.png"
          alt="Trello Logo"
          width={200}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/*Search Bar*/}
          <form className="flex flex-1 items-center space-x-2 bg-white rounded-md p-2 py-1 shadow-md md:flex-initial">
            <MagnifyingGlassIcon className="h-5 w-6 text-gray-400" />
            <input
              className="flex-1 p-2 bg-transparent outline-none"
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" className="hidden">
              Search
            </button>
          </form>

          {/*User Avatar*/}
          <Avatar name="Ermias Code" size="40" round={true} color="#085DD7" />
        </div>
      </div>
        
        {/*User Info*/}
      {/* <div className="flex items-center justify-center py-2 px-5 mc:py-5">
        <p className="flex items-center text-[#085DD7] font-light text-sm p-3 shadow-xl rounded-xl w-fit bg-white max-w-3xl">
          <UserCircleIcon className="inline-block h-10 w-10 text-[#085DD7] mr-1" />
          Ermias Code
        </p>
      </div> */}
    </header>
  );
};

export default Header;
