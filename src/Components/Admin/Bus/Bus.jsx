import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import apiUrl from "../../../constants/projectConstants";
import { useNavigate } from "react-router-dom";
import CreateBusModal from "./CreateBusModal";
import BusOperatorModal from "./BusOperatorModal";
import UpdateBus from "./UpdateBus";
import Swal from "sweetalert2";

function Bus() {
  const [fetchedRows, setFetchedRows] = useState([]);
  const [page, setPage] = React.useState(0);
  const [ModalOpen,setModalOpen]=useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = React.useState(false);
  const [scheduleModal, setScheduleModal] = useState(false);
  const [OperatorId,setOperatorId]=useState("");
  const [updateData ,setUpdateData]=useState();
  const [updateModal , setUpdateModal]=useState();
  const navigate = useNavigate();
  const handleClose = () => {setOpen(false);
    setScheduleModal(false);
    setModalOpen(false)
    setUpdateModal(false);
    };

    const updateBusesList = () =>{
      getAllBuses();
    }
  useEffect(() => {
    getAllBuses();
  }, []);

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

    fetch(apiUrl + "api/bus/All/324814487", requestOptions)
      .then((response) => response.json())
      .then((result) => setFetchedRows(result.Response))
      .catch((error) => console.log("error", error));
  };

  const deleteBus = (id) =>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwYXZhbiBCYW5rIiwic3ViIjoiSldUIFRva2VuIiwidXNlcm5hbWUiOiJBQkMgQ29ycCIsImlkIjoyNjM4NTE4NTEsImF1dGhvcml0aWVzIjoiQWRtaW4iLCJpYXQiOjE3MDI2MzIwNTMsImV4cCI6MTcwNTA1MTI1M30.K4nt0iYpXY20GD1iISxKJWqnhXFmfz1nGtYAtpM_xE8");
    
    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(apiUrl+`api/bus/${id}/delete`, requestOptions)
      .then(response => response.json())
      .then(result => {console.log(result)
      if(result.status="OK")
      {
        getAllBuses();
        Swal.fire({
          icon: "success",
          text: "Bus Deleted Successfully",
        });
      }
      })
      .catch(error => console.log('error', error));
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <>
        <div className="flex justify-between items-center">
          <h1 className="font-bold  text-[30px] pl-4 py-3">Bus Details</h1>
          <button
            className="border-1 border-gray-600 bg-blue-500  rounded h-[30px] px-2 text-white active:bg-black mr-[20px] font-bold "
            onClick={() => setScheduleModal(true)}
          >
            Create Bus
          </button>
        </div>
        <div className="px-[70px]">
          <Paper>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead className="bg-gray-300">
                  <TableRow>
                    <TableCell>Bus Name</TableCell>
                    <TableCell align="right">totalSeats</TableCell>
                    <TableCell align="right">busType </TableCell>
                    <TableCell align="right">seatType </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                    <TableCell align="right"> </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="space-y-1">
                  {fetchedRows
                    .reverse()
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                    .map((row, index) => {
                    

                      return (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                         
                          <TableCell
                            className="py-3"
                            component="th"
                            scope="row"
                          >
                            {row.busName}
                          </TableCell>
                          <TableCell align="right">
                            {row.totalSeats}
                          </TableCell>
                          <TableCell align="right">
                            {row.busType}
                          </TableCell>
                          <TableCell align="right">
                            {row.seatType}{" "}
                     
                          </TableCell>
                          
                          
                          <TableCell align="right">
                            <button
                              className="w-full bg-blue-500 text-white  py-1 rounded font-bold active:bg-black active:text-white"
                             onClick={(e)=>{setOperatorId(row.busOperatorId)
                              setModalOpen(true)}}busOperatorId
                            >
                              Bus Operators
                            </button>
                          </TableCell>

                          <TableCell align="right">
                            <button
                              className="w-full bg-green-500 text-white  py-1 rounded font-bold active:bg-black active:text-white"
                             onClick={(e)=>{setUpdateData(row)
                              setUpdateModal(true)}}
                            >
                              Update
                            </button>
                          </TableCell>
                          <TableCell align="right">
                            <button
                              className="w-full bg-red-500 text-white  py-1 rounded font-bold active:bg-black active:text-white"
                             onClick={(e)=>{deleteBus(row.id)
                          }}
                            >
                              Delete
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={fetchedRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
     
        <CreateBusModal open={scheduleModal} handleClose={handleClose} create={updateBusesList}/>
        <BusOperatorModal  open={ModalOpen} handleClose={handleClose} operatorId ={OperatorId}/>
        <UpdateBus open={updateModal} handleClose={handleClose} updateData ={updateData} Update={updateBusesList}/>
      </>
    </div>
  );
}

export default Bus;
