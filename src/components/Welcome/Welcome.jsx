import welcomeImage from '../../assets/welcome-image.jpeg';
import TideInfo from '../TideInfo/TideInfo';
import './Welcome.css';

function Welcome({ tideData, tideLoading, tideError }) {
  return (
    <div className="welcome">
      <div className="welcome__container">
        <header className="welcome__header">
          <img src={welcomeImage} alt="Welcome to Bliss Landing" className="welcome__banner-image" />
        </header>

        <section className="welcome__content">
          <TideInfo tideData={tideData} loading={tideLoading} error={tideError} />
          <div className="welcome__section">
            <h2 className="welcome__section-title">About Us</h2>
            <p className="welcome__section-text">
              Nestled along the pristine coastline of British Columbia, Bliss Landing is a charming
              vacation community that has been bringing families together for over three decades.
              Founded in 1992, our community was established by a group of nature enthusiasts who
              dreamed of creating a peaceful retreat where people could reconnect with nature and
              each other.
            </p>
          </div>

          <div className="welcome__section">
            <h2 className="welcome__section-title">Our History</h2>
            <p className="welcome__section-text">
              What started as a small collection of cabins has grown into a thriving community of
              vacation homes, while maintaining the natural beauty and tranquility that first
              attracted settlers to this special place. The name "Bliss Landing" was chosen to
              reflect the sense of peace and happiness that visitors experience upon arrival.
            </p>
            <p className="welcome__section-text">
              Over the years, Bliss Landing has become known for its abundant marine wildlife,
              particularly the orcas and dolphins that frequent our waters. Our community takes
              great pride in being stewards of this incredible ecosystem, and we encourage all
              residents and visitors to respect and protect our natural surroundings.
            </p>
          </div>

          <div className="welcome__section">
            <h2 className="welcome__section-title">Community Amenities</h2>
            <p className="welcome__section-text">
              Today, Bliss Landing offers modern amenities including tennis and pickleball courts,
              waterfront access, and community gathering spaces, all while preserving the rustic
              charm that makes this place so special. We invite you to explore our community,
              report your wildlife sightings, and enjoy our recreational facilities.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Welcome;
