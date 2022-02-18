import { useState } from 'react';

import './App.css';
import { Lines } from './components/Lines';
import { LineInfo } from './components/LineInfo';
import { AppProvider } from './context/App';
import { Map } from './components/Map';

function App() {
  const [selectedLine, setSelectedLine] = useState();

  return (
    <div className="container-fluid mt-3">
      <div className="row">
        <AppProvider>
            <div className="col-12 col-lg-8">
              <div className="container">
                <Lines onSelected={(line) => setSelectedLine(line)} />
                <LineInfo line={selectedLine}/>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <Map selectedLine={selectedLine} />
            </div>
        </AppProvider>
      </div>
    </div>
  );
}

export default App;
