import { useState } from 'react';
import './App.css';
import { Lines } from './components/Lines';
import { LineWaitingTimes } from './components/LineWaitingTimes';
import { Stations } from './components/Stations';

function App() {
  const [selectedLine, setSelectedLine] = useState();
  const [shouldLoadStations, setShouwLoadStations] = useState(false);

  return (
    <div className="row">
      <div className="col-6">
        <div className="container">
          <Lines onSelected={(line) => setSelectedLine(line)} />
          <hr />
          <LineWaitingTimes line={selectedLine}/>
        </div>
      </div>
      <div className="col-6">
        { shouldLoadStations ? <Stations /> : <button onClick={() => setShouwLoadStations((current) => !current)}>LOAD Stations</button> }
      </div>
    </div>
  );
}

export default App;
