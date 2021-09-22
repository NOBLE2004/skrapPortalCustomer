import React from "react";

import "./jobnotes.scss";
const JobNotes = ({comments}) => {
  return (
    <div className="job-notes-main">
      <div className="note-header">Notes</div>
      <div className="job-note">
        <div className="job-note-date">Date</div>
        <div className="job-note-sub">
          <div className="note">Note</div>
          {/*<div className="add-note">+ Add Note</div>*/}
        </div>
      </div>
        {comments && comments.length === 0 && (
            <div className="job-note-desc">
                <div className="job-note-date-desc">------------------</div>
                <div className="job-note-sub-desc">
                    ----------------------------------------------------------------------------------
                </div>
            </div>
        )}
        {comments && comments.map((row) => (
            <div className="job-note-desc" key={row.id}>
                <div className="job-note-date-desc">{new Date(row.created_at).toISOString().replace('T', ' ').slice(0, 20)}</div>
                <div className="job-note-sub-desc">
                    {row.content}
                </div>
            </div>
        ))}
    </div>
  );
};

export default JobNotes;
