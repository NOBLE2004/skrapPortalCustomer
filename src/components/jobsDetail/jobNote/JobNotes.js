import React from "react";

import "./jobnotes.scss";
const JobNotes = () => {
  return (
    <div className="job-notes-main">
      <div className="note-header">Notes</div>
      <div className="job-note">
        <div className="job-note-date">Date</div>
        <div className="job-note-sub">
          <div className="note">Note</div>
          <div className="add-note">+ Add Note</div>
        </div>
      </div>

      <div className="job-note-desc">
        <div className="job-note-date-desc">2021-03-26 09:28:01</div>
        <div className="job-note-sub-desc">
          Integer et magna sed quam feugiat porta sed ut nulla. Nunc dignissim
          quam blandit pulvinar dapibus. Vestibulum ut vestibulum nulla. Vivamus
          ut lobortis nisl, ac imperdiet massa. Vivamus imperdiet odio nec
          pharetra efficitur. Donec in metus dignissim, ullamcorper mi dictum,
          condimentum augue. Vivamus vitae ante nec.
        </div>
      </div>

      <div className="job-note-desc">
        <div className="job-note-date-desc">2021-03-26 09:28:01</div>
        <div className="job-note-sub-desc">
          Integer et magna sed quam feugiat porta sed ut nulla. Nunc dignissim
          quam blandit pulvinar dapibus. Vestibulum ut vestibulum nulla. Vivamus
          ut lobortis nisl, ac imperdiet massa. Vivamus imperdiet odio nec
          pharetra efficitur. Donec in metus dignissim, ullamcorper mi dictum,
          condimentum augue. Vivamus vitae ante nec.
        </div>
      </div>
    </div>
  );
};

export default JobNotes;
