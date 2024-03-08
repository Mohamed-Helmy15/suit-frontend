import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Backdrop, Button, Fade, Modal, TextField } from "@mui/material";
import swal from "sweetalert";
const Types = () => {
  const [types, setTypes] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [id, setId] = useState("");
  const [render, setRender] = useState(false);
  const [open, setOpen] = useState(false);
  const [addType, setAddType] = useState("");
  const [editType, setEditType] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectionModelChange = (selectionModel) => {
    const selectedRowObjects = types.filter((row) =>
      selectionModel.includes(row.id)
    );
    setSelectedRows(selectedRowObjects);
    if (selectedRowObjects.length > 0) {
      setId(selectedRowObjects[0].id);
    }
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/types", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTypes(res.data.data))
      .catch((err) => console.log(err));
  }, [render]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "type",
      headerName: "Type Name",
      width: 150,
      editable: true,
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 250,
      editable: true,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 250,
      editable: true,
    },
  ];

  const handleDate = (inputDate) => {
    const date = new Date(inputDate);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedDate = `${month} ${day}, ${year} at ${hours}:${minutes}`;
    return formattedDate;
  };
  return (
    <div>
      <Navbar page="types" />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <TextField
          className="input"
          type="text"
          label="Add a new Type"
          variant="outlined"
          value={addType}
          onChange={(e) => setAddType(e.target.value)}
          style={{
            marginRight: "10px",
            width: "300px",
            backgroundColor: "white",
            borderRadius: "5px",
          }}
        />
        <Button
          style={{
            pointerEvents: addType === "" ? "none" : "auto",
          }}
          size="small"
          variant="contained"
          onClick={() => {
            axios
              .post(
                `http://127.0.0.1:8000/api/types`,
                { type: addType },
                {
                  headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                      "token"
                    )}`,
                  },
                }
              )
              .then((res) => {
                swal("The role has been deleted Successfully!").then(() => {
                  setRender(!render);
                  setAddType("");
                });
              })

              .catch((err) => {
                console.log(err);
                swal("!OOPS! something Went Wrong!", {
                  icon: "error",
                });
              });
          }}
        >
          Add
        </Button>
      </div>
      <div className="pageWrapper">
        <Box sx={{ height: 400, width: "100%", backgroundColor: "white" }}>
          <DataGrid
            rows={types.map((type) => {
              return {
                id: type.id,
                type: type.type,
                created_at: handleDate(type.created_at),
                updated_at: handleDate(type.updated_at),
              };
            })}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelectionModelChange}
          />
        </Box>
        {selectedRows.length > 0 ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              marginTop: "10px",
              flex: 1,
            }}
          >
            {selectedRows.length === 1 ? (
              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  handleOpen();
                }}
              >
                Edit
              </Button>
            ) : null}
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => {
                swal({
                  title: "Are you sure?",
                  text: "Once Deleted, you will not be able to recover your data!",
                  icon: "warning",
                  buttons: true,
                  dangerMode: true,
                }).then((willCancel) => {
                  if (willCancel) {
                    selectedRows.forEach((row) => {
                      axios
                        .delete(`http://127.0.0.1:8000/api/types/${row.id}`, {
                          headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(
                              "token"
                            )}`,
                          },
                        })
                        .then((res) => {
                          swal("The type has been deleted Successfully!").then(
                            () => {
                              setRender(!render);
                            }
                          );
                        })

                        .catch((err) => {
                          swal("!OOPS! something Went Wrong!", {
                            icon: "error",
                          });
                        });
                    });
                  } else {
                    swal("Your Data is safe!");
                  }
                });
              }}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <div
            style={{
              position: "relative",
              zIndex: "1000",
              background: "white",
              width: "70%",
              margin: "140px auto",
              borderRadius: "10px",
              padding: "5px 10px",
            }}
          >
            <div>
              <p
                style={{
                  background: "#ccc",
                  marginBottom: "15px",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Edit the type
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <TextField
                  className="input"
                  type="text"
                  label={`Edit the Type`}
                  variant="outlined"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                  style={{
                    marginRight: "10px",
                    width: "300px",
                    backgroundColor: "white",
                    borderRadius: "5px",
                  }}
                />
                <Button
                  style={{
                    pointerEvents: editType === "" ? "none" : "auto",
                  }}
                  size="small"
                  variant="contained"
                  onClick={() => {
                    axios
                      .put(
                        `http://127.0.0.1:8000/api/types/${id}`,
                        { type: editType },
                        {
                          headers: {
                            Authorization: `Bearer ${window.localStorage.getItem(
                              "token"
                            )}`,
                          },
                        }
                      )
                      .then((res) => {
                        setRender(!render);
                        swal("The type has been edited Successfully!").then(
                          () => {
                            handleClose();
                            setEditType("");
                          }
                        );
                      })

                      .catch((err) => {
                        swal("!OOPS! something Went Wrong!", {
                          icon: "error",
                        });
                      });
                  }}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Types;
