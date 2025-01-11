// src/VideoPlayer.js
import React, { useEffect, useRef } from "react";

const VideoPlayer = ({ participantToken, stageArn }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const loadIVS = async () => {
      if (!window.AmazonIVSRealTime) {
        console.error("Amazon IVS Real-Time SDK is not loaded.");
        return;
      }

      try {
        const { Stage } = window.AmazonIVSRealTime;
        const stage = Stage(stageArn, { participantToken });

        await stage.connect();

        const localParticipant = stage.getLocalParticipant();
        localParticipant.video.attach(videoRef.current);
      } catch (error) {
        console.error("Error connecting to AWS IVS Real-Time Stage:", error);
      }
    };

    loadIVS();
  }, [participantToken, stageArn]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default VideoPlayer;
