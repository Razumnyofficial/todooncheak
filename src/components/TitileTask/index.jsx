import React from "react";

import "./titletask.css";

const InfoTasks = ({ info, setFilterParams }) => {
  let countTrue = 0;
  let countFalse = 0;
  for (let i = 0; i < info.length; i++) {
    if (info[i].isDone === true) {
      countTrue++;
    } else {
      countFalse++;
    }
  }

  return (
    <div className="title_tasks">
      <button onClick={() => setFilterParams(null)} className="tasks_btn">
        все ({info.length}){" "}
      </button>
      <button onClick={() => setFilterParams(false)} className="tasks_btn">
        в работе ({countFalse})
      </button>
      <button onClick={() => setFilterParams(true)} className="tasks_btn">
        завершено ({countTrue})
      </button>
    </div>
  );
};

export default InfoTasks;
