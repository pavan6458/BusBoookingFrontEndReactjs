import { useEffect, useState } from "react";

const PickUpLocation = ({error,dropLocationmethod,onDropChange}) => {
 const [dropLocation,setDropLocation]=useState();


  useEffect(() => {
    if (dropLocationmethod) {
      setDropLocation(dropLocationmethod);
    }
  }, [dropLocation]);


  const handleOptionClick = (item) => {
    setDropLocation(item.name);
    onDropChange(item); 
  };

  return (
    <>
      <div className="searchMenu-loc js-form-dd js-liverSearch border-r-2 border-gray-300 ml-10 w-[10rem] z-5">
      
          <h4 className={`text-15 font-[500] ls-2 ${error && `text-red-500 font-bold`}`}>Drop off location</h4>
          <div className="text-15 text-light-1 ls-2 lh-16 ">
            <input
              autoComplete="off"
              type="search"
              placeholder="City or Airport"
              className="js-search js-dd-focus border-none p-0 pt-2 focus:ring-0 w-[9.5rem] text-sm"
              value={dropLocation}
              onChange={(e) =>  handleOptionClick(e.target.value)}
            />
          </div>
        </div>

       
     
    </>
  );
};

export default PickUpLocation;
