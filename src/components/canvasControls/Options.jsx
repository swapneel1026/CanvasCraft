import React from "react";
import DeleteButton from "./DeleteButton";
import CopyButton from "./copyButton";
import RedoButton from "./redoButton";
import UndoButton from "./undoButton";

const Options = ({
  deleteAction,
  duplicateAction,
  undo,
  redo,
  history,
  selectedObject,
}) => {
  return (
    <div className="w-full bg-white rounded-md shadow-lg drop-shadow-xl max-w-[15rem]">
      <p className="p-2 text-sm font-medium rounded-t-md text-violet-600 bg-violet-200">
        Options
      </p>
      <div className="flex items-center justify-around gap-2 p-2">
        <UndoButton undo={undo} history={history} />
        <RedoButton redo={redo} history={history} />
        <CopyButton
          duplicateAction={duplicateAction}
          selectedObject={selectedObject}
        />
        <DeleteButton
          deleteAction={deleteAction}
          selectedObject={selectedObject}
        />
      </div>
    </div>
  );
};

export default Options;
