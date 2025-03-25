import { DeleteOutline } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";

const DeleteButton = ({ deleteAction, selectedObject }) => {
  return (
    <>
      <Tooltip
        children={
          <DeleteOutline
            color={!selectedObject ? "disabled" : "error"}
            role="button"
            disabled={!selectedObject}
            onClick={deleteAction}
          />
        }
        title="Delete Selected"
      />
    </>
  );
};

export default DeleteButton;
