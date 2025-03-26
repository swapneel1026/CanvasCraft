import { FabricCanvasHistory } from "@naveen521kk/fabric-history";
import * as fabric from "fabric";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import BackgroundImageColor from "./components/canvasControls/backgroundImageColor";
import Options from "./components/canvasControls/Options";
import PropertiesToolbar from "./components/canvasControls/PropertiesToolbar";
import MainControlPanel from "./components/mainControls/mainControlPanel";
import AddQRButton from "./components/subControls/addQrcontrol";
import AddShapesControl from "./components/subControls/addShapesControl";
import AddText from "./components/subControls/AddTextControl";
import SizeControl from "./components/subControls/sizeControl";
import UploadImageControl from "./components/subControls/uploadImageControl";

const FabricEditor = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [properties, setProperties] = useState({});
  const [history, setHistory] = useState(null);
  const [reRenderCount, setReRenderCount] = useState(0);
  const [qrBackgroundColor, setQrBackgroundColor] = useState("#ffffff");
  const [qrForegroundColor, setQrForegroundColor] = useState("#000000");
  useEffect(() => {
    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 600,
      height: 850,
      backgroundColor: "#ffffff",
      uniformScaling: true,
      selection: true,
      selectionFullyContained: true,
      selectionBorderColor: "red",
      preserveObjectStacking: true,
    });

    const history = new FabricCanvasHistory(fabricCanvas, () => {
      setReRenderCount((count) => count + 1);
    });
    history.init();

    fabric.Object.prototype.toObject = (function (toObject) {
      return function () {
        return {
          ...toObject.call(this),
          id: this.id,
          extraType: this.extraType ?? undefined,
          rx: this.rx ?? undefined,
          ry: this.ry ?? undefined,
          radius: this.radius ?? undefined,
          fill: this.fill ?? "#000000",
          text: this.text ?? undefined,
          fontSize: this.fontSize ?? undefined,
          fontWeight: this.fontWeight ?? undefined,
          fontStyle: this.fontStyle ?? undefined,
          linethrough: this.linethrough ?? undefined,
          textAlign: this.textAlign ?? undefined,
          stroke: this.stroke ?? undefined,
          strokeWidth: this.strokeWidth ?? undefined,
          underline: this.underline ?? undefined,
          charSpacing: this.charSpacing ?? undefined,
          backgroundColor: this.backgroundColor ?? undefined,
          opacity: this.opacity ?? undefined,
          scaleX: this.scaleX ?? undefined,
          scaleY: this.scaleY ?? undefined,
          angle: this.angle ?? undefined,
          backgroundImage: this.backgroundImage ?? undefined,
        };
      };
    })(fabric.Object.prototype.toObject);
    fabricCanvas.requestRenderAll();

    setCanvas(fabricCanvas);
    setHistory(history);

    const handleSelection = (e) => {
      if (e.selected && e.selected.length > 0) {
        setSelectedObject(e.selected[0]);
      } else {
        setSelectedObject(null);
      }
    };

    fabricCanvas.on("selection:created", handleSelection);
    fabricCanvas.on("selection:updated", handleSelection);
    fabricCanvas.on("selection:cleared", () => setSelectedObject(null));

    return () => {
      fabricCanvas.off("selection:created", handleSelection);
      fabricCanvas.off("selection:updated", handleSelection);
      fabricCanvas.off("selection:cleared");
      fabricCanvas.dispose();
    };
  }, []);

  const handlePropertyChange = (key, value) => {
    if (!selectedObject || !canvas) return;
    selectedObject.set(key, value);
    selectedObject.setCoords();
    selectedObject.dirty = true;
    selectedObject.fire("modified");
    canvas.fire("object:modified", { target: selectedObject });
    canvas.renderAll();
    setProperties((prev) => ({ ...prev, [key]: value }));
  };
  const saveJSON = () => {
    const json = canvas.toJSON();
    const bgColor = canvas.backgroundColor;
    localStorage.setItem("bgColor", JSON.stringify(bgColor));
    localStorage.setItem("temp", JSON.stringify(json));
  };
  const loadFromJSON = async () => {
    const temp = JSON.parse(localStorage.getItem("temp"));
    const bgColor = JSON.parse(localStorage.getItem("bgColor"));
    if (temp && canvas) {
      try {
        await canvas.loadFromJSON(temp);
        if (canvas) {
          console.log("Background color set to:", bgColor);
          canvas.backgroundColor = bgColor;
          canvas.requestRenderAll();
        }
      } catch (error) {
        console.error(" Error loading JSON:", error);
      }
    }
  };

  const addText = (inputText) => {
    const text = new fabric.FabricText(inputText, {
      id: uuidv4(),
      left: 50,
      top: 50,
      fontSize: 40,
      fontWeight: "500",
      fill: "#000000",
      charSpacing: 0,
      selectable: true,
    });
    canvas.add(text);
  };
  const addTextBox = (inputText) => {
    const textbox = new fabric.Textbox(inputText, {
      id: uuidv4(),
      left: 50,
      top: 50,
      fontSize: 40,
      fontWeight: "500",
      fill: "#000000",
      charSpacing: 0,
      selectable: true,
    });
    canvas.add(textbox);
  };
  const addImage = (e) => {
    let imgObj = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);
    reader.onload = (e) => {
      let imageUrl = e.target.result;
      let imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.onload = function () {
        let image = new fabric.Image(imageElement, {
          id: uuidv4(),
          top: 50,
          left: 50,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          objectCaching: false,
          selectable: true,
          evented: true,
          noSmoothing: true,
          alignToPixelGrid: true,
        });
        image.filters = [];
        image.applyFilters();
        canvas.add(image);
      };
    };
  };
  const addQR = async (QRText) => {
    try {
      if (!QRText || typeof QRText !== "string" || QRText.trim() === "") {
        throw new Error("QRText must be a non-empty string.");
      }
      const qrDataURL = await QRCode.toDataURL(QRText, {
        width: 150,
        color: { light: qrBackgroundColor, dark: qrForegroundColor },
      });

      const imgElement = new Image();
      imgElement.src = qrDataURL;
      imgElement.onload = () => {
        const qrImage = new fabric.Image(imgElement, {
          id: uuidv4(),
          extraType: "qrcode",
          top: 50,
          left: 50,
          opacity: 1,
          scaleX: 1,
          scaleY: 1,
          objectCaching: false,
          selectable: true,
          evented: true,
        });
        // Add to canvas
        if (canvas) {
          canvas.add(qrImage);
          qrImage.applyFilters();
          canvas.renderAll();
        }
      };
    } catch (error) {
      console.error("Error generating QR Code:", error.message);
    }
  };
  const addBgImage = (e) => {
    let imgObj = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imgObj);
    reader.onload = (e) => {
      let imageUrl = e.target.result;
      let imageElement = document.createElement("img");
      imageElement.src = imageUrl;

      imageElement.onload = function () {
        let image = new fabric.Image(imageElement, {
          id: uuidv4(),
          selectable: true,
          absolutePositioned: true,
          scaleX: canvas.width / imageElement.width,
          scaleY: canvas.height / imageElement.height,
          originX: "left",
          originY: "top",
        });
        canvas.backgroundImage = image;
        canvas.renderAll();
      };
    };
  };

  const deleteSelectedObject = () => {
    if (!canvas) return;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects) {
      canvas.remove(...activeObjects);
      canvas.discardActiveObject();
      canvas.requestRenderAll();
    }
  };

  const saveAsPDF = () => {
    if (!canvas) return;

    const dataUrl = canvas.toDataURL({ format: "png" });

    const pdf = new jsPDF("l", "in", "a4");
    pdf.addImage(dataUrl, "PNG", 0, 0, 8.27, 11.69);

    pdf.save("canvas.pdf");
  };
  const addRectangle = () => {
    const rect = new fabric.Rect({
      id: uuidv4(),
      left: 50,
      top: 50,
      fill: "#a314d5",
      stroke: "#ffffff",
      strokeWidth: 0,
      width: 140,
      height: 100,
      selectable: true,
    });
    canvas.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      id: uuidv4(),
      left: 50,
      top: 50,
      fill: "#97cee6",
      stroke: "#ffffff",
      strokeWidth: 0,
      radius: 50,
      selectable: true,
    });
    canvas.add(circle);
  };
  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      id: uuidv4(),
      left: 50,
      top: 50,
      fill: "#0a0e75",
      stroke: "#ffffff",
      strokeWidth: 0,
      angle: 0,
      selectable: true,
    });
    canvas.add(triangle);
  };
  const addStar = () => {
    let angle = Math.PI / 5;
    let points = [];

    for (let i = 0; i < 5 * 2; i++) {
      let radius = i % 2 === 0 ? 50 : 25;
      let x = 100 + Math.cos(i * angle) * radius;
      let y = 100 + Math.sin(i * angle) * radius;
      points.push({ x, y });
    }

    const star = new fabric.Polygon(points, {
      id: uuidv4(),
      left: 100 - 50,
      top: 100 - 50,
      fill: "#27d8ca",
      stroke: "#ffffff",
      strokeWidth: 0,
      selectable: true,
    });

    canvas.add(star);
  };
  const addEllipse = () => {
    const ellipse = new fabric.Ellipse({
      id: uuidv4(),
      left: 50,
      top: 50,
      rx: 60,
      ry: 40,
      fill: "#04cc75",
      stroke: "#ffffff",
      strokeWidth: 0,
      angle: 0,
      selectable: true,
    });

    canvas.add(ellipse);
  };
  const addLine = () => {
    const line = new fabric.Line([100, 150, 300, 150], {
      id: uuidv4(),
      stroke: "#000000",
      strokeWidth: 1,
      selectable: true,
    });

    canvas.add(line);
  };
  const clearCanvas = () => {
    if (!canvas) return;

    canvas.getObjects().forEach((obj) => canvas.remove(obj));
    canvas.backgroundColor = "#ffffff";
    canvas.backgroundImage = null;
    canvas.renderAll();
  };
  const shapes = [
    {
      id: 1,
      src: "/rectangle-wide-svgrepo-com.svg",
      name: "Rectangle",
      onclick: addRectangle,
    },
    {
      id: 2,
      src: "/circle-svgrepo-com.svg",
      name: "Circle",
      onclick: addCircle,
    },
    {
      id: 3,
      src: "/triangle-svgrepo-com.svg",
      name: "Triangle",
      onclick: addTriangle,
    },
    {
      id: 4,
      src: "/star-svgrepo-com.svg",
      name: "Star",
      onclick: addStar,
    },
    {
      id: 5,
      src: "/ellipse-svgrepo-com.svg",
      name: "Ellipse",
      onclick: addEllipse,
    },
    {
      id: 6,
      src: "/line-svgrepo-com.svg",
      name: "Line",
      onclick: addLine,
    },
  ];

  const undo = () => {
    if (history) {
      history.undo();
      canvas.renderAll();
    }
  };

  const redo = () => {
    if (history) {
      history.redo();
      canvas.renderAll();
    }
  };
  return (
    <div className="w-full h-screen px-10 py-6 overflow-y-auto bg-slate-200 scrollbar scrollbar-thumb-violet-500 scrollbar-track-gray-100">
      {/* Main Control Panel*/}
      <section className="flex justify-end w-full ">
        <MainControlPanel
          saveAsPDF={saveAsPDF}
          cleanAll={clearCanvas}
          loadFromJSON={loadFromJSON}
          saveJSON={saveJSON}
        />
      </section>
      <div className="grid w-full grid-cols-5 mt-2 ">
        {/* Left side control boxes */}
        <section className=" col-span-1 text-center  p-2  place-items-center  space-y-4 overflow-y-auto h-[calc(100vh-4rem)]  py-4 scrollbar-hide ">
          <Options
            key={reRenderCount}
            deleteAction={deleteSelectedObject}
            duplicateAction={() => {}}
            redo={redo}
            history={history}
            undo={undo}
            selectedObject={selectedObject}
          />
          <SizeControl canvas={canvas} />
          <BackgroundImageColor canvas={canvas} addBgImage={addBgImage} />
          <UploadImageControl addImage={addImage} />
        </section>
        {/* Canvas Area */}
        <section className="w-full h-full col-span-3 p-2 text-center place-items-center place-content-center ">
          <div className="flex items-center justify-center bg-transparent shadow-xl h-fit w-fit drop-shadow-xl">
            <canvas ref={canvasRef} className="" />
          </div>
        </section>
        {/* Right side control boxes */}
        <section className=" col-span-1 text-center p-2 place-items-center place-content-start   space-y-4 overflow-y-auto h-[calc(100vh-6rem)] scrollbar-hide py-4 ">
          {selectedObject ? (
            <>
              <PropertiesToolbar
                canvas={canvas}
                handlePropertyChange={handlePropertyChange}
                selectedObject={selectedObject}
                properties={properties}
              />
            </>
          ) : null}
          <AddText addText={addText} addTextBox={addTextBox} />
          <AddShapesControl shapes={shapes} />
          <AddQRButton
            addQR={addQR}
            setQrBackgroundColor={setQrBackgroundColor}
            setQrForegroundColor={setQrForegroundColor}
            qrBackgroundColor={qrBackgroundColor}
            qrForegroundColor={qrForegroundColor}
          />
        </section>
      </div>
    </div>
  );
};

export default FabricEditor;
