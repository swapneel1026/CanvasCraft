import { UndoOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";

const UndoButton = ({ undo, history }) => {
  return (
    <>
      <Tooltip
        children={
          <UndoOutlined
            role="button"
            onClick={() => undo()}
            disabled={!history?.canPerformUndo()}
            color={`${!history?.canPerformUndo() ? "disabled" : "secondary"}`}
          />
        }
        title="Undo"
      />
    </>
  );
};

export default UndoButton;
