import React from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"

const HomeProductSlider = () => {
  const navigate = useNavigate()
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  }

  const category = "Fashion"

  return (
    <div className="w-full h-[80vh] overflow-hidden relative rounded-xl mt-5 p-4 bg-gray-500">
      <Slider {...sliderSettings}>
        <img
          onClick={() => navigate(`/product/${"Fashion"}`)}
          src="/Fashion.png"
          alt="fashion"
          className="w-full h-[75vh] object-cover rounded-xl"
        />
        <img
          onClick={() => navigate(`/product/${"Home & Furniture"}`)}
          src="/ferniture.jpeg"
          alt="furniture"
          className="w-full h-[75vh] object-cover rounded-xl"
        />
        <img
          onClick={() => navigate(`/product/${"Electronics"}`)}
          src="/electronocs.png"
          alt="electronics"
          className="w-full h-[75vh] object-cover rounded-xl"
        />
        <img
          onClick={() => navigate(`/product/${"Beauty & Food"}`)}
          src="/beauty.jpeg"
          alt="beauty"
          className="w-full h-[75vh]object-cover rounded-xl"
        />
        <img
          onClick={() => navigate(`/product/${"Grocery"}`)}
          src="/grocery.jpeg"
          alt="grocery"
          className="w-full h-[75vh] object-cover rounded-xl"
        />
        <img
          onClick={() => navigate(`/product/${"Mobiles & Tablets"}`)}
          src="/mobile.jpeg"
          alt="mobile"
          className="w-full h-[75vh] object-cover object-top  rounded-xl"
        />
      </Slider>
    </div>
  )
}

export default HomeProductSlider
