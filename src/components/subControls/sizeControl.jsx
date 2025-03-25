import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const SizeControl = ({ canvas }) => {
  const [sizeValue, setSizeValue] = useState(0);
  const [customSizeSwitch, setCustomSizeSwitch] = useState(false);
  const [orientationSwitch, setOrientationSwitch] = useState(false);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 600,
    height: 850,
  });

  const updateCanvasSize = (width, height) => {
    if (!canvas) return;
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.renderAll();
  };

  const handleSizeChange = (e) => {
    const selectedSize = e.target.value;
    setSizeValue(selectedSize);

    let width, height;
    if (selectedSize === 0) {
      width = 850;
      height = 600;
    } else if (selectedSize === 1) {
      width = 300;
      height = 400;
    } else if (selectedSize === 2) {
      width = 100;
      height = 200;
    } else if (selectedSize === 3) {
      width = 400;
      height = 600;
    }

    if (orientationSwitch) {
      setCanvasDimensions({ width: height, height: width });
      updateCanvasSize(height, width);
    } else {
      setCanvasDimensions({ width, height });
      updateCanvasSize(width, height);
    }
  };

  const handleDimensionChange = (key, value) => {
    const newDimensions = { ...canvasDimensions, [key]: value };
    setCanvasDimensions(newDimensions);
    if (canvas) {
      canvas.setWidth(newDimensions.width);
      canvas.setHeight(newDimensions.height);
      canvas.renderAll();
    }
  };

  const handleOrientationChange = () => {
    setOrientationSwitch((prev) => !prev);
    setCanvasDimensions((prev) => ({
      width: prev.height,
      height: prev.width,
    }));
    updateCanvasSize(canvasDimensions.height, canvasDimensions.width);
  };

  useEffect(() => {
    if (!canvas) return;
    if (!customSizeSwitch) {
      setSizeValue(0);
      setOrientationSwitch(false);
      setCanvasDimensions({ width: 600, height: 850 });
      updateCanvasSize(600, 850);
    }
  }, [customSizeSwitch, canvas]);

  return (
    <div className="w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      {/* Header */}
      <p className="p-2 text-sm font-medium bg-violet-200 rounded-t-md text-violet-600">
        Canvas Size & Orientation
      </p>

      <div className="flex flex-col gap-3 p-2">
        {/* Preset Sizes */}
        <FormControl fullWidth size="small" disabled={customSizeSwitch}>
          <InputLabel>Size</InputLabel>
          <Select
            labelId="size-select-label"
            id="size-select"
            value={sizeValue}
            onChange={handleSizeChange}
          >
            <MenuItem value={0}>Full Canvas</MenuItem>
            <MenuItem value={1}>ID-Card</MenuItem>
            <MenuItem value={2}>Poster</MenuItem>
            <MenuItem value={3}>A4</MenuItem>
          </Select>
        </FormControl>

        {/* Orientation Switch */}
        <div className="flex items-center justify-between">
          <span className="text-xs">Portrait</span>
          <Switch
            size="small"
            color="secondary"
            checked={orientationSwitch}
            onChange={handleOrientationChange}
          />
          <span className="text-xs">Landscape</span>
        </div>

        {/* Custom Size Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-xs">Custom Size</span>
          <Switch
            size="small"
            color="secondary"
            checked={customSizeSwitch}
            onChange={(e) => setCustomSizeSwitch(e.target.checked)}
          />
        </div>

        {/* Custom Size Inputs */}
        <div className="flex gap-2">
          <TextField
            fullWidth
            disabled={!customSizeSwitch}
            size="small"
            inputProps={{ min: 0, max: 850 }}
            label="Width"
            type="number"
            value={canvasDimensions.width}
            onChange={(e) =>
              handleDimensionChange("width", Number(e.target.value))
            }
          />
          <TextField
            disabled={!customSizeSwitch}
            size="small"
            fullWidth
            inputProps={{ min: 0, max: 600 }}
            label="Height"
            type="number"
            value={canvasDimensions.height}
            onChange={(e) =>
              handleDimensionChange("height", Number(e.target.value))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SizeControl;
