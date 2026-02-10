import './TideInfo.css';

function TideInfo({ tideData, loading, error }) {
  if (loading) {
    return (
      <div className="tide-info">
        <div className="tide-info__content">
          <p className="tide-info__loading">Loading tide data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="tide-info">
        <div className="tide-info__content">
          <p className="tide-info__error">Tide data unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="tide-info">
      <div className="tide-info__content">
        <div className="tide-info__label">Current Tide Level</div>
        <div className="tide-info__value">{tideData.v} ft</div>
        <div className="tide-info__time">
          Updated: {new Date(tideData.t).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default TideInfo;
