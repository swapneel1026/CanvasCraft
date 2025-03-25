import React from "react";

const AddShapesControl = ({ shapes }) => {
  return (
    <div className="flex flex-col items-start w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      <p className="w-full p-2 text-sm font-medium text-center bg-violet-200 rounded-t-md text-violet-600">
        Shapes
      </p>
      <div className="grid w-full grid-cols-3 gap-2 p-2 overflow-y-auto max-h-40">
        {shapes.map((shape) => (
          <div
            key={shape.id}
            onClick={shape.onclick}
            className="flex flex-col items-center justify-center p-1 rounded-md cursor-pointer hover:bg-gray-200"
          >
            <img src={shape.src} alt={shape.name} className="w-10 h-10" />
            <p className="text-[10px] text-gray-700">{shape.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddShapesControl;
