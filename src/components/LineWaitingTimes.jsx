import { useState, useEffect } from 'react';
import { parse, formatDistanceToNow } from 'date-fns'

const lineInfoEndpoint = 'https://diconium-lisbon-job-fairs.herokuapp.com/lines';

export const LineWaitingTimes = (props) => {
  const line = props.line;
  const [lineInfo, setLineInfo] = useState([]);

  useEffect(() => {
    setLineInfo([]);
    fetch(`${lineInfoEndpoint}/${line}/waitingTimes`).then(data => data.json()).then(lines => {
      setLineInfo(lines);
    });
  }, [line]);

  return (
    <>
      <h2 className='text-uppercase'>{line} line waiting times</h2>
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
