import './App.css';
import foods from './foods.json'
import React, { useState } from 'react';
import { Button } from 'antd';
import FoodBox from './Components/FoodBox';
import AddFoodForm from './Components/AddFoodForm';
import Search from './Components/Search';

function App() {
  const [foodArr, setFoodArr] = useState(foods)
  const [foodsData] = useState(foods)
  const [show, setShow] = useState(true)

  const addFood = food => {
    let foodsCopy =  [...foodArr]
    foodsCopy.unshift(food)
    setFoodArr(foodsCopy)
  }

  const searchFoods = str => {
    let searchResult
    
    searchResult = foodsData.filter(food => {
      return food.name.toLowerCase().startsWith(str.toLowerCase())
    })
    setFoodArr(searchResult)
  }

  const deleteFood = (foodName) => {
    let filteredFood = foodArr.filter(food => food.name !== foodName)
    
    setFoodArr(filteredFood)
  }

  return (
      <div className="App">
        <fieldset><legend>Add Food Entry</legend>
          { show && <AddFoodForm addFood={addFood}/> }
          <div>
            <Button className={ show ? 'hide-btn' : 'add-new-food' }
              onClick={() => setShow(!show)}>
              { show ? 'Hide Form' : 'Add New Food' }
            </Button>
          </div>
        </fieldset>
        <fieldset><legend>Search</legend>
          <Search searchFoods={searchFoods}/>
        </fieldset>
        <fieldset className='food-list'><legend>Food List</legend>
          { foodArr.map(food => {
            return (
              <FoodBox food={food} deleteFood={deleteFood} key={food.name}/>
              
            )
          }) }
        </fieldset>

        { foodArr.length === 0 
          ? 
          <div>
            <h3>Oops! There is no more content to show.</h3>
            
          </div>
          
           : '' }
      </div>
  );
}

export default App;
