// src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import VideoPlayer from "./VideoPlayer";

function App() {
  const [participantToken, setParticipantToken] = useState(null);
  const [stageArn, setStageArn] = useState(
    "arn:aws:ivs:ap-south-1:026090544993:stage/FFCYtpkh7PMx"
  ); // Replace with your actual Stage ARN

  useEffect(() => {
    // For demo purposes, simulate fetching a participant token from your server
    const fetchParticipantToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("participantToken"); // Get the participant token from URL
      if (token) {
        setParticipantToken(token);
      } else {
        console.error("Participant token is missing.");
      }
    };

    fetchParticipantToken();
  }, []);

  return (
    <div className="App">
      <h1>AWS IVS Real-Time Viewer</h1>
      {participantToken ? (
        <VideoPlayer participantToken={participantToken} stageArn={stageArn} />
      ) : (
        <p>Loading stream...</p>
      )}
    </div>
  );
}

export default App;
