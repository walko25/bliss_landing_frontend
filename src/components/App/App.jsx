import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Welcome from '../Welcome/Welcome';
import WhaleSightings from '../WhaleSightings/WhaleSightings';
import CourtReservations from '../CourtReservations/CourtReservations';
import Footer from '../Footer/Footer';
import { AuthProvider } from '../../contexts/AuthContext';
import { fetchTideData } from '../../utils/api';
import './App.css';

const SEATTLE_STATION_ID = '9447130';

function App() {
  const [tideData, setTideData] = useState(null);
  const [tideLoading, setTideLoading] = useState(true);
  const [tideError, setTideError] = useState(null);

  useEffect(() => {
    fetchTideData(SEATTLE_STATION_ID)
      .then(data => {
        setTideData(data);
        setTideLoading(false);
      })
      .catch(error => {
        setTideError(error.message);
        setTideLoading(false);
      });
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navigation />
          <main className="app__main">
            <Routes>
              <Route
                path="/"
                element={
                  <Welcome
                    tideData={tideData}
                    tideLoading={tideLoading}
                    tideError={tideError}
                  />
                }
              />
              <Route path="/whale-sightings" element={<WhaleSightings />} />
              <Route path="/court-reservations" element={<CourtReservations />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
