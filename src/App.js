import { useState } from 'react';
import './App.css';
import { Lines } from './components/Lines';
import { LineWaitingTimes } from './components/LineWaitingTimes';

function App() {
  const [selectedLine, setSelectedLine] = useState();

  return (
    <>
      <Lines onSelected={(line) => setSelectedLine(line)} />
      <hr />
      <LineWaitingTimes line={selectedLine}/>
    </>
  );
}

export default App;
