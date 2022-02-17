import { useState } from 'react';

import './App.css';
import { Lines } from './components/Lines';
import { LineWaitingTimes } from './components/LineWaitingTimes';
import { StationsProvider } from './context/Stations';

function App() {
  const [selectedLine, setSelectedLine] = useState();

  return (
    <div className="row">
      <div className="col-6">
        <div className="container">
          <StationsProvider>
            <Lines onSelected={(line) => setSelectedLine(line)} />
            <hr />
            <LineWaitingTimes line={selectedLine}/>
          </StationsProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
