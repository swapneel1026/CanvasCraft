import {
  BlockOutlined,
  CloudUploadOutlined,
  PictureAsPdf,
  Save,
} from "@mui/icons-material";
import React from "react";
import MainControlButton from "./MainControlButton";

const MainControlPanel = ({ cleanAll, saveAsPDF, loadFromJSON, saveJSON }) => (
  <div className="flex gap-1">
    <MainControlButton buttonLabel="Save" action={saveJSON} icon={<Save />} />
    <MainControlButton
      buttonLabel="Load"
      action={loadFromJSON}
      icon={<CloudUploadOutlined />}
    />
    <MainControlButton
      buttonLabel="PDF"
      action={saveAsPDF}
      icon={<PictureAsPdf />}
    />
    <MainControlButton
      buttonLabel="Clean"
      action={cleanAll}
      icon={<BlockOutlined />}
    />
  </div>
);

export default MainControlPanel;
