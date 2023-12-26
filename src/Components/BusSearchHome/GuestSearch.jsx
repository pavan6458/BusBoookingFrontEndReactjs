import { useState } from "react";

const GuestSearch = ({onchangeNo,setNoOfPassangers}) => {
  const [searchValue, setSearchValue] = useState(onchangeNo==undefined ? undefined : onchangeNo);
  
  const handelchange = (value) =>{
    setSearchValue(value);
    setNoOfPassangers(value)

  }
  



  return (
    <>
      <div className="searchMenu-loc js-form-dd js-liverSearch  border-gray-300 w-[15rem] px-10">
     
          <h4 className="text-15 font-bold ls-2 ">Passenger (optional)</h4>
          <div className="text-15 text-light-1 ls-2 lh-16 ">
            <input
              autoComplete="off"
              type="search"
              placeholder="No of passengers"
              className="js-search js-dd-focus border-none p-0 pt-2 focus:ring-0 w-[9.5rem] text-sm"
              value={searchValue}
              onChange={(e) => handelchange(e.target.value)}
            />
          </div>
        </div>

     
      
    </>
  );
};

export default GuestSearch;
