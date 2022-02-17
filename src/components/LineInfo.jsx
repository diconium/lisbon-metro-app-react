import { useState, useEffect, useCallback } from 'react';
import { parse, formatDistanceToNow } from 'date-fns'
import { api } from '../api';
import { useStations, useDestinations } from '../context/App';

export const LineInfo = (props) => {
  const line = props.line;
  const [lineInfo, setLineInfo] = useState();
  const stations = useStations();
  const destinations = useDestinations();

  const mapIdsToNames = useCallback((lines) => lines.map(line => {
    const station = stations.find(({ id }) => id === line.id);
    const destination = destinations.find(({ id }) => id.toString() === line.destination);

    console.log({ destinations, destination, line });
    return (station && destination) ? { ...line, id: station.name, destination: destination.name } : line;

  }), [stations, destinations]);

  useEffect(() => {
    if (!line) {
      return;
    }

    setLineInfo([]);
    api.getLineInfo(line).then(mapIdsToNames).then(lines => {
      setLineInfo(lines);
    });
  }, [line, mapIdsToNames]);

  if (!line) {
    return null;
  }

  if (!lineInfo?.length) {
    return 'Nothing to show.'
  }

  return (
    <>
      <h2 className='text-uppercase'>{line} line waiting times</h2>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Destination</th>
            <th>Dock</th>
            <th>Hour</th>
          </tr>
        </thead>
        <tbody>
          {lineInfo.map((info, index) => (
            <tr key={index}>
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
