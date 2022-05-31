import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

function Cuisine() {
    const [meals, setMeals] = useState([]);
    let { area } = useParams('area');

    const getCuisine = async (area) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
            const data = await response.json();
            setMeals(data.meals);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCuisine(area);
    }, [area])

    return (
        <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <hr />
            <div class="flex flex-wrap justify-center">
                {meals.map((meal, index) => {
                    return (

                        <div class="col-span-2 m-3" key={index}>
                            <Link to={'/recipe/' + meal.idMeal}>
                                <img src={meal.strMealThumb !== 'N/A' ? meal.strMealThumb + '/preview' : 'https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png'} class="rounded-xl brightness-75 w-52 h-44" alt={meal.strMeal} />
                            </Link>
                            <p class="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-15 sm:text-base translate-x-3">{meal.strMeal}</p>
                        </div>
                    )
                })}
            </div>
        </motion.div>
    )
}

export default Cuisine