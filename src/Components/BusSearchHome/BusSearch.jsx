import React, { useState } from "react";
import DateSearch from "./DateSearch.jsx";
import GuestSearch from "./GuestSearch.jsx";
import PickUpLocation from "./PickUpLocation.jsx";
import DropOffLocation from "./DropOffLocation.jsx";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function BusSearch() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationError, setSelectedLocationError] = useState(null);
  const [dropLocation, setDropLocation] = useState(null);
  const [dropLocationError, setDropLocationError] = useState(null);
  const [NoOfPassangers,setNoOfPassangers]=useState();

  const [date, setDate] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const handelpickupChange = (data) => {
    setSelectedLocation(data);
    setSelectedLocationError(false);
  };

  const handelDropOffChange = (data) => {
    setDropLocation(data);
    setDropLocationError(false);
  };

  const checkBlanks = () => {
    let isBoolian = true;
    if (selectedLocation == null || selectedLocation == "") {
      isBoolian = false;
      setSelectedLocationError(true);
      handleShow();
    } else if (dropLocation == null || dropLocation == "") {
      isBoolian = false;
      setDropLocationError(true);
      handleShow();
    }

    return isBoolian;
  };

  const navigateToSeatch = () => {
    console.log("checkBlanks", checkBlanks);
    if (checkBlanks()) {
      console.log("hello ");
      navigate("/busearch", {
        state: { selectedLocation, dropLocation, date ,NoOfPassangers},
      });
    }
  };
  return (
    <div className="flex justify-center mt-[4%]">
      <div className="  bg-white w-fit  rounded shadow border-2">
        <div className="flex items-center p-4">
          <PickUpLocation
            error={selectedLocationError}
            selectedLocation={selectedLocation}
            onLocationChange={handelpickupChange}
          />

          <DropOffLocation
            error={dropLocationError}
            dropLocationmethod={dropLocation}
            onDropChange={handelDropOffChange}
          />

          <DateSearch onDateChange={date} setDate={setDate} />
          <GuestSearch onchangeNo = {NoOfPassangers} setNoOfPassangers={setNoOfPassangers}/>

          <div className="button-item">
            <button
              onClick={(e) => {
                e.preventDefault();
                navigateToSeatch();
              }}
              className="mainSearch__submit button  flex py-3 col-12 rounded font-bold px-10 border-l bg-gray-950 -blue-1 text-white"
            >
              <FaSearch className="mt-0.5 mr-3" />
              <p>Search</p>
            </button>
          </div>
          {/* End search button_item */}
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4 className="font-bold ">Fill Feilds</h4>
          <p>Please Fill All The Feilds</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BusSearch;
