import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Recipe() {
  let {name} = useParams();
  const [ details, setDetails] = useState([]);

  const getDetails = async(name)=>{
    try {
      const response = await axios.get(`http://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`, {
        headers:{
            "accepts":"application/json"
        }
    });
      // const data = await response.json();

      // setDetails(data.meals);
      setDetails(response);
      console.log(details);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetails(name);
  
  }, [name])
  
  return (
    <div>Recipe</div>
  )
}

export default Recipe