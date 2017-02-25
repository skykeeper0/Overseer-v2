import React from 'react';

const ProgressBar = ({ progress }) => {
  let progressClass = "progress-bar ";
  if (progress > 80) {
    progressClass += "progress-bar-success";
  } else if (progress > 60) {
    progressClass += "progress-bar-info";
  } else if (progress > 20) {
    progressClass += "progress-bar-warning";
  } else {
    progressClass += "progress-bar-danger";
  }

  return (
    <div className="progress progress-striped active">
      <div className={progressClass} style={{ width: progress + '%' }}></div>
    </div>
  );
}

export default ProgressBar;
