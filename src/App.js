import { useState, useEffect } from 'react';
import { parse, formatDistanceToNow } from 'date-fns'
import './App.css';

const linesEndpoint = 'http://localhost:3333/lines';
const lineInfoEndpoint = 'http://localhost:3333/lines';

function App() {
  const [lines, setLines] = useState();
  const [selectedLine, setSelectedLine] = useState('green');
  const [lineInfo, setLineInfo] = useState([]);

  useEffect(() => {
    fetch(linesEndpoint).then(data => data.json()).then(lines => {
      setLines(lines);
    });
  }, []);

  useEffect(() => {
    setLineInfo([]);
    fetch(`${lineInfoEndpoint}/${selectedLine}/waitingTimes`).then(data => data.json()).then(lines => {
      setLineInfo(lines);
    });
  }, [selectedLine]);

  if (!lines) {
    return null;
  }

  return (
    <>
      <h2 className='text-uppercase'>Line status</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Line</th>
            <th>Status</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>
              <button role="link" className="btn btn-link" onClick={() => setSelectedLine('blue')}>Blue</button>
            </th>
            <th className={lines.blue.status === 'Ok' ? 'table-success' : ''}>{lines.blue.status}</th>
            <th>{lines.blue.message}</th>
          </tr>

          <tr>
            <th>
              <button role="link" className="btn btn-link" onClick={() => setSelectedLine('red')}>Red</button>
            </th>
            <th className={lines.red.status === 'Ok' ? 'table-success' : ''}>{lines.red.status}</th>
            <th>{lines.red.message}</th>
          </tr>

          <tr>
            <th>
              <button role="link" className="btn btn-link" onClick={() => setSelectedLine('green')}>Green</button>
            </th>
            <th className={lines.green.status === 'Ok' ? 'table-success' : ''}>{lines.green.status}</th>
            <th>{lines.green.message}</th>
          </tr>

          <tr>
            <th>
              <button role="link" className="btn btn-link" onClick={() => setSelectedLine('yellow')}>Yellow</button>
            </th>
            <th className={lines.yellow.status === 'Ok' ? 'table-success' : ''}>{lines.yellow.status}</th>
            <th>{lines.yellow.message}</th>
          </tr>
        </tbody>
      </table>
      <hr />

      <h2 className='text-uppercase'>{selectedLine} line waiting times</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Dock</th>
            <th>Hour</th>
          </tr>
        </thead>
        <tbody>
          {lineInfo.map(info => (
            <tr>
              <td>{info.id}</td>
              <td>{info.destination}</td>
              <td>{info.dock}</td>
              <td>{formatDistanceToNow(parse(info.hour, 'yyyyMMddHmmss', new Date()), )}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
