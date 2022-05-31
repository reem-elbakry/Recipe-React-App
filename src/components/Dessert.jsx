import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Dessert() {
  let [meals, setMeals] = useState([]);
  const getReceips = async () => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`);
      const data = await response.json();

      setMeals(data.meals)
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getReceips();
  }, [])

  return (

    <>
      <div class="col-span-full mb-3">
        <p class="text-xl text-gray-800"> Our delicious dessert </p>
      </div>

      <Splide aria-labelledby="Popular" options={{
        perPage: 4,
        arrows: false,
        pagination: false,
        drag: "free",
        gap: "1.5rem",
      }}>
        {meals.map((meal, index) => {
          return (

            <SplideSlide key={index}>
              <div class="col-span-2">
                <Link to={'/recipe/' + meal.idMeal}>
                  <img src={meal.strMealThumb !== 'N/A' ? meal.strMealThumb + '/preview' : 'https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png'} class="rounded-xl brightness-75 w-52 h-44" alt={meal.strMeal} />
                </Link>
                <p class="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-15 sm:text-base translate-x-3">{meal.strMeal}</p>
              </div>
            </SplideSlide>
          )
        })}
      </Splide>


    </>

  )
}

export default Dessert




