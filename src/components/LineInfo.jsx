import { useEffect, useState } from 'react';
import { formatDistanceToNow, addSeconds } from 'date-fns'
import { useLineInfo } from '../hooks/useLineInfo';
import { Spinner } from './Spinner';

export const LineInfo = ({ line }) => {
  const { lineInfo, isLoading } = useLineInfo(line);
  const [nextUpdateIn, setNextUpdateIn] = useState(15);

  useEffect(() => {
    if (!line) {
      return;
    }

    const interval = setInterval(() => setNextUpdateIn(curr => --curr || 15), 1000);

    return () => clearInterval(interval)
  }, [lineInfo]);

  if (isLoading && !lineInfo) {
    return <Spinner />;
  }

  if (!lineInfo?.length) {
    return (
      <div className="alert alert-secondary" role="alert">
        <p>Nothing to show.</p>
        <p>Please select one Metro Line to see more info.</p>
      </div>
    );
  }

  const deadEnd = lineInfo.reduce((acc, info) => {
    if (acc.has(info.destination)) {
      acc.get(info.destination).push(info)
    } else {
      acc.set(info.destination, [info]);
    }

    return acc;
  }, new Map());

  return (
    <div className='row'>
      <div className="d-flex justify-content-between">
        <h2 className='text-uppercase'>{ line } line informations</h2>
        <span>
          Next update in <strong>{ nextUpdateIn }</strong> seconds
        </span>
      </div>
      {[...deadEnd.entries()].map(([title, infos]) => (
        <div key={title} className="col-12 col-lg-6">
          <table className="table table-striped table-hover">
            <caption className='caption-top w-100'>Goign to {title}</caption>
            <thead>
              <tr>
                <th>Station</th>
                <th>Last Stop</th>
                <th>Next trains</th>
              </tr>
            </thead>
            <tbody>
              {infos.map((info, index) => (
                <tr key={index}>
                  <td>{info.id}</td>
                  <td>{info.destination}</td>
                  <td>
                    {info.trains.map(train => (
                      <div key={train.id}>
                        {formatDistanceToNow(addSeconds(Date.now(), train.arriveIn))}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
