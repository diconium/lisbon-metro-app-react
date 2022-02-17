import { formatDistanceToNow } from 'date-fns'
import { addSeconds } from 'date-fns/esm';
import { useLineInfo } from '../hooks/useLineInfo';
import { Spinner } from './Spinner';

export const LineInfo = ({ line }) => {
  const { lineInfo, isLoading } = useLineInfo(line);

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
      <h2 className='text-uppercase'>{ line } line informations</h2>
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
