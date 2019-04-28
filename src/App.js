import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import PriceList from './components/PriceList'

const items = [
  {
    id: 1,
    title: '去旅游',
    price: 2000,
    date: '2019-5-1',
    category: {
      id: 1,
      name: '旅游',
      type: 'outcome'
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
      type: 'outcome'
    }
  }
]
function App() {
  return (
    <div className="App">
      <PriceList items={items}></PriceList>
    </div>
  );
}

export default App;
