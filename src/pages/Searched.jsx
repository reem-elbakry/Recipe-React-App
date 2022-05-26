import { useState, useEffect }  from 'react'
import {useParams} from 'react-router-dom';
import '../components/Card.css';


function Searched() {
    let {search} = useParams()
    console.log(search);
    const [searchedMeal, setSearchedMeal] = useState([]);
    const getSearched = async(search)=>{
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
            const data = await response.json();
            console.log(data);
            setSearchedMeal(data.meals)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getSearched(search);
    },[search])
 
  return (
    <>
    <h4 className="text-center"><strong>{search} Search Results ...</strong></h4>
    <hr />
    <div className="container" >
      <div className="row">
        {searchedMeal.map((meal, index) => {
          return (

            <div className="col-md-4" key={index}>
              <div className="profile-card-2"><img src={ meal.strMealThumb !== 'N/A' ? meal.strMealThumb+'/preview' : 'https://via.placeholder.com/400' } className="img img-responsive" alt={meal.strMeal} />
                <div className="profile-name">{meal.strMeal}</div>
              </div>
            </div>

          )
        })}
      </div>
    </div>
  </>
  )
}

export default Searched