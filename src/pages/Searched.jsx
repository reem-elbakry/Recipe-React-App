import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';


function Searched() {
  let { search } = useParams()
  const [searchedMeal, setSearchedMeal] = useState([]);
  const getSearched = async (search) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      const data = await response.json();
      setSearchedMeal(data.meals)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getSearched(search);
  }, [search])

  return (
    <>
      {/* <h4 className="text-center"><strong>{search} Search Results: </strong></h4> */}
      <hr />
      <div class="flex flex-wrap justify-center">
        {searchedMeal?.map((meal, index) => {
          return (
            <div class="col-span-2 m-3" key={index}>
              <Link to={'/recipe/' + meal.idMeal}>
                <img src={meal.strMealThumb !== 'N/A' ? meal.strMealThumb + '/preview' : 'https://wikiimg.tojsiabtv.com/wikipedia/en/a/aa/Little_Chef.png'} class="rounded-xl brightness-75 w-52 h-44" alt={meal.strMeal} />
              </Link>
              <p class="text-xs -translate-y-6 text-white font-semibold sm:-translate-y-8 sm:text-base translate-x-3">{meal.strMeal}</p>
            </div>
          )
        })}  <img src='https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg' alt='not found'/>
      </div>

    </>
  )
}

export default Searched