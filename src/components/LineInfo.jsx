import { parse, formatDistanceToNow } from 'date-fns'
import { useLineInfo } from '../hooks/useLineInfo';

export const LineInfo = ({ line }) => {
  const { lineInfo, isLoading } = useLineInfo(line);

  if (isLoading && !lineInfo) {
    return (
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>
    )
  }

  if (!lineInfo?.length) {
    return (
      <div className="alert alert-secondary" role="alert">
        <p>Nothing to show.</p>
        <p>Please select one Metro Line to see more info.</p>
      </div>
    );
  }

  const extremes = lineInfo.reduce((acc, info) => {
    if (acc.has(info.destination)) {
      acc.get(info.destination).push(info)
    } else {
      acc.set(info.destination, [info]);
    }

    return acc;
  }, new Map());

  const [firstExtreme, secondExtreme] = extremes.entries();

  return (
    <div className='row'>
      <h2 className='text-uppercase'>{line} line informations</h2>
      <div className="col-12 col-md-6">
        <table className="table table-striped table-hover">
          <caption className='caption-top w-100'>Goign to {firstExtreme[0]}</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Dock</th>
              <th>Last update</th>
            </tr>
          </thead>
          <tbody>
            {firstExtreme[1].map((info, index) => (
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
          <caption className='caption-top w-100'>Goign to {secondExtreme[0]}</caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Destination</th>
              <th>Dock</th>
              <th>Last update</th>
            </tr>
          </thead>
          <tbody>
            {secondExtreme[1].map((info, index) => (
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
