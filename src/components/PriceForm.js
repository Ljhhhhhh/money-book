import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { isValidDate } from "../utility";

const PriceForm = props => {
  const { title, price, date } = props.item;
  const [validatePass, setValidatePass] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const sumbitForm = event => {
    const { item, onFormSubmit } = props;
    const editMode = !!item.id;
    const priceVal = priceInput.current.value.trim() * 1;
    const dateVal = dateInput.current.value.trim();
    const titleVal = titleInput.current.value.trim();
    if (priceVal && dateVal && titleVal) {
      if (priceVal < 0) {
        setValidatePass(false);
        setErrorMessage("价格数字必须大于0");
      } else if (!isValidDate(dateVal)) {
        setValidatePass(false);
        setErrorMessage("请填写正确的日期格式");
      } else {
        setValidatePass(true);
        setErrorMessage("");
        if (editMode) {
          onFormSubmit({ ...item, titleVal, priceVal, dateVal }, editMode);
        } else {
          onFormSubmit({ titleVal, priceVal, dateVal }, editMode);
        }
      }
    } else {
      setValidatePass(false);
      setErrorMessage("请输入所有必选项");
    }
    event.preventDefault();
  };

  const titleInput = useRef();
  const priceInput = useRef();
  const dateInput = useRef();
  return (
    <form
      onSubmit={event => {
        sumbitForm(event);
      }}
      noValidate>
      <div className="form-group">
        <label htmlFor="title">标题 *</label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="请输入标题"
          defaultValue={title}
          ref={titleInput}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">价格 *</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">¥</span>
          </div>
          <input
            type="number"
            className="form-control"
            defaultValue={price}
            id="price"
            placeholder="请输入价格"
            ref={priceInput}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="date">日期 *</label>
        <input
          type="date"
          className="form-control"
          id="date"
          placeholder="请输入日期"
          defaultValue={date}
          ref={dateInput}
        />
      </div>
      <button type="submit" className="btn btn-primary mr-3">
        提交
      </button>
      <button className="btn btn-secondary" onClick={props.onCancelSubmit}>
        {" "}
        取消{" "}
      </button>
      {!validatePass && (
        <div className="alert alert-danger mt-5" role="alert">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

PriceForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  onCancelSubmit: PropTypes.func.isRequired,
  item: PropTypes.object
};
PriceForm.defaultProps = {
  item: {}
};

export default PriceForm;
