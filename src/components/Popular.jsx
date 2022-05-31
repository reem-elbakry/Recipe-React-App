import { useEffect, useState } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';


function Popular() {

    let [meals, setMeals] = useState([]);
    const getReceips = async () => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=Egyptian`);
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
                <p class="text-xl text-gray-800"> Today's popular searches </p>
            </div>
            <Splide aria-labelledby="Popular" options={{
                perPage: 3,
                arrows: false,
                pagination: false,
                drag: "free",
                gap: "2rem",
            }}>

                {meals.map((meal, index) => {
                    return (

                        <SplideSlide>
                            <div class="col-span-2">
                                <Link to={'/recipe/'+ meal.idMeal}>
                                    <img src={meal.strMealThumb !== 'N/A' ? meal.strMealThumb + '/preview' : 'https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png'}   class="rounded-xl brightness-75 w-80 h-32" alt={meal.strMeal} />
                                </Link>
                                <p class="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">{meal.strMeal}</p>
                            </div>
                        </SplideSlide>
                    )
                })}
            </Splide>

        </>
    )
}




export default Popular;