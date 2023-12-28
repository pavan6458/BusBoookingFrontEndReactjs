import React from "react";
import { Box, Fade, Modal, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

function ViewBus(props) {
  const modalData = props.modalData;
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
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Bus Details
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              <div>
                <div className="flex my-2 px-4">
                  <div>
                    <p className="text-sm font-bold">
                      {modalData?.bus.busName}
                    </p>
                    <p className="text-sm">VE A/C SEATER / SLEEPER (2+2)</p>
                  </div>
                </div>
                <div className="flex w-full my-3 px-4">
                  <div className="flex justify-between w-full mr-3 items-center">
                    <div>
                      <p className="text-sm my-0 py-0 leading-[-10]">
                        {modalData?.arrivalTime.date}
                      </p>
                      <p className="text-sm font-bold my-0 py-0 leading-[-10]">
                        {modalData?.arrivalTime.time}
                      </p>
                      <p className="text-sm my-0 py-0 leading-[-10]">
                        {modalData?.origin}
                      </p>
                    </div>
                    <div className="text-sm bg-gray-200 h-fit mr-[5%]">
                      {modalData?.duration}
                    </div>
                    <div>
                      <p className="text-sm my-0 py-0 leading-[-10]">
                        {modalData?.departureTime.date}
                      </p>
                      <p className="text-sm font-bold my-0 py-0 leading-[-10]">
                        {modalData?.departureTime.time}
                      </p>
                      <p className="text-sm my-0 py-0 leading-[-10]">
                        {modalData?.destination}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default ViewBus;
