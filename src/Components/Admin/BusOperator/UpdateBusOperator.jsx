import React, { useEffect, useState } from "react";
import apiUrl from "../../../constants/projectConstants";
import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Swal from "sweetalert2";

function UpdateBusOperator(props) {
  const id = sessionStorage.getItem("id");
  console.log("is", id);
  const [busOperatorEmail, setBusOperatorEmail] = useState();
  const [busOperatorName, setBusOperatorName] = useState();
  const [busOperatorMobile, setBusOperatorMobile] = useState();
  const [busType, setBusType] = useState();
  const [operatorid, setOperatorId] = useState();


  useEffect(() => {
    
    setBusOperatorName(props.updateData?.operatorName);
    setBusOperatorEmail(props.updateData?.operatorEmail);
    setBusOperatorMobile(props.updateData?.operatorMobile);

    
    
  }, [props.updateData?.busOperatorName, id]);
  
 

  const UpdateBusDetails = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjoyNjM4NTE4NTEsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI2MzIwNTMsImV4cCI6MTcwNTA1MTI1M30.K4nt0iYpXY20GD1iISxKJWqnhXFmfz1nGtYAtpM_xE8");
    
    var raw = JSON.stringify({
      "operatorName": busOperatorName,
      "operatorMobile": busOperatorMobile,
      "operatorEmail": busOperatorEmail,
      "admin_id": id
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(apiUrl+`api/bus/busOperator/${props.updateData.id}/update`, requestOptions)
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
                  Bus Operator Name
                </label>
                <div>
                  <input
                    value={busOperatorName}
                    onChange={(e) => setBusOperatorName(e.target.value)}
                    type=""
                    className="rounded border-2 h-[35px] px-1 w-full border-gray-400"
                  />
                </div>
              </div>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Seat Operator Email
                </label>
                <div>
                  <input
                    value={busOperatorEmail}
                    onChange={(e) => setBusOperatorEmail(e.target.value)}
                    type=""
                    className="rounded border-2 h-[35px] px-1 w-full border-gray-400"
                  />
                </div>
              </div>
              <div className="grid w-full">
                <label className="text-gray-700 mb-1 font-bold mt-2">
                  Bus Operator Mobile
                </label>
                <div>
                  <input
                    value={busOperatorMobile}
                    onChange={(e) => setBusOperatorMobile(e.target.value)}
                    type=""
                    className="rounded border-2 h-[35px] px-1 w-full border-gray-400"
                  />
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

export default UpdateBusOperator;
