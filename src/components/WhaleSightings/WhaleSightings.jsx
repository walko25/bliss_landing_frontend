import { useState } from "react";
import Modal from "../Modal/Modal";
import "./WhaleSightings.css";

function WhaleSightings() {
  const [formData, setFormData] = useState({
    species: "",
    count: "",
    direction: "",
    date: "",
    time: "",
    notes: "",
  });

  const [sightings, setSightings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSighting = {
      ...formData,
      id: Date.now(),
    };

    setSightings((prev) => [newSighting, ...prev]);

    setFormData({
      species: "",
      count: "",
      direction: "",
      date: "",
      time: "",
      notes: "",
    });

    setIsModalOpen(false);
  };

  return (
    <div className="sightings">
      <div className="sightings__container">
        <header className="sightings__header">
          <h1 className="sightings__title">Whale & Dolphin Sightings</h1>
          <p className="sightings__subtitle">
            Help us track marine life in our waters
          </p>
        </header>

        <div className="sightings__content">
          <button
            className="sightings__report-button"
            onClick={() => setIsModalOpen(true)}
          >
            Report a Sighting
          </button>

          <section className="sightings__list-section">
            <h2 className="sightings__section-title">Recent Sightings</h2>
            {sightings.length === 0 ? (
              <p className="sightings__empty">
                No sightings reported yet. Be the first!
              </p>
            ) : (
              <div className="sightings__list">
                {sightings.map((sighting) => (
                  <div key={sighting.id} className="sighting-card">
                    <div className="sighting-card__header">
                      <h3 className="sighting-card__species">
                        {sighting.species}
                      </h3>
                      <span className="sighting-card__count">
                        {sighting.count} spotted
                      </span>
                    </div>
                    <div className="sighting-card__details">
                      <p className="sighting-card__detail">
                        <strong>Direction:</strong> {sighting.direction}
                      </p>
                      <p className="sighting-card__detail">
                        <strong>Date:</strong> {sighting.date} at{" "}
                        {sighting.time}
                      </p>
                      {sighting.notes && (
                        <p className="sighting-card__notes">{sighting.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="modal__title">Report a Sighting</h2>
        <form className="sightings-form" onSubmit={handleSubmit}>
          <div className="sightings-form__group">
            <label className="sightings-form__label" htmlFor="species">
              Species *
            </label>
            <select
              className="sightings-form__input sightings-form__input--select"
              id="species"
              name="species"
              value={formData.species}
              onChange={handleChange}
              required
            >
              <option value="">Select a species</option>
              <option value="Orca (Killer Whale)">Orca (Killer Whale)</option>
              <option value="Humpback Whale">Humpback Whale</option>
              <option value="Gray Whale">Gray Whale</option>
              <option value="Minke Whale">Minke Whale</option>
              <option value="Pacific White-sided Dolphin">
                Pacific White-sided Dolphin
              </option>
              <option value="Dall's Porpoise">Dall's Porpoise</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="sightings-form__group">
            <label className="sightings-form__label" htmlFor="count">
              Number of Animals *
            </label>
            <input
              className="sightings-form__input"
              type="number"
              id="count"
              name="count"
              min="1"
              value={formData.count}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sightings-form__group">
            <label className="sightings-form__label" htmlFor="direction">
              Direction of Travel *
            </label>
            <select
              className="sightings-form__input sightings-form__input--select"
              id="direction"
              name="direction"
              value={formData.direction}
              onChange={handleChange}
              required
            >
              <option value="">Select a direction</option>
              <option value="North">North</option>
              <option value="Northeast">Northeast</option>
              <option value="East">East</option>
              <option value="Southeast">Southeast</option>
              <option value="South">South</option>
              <option value="Southwest">Southwest</option>
              <option value="West">West</option>
              <option value="Northwest">Northwest</option>
              <option value="Stationary">Stationary</option>
            </select>
          </div>

          <div className="sightings-form__group">
            <label className="sightings-form__label" htmlFor="date">
              Date *
            </label>
            <input
              className="sightings-form__input"
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sightings-form__group">
            <label className="sightings-form__label" htmlFor="time">
              Time *
            </label>
            <input
              className="sightings-form__input"
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="sightings-form__group">
            <label className="sightings-form__label" htmlFor="notes">
              Additional Notes
            </label>
            <textarea
              className="sightings-form__input sightings-form__input--textarea"
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Any additional observations..."
            />
          </div>

          <button className="sightings-form__submit" type="submit">
            Submit Sighting
          </button>
        </form>
      </Modal>
    </div>
  );
}

export default WhaleSightings;
