import React, { useEffect, useState } from "react"
import { productByCateGory } from "../../Service/ProductFilterByCategoryService"
import { useNavigate, useParams } from "react-router-dom"
import NavbarFilter from "../../components/NavbarFilter"
import Loader from "../../components/Loader"

const CategoryBasedTopProduct = () => {
  const { category } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productByCateGory(category)
        setProducts(response || [])
        console.log(response)
      } catch (error) {
        setError(error.message);
      }finally{
        setLoading(false);
      }
    }
    fetchData()
  }, [category])

  if (error) {
    return <p>error</p>
  }

  if (loading) {
    return <Loader fullscreen text="Loading Products....." />
  }

  return (
    <div className="flex flex-col">
      <NavbarFilter />
      {/* ----- Header ----- */}
      <div className="flex flex-col p-5">
        <div className="flex justify-between text-gray-400 items-center mb-1">
          <h3 className=" font-semibold">
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/product/all`)}
            >
              {"Product->"}
            </span>
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/product/${category}`)}
            >
              {category}
            </span>
          </h3>
        </div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">{`${category} Top Deals`}</h1>
        </div>

        {/* ----- Grid Layout ----- */}
        <div
          className="
          grid 
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          gap-4
        "
        >
          {products.length > 0 ? (
            products.map((product, index) => {
              const discount =
                ((product?.price?.MRP - product?.price?.amount) * 100) / product?.price?.MRP

              return (
                discount >= 30 && (
                  <div
                    onClick={() =>
                      navigate(`/product/${category}/${product.subCategory}/${product.item}`)
                    }
                    key={index}
                    className="
                  border border-gray-300 rounded-xl p-4 bg-white 
                  flex flex-col items-center
                  hover:shadow-md transition-all
                "
                  >
                    <img
                      src={product?.images?.[0]}
                      alt={product?.title}
                      className="w-full h-40 object-contain"
                    />

                    <h1 className="text-sm font-semibold mt-2 text-center line-clamp-2">
                      {product?.title}
                    </h1>

                    <p className="text-green-600 text-sm mt-1 font-medium">
                      Min. {Math.round(discount)}% Off
                    </p>
                  </div>
                )
              )
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <img
                src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                alt="No Products"
                className="w-32 h-32 opacity-80"
              />

              <h1 className="text-2xl font-bold text-gray-700 mt-5">No Products Found</h1>

              <p className="text-gray-500 mt-2 text-center max-w-md">
                We couldn’t find any products in this category right now. Try exploring other
                categories or come back later.
              </p>

              <button
                onClick={() => navigate("/admin/products")}
                className="
        mt-6
        px-6
        py-3
        bg-black
        text-white
        rounded-lg
        hover:bg-gray-800
        transition-all
      "
              >
                Explore Your Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryBasedTopProduct
