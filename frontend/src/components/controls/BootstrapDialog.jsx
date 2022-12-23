import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';


const MyBootstrapDialog = styled(Dialog)(({ theme, xlwidth }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
    '& .MuiPaper-root': {
      width: "100%",
      maxWidth: xlwidth === "true" ? theme.breakpoints.values.lg: theme.breakpoints.values.md,
      // maxWidth: false,
    }
    // '1920px !important'
    // maxWidth: theme.breakpoints.values.lg,
    // fullWidth: true
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

export default function BootstrapDialog(props) {

    const { handleClose, open, children,xlwidth, ...other} = props;
    return (
        <MyBootstrapDialog
        xlwidth={xlwidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        >
            {/* <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                <Typography variant="h6">Login</Typography>
            </BootstrapDialogTitle> */}
            <DialogContent dividers>
                {children}
            </DialogContent>
        </MyBootstrapDialog>
    )
}