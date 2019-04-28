import React, {useState, useCallback} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PriceList from './components/PriceList'
import ViewTab from './components/ViewTab'
import MonthPicker from './components/MonthPicker'
import {LIST_VIEW} from './utility'

const items = [
  {
    id: 1,
    title: '去旅游',
    price: 2000,
    date: '2019-5-1',
    category: {
      id: 1,
      name: '旅游',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  },
  {
    id: 2,
    title: '去吃大餐',
    price: 400,
    date: '2019-5-2',
    category: {
      id: 1,
      name: '吃饭',
      type: 'outcome',
      iconName: 'ios-plane'
    }
  }
]

function App() {
  const [currentView, setView] = useState(LIST_VIEW)
  const [year, setYear] = useState(2019)
  const [month, setMonth] = useState(5)

  const onTabChange = useCallback(view => {
    setView(view)
  }, [])

  const timeChange = useCallback((year, month) => {
    setMonth(month)
    setYear(year)
  }, [])

  return (
    <div className="App">
      <PriceList items={items} onModifyItem={item => {console.log(item);}} onDeleteItem={item => {console.log(item);}}></PriceList>
      <ViewTab activeTab={currentView} onTabChange={onTabChange} />
      <MonthPicker year={year} month={month} onChange={timeChange} />
    </div>
  );
}

export default App;
