import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { padLeft, range } from "../utility";

const MonthPicker = props => {
  const { year, month } = props;
  const [isOpen, setOpen] = useState(true);
  const [selectedYear, setSelectedYear] = useState(year);
  const monthRange = range(12, 1);
  const yearRange = range(9, -4).map(number => number + year);

  const toggleDropdown = useCallback(
    e => {
      e.preventDefault();
      setOpen(!isOpen);
    },
    [isOpen]
  );

  const selectYear = (e, year) => {
    e.preventDefault();
    setSelectedYear(year);
  };

  const selectMonth = (e, month) => {
    e.preventDefault();
    setOpen(false);
    props.onChange(selectedYear, month);
  };

  return (
    <div className="dropdown month-picker-component" id="monthPicker">
      <h4>选择月份</h4>
      <button
        className="btn btn-lg btn-secondary dropdown-toggle"
        onClick={toggleDropdown}>
        {`${selectedYear}年${padLeft(month)}月`}
      </button>
      {isOpen && (
        <div className="dropdown-menu" style={{ display: "block" }}>
          <div className="row">
            <div className="col border-right">
              {yearRange.map((yearNumber, index) => (
                <a
                  href="/"
                  key={index}
                  className={
                    selectedYear === yearNumber
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  onClick={e => {
                    selectYear(e, yearNumber);
                  }}>
                  {yearNumber} 年
                </a>
              ))}
            </div>
            <div className="col">
              {monthRange.map((monthNumber, index) => (
                <a
                  href="/"
                  key={index}
                  className={
                    month === monthNumber
                      ? "dropdown-item active"
                      : "dropdown-item"
                  }
                  onClick={e => selectMonth(e, monthNumber)}>
                  {padLeft(monthNumber)} 月
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

MonthPicker.propTypes = {
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MonthPicker;
