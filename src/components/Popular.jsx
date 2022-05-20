import { useEffect } from 'react'


function Popular() {

    const getReceips = async( )=>{
        try {
            const data = await fetch(`www.themealdb.com/api/v1/1/list.php?c=list            `);
            console.log( data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getReceips();
    },[])
  return (
    <div>Popular</div>
  )
}

export default Popular;
