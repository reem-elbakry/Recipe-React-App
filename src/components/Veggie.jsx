import { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import './Card.css';
import { Link } from 'react-router-dom';



function Veggie() {

    let [meals, setMeals] = useState([]);
    const getReceips = async( )=>{
        //store fetched data in local storage ... to save api cotta 
        const check = localStorage.getItem('Veggie');

        if(check){
            setMeals(JSON.parse(check))
        }else{
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`);
                const data = await response.json();

                localStorage.setItem('Veggie', JSON.stringify(data.meals))
                setMeals(data.meals)
            } catch (error) {
                console.log(error);
            }
        }

    }

    useEffect(()=>{
        getReceips();
    },[])
  return (
      <>
          <h4 className="text-center"><strong>Vegetarian Picks</strong></h4>
          <hr />
          <Splide aria-labelledby="Popular" options={{
              perPage: 3,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "3rem",
          }}>
              {meals.map((meal, index) => {
                  return (
                      <SplideSlide key={index}>
                          <div className="container">
                              <div className="row">
                              <Link to={'/recipe/'+ meal.idMeal}>
                                  <div className="col-md-4">
                                      <div className="profile-card-2"><img src={meal.strMealThumb + '/preview'} className="img img-responsive" alt={meal.strMeal} />
                                          <div className="profile-name">{meal.strMeal}</div>
                                      </div>
                                  </div>
                                  </Link>
                              </div>
                          </div>
                      </SplideSlide>
                  )
              })}
          </Splide>
      </>
  )
}
export default Veggie;



