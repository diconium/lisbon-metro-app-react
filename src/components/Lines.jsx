import { useState, useEffect } from 'react';

const linesEndpoint = 'http://localhost:3333/lines';

export const Lines = (props) => {
  const callback = props.onSelected;

  const [lines, setLines] = useState();

  useEffect(() => {
    fetch(linesEndpoint).then(data => data.json()).then(lines => {
      setLines(lines);
    });
  }, []);

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
                <button role="link" className="btn btn-link" onClick={() => callback('blue')}>Blue</button>
              </th>
              <th className={lines.blue.status === 'Ok' ? 'table-success' : ''}>{lines.blue.status}</th>
              <th>{lines.blue.message}</th>
            </tr>

            <tr>
              <th>
                <button role="link" className="btn btn-link" onClick={() => callback('red')}>Red</button>
              </th>
              <th className={lines.red.status === 'Ok' ? 'table-success' : ''}>{lines.red.status}</th>
              <th>{lines.red.message}</th>
            </tr>

            <tr>
              <th>
                <button role="link" className="btn btn-link" onClick={() => callback('green')}>Green</button>
              </th>
              <th className={lines.green.status === 'Ok' ? 'table-success' : ''}>{lines.green.status}</th>
              <th>{lines.green.message}</th>
            </tr>

            <tr>
              <th>
                <button role="link" className="btn btn-link" onClick={() => callback('yellow')}>Yellow</button>
              </th>
              <th className={lines.yellow.status === 'Ok' ? 'table-success' : ''}>{lines.yellow.status}</th>
              <th>{lines.yellow.message}</th>
            </tr>
          </tbody>
        </table>
    </>
  )
}
