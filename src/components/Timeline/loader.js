import React from "react";

export default function TimelineLoader(props) {
  return <div className="Timeline Timeline-loader">
    {Array.from({ length: 10}).map((v,i) => <div key={i} className="loader">
    </div>)}
  </div>
}