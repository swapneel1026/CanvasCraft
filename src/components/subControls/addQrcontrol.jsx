import { QrCode } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";

const AddQRButton = ({
  addQR,
  setQrBackgroundColor,
  setQrForegroundColor,
  qrBackgroundColor,
  qrForegroundColor,
}) => {
  const [QRText, setQRText] = useState("");

  return (
    <div className="w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      <p className="p-2 text-sm font-medium text-violet-600 bg-violet-200 rounded-t-md">
        Add QR code
      </p>
      <div className="flex flex-col justify-center px-2 py-4 font-medium gap-y-3">
        <TextField
          label="Enter Foreground Color"
          type="color"
          size="small"
          fullWidth
          value={qrForegroundColor}
          onChange={(e) => {
            setQrForegroundColor(e.target.value);
          }}
        />
        <TextField
          label="Enter Background Color"
          type="color"
          size="small"
          fullWidth
          value={qrBackgroundColor}
          onChange={(e) => {
            setQrBackgroundColor(e.target.value);
          }}
        />

        <div className="flex items-center justify-center gap-2">
          <TextField
            label="Enter QR Input"
            size="small"
            type="text"
            fullWidth
            value={QRText}
            onChange={(e) => {
              setQRText(e.target.value);
            }}
          />
          <QrCode
            role="button"
            disabled={!QRText}
            className="my-auto"
            color={!QRText ? "disabled" : "secondary"}
            onClick={() => {
              addQR(QRText);
              setQRText("");
            }}
            size="small"
          />
        </div>
      </div>
    </div>
  );
};

export default AddQRButton;
