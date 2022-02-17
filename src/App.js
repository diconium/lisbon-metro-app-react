import { useState } from 'react';

import './App.css';
import { Lines } from './components/Lines';
import { LineInfo } from './components/LineInfo';
import { AppProvider } from './context/App';

function App() {
  const [selectedLine, setSelectedLine] = useState();

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="container">
          <AppProvider>
            <Lines onSelected={(line) => setSelectedLine(line)} />
            <LineInfo line={selectedLine}/>
          </AppProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
