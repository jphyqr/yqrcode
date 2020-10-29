import React from "react";

const TimelineItem = ({ onClick, snap, i, updatePreviewTime }) => {
  return (
    <div onClick={() => onClick(snap)} className="timeline-item">
      {snap.type?.includes("video") ? (
        <video
          className={"preview-video"}
          id="video1"
          src={`${snap.url}#t=15`}
        ></video>
      ) : (
        <img className={"preview-img"} src={snap.url} />
      )}

      <style jsx>{`
        .timeline-item {
          background-color: lightgrey;
          outline: 3px solid blue;

          position: relative;
          height: 75px;
          width: ${snap.duration / 200}px;
          display: flex;
          flex-direction: column;
        }

        .preview-img,
        .preview-video {
          height: 75px;
          border-radius: 10px;
        }
        button {
          position: absolute;
          bottom: 0px;
        }
      `}</style>
    </div>
  );
};

export default TimelineItem;
