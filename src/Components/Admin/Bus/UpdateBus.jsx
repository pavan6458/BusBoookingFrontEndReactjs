import React, { useEffect, useState } from "react";
import apiUrl from "../../../constants/projectConstants";
import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Swal from "sweetalert2";

function UpdateBus(props) {
  const id = sessionStorage.getItem("id");
  console.log("is", id);
  const [seatType, setSeatType] = useState();
  const [busname, setBusName] = useState();
  const [totalSeats, setTotalSeats] = useState();
  const [busType, setBusType] = useState();
  const [operatorid, setOperatorId] = useState();
  const [operatorList, setOperatorList] = useState([]);
  const [busId,setBusId]=useState();

  useEffect(() => {
    
    setBusName(props.updateData?.busName);
    setSeatType(props.updateData?.seatType);
    setTotalSeats(props.updateData?.totalSeats);
    setBusType(props.updateData?.busType);
    setOperatorId(props.updateData?.busOperatorId);
    setBusId()
    getBusOperatorsList();
    
  }, [props.updateData?.busName, id]);
  
  const getBusOperatorsList = ()=>{
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjo2NzQ2MzM3ODQsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI1ODk0NzEsImV4cCI6MTcwNTAwODY3MX0.lPNj4sDj3_oLsQL9KwvYo7rPp1MWZGl1kS_rMSdA1Cg"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(apiUrl + `api/bus/busOperator/All/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => setOperatorList(result.Response))
      .catch((error) => console.log("error", error));
  }

  const UpdateBusDetails = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjoyNjM4NTE4NTEsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI2MzIwNTMsImV4cCI6MTcwNTA1MTI1M30.K4nt0iYpXY20GD1iISxKJWqnhXFmfz1nGtYAtpM_xE8");
    
    var raw = JSON.stringify({
      "busName": busname,
      "totalSeats": totalSeats,
      "busType": busType,
      "seatType": seatType,
      "busOperator": operatorid,
      "adminID": id
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(apiUrl+`api/bus/${props.updateData.id}/update`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if(result.StatusCode=="OK"){
          Swal.fire({
            icon: "success",
            text: "Updated successfully",
          });
          props.Update();
          props.handleClose();
        }
      })
      .catch(error => console.log('error', error));
  }

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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Bus Operator Details
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Bus Name
                </label>
                <div>
                  <input
                    value={busname}
                    onChange={(e) => setBusName(e.target.value)}
                    type=""
                    className="rounded border-2 h-[35px] px-1 w-full border-gray-400"
                  />
                </div>
              </div>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Seat Type
                </label>
                <div>
                  <input
                    value={seatType}
                    onChange={(e) => setSeatType(e.target.value)}
                    type=""
                    className="rounded border-2 h-[35px] px-1 w-full border-gray-400"
                  />
                </div>
              </div>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Total seats
                </label>
                <div>
                  <input
                    value={totalSeats}
                    onChange={(e) => setTotalSeats(e.target.value)}
                    type=""
                    className="rounded border-2 h-[35px] px-1 w-full border-gray-400"
                  />
                </div>
              </div>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Bus Type
                </label>
                <div>
                  <select
                    value={busType}
                    className="w-full rounded border-gray-400 h-[35px] py-1"
                    onChange={(e) => setBusType(e.target.value)}
                  >
                    <option>option</option>

                    <option value="AC">AC</option>
                    <option value="NON-AC">NON-AC</option>
                  </select>
                </div>
              </div>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Bus Operator
                </label>
                <div>
                  <select
                    value={operatorid}
                    className="w-full rounded border-gray-400 h-[35px] py-1"
                    onChange={(e) => setOperatorId(e.target.value)}
                  >
                    <option>option</option>
                    {operatorList?.map((items) => {
                      console.log(items);
                      return (
                        <option value={items.id}>{items.operatorName}</option>
                      );
                    })}
                  </select>
                </div>
              </div>
            <div>
              <button className="bg-blue-500 rounded  w-full mt-3 h-[35px] text-white active:bg-black font-bold" onClick={UpdateBusDetails}>Update Bus Details</button>
            </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default UpdateBus;
