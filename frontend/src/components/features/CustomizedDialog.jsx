import * as React from "react";
import BootstrapDialog from "./BootstrapDialog";

export default function CustomizedDialogs(props) {
  const { open, setOpen, handleClickOpen, children } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <BootstrapDialog
        xlWidth="false"
        handleClose={handleClose}
        children={children}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
