import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Recipe() {
    const [details, setDetails] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");





    let { id } = useParams();
    const getDetails = async (id) => {
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();

            setDetails(data.meals[0]);

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getDetails(id);

    }, [id])

    return (
        <>
            <hr />

            <button class="rounded-full p-3 font-bold text-white bg-orange-400 mt-10 ml-4"
                onClick={() => { setActiveTab("instructions") }}>Instructions</button>
            <button class="rounded-full p-3 font-bold text-white ml-2 bg-gray-400 mt-10"
                onClick={() => { setActiveTab("ingredients") }}>Ingredients</button>
            {
                activeTab === "instructions"
                &&
                <>

                    <section class="py-0 bg-white-100 my-4" >
                        <div class="grid grid-cols-1 sm:grid-cols-2  gap-10 mx-auto  items-center max-w-6xl mx-auto">
                            <div class="px-4 md:mr-6">
                                <p class="mt-0 text-stone-800  font-small" dangerouslySetInnerHTML={{ __html: details.strInstructions?.split("\r\n").join(".") }}></p>
                            </div>
                            <div>
                                <div class="absolute bg-orange-400 transform -translate-x-10 relative h-64">
                                </div>
                                <div class="transform md:rounded-md  bg-white rotate-3 scale-110 translate-x-10 md:shadow-2xl -ml-4 -mt-44 p-12  space-y-2">
                                    <div class="px-4 sm:px-0 gap-2 max-w-5xl mx-auto">
                                        <img src={details.strMealThumb + '/preview'} alt={details.strMeal} class="rounded" />
                                        <p class="mt-4 text-gray-500 text-xl font-medium">{details.strMeal}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section >
                </>

            }



            {
                activeTab === "ingredients"
                &&

                <div class="flex flex-wrap">
                    {
                        Object.keys(details).map(function (key, index) {
                            if (/^strIngredient/.test(key) && details[key] !== "")


                                return (
                                    
                                        <div class="col-span-2 m-5" key={index}>
                                            <img src={`https://www.themealdb.com/images/ingredients/${details[key]}-Small.png` !== 'N/A' ? `https://www.themealdb.com/images/ingredients/${details[key]}-Small.png` : 'https://www.food4fuel.com/wp-content/uploads/woocommerce-placeholder-600x600.png'} class="rounded-xl brightness-75" alt={details[key]} />
                                            <p class="text-xs -translate-y-0 text-orange-400 font-semibold sm:-translate-y-15 sm:text-base translate-x-3">{details[key]}</p>
                                        </div>
                                    
                                )

                        })
                    }
                </div>

            }


        </>
    )
}

export default Recipe