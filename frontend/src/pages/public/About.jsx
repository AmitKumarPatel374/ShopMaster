import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade & slide animation for sections
      gsap.utils.toArray(".fade-section").forEach((section, i) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      // Logo gentle float
      gsap.to(".about-logo", {
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 2.5,
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

 return (
  <div
    ref={pageRef}
    className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 
    px-4 sm:px-6 md:px-10 lg:px-16 
    py-12 sm:py-16 md:py-24 overflow-hidden"
  >
    {/* Header Section */}
    <div className="text-center mb-12 sm:mb-16 fade-section">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-indigo-900 tracking-wide drop-shadow-sm">
          About <span className="text-purple-700">ShopMaster</span>
        </h1>

        <img
          src="/myLogo.png"
          alt="ShopMaster Logo"
          className="about-logo h-14 sm:h-16 md:h-20 w-auto object-contain"
        />
      </div>

      <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl md:max-w-2xl mx-auto mt-4">
        Empowering both buyers and sellers through trust, quality, and seamless shopping.
      </p>
    </div>

    {/* Section 1 */}
    <section className="fade-section max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 py-8 md:py-12">
      {/* Text */}
      <div className="w-full md:w-1/2 rounded-2xl p-4 sm:p-6 md:p-8 text-gray-700 leading-relaxed space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg">
          Welcome to{" "}
          <span className="font-semibold text-indigo-600">ShopMaster</span> —
          your all-in-one marketplace for innovation and opportunity.
        </p>

        <p className="text-base sm:text-lg">
          Since <span className="font-semibold">2023</span>, we’ve been crafting
          an ecommerce experience where{" "}
          <span className="text-purple-700 font-semibold">
            trust meets technology
          </span>.
        </p>

        <p className="italic text-indigo-700 font-semibold text-center md:text-left text-sm sm:text-base">
          “Where buyers discover, and sellers grow.”
        </p>
      </div>

      {/* Video */}
      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
        <video
          src="/shopmaster1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-64 sm:h-80 md:h-full object-cover transition duration-500 hover:scale-105"
        ></video>
      </div>
    </section>

    {/* Section 2 */}
    <section className="fade-section max-w-6xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12 py-8 md:py-12">
      {/* Text */}
      <div className="w-full md:w-1/2 bg-white rounded-2xl p-4 sm:p-6 md:p-8 text-gray-700 leading-relaxed space-y-4 sm:space-y-6">
        <p className="text-base sm:text-lg">
          From fashion essentials to reliable gadgets, our marketplace thrives
          on curated excellence.
        </p>

        <p className="text-base sm:text-lg">
          Our smart algorithms and secure infrastructure ensure a smooth
          experience — empowering sellers and delighting customers.
        </p>

        <p className="italic text-purple-700 font-semibold text-center md:text-left text-sm sm:text-base">
          “Shop smarter. Sell better. Live bigger.”
        </p>
      </div>

      {/* Video */}
      <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl">
        <video
          src="/shopmaster2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-64 sm:h-80 md:h-full object-cover transition duration-500 hover:scale-105"
        ></video>
      </div>
    </section>

    {/* Mission Section */}
    <div className="fade-section mt-16 sm:mt-20 max-w-6xl mx-auto text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8">
        Our Mission & Core Values
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-5 sm:p-6 transition duration-300 border-t-4 border-indigo-500">
          <h3 className="text-lg sm:text-xl font-semibold text-indigo-800 mb-2">
            🤝 Trust & Transparency
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Every transaction is built on honesty.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-5 sm:p-6 transition duration-300 border-t-4 border-purple-500">
          <h3 className="text-lg sm:text-xl font-semibold text-purple-800 mb-2">
            🚀 Growth for Sellers
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            We empower small businesses with visibility.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl p-5 sm:p-6 transition duration-300 border-t-4 border-indigo-600 sm:col-span-2 lg:col-span-1">
          <h3 className="text-lg sm:text-xl font-semibold text-indigo-900 mb-2">
            🌟 Smart Shopping
          </h3>
          <p className="text-gray-600 text-sm sm:text-base">
            Curated deals that make every purchase worth it.
          </p>
        </div>
      </div>
    </div>

    {/* Footer Quote */}
    <div className="fade-section mt-16 sm:mt-20 text-center px-4">
      <p className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-800 italic">
        “ShopMaster — Building bridges between shoppers and sellers, one product at a time.”
      </p>
    </div>
  </div>
);

};

export default About;
