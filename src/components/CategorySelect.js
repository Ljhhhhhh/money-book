import React, {useState} from "react";
import Ionicon from "react-ionicons";
import PropTypes from "prop-types";
import { Colors } from "../utility";

const CategorySelect = props => {
  const { categories, selectedCategory } = props;
  const selectedCategoryId = selectedCategory && selectedCategory.id;
  const [currentId, setCurrentId] = useState(selectedCategoryId)

  const selectCategory = (event, category) => {
    props.onSelectCategory(category);
    setCurrentId(category.id)
    event.preventDefault();
  };

  return (
    <div className="category-select-component">
      <div className="row">
        {categories.map((category, index) => {
          const iconColor =
            category.id === currentId ? Colors.white : Colors.gray;
          const backColor =
            category.id === currentId ? Colors.blue : Colors.lightGray;
          const activeClassName =
          currentId === category.id
              ? "category-item col-3 active"
              : "category-item col-3";
          return (
            <div
              className={activeClassName}
              key={index}
              role="button"
              style={{ textAlign: "center" }}
              onClick={event => {
                selectCategory(event, category);
              }}>
              <Ionicon
                className="rounded-circle"
                style={{ backgroundColor: backColor, padding: "5px" }}
                fontSize="50px"
                color={iconColor}
                icon={category.iconName}
              />
              <p>{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CategorySelect.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired
};

export default CategorySelect;
