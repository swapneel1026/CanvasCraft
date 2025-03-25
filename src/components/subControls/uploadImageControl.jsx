import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";

const UploadImageControl = ({ addImage }) => {
  const VisuallyHiddenInput = styled("input")({
    position: "absolute",
    width: 1,
    height: 1,
    overflow: "hidden",
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
  });

  return (
    <div className="w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      <p className="p-2 text-sm font-medium text-violet-600 bg-violet-200 rounded-t-md">
        Upload Image
      </p>
      <div className="flex items-center justify-around gap-2 p-2">
        <span className="text-xs font-medium text-left">Choose Image</span>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon fontSize="small" />}
          color="secondary"
          size="small"
        >
          Upload
          <VisuallyHiddenInput type="file" onChange={addImage} />
        </Button>
      </div>
    </div>
  );
};

export default UploadImageControl;
