import { useEffect, useState, useRef, useContext } from "react"
import apiInstance from "../../config/apiInstance"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Delete } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { usercontext } from "../../context/DataContext"
import { toast } from "react-toastify"

gsap.registerPlugin(ScrollTrigger)

const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  const pageRef = useRef(null)
  const { totalAmount, setTotalAmount, currency, setCurrency } = useContext(usercontext)
  const navigate = useNavigate()

  // ----------------------
  // Fetch Cart
  // ----------------------
  const fetchCart = async () => {
    const response = await apiInstance.get("/product/cart")

    setCartItems(response.data.cart)

    let total = 0
    response.data.cart.forEach((item) => {
      total += item.productId.price.amount * item.quantity
    })
    setTotalAmount(total)
    setCurrency(response.data.cart[0].productId.price.currency)

    localStorage.setItem("amountToPay", total)
    localStorage.setItem("currencyToPay", response.data.cart[0].productId.price.currency)
  }

  const updateQuantity = async (id, change) => {
    await apiInstance.put("/product/cart/update", {
      productId: id,
      change: change, // +1 or -1
    })
    fetchCart()
  }

  const deleteItem = async (id) => {
    console.log(id)
    const res = await apiInstance.delete(`/product/cart/delete/${id}`)
    console.log(res)

    fetchCart()
  }

  useEffect(() => {
    fetchCart()

    const ctx = gsap.context(() => {
      gsap.from(".cart-card", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      })

      gsap.from(".total-box", {
        opacity: 0,
        y: 20,
        delay: 0.3,
        duration: 1,
        ease: "power3.out",
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  const checkOwnersSame = async () => {
    if (cartItems.length === 0) {
      return false
    }

    

    const owners = cartItems.map((item) => item.productId.createdBy)

    // Check if all owners are same
    const firstOwner = owners[0]
    const allSame = owners.every((owner) => owner === firstOwner)
    return allSame
  }


 return (
  <div
    ref={pageRef}
    className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100 
    p-4 sm:p-6 md:p-8"
  >
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-center">
      🛒 <span className="text-blue-600">Your Cart</span>
    </h1>

    <div className="space-y-6 max-w-4xl mx-auto">
      {/* CART ITEMS */}
      {cartItems.map((item) => (
        <div
          onClick={() => navigate(`/product/detail/${item.productId._id}`)}
          key={item.productId._id}
          className="cart-card flex flex-col sm:flex-row items-start sm:items-center 
          gap-4 sm:gap-6 p-4 sm:p-5 bg-white rounded-2xl shadow-lg border"
        >
          {/* PRODUCT IMAGE */}
          <img
            src={item.productId.images[0]}
            className="w-full sm:w-24 h-48 sm:h-24 object-contain rounded-lg"
          />

          {/* PRODUCT DETAILS */}
          <div className="flex-1 w-full">
            <h2 className="text-base sm:text-lg font-semibold">
              {item.productId.title}
            </h2>

            <p className="text-gray-500 text-sm sm:text-base">
              ₹{item.productId.price.amount}
            </p>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3 mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateQuantity(item.productId._id, -1)
                }}
                className="bg-gray-200 px-3 py-1 rounded-md text-lg font-bold hover:bg-gray-300"
              >
                -
              </button>

              <span className="text-lg sm:text-xl font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  updateQuantity(item.productId._id, +1)
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-lg font-bold hover:bg-blue-600"
              >
                +
              </button>
            </div>
          </div>

          {/* PRICE + DELETE (Stack on mobile) */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-3 mt-3 sm:mt-0">
            <div className="text-lg sm:text-xl font-bold text-green-600">
              ₹{item.productId.price.amount * item.quantity}
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteItem(item.productId._id)
              }}
              className="text-red-500 font-semibold hover:text-red-700 cursor-pointer"
            >
              <Delete />
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* TOTAL */}
    <div
      className="total-box max-w-4xl mx-auto mt-8 sm:mt-10 p-4 sm:p-6 
      bg-white border rounded-2xl shadow-xl 
      flex flex-col sm:flex-row items-center sm:justify-between gap-4"
    >
      <h2 className="text-lg sm:text-2xl font-bold text-gray-800 text-center sm:text-left">
        Total Amount:{" "}
        <span className="text-green-600">₹{totalAmount}</span>
      </h2>

      <button
        onClick={() => {
          if (!checkOwnersSame()) {
            toast.error(
              "All products must be from the same seller to place the order!"
            )
            return
          }
          navigate("/product/cart/address")
        }}
        className="w-full sm:w-auto bg-green-500 px-6 py-2 rounded-xl cursor-pointer hover:bg-green-400"
      >
        Check Out
      </button>
    </div>
  </div>
)

}

export default Cart
