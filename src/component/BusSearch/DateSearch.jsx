import React, { useState } from "react";
import DatePicker, { DateObject } from "react-multi-date-picker";

const DateSearch = () => {
  // const [dates, setDates] = useState([
  //   new DateObject({ year: 2023, month: 1, day: 22 }),
  //   "December 09 2020",
  //   1597994736000, //unix time in milliseconds (August 21 2020)
  // ]);
  const [dates, setDates] = useState([
    new DateObject().setDay(5),
    new DateObject().setDay(14).add(1, "month"),
  ]);

  return (
    <div className="searchMenu-loc js-form-dd js-liverSearch border-r-2 w-[10rem] ml-10">
   
          <h4 className="text-15 font-bold ls-2 w-fit">Travel Date</h4>
          <div className="text-15 text-light-1 ls-2 lh-16 w-fit">
            <input
              autoComplete="off"
              type="date"
              className="js-search js-dd-focus border-none p-0 pt-2 focus:ring-0 w-[7rem] text-sm"
            
            />
          </div>
        </div>
      

  );
};

export default DateSearch;
