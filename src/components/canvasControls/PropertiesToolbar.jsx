import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

const PropertiesToolbar = ({
  handlePropertyChange,
  selectedObject,
  properties,
}) => {
  const renderProperties = () => {
    console.log(selectedObject.extraType);
    if (!selectedObject)
      return (
        <p className="text-sm text-center text-gray-500">No object selected</p>
      );
    switch (selectedObject.extraType || selectedObject.type) {
      case "rect":
      case "circle":
      case "triangle":
      case "polygon":
      case "line":
      case "ellipse":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Fill & Stroke Colors */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                label="Fill"
                type="color"
                size="small"
                sx={{ width: "50%" }}
                value={selectedObject?.fill}
                onChange={(e) => handlePropertyChange("fill", e.target.value)}
              />
              <TextField
                label="Stroke"
                type="color"
                size="small"
                sx={{ width: "50%" }}
                value={selectedObject?.stroke}
                onChange={(e) => handlePropertyChange("stroke", e.target.value)}
              />
            </Box>

            {/* Stroke Width */}
            <TextField
              label="Stroke Width"
              type="number"
              size="small"
              inputProps={{ min: 0 }}
              fullWidth
              value={selectedObject?.strokeWidth}
              onChange={(e) =>
                handlePropertyChange("strokeWidth", parseInt(e.target.value))
              }
            />
          </Box>
        );
      case "qrcode":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Opacity */}
            <TextField
              label="Opacity"
              type="number"
              size="small"
              inputProps={{ min: 0, max: 1, step: 0.1 }}
              fullWidth
              value={selectedObject.opacity}
              onChange={(e) =>
                handlePropertyChange("opacity", parseFloat(e.target.value))
              }
            />
          </Box>
        );
      case "text":
      case "textbox":
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: "100%",
              p: 1,
              bgcolor: "#ffffff",
            }}
          >
            {/* 🔹 Edit Text */}
            <Typography variant="subtitle2" align="left" fontWeight="500">
              Edit Text
            </Typography>
            <TextField
              label="Text"
              size="small"
              fullWidth
              value={selectedObject?.text}
              onChange={(e) => handlePropertyChange("text", e.target.value)}
            />

            {/* 🔹 Typography Settings */}
            <Typography variant="subtitle2" align="left" fontWeight="500">
              Typography
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <FormControl size="small" sx={{ width: "65%" }}>
                <InputLabel>Font</InputLabel>
                <Select
                  value={selectedObject?.fontFamily}
                  onChange={(e) =>
                    handlePropertyChange("fontFamily", e.target.value)
                  }
                >
                  <MenuItem value="Arial">Arial</MenuItem>
                  <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                  <MenuItem value="Courier New">Courier New</MenuItem>
                  <MenuItem value="Georgia">Georgia</MenuItem>
                  <MenuItem value="Verdana">Verdana</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Size"
                type="number"
                size="small"
                sx={{ width: "35%" }}
                value={selectedObject?.fontSize}
                onChange={(e) => {
                  handlePropertyChange("fontSize", parseInt(e.target.value));
                  setFontSize(e.target.value);
                }}
              />
            </Box>

            {/* 🔹 Alignment (Only for Textbox) */}
            {selectedObject?.type === "textbox" && (
              <>
                <Typography variant="subtitle2" align="left" fontWeight="500">
                  Alignment
                </Typography>
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  fullWidth
                  value={selectedObject?.textAlign}
                  onChange={(e, newValue) => {
                    if (newValue !== null)
                      handlePropertyChange("textAlign", newValue);
                  }}
                >
                  <Tooltip
                    children={<ToggleButton value="left">L</ToggleButton>}
                    title="Left"
                  />
                  <Tooltip
                    children={<ToggleButton value="center">C</ToggleButton>}
                    title="Center"
                  />
                  <Tooltip
                    children={<ToggleButton value="right">R</ToggleButton>}
                    title="Right"
                  />
                  <Tooltip
                    children={<ToggleButton value="justify">J</ToggleButton>}
                    title="Justify"
                  />
                </ToggleButtonGroup>
              </>
            )}

            {/* 🔹 Text Styles */}
            <Typography variant="subtitle2" align="left" fontWeight="500">
              Text Styles
            </Typography>
            <ToggleButtonGroup exclusive size="small" fullWidth>
              <Tooltip
                children={
                  <ToggleButton
                    value="bold"
                    selected={selectedObject?.fontWeight === "bold"}
                    onClick={() =>
                      handlePropertyChange(
                        "fontWeight",
                        properties.fontWeight === "bold" ? "normal" : "bold"
                      )
                    }
                  >
                    B
                  </ToggleButton>
                }
                title="Bold"
              />
              <Tooltip
                children={
                  <ToggleButton
                    value="italic"
                    selected={selectedObject?.fontStyle === "italic"}
                    onClick={() =>
                      handlePropertyChange(
                        "fontStyle",
                        properties.fontStyle === "italic" ? "normal" : "italic"
                      )
                    }
                  >
                    I
                  </ToggleButton>
                }
                title="Italic"
              />
              <Tooltip
                children={
                  <ToggleButton
                    value="underline"
                    selected={selectedObject?.underline}
                    onClick={() =>
                      handlePropertyChange("underline", !properties.underline)
                    }
                  >
                    U
                  </ToggleButton>
                }
                title="Underline"
              />
              <Tooltip
                children={
                  <ToggleButton
                    value="linethrough"
                    selected={selectedObject?.linethrough}
                    onClick={() =>
                      handlePropertyChange(
                        "linethrough",
                        !properties.linethrough
                      )
                    }
                  >
                    S
                  </ToggleButton>
                }
                title="Strike-through"
              />
            </ToggleButtonGroup>

            {/* 🔹 Color & Spacing */}
            <Typography variant="subtitle2" align="left" fontWeight="500">
              Color & Spacing
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Color"
                type="color"
                size="small"
                sx={{ width: "50%" }}
                value={selectedObject?.fill}
                onChange={(e) => handlePropertyChange("fill", e.target.value)}
              />
              <TextField
                label="Spacing"
                type="number"
                size="small"
                sx={{ width: "50%" }}
                value={selectedObject?.charSpacing}
                onChange={(e) =>
                  handlePropertyChange("charSpacing", parseInt(e.target.value))
                }
              />
            </Box>
          </Box>
        );

      case "image":
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Opacity */}
            <TextField
              label="Opacity"
              type="number"
              size="small"
              inputProps={{ min: 0, max: 1, step: 0.1 }}
              fullWidth
              value={selectedObject.opacity}
              onChange={(e) =>
                handlePropertyChange("opacity", parseFloat(e.target.value))
              }
            />

            {/* Scale */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                label="Scale X"
                type="number"
                size="small"
                sx={{ width: "50%" }}
                value={selectedObject.scaleX}
                onChange={(e) =>
                  handlePropertyChange("scaleX", parseFloat(e.target.value))
                }
              />
              <TextField
                label="Scale Y"
                type="number"
                size="small"
                sx={{ width: "50%" }}
                value={selectedObject.scaleY}
                onChange={(e) =>
                  handlePropertyChange("scaleY", parseFloat(e.target.value))
                }
              />
            </Box>

            {/* Flip Controls */}
            <Box sx={{ display: "flex", gap: 1 }}>
              <ToggleButton
                value="flipX"
                selected={selectedObject?.flipX}
                onClick={() => handlePropertyChange("flipX", !properties.flipX)}
                fullWidth
              >
                Flip X
              </ToggleButton>
              <ToggleButton
                value="flipY"
                selected={selectedObject?.flipY}
                onClick={() => handlePropertyChange("flipY", !properties.flipY)}
                fullWidth
              >
                Flip Y
              </ToggleButton>
            </Box>
          </Box>
        );

      default:
        return (
          <p className="text-sm text-center text-gray-500">
            No properties available for this type.
          </p>
        );
    }
  };

  return (
    <div className="w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      <p className="p-2 text-sm font-medium text-violet-600 bg-violet-200 rounded-t-md">
        Properties
      </p>
      <div className="flex items-center justify-around gap-2 p-2">
        {renderProperties()}
      </div>
    </div>
  );
};

export default PropertiesToolbar;
