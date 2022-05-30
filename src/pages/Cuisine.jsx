import { MotionConfig } from 'framer-motion';
import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import '../components/Card.css';

function Cuisine() {
  const [ cuisine, setCousine ] = useState([]);
  let {area} = useParams('area');

  const getCuisine = async(area)=>{
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
      const data = await response.json();
      setCousine(data.meals);
    } catch (error) {
      console.log(error);
    }
  } 

  useEffect(() => {
    getCuisine(area);
  }, [area])
  
  return (
    <motion.div
      animate= {{opacity: 1}}
      initial= {{opacity: 0}}
      exit= {{opacity: 0}}
      transition= {{duration: 0.5}}
    >
      <h4 className="text-center"><strong>{area} Picks</strong></h4>
      <hr />
      <div className="container" >
        <div className="row">
          {cuisine.map((cuisine, index) => {
            return (
              <div className="col-md-4" key={index}>
              <Link to={'/recipe/'+ cuisine.idMeal}>
                <div className="profile-card-2"><img src={ cuisine.strMealThumb + '/preview' !== 'N/A' ? cuisine.strMealThumb + '/preview' : 'https://via.placeholder.com/400'} className="img img-responsive" alt={cuisine.strMeal} />
                  <div className="profile-name">{cuisine.strMeal}</div>
                </div>
              </Link>

              </div>

            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default Cuisine