import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Recipe() {
  const [ details, setDetails] = useState({});
  const [ activeTab, setActiveTab ] = useState("instructions");
  let {id} = useParams();
  console.log(id);
  const getDetails = async(id)=>{
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();

      setDetails(data.meals[0]);
      console.log(details);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDetails(id);
  
  }, [id])
  
  return (
    <DetailWrapper>
      <div>
        <h2>{details.strMeal}</h2>
        <img  src={details.strMealThumb + '/preview'} alt={details.strMeal}/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions'? 'active' : ''} onClick={()=>{setActiveTab("instructions")}}>Instructions</Button>
        <Button className={activeTab === 'ingredients'? 'active' : ''} onClick={()=>{setActiveTab("ingredients")}}>Ingredients</Button>
        <div>
          <h3 dangerouslySetInnerHTML={{__html: details.strInstructions?.split("\r\n").join(".")}}>
          </h3>
          <ul>
          
          {
            Object.keys(details).map(function(key, index) {
              if (/^strIngredient/.test(key)){
                return <li key={index}>{details[key]}</li>
              }
          })
          }
            <li>{details.strIngredient1}</li>
          </ul>
        </div>
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2{
    margin-bottom: 2rem;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul{
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  margin-bottom: 2rem;
`;

const Info = styled.div`
  margin-left: 10rem;
`

export default Recipe