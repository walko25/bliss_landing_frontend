import { useState } from 'react';
import './CourtReservations.css';

function CourtReservations() {
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
    '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'
  ];

  const [reservations, setReservations] = useState({
    pickleball: {},
    tennis: {}
  });

  const [formData, setFormData] = useState({
    name: '',
    courtType: 'pickleball',
    date: '',
    timeSlot: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { courtType, date, timeSlot, name } = formData;
    const reservationKey = `${date}-${timeSlot}`;

    setReservations(prev => ({
      ...prev,
      [courtType]: {
        ...prev[courtType],
        [reservationKey]: name
      }
    }));

    setFormData({
      name: '',
      courtType: 'pickleball',
      date: '',
      timeSlot: ''
    });
  };

  const isSlotBooked = (courtType, date, timeSlot) => {
    const reservationKey = `${date}-${timeSlot}`;
    return reservations[courtType][reservationKey];
  };

  const getReservationsForDate = (date) => {
    if (!date) return null;

    const pickleballSlots = timeSlots.map(slot => ({
      time: slot,
      bookedBy: isSlotBooked('pickleball', date, slot)
    }));

    const tennisSlots = timeSlots.map(slot => ({
      time: slot,
      bookedBy: isSlotBooked('tennis', date, slot)
    }));

    return { pickleball: pickleballSlots, tennis: tennisSlots };
  };

  const [viewDate, setViewDate] = useState('');
  const dateReservations = getReservationsForDate(viewDate);

  return (
    <div className="courts">
      <div className="courts__container">
        <header className="courts__header">
          <h1 className="courts__title">Court Reservations</h1>
          <p className="courts__subtitle">Reserve your pickleball or tennis court time</p>
        </header>

        <div className="courts__content">
          <section className="courts__form-section">
            <h2 className="courts__section-title">Make a Reservation</h2>
            <form className="courts-form" onSubmit={handleSubmit}>
              <div className="courts-form__group">
                <label className="courts-form__label" htmlFor="name">
                  Your Name *
                </label>
                <input
                  className="courts-form__input"
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="courts-form__group">
                <label className="courts-form__label" htmlFor="courtType">
                  Court Type *
                </label>
                <select
                  className="courts-form__input courts-form__input--select"
                  id="courtType"
                  name="courtType"
                  value={formData.courtType}
                  onChange={handleChange}
                  required
                >
                  <option value="pickleball">Pickleball</option>
                  <option value="tennis">Tennis</option>
                </select>
              </div>

              <div className="courts-form__group">
                <label className="courts-form__label" htmlFor="date">
                  Date *
                </label>
                <input
                  className="courts-form__input"
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="courts-form__group">
                <label className="courts-form__label" htmlFor="timeSlot">
                  Time Slot *
                </label>
                <select
                  className="courts-form__input courts-form__input--select"
                  id="timeSlot"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a time slot</option>
                  {timeSlots.map(slot => {
                    const booked = formData.date && isSlotBooked(formData.courtType, formData.date, slot);
                    return (
                      <option key={slot} value={slot} disabled={booked}>
                        {slot} {booked ? '(Booked)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button className="courts-form__submit" type="submit">
                Reserve Court
              </button>
            </form>
          </section>

          <section className="courts__schedule-section">
            <h2 className="courts__section-title">View Schedule</h2>
            <div className="courts__date-picker">
              <label className="courts__date-label" htmlFor="viewDate">
                Select Date to View
              </label>
              <input
                className="courts__date-input"
                type="date"
                id="viewDate"
                value={viewDate}
                onChange={(e) => setViewDate(e.target.value)}
              />
            </div>

            {dateReservations ? (
              <div className="courts__schedules">
                <div className="court-schedule">
                  <h3 className="court-schedule__title court-schedule__title--pickleball">
                    Pickleball Court
                  </h3>
                  <div className="court-schedule__slots">
                    {dateReservations.pickleball.map(slot => (
                      <div
                        key={slot.time}
                        className={`time-slot ${slot.bookedBy ? 'time-slot--booked' : 'time-slot--available'}`}
                      >
                        <span className="time-slot__time">{slot.time}</span>
                        <span className="time-slot__status">
                          {slot.bookedBy ? slot.bookedBy : 'Available'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="court-schedule">
                  <h3 className="court-schedule__title court-schedule__title--tennis">
                    Tennis Court
                  </h3>
                  <div className="court-schedule__slots">
                    {dateReservations.tennis.map(slot => (
                      <div
                        key={slot.time}
                        className={`time-slot ${slot.bookedBy ? 'time-slot--booked' : 'time-slot--available'}`}
                      >
                        <span className="time-slot__time">{slot.time}</span>
                        <span className="time-slot__status">
                          {slot.bookedBy ? slot.bookedBy : 'Available'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="courts__empty">Select a date to view available time slots</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default CourtReservations;
