import { AddCircleRounded } from "@mui/icons-material";
import { TextField } from "@mui/material";
import React, { useState } from "react";

const AddText = ({ addText, addTextBox }) => {
  const [inputPlainValue, setinputPlainValue] = useState("");
  const [inputMultiValue, setinputMultiValue] = useState("");

  return (
    <div className="w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      <p className="p-2 text-sm font-medium text-violet-600 bg-violet-200 rounded-t-md">
        Add Text
      </p>
      <div className="flex items-center gap-2 p-2">
        <TextField
          label="Plain Text"
          size="small"
          fullWidth
          onChange={(e) => setinputPlainValue(e.target.value)}
          value={inputPlainValue}
        />
        <button
          onClick={() => {
            addText(inputPlainValue);
            setinputPlainValue("");
          }}
          disabled={!inputPlainValue}
          className={`transition-opacity ${
            !inputPlainValue ? "opacity-40" : ""
          }`}
        >
          <AddCircleRounded color="secondary" fontSize="small" />
        </button>
      </div>
      <div className="flex items-center gap-2 p-2">
        <TextField
          label="Multi-Line Text"
          size="small"
          type="text"
          fullWidth
          onChange={(e) => setinputMultiValue(e.target.value)}
          value={inputMultiValue}
        />
        <button
          onClick={() => {
            addTextBox(inputMultiValue);
            setinputMultiValue("");
          }}
          disabled={!inputMultiValue}
          className={`transition-opacity ${
            !inputMultiValue ? "opacity-40" : ""
          }`}
        >
          <AddCircleRounded color="secondary" fontSize="small" />
        </button>
      </div>
    </div>
  );
};

export default AddText;
