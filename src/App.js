import React, { useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import { UploadCloud, XCircle } from "lucide-react";
import "./App.css";

export default function VideoProcessing() {
  const [video, setVideo] = useState(null);
  const [text, setText] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideo(file); 
    }
  };

  const handleCancel = () => {
    setVideo(null);
  };

  const handleSubmit = () => {
    if (!video) {
      return alert("Please upload a video first!");
    }

    setProcessing(true);
    setTimeout(() => setProcessing(false), 3000); 
  };

  return (
    <div className="video-processing-container">
      <div className="header">
        <h1 className="title">Video Processing Interface</h1>
      </div>

      {!video && (
        <label className="upload-label">
          <UploadCloud size={32} className="icon" />
          <span className="upload-text">Click to upload video</span>
          <input
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoUpload}
          />
        </label>
      )}

      {video && (
        <div className="video-wrapper">
          <video controls className="video-preview">
            <source src={URL.createObjectURL(video)} type="video/mp4" />
          </video>
          <Button
            variant="outlined"
            color="secondary"
            className="cancel-button"
            onClick={handleCancel}
          >
            <XCircle size={18} /> Cancel
          </Button>
        </div>
      )}

      <TextareaAutosize
        minRows={3}
        placeholder="Enter additional query (optional)"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="text-input"
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className="submit-button"
      >
        {processing ? "Processing..." : "Submit"}
      </Button>
    </div>
  );
}
