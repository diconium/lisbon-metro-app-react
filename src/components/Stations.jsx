import { useState, useEffect, useMemo } from 'react';
import { api } from '../api';

export const Stations = () => {
  const [stations, setStations] = useState();
  const [term, setTerm] = useState('');

  useEffect(() => {
    api.getStations().then(data => {
      setStations(data);
    })
  }, []);

  const filteredStations = useMemo(() => {
    return term ? stations?.filter(station => station.id.toLowerCase().includes(term.toLowerCase())) : stations;
  }, [stations, term]);


  if (!stations) {
    return null;
  }

  return (
    <div className="container">
      <h2 className='text-uppercase'>Stations</h2>

      <label class="form-label">Search</label>
      <input type="text" class="form-control" aria-describedby="searchStations" onChange={(e) => setTerm(e.target.value)} value={term} />

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Zone</th>
          </tr>
        </thead>
        <tbody>
          {filteredStations.map((info, index) => (
            <tr key={index}>
              <td>{info.id}</td>
              <td>{info.name}</td>
              <td>{info.position.lat}, {info.position.lon}</td>
              <td>{info.zoneId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
