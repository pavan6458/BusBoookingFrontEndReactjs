import React, { useEffect, useState } from "react";

const DateSearch = (props) => {
  const [date, setDate] = useState(
    props.onDateChange ? new Date(props.onDateChange) : new Date()
  );


  useEffect(() => {
    const timestamp = new Date(date).getTime();
    props.setDate(timestamp);
  }, []);

  
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const timestamp = new Date(selectedDate).getTime();
    setDate(new Date(selectedDate));
    props.setDate(timestamp);
  };
 

  return (
    <div className="searchMenu-loc js-form-dd js-liverSearch border-r-2 w-[10rem] ml-10">
      <h4 className="text-15 font-bold ls-2 w-fit">Travel Date</h4>
      <div className="text-15 text-light-1 ls-2 lh-16 w-fit">
        <input
          type="date"
          value={date.toISOString().split("T")[0]} // Format the date for the input
          onChange={handleDateChange}
          className="js-search js-dd-focus border-none p-0 pt-2 focus:ring-0 w-[7rem] text-sm"
        />
      </div>
    </div>
  );
};

export default DateSearch;
