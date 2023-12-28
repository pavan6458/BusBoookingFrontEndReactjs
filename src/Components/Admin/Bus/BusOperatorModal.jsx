import React, { useEffect, useState } from 'react'
import apiUrl from '../../../constants/projectConstants';
import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

function BusOperatorModal(props) {
    const [data,setdata]=useState();

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

    useEffect(()=>{
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjo2NzQ2MzM3ODQsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI1ODk0NzEsImV4cCI6MTcwNTAwODY3MX0.lPNj4sDj3_oLsQL9KwvYo7rPp1MWZGl1kS_rMSdA1Cg");
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch(apiUrl+`api/bus/busOperator/${props.operatorId}`, requestOptions)
          .then(response => response.json())
          .then(result =>{ setdata(result.Response)
        console.log("ress",result);
        })
          .catch(error => console.log('error', error));
    },[props.operatorId])

  return (
    <div>
 <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={props.open}
            onClose={props.handleClose}
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
            Bus Operator Details
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
               <div>
                <label>Operator Name :- </label>
                <label>{data?.operatorName}</label>
               </div>
               <div>
                <label>Operator Email :- </label>
                <label>{data?.operatorEmail}</label>
               </div>
               <div>
                <label>Operator mobile :- </label>
                <label>{data?.operatorMobile}</label>
               </div>
               <div>
             
               </div>
              </Typography>
            </Box>
          </Fade>
        </Modal>
    </div>
  )
}

export default BusOperatorModal