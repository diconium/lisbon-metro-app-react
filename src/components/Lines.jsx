import { useLines } from "../hooks/useLines";

export const Lines = ({ onSelected }) => {
  const { isLoading, lines } = useLines();

  if (isLoading && !lines) {
    return (
      <div className="d-flex align-items-center">
        <strong>Loading...</strong>
        <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </div>
    )
  }

  if (!lines) {
    return (
      <div className="alert alert-secondary" role="alert">
        Nothing to show.
      </div>
    );
  }

  const { green, blue, red, yellow } = lines;

  return (
    <>
      <h2 className='text-uppercase'>Line status</h2>
      <div className="row row-cols-1 row-cols-xl-4 g-4">
        <div className="col">
          <div className="card text-white bg-success mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header">Green</div>
            <div className="card-body">
              <h5 className="card-title">Status: { green.status }</h5>
              <p className="card-text">{ green.message === '0' ? <span className="text-italic">No messages</span> : null}</p>
            </div>
            <div className="card-footer">
              <button role="link" className="btn btn-secondary" onClick={() => onSelected('green')}>+ info</button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-white bg-info mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header">Blue</div>
            <div className="card-body">
              <h5 className="card-title">Status: { blue.status }</h5>
              <p className="card-text">{ blue.message === '0' ? <span className="text-italic">No messages</span> : null}</p>
            </div>
            <div className="card-footer">
              <button role="link" className="btn btn-secondary" onClick={() => onSelected('blue')}>+ info</button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-white bg-danger mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header">Red</div>
            <div className="card-body">
              <h5 className="card-title">Status: { red.status }</h5>
              <p className="card-text">{ red.message === '0' ? <span className="text-italic">No messages</span> : null}</p>
            </div>
            <div className="card-footer">
              <button role="link" className="btn btn-secondary" onClick={() => onSelected('red')}>+ info</button>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card text-white bg-warning mb-3" style={{ maxWidth: "18rem" }}>
            <div className="card-header">Yellow</div>
            <div className="card-body">
              <h5 className="card-title">Status: { yellow.status }</h5>
              <p className="card-text">{ yellow.message === '0' ? <span className="text-italic">No messages</span> : null}</p>
            </div>
            <div className="card-footer">
              <button role="link" className="btn btn-secondary" onClick={() => onSelected('yellow')}>+ info</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
