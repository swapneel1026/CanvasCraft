import { CancelOutlined } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const BackgroundImageColor = ({ canvas, addBgImage }) => {
  const [bgColor, setBgColor] = useState("#fff");
  const [bgImage, setBgImage] = useState(null);

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
        Canvas Background
      </p>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex flex-col text-xs text-left ">
          <span className="font-medium">Background Color</span>
          <input
            type="color"
            value={canvas?.backgroundColor}
            className="w-24 h-8 cursor-pointer"
            onChange={(e) => {
              setBgColor(e.target.value);
              if (canvas) {
                canvas.backgroundColor = e.target.value;
                canvas.renderAll();
              }
            }}
          />
        </div>
        <div className="flex flex-col w-full text-xs gap-y-2">
          <span className="font-medium text-left">Background Image</span>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon fontSize="small" />}
            color="secondary"
            size="small"
            fullWidth
          >
            Upload
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                setBgImage(e.target.files[0]);
                addBgImage(e);
              }}
            />
          </Button>
          {bgImage !== null && (
            <Tooltip
              title="Remove Background Image"
              children={
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    canvas.backgroundImage = null;
                    setBgImage(null);
                    canvas.renderAll();
                  }}
                >
                  <CancelOutlined />
                </Button>
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BackgroundImageColor;
