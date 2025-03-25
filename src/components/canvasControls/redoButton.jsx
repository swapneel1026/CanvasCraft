import { RedoOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";

const RedoButton = ({ redo, history }) => {
  const canRedo = !history?.canPerformRedo();
  return (
    <>
      <Tooltip
        children={
          <RedoOutlined
            role="button"
            onClick={() => redo()}
            disabled={!history?.canPerformRedo()}
            color={`${canRedo ? "disabled" : "secondary"}`}
          />
        }
        title="Redo"
      />
    </>
  );
};

export default RedoButton;
