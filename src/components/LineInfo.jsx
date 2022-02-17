import { parse, formatDistanceToNow } from 'date-fns'
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

  const [firstDeadEnd, secondDeadEnd] = deadEnd.entries();

  return (
    <div className='row'>
      <h2 className='text-uppercase'>{line} line informations</h2>
      <div className="col-12 col-md-6">
        <table className="table table-striped table-hover">
          <caption className='caption-top w-100'>Goign to {firstDeadEnd[0]}</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Dock</th>
              <th>Last update</th>
            </tr>
          </thead>
          <tbody>
            {firstDeadEnd[1].map((info, index) => (
              <tr key={index}>
                <td>{info.id}</td>
                <td>{info.destination}</td>
                <td>{info.dock}</td>
                <td>{formatDistanceToNow(parse(info.hour, 'yyyyMMddHmmss', new Date()), )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-12 col-md-6">
        <table className="table table-striped table-hover">
          <caption className='caption-top w-100'>Goign to {secondDeadEnd[0]}</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Dock</th>
              <th>Last update</th>
            </tr>
          </thead>
          <tbody>
            {secondDeadEnd[1].map((info, index) => (
              <tr key={index}>
                <td>{info.id}</td>
                <td>{info.destination}</td>
                <td>{info.dock}</td>
                <td>{formatDistanceToNow(parse(info.hour, 'yyyyMMddHmmss', new Date()), )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
