import React, { Component, Fragment } from "react";
import Ionicon from "react-ionicons";
import PriceList from "../components/PriceList";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import TotalPrice from "../components/TotalPrice";
import { Tabs, Tab } from "../components/Tabs";
import logo from "../logo.svg";
import {
  LIST_VIEW,
  CHART_VIEW,
  TYPE_INCOME,
  TYPE_OUTCOME,
  parseToYearAndMonth,
  padLeft
} from "../utility";
export const categorys = {
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
};
export const items = [
  {
    id: 1,
    title: "去旅游",
    price: 2000,
    date: "2019-04-29",
    cid: 1
  },
  {
    id: 2,
    title: "去吃大餐",
    price: 400,
    date: "2019-05-02",
    cid: 2
  }
];

const newItem = {
  id: 3,
  title: "吃喝玩乐",
  price: 800,
  date: "2019-04-29",
  cid: 2
};

const tabsText = [LIST_VIEW, CHART_VIEW];

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: tabsText[0]
    };
  }

  changeView = index => {
    this.setState({
      tabView: tabsText[index]
    });
  };

  changeDate = (year, month) => {
    this.setState({
      currentDate: { year, month }
    });
  };
  modifyItem = item => {
    const items = this.state.items;
    items.map(current => {
      if (current.id === item.id) {
        current.title += "更新";
      }
      return current;
    });
    this.setState({
      items
    });
  };

  createItem = () => {
    this.setState(
      {
        items: [newItem, ...this.state.items]
      },
      () => {
        console.log(this.state.items);
      }
    );
  };

  deleteItem = item => {
    console.log(item);
    const newItemArr = this.state.items.filter(current => {
      return item.id !== current.id;
    });
    this.setState({
      items: newItemArr
    });
  };

  render() {
    const { items, currentDate, tabView } = this.state;
    const itemsWithCategory = items
      .map(item => {
        item.category = categorys[item.cid];
        return item;
      })
      .filter(item => {
        return item.date.includes(
          `${currentDate.year}-${padLeft(currentDate.month)}`
        );
      });
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
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onChange={this.changeDate}
              />
            </div>
            <div className="col">
              <TotalPrice income={totalIncome} outcome={totalOutcome} />
            </div>
          </div>
        </header>
        <div className="content-area py3 px3">
          <Tabs activeIndex={0} onTabChange={this.changeView}>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={"#007bff"}
                icon="ios-paper"
              />
              列表模式
            </Tab>
            <Tab>
              <Ionicon
                className="rounded-circle mr-2"
                fontSize="25px"
                color={"#007bff"}
                icon="ios-pie"
              />
              图表模式
            </Tab>
          </Tabs>
          <CreateBtn onClick={this.createItem} />
          {tabView === LIST_VIEW && (
            <PriceList
              items={itemsWithCategory}
              onModifyItem={this.modifyItem}
              onDeleteItem={this.deleteItem}
            />
          )}
          {tabView === CHART_VIEW && <div>hello chart</div>}
        </div>
      </Fragment>
    );
  }
}

export default Home;
