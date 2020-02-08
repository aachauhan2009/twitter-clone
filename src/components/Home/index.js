import React from "react";
import Timeline from "../Timeline";
import TimelineLoader from "../Timeline/loader";

function App() {
  return (
    <div className="Home">
      <React.Suspense fallback={<TimelineLoader />}>
        <Timeline />
      </React.Suspense>
    </div>
  );
}

export default App;
