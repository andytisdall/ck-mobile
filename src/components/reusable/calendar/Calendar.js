import {useState, useCallback} from 'react';
import moment from 'moment';

import './Calendar.css';

const Calendar = ({renderItems}) => {
  const [month, setMonth] = useState(moment());

  const getDays = useCallback(() => {
    const days = [];
    const firstDay = moment(`${month.format('YYYY-M')}-1`, 'YYYY-M-D').format(
      'd',
    );
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i < 32; i++) {
      const date = `${month.format('YYYY-M')}-${i}`;
      if (moment(date, 'YYYY-M-D').format('M') === month.format('M')) {
        days.push(moment(date, 'YYYY-M-D').format('YYYY-MM-DD'));
      }
    }
    return days.map((d, i) => {
      if (!d) {
        return <div key={i}></div>;
      }
      const items = renderItems(d);

      return (
        <div className="calendar-date" key={d}>
          <div className="calendar-date-number">
            {moment(d, 'YYYY-MM-DD').format('D')}
          </div>
          <div className="calendar-date-body">{items}</div>
        </div>
      );
    });
  }, [month, renderItems]);

  const calendar = () => {
    return (
      <>
        <div className="calendar-days">
          <div className="calendar-day">Sun</div>
          <div className="calendar-day">Mon</div>
          <div className="calendar-day">Tue</div>
          <div className="calendar-day">Wed</div>
          <div className="calendar-day">Thu</div>
          <div className="calendar-day">Fri</div>
          <div className="calendar-day">Sat</div>
        </div>
        <div className="calendar">{getDays()}</div>
      </>
    );
  };

  return (
    <div>
      <div className="calendar-top">
        <div className="calendar-header">
          <div
            className="calendar-header-arrow"
            onClick={() => {
              const lastMonth = month.subtract(1, 'month');
              setMonth(moment(lastMonth.format('M'), 'M'));
            }}>
            &larr;
          </div>
          <div className="calendar-header-month">
            {month.format('MMMM YYYY')}
          </div>
          <div
            className="calendar-header-arrow"
            onClick={() => {
              const nextMonth = month.add(1, 'month');
              setMonth(moment(nextMonth.format('M'), 'M'));
            }}>
            &rarr;
          </div>
        </div>
        <div className="calendar-header">
          <button
            onClick={() => setMonth(moment())}
            className="calendar-set-current">
            Set to Current Month
          </button>
        </div>
      </div>
      <div>{calendar()}</div>
    </div>
  );
};

export default Calendar;
