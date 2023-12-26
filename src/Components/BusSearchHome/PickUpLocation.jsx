import { useEffect, useState } from "react";

const PickUpLocation = ({ error,selectedLocation,   onLocationChange }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (selectedLocation) {
      setSearchValue(selectedLocation);
    }
  }, [selectedLocation]);

  const handleOptionClick = (item) => {
    setSearchValue(item.name);
    onLocationChange(item); 
  };

  

  return (
    <>
      <div className="searchMenu-loc js-form-dd js-liverSearch border-r-2 border-gray-300 w-[10rem]">
       
          <h4 className={`text-15 font-[500] ls-2 ${error&&`text-red-600 font-bold`}`}>Pick up location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16 ">
            <input
              autoComplete="off"
              type="search"
              placeholder="City or Airport"
              className=" border-none p-0 pt-2 focus:ring-0 w-[9.5rem] text-sm"
              value={searchValue}
              onChange={(e) =>  handleOptionClick(e.target.value)}
            />
          </div>
        </div>

    
    </>
  );
};

export default PickUpLocation;
