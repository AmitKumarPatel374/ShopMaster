import React, { useEffect, useState } from "react"
import { productByCateGory } from "../Service/ProductFilterByCategoryService"
import { useNavigate } from "react-router-dom"

const HomeFullImageCard = ({ category }) => {
  const [randomProduct, setRandomProduct] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await productByCateGory(category)

      if (response && response.length > 0) {
        // pick a random product
        const randomIndex = Math.floor(Math.random() * response.length)
        setRandomProduct(response[randomIndex])
      }
    }

    fetchData()
  }, [category])

  return (
  <div
    onClick={() =>
      randomProduct &&
      navigate(
        `/product/${category}/${randomProduct.subCategory}/${randomProduct.item}`
      )
    }
    className="
      p-3 sm:p-4 mt-5 
      rounded-xl shadow-md bg-gray-200 
      w-full
      sm:w-full
      md:w-full
      lg:w-[48%]
      xl:w-[31%]
      cursor-pointer
      transition hover:shadow-lg
    "
  >
    {randomProduct && (
      <div className="overflow-hidden rounded-lg">
        <img
          src={randomProduct.images[0]}
          alt={randomProduct.title}
          className="
            w-full 
            h-56 sm:h-72 md:h-80 lg:h-96 
            object-cover 
            rounded-lg 
            transition duration-300 hover:scale-105
          "
        />
      </div>
    )}
  </div>
)
return (
  <div
    onClick={() =>
      randomProduct &&
      navigate(
        `/product/${category}/${randomProduct.subCategory}/${randomProduct.item}`
      )
    }
    className="
      p-3 sm:p-4 mt-5 
      rounded-xl shadow-md bg-gray-200 
      w-full
      sm:w-full
      md:w-full
      lg:w-[48%]
      xl:w-[31%]
      cursor-pointer
      transition hover:shadow-lg
    "
  >
    {randomProduct && (
      <div className="overflow-hidden rounded-lg">
        <img
          src={randomProduct.images[0]}
          alt={randomProduct.title}
          className="
            w-full 
            h-56 sm:h-72 md:h-80 lg:h-96 
            object-cover 
            rounded-lg 
            transition duration-300 hover:scale-105
          "
        />
      </div>
    )}
  </div>
)

}

export default HomeFullImageCard
