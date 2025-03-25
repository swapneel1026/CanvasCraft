import { BlockOutlined, PictureAsPdf, Save } from "@mui/icons-material";
import React from "react";
import MainControlButton from "./MainControlButton";

const MainControlPanel = ({ cleanAll, saveAsPDF }) => (
  <div className="flex gap-1">
    <MainControlButton buttonLabel="Save" action={() => {}} icon={<Save />} />
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
