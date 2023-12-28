import React, { useEffect, useState } from "react";
import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import apiUrl from "../../../constants/projectConstants";
import Swal from "sweetalert2";
function CreateScheduleModal(props) {
  const [busList, setBusList] = useState([]);
  const id = sessionStorage.getItem("id");
  const [busId, setBusId] = useState();
  const [arrivalDate, setArrivalDate] = useState();
  const [DepartureDate, setDepartureDate] = useState();
  const [price, setPrice] = useState();
  const [distance, setDistance] = useState();
  const [origin, setOrigin] = useState();
  const [destination, setDestination] = useState();
  const [duration, setDuraion] = useState();

  console.log(duration);

  const createScheduleApi = () => {
    calculateduration();
    if(distance!=null)
    {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjoyNjM4NTE4NTEsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI2MzIwNTMsImV4cCI6MTcwNTA1MTI1M30.K4nt0iYpXY20GD1iISxKJWqnhXFmfz1nGtYAtpM_xE8"
      );
  
      var raw = JSON.stringify({
        arrivalTime: arrivalDate,
        departureTime: DepartureDate,
        price: price,
        duration: duration,
        origin: origin,
        destination: destination,
        distance: distance,
        busId: busId,
        adminId: id,
      });
  
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      fetch(apiUrl+"api/bus/scheudle/create", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if ((result.StatusCode = "CREATED")) {
            props.handleClose();
            Swal.fire({
              title: "Scheduled Seccessfully",
              text: "Bus Scheduled Seccessfully",
              icon: "success",
            });
          }
        })
        .catch((error) => console.log("error", error));
    }
    else
    calculateduration()
    
  };

  const calculateduration = () => {
    var timestamp1 = new Date(DepartureDate);
    var timestamp2 = new Date(arrivalDate);
    var timeDifferenceMs = timestamp1 - timestamp2;
    var minutes = Math.floor((timeDifferenceMs / (1000 * 60)) % 60);
    var hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    setDuraion(hours + "hrs " + minutes + "min");
  };

  useEffect(() => {
    getAllBuses();
  }, []);
  console.log("DepartureDate", DepartureDate);
  const getAllBuses = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjoyNjM4NTE4NTEsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI2MzIwNTMsImV4cCI6MTcwNTA1MTI1M30.K4nt0iYpXY20GD1iISxKJWqnhXFmfz1nGtYAtpM_xE8"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiUrl + `api/bus/All/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setBusList(result.Response);
      })
      .catch((error) => console.log("error", error));
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={props.open}
          //   onClose={props.handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={props.open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Create Schedule
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <div>
                  <div className="grid">
                    <label className="text-gray-700 mb-1 font-bold">
                      Select Bus
                    </label>
                    <div>
                      <select
                        className="w-[80%] rounded border-gray-400 h-[35px] py-1"
                        onChange={(e) => setBusId(e.target.value)}
                      >
                        <option>option</option>
                        {busList.map((items) => (
                          <option value={items.id}>{items.busName}</option>
                        ))}
                      </select>
                      <button className="w-fit rounded bg-blue-500 px-2 text-[18px] py-1 ml-1 h-[35px] border-gray-400  text-white">
                        view
                      </button>
                    </div>
                    <div className="grid w-full">
                      <label className="text-gray-700 mb-1 font-bold mt-2">
                        Origin
                      </label>
                      <div>
                        <input
                          onChange={(e) => setOrigin(e.target.value)}
                          type=""
                          className="rounded border-2 h-[35px] w-full border-gray-400"
                        />
                      </div>
                    </div>
                    <div className="grid w-full">
                      <label className="text-gray-700 mb-1 font-bold mt-2">
                        Destination
                      </label>
                      <div>
                        <input
                          type=""
                          onChange={(e) => setDestination(e.target.value)}
                          className="rounded border-2 h-[35px] w-full border-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid w-full">
                    <label className="text-gray-700 mb-1 font-bold mt-2">
                      Arrival Time
                    </label>
                    <div>
                      <input
                        type="datetime-local"
                        onChange={(e) => setArrivalDate(e.target.value)}
                        className="rounded border-2 h-[35px] w-full border-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid w-full">
                    <label className="text-gray-700 mb-1 font-bold mt-2">
                      Departure Time
                    </label>
                    <div>
                      <input
                        onChange={(e) => setDepartureDate(e.target.value)}
                        type="datetime-local"
                        className="rounded border-2 h-[35px] w-full border-gray-400"
                      />
                    </div>
                    <div className="grid w-full">
                      <label className="text-gray-700 mb-1 font-bold mt-2">
                        Price
                      </label>
                      <div>
                        <input
                          onChange={(e) => setPrice(e.target.value)}
                          type=""
                          className="rounded border-2 h-[35px] w-full border-gray-400"
                        />
                      </div>
                    </div>
                    <div className="grid w-full">
                      <label className="text-gray-700 mb-1 font-bold mt-2">
                        Distance
                      </label>
                      <div>
                        <input
                          type=""
                          onChange={(e) => setDistance(e.target.value)}
                          className="rounded border-2 h-[35px] w-full border-gray-400"
                        />
                      </div>
                    </div>
                    <button
                      onClick={createScheduleApi}
                      className="w-full bg-blue-500 mt-3 border-gray-500 border-1 h-[30px] rounded text-white font-bold text-[18px]"
                    >
                      {" "}
                      create
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default CreateScheduleModal;
