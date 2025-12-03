import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const EmotionCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const [emotion, setEmotion] = useState("Menunggu...");
  const captureAnalyze = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        try {
          const res = await axios.post('http://127.0.0.1:8000/api/analyze-text', {
            img_data: imageSrc
          });

          setEmotion(res.data.emotion);
        } catch (error) {
          console.error("Gagal analisis :", error);
        }
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(captureAnalyze, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
        className="rounded-lg shadow-lg" 
      />
      <h2 className="text-2xl font-bold mt-4">Emosi : {emotion}</h2>
    </div>
  );
};

export default EmotionCam;