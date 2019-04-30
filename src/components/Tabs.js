import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

export const Tabs = props => {
  const { children, activeIndex } = props;
  const [active, setActive] = useState(activeIndex)

  const tabChange = (e, index) => {
    e.preventDefault();
    setActive(index)
    props.onTabChange(index)
  }

  return (
    <ul className="nav nav-tabs nav-fill my-4">
      {React.Children.map(children, (child, index) => {
        const activeClassName = (active === index) ? 'nav-link active' : 'nav-link'
        return (
          <li className="nav-item">
            <a 
              className={activeClassName} 
              onClick={(e) => tabChange(e, index)}
              href="/">
              {child}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

Tabs.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onTabChange: PropTypes.func.isRequired
};

export const Tab = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};
