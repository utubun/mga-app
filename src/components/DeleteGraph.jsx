import * as React from "react";
import { IconButton, Tooltip } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import Stack from "@mui/material/Stack"
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function DeleteGraph() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Unknown error")
    const [severity, setSeverity] = React.useState("error");

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    });

    const handleDeleteGraph = (event) => {

        axios
          .delete("http://localhost:4000/graph")
          .then((response) => {      
   
            if (response.status === 200 && response.data.update) {
                setSeverity("success")
                setMessage(`Added ${response.data.nodes} and ${response.data.links} relationships, in ${response.data.consummed} ms`)                
            } else if (!response.data.update) {
                setSeverity('info')
                setMessage(`Already uptodate. Response available ins ${response.data.available} ms`)
            }
            setOpen(true)
          })
          .catch((err) => {
            setSeverity("error");
            if (!err.response) {
                setMessage("Error: Network error");
            } else {
                setMessage(err.response.data.message);
            }
            handleOpen();
          });
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(!open)
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            <Tooltip title="Delete graph" arrow>
            <IconButton 
              aria-label="delete" 
              color="warning" 
              variant="contained" 
              onClick={handleDeleteGraph}
            >
                <CancelIcon /> 
            </IconButton>
            </Tooltip>
            <Stack spacing={2} sx={{ width:"100%" }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
        </Stack>
    )
}