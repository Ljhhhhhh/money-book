import React, { Component, Fragment } from "react";
import PriceList from "../components/PriceList";
import ViewTab from "../components/ViewTab";
import MonthPicker from "../components/MonthPicker";
import CreateBtn from "../components/CreateBtn";
import TotalPrice from "../components/TotalPrice";
import logo from "../logo.svg";
import { LIST_VIEW, CHART_VIEW, TYPE_INCOME, TYPE_OUTCOME, parseToYearAndMonth, padLeft } from "../utility";
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
}
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
}

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items,
      currentDate: parseToYearAndMonth(),
      tabView: LIST_VIEW
    }
  }

  changeView = view => {
    this.setState({
      tabView: view
    })
  }

  changeDate = (year, month) => {
    this.setState({
      currentDate: {year, month}
    })
  }
  modifyItem = (item) => {
    const items = this.state.items;
    items.map(current => {
      if (current.id === item.id) {
        current.title += '更新'
      }
      return current;
    });
    this.setState({
      items
    })
  }

  createItem = () => {
    this.setState({
      items: [newItem, ...this.state.items]
    }, () => {
      console.log(this.state.items);
    })
  }

  deleteItem = (item) => {
    console.log(item);
    const newItemArr = this.state.items.filter(current => {
      return item.id !== current.id
    })
    this.setState({
      items: newItemArr
    })
  }

  render() {
    const {items, currentDate, tabView} = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categorys[item.cid]
      return item
    }).filter(item => {
      return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
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
          {
            tabView === LIST_VIEW && <PriceList items={itemsWithCategory} onModifyItem={this.modifyItem} onDeleteItem={this.deleteItem} />
          }
          {
            tabView === CHART_VIEW && <div>hello chart</div>
          }
          
        </div>
      </Fragment>
    );
  }
}

export default Home;
