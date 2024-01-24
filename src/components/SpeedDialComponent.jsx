import * as React from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileUpload from './UploadDialogue';
import DeleteGraph from './DeleteGraph';

const actions = [
  { icon: <FileUpload />, name:  'Create' },
  { icon: <DeleteGraph />, name: 'Destroy' },
];

export default function SpeedDialComponent() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            children={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={handleClose}
          >
           action.icon
          </SpeedDialAction>
        ))}
      </SpeedDial>
    </Box>
  );
}