import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign: 'center',
}; 
type Props = {
open:any,
handleClose : any,
color:any,
medal:any
}
const BronzeMedalPopup:React.FC<Props> = ({ open, handleClose,color,medal }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <EmojiEventsIcon sx={{ fontSize: 60, color: color }} />
        <Typography id="modal-title" variant="h6" component="h2" className="mt-4">
          Hurray! You got a {medal} medal
        </Typography>
        <Button onClick={handleClose} className="mt-4" variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default BronzeMedalPopup;
