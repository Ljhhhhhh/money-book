import React, { Component, Fragment, useState, useCallback } from "react";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import TotalPrice from "../components/TotalPrice";
import logo from "../logo.svg";
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth } from "../utility";
const categorys = {
  "1": {
    id: 1,
    name: "旅游",
    type: "outcome",
    iconName: "ios-plane"
  },
  "2": {
    id: 2,
    name: "旅游",
    type: "outcome",
    iconName: "ios-plane"
  }
}
const items = [
  {
    id: 1,
    title: "去旅游",
    price: 2000,
    date: "2019-5-1",
    cid: 1
  },
  {
    id: 2,
    title: "去吃大餐",
    price: 400,
    date: "2019-5-2",
    cid: 2
  }
];

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    }
  }

  changeView = () => {
    
  }

  changeDate = () => {

  }
  modifyItem = () => {

  }

  createItem = () => {

  }

  deleteItem = () => {

  }

  render() {
    const {items, currentDate, tabView} = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categorys[item.cid]
      return item
    })
    let totalIncome = 0,
      totalOutcome = 0;
    items.forEach(item => {
      if (item.category.type === TYPE_OUTCOME) {
        totalOutcome += item.price;
      } else {
        totalIncome += item.price;
      }
    });
    return (
      <Fragment>
        <header className="app-header">
          <div className="row mb-5">
            <img src={logo} className="app-logo" alt="" />
          </div>
          <div className="row">
            <div className="col">
              <MonthPicker year={currentDate.year} month={currentDate.month} onChange={this.changeDate} />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py3 px3">
          <ViewTab activeTab={tabView} onTabChange={this.changeView} />
          <CreateBtn onClick={this.createItem} />
          <PriceList items={itemsWithCategory} onModifyItem={this.modifyItem} onDeleteItem={this.deleteItem} />
        </div>
      </Fragment>
    );
  }
}

export default Home;
