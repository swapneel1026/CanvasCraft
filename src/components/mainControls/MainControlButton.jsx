import { Button } from "@mui/material";
import React from "react";

const MainControlButton = ({ icon, buttonLabel, action }) => {
  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      className="flex gap-x-1"
      onClick={() => action()}
    >
      {buttonLabel}
      {icon}
    </Button>
  );
};

export default MainControlButton;
