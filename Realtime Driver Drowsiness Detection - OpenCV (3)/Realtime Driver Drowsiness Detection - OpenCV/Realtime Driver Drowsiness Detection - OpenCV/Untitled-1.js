import { useState, useRef } from "react";

export default function SignLanguageApp() {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraOn(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!isCameraOn && (
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={startCamera}
        >
          Start
        </button>
      )}
      <video ref={videoRef} autoPlay className={isCameraOn ? "block" : "hidden"}></video>
      <textarea
        value={recognizedText}
        readOnly
        className="border p-2 w-80 h-20"
        placeholder="Recognized text will appear here"
      />
    </div>
  );
}