import * as React from "react";
import { IconButton, Tooltip } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Stack from "@mui/material/Stack"
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export default function FileUpload() {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Unknown error")
    const [severity, setSeverity] = React.useState("error");

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        axios
          .post("http://localhost:4000/graph", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
          })
          .then((response) => {
            setOpen(!open)
            
            if (response.status === 200) {
                setSeverity("success")
            } 

            setMessage(response.data)
          })
          .catch((err) => {
            setOpen(!open);
            setMessage(err.response.data);
            setSeverity('error')
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
            <Tooltip title="Add graph" arrow>
                <IconButton color="success" component="label" variant="text">
                    <AddCircleOutlinedIcon />
                    <input hidden accept="application/JSON" type="file" onChange={handleFileUpload} />
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