import { CopyAllOutlined } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";

const CopyButton = ({ duplicateAction, selectedObject }) => {
  return (
    <>
      <Tooltip
        children={
          <CopyAllOutlined
            role="button"
            disabled
            color={!selectedObject ? "disabled" : "info"}
            onClick={duplicateAction}
          />
        }
        title="Copy Selected"
      />
    </>
  );
};

export default CopyButton;
