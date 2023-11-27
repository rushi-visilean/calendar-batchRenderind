import React from 'react';
import TestBatchRendering from './component/TestBatchRendering';

function App() {
  return (
    <div className="App">
      <h1>FullCalendar Test</h1>
      <TestBatchRendering />
    </div>
  );
}

export default React.memo(App);
