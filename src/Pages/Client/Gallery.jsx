import React from "react";
import gall1 from "../assets/gall1.png";
import gall2 from "../assets/gall2.png";
import gall3 from "../assets/gall3.png";
import gall4 from "../assets/gall4.png";
import gall5 from "../assets/gall5.png";
import gall6 from "../assets/gall6.png";

const Gallery = () => {
  return (
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Luxury Hotel in heart of the city
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
            gentrify, subway tile poke farm-to-table. Franzen you probably
            haven't heard of them man bun deep jianbing selfies heirloom.
          </p>
        </div>
        <div class="flex flex-wrap -m-4">
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="absolute inset-0 w-full h-full object-cover object-center"
                src={gall1}
              />
              <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  Hotel Lobby
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                  Shooting Stars
                </h1>
                <p class="leading-relaxed">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="absolute inset-0 w-full h-full object-cover object-center"
                src={gall2}
              />
              <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  Check In
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                  The Catalyzer
                </h1>
                <p class="leading-relaxed">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="absolute inset-0 w-full h-full object-cover object-center"
                src={gall3}
              />
              <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  Rooms
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                  The 400 Blows
                </h1>
                <p class="leading-relaxed">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="absolute inset-0 w-full h-full object-cover object-center"
                src={gall4}
              />
              <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  Dining
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                  Neptune
                </h1>
                <p class="leading-relaxed">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="absolute inset-0 w-full h-full object-cover object-center"
                src={gall5}
              />
              <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  Living Room
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                  Holden Caulfield
                </h1>
                <p class="leading-relaxed">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
              </div>
            </div>
          </div>
          <div class="lg:w-1/3 sm:w-1/2 p-4">
            <div class="flex relative">
              <img
                alt="gallery"
                class="absolute inset-0 w-full h-full object-cover object-center"
                src={gall6}
              />
              <div class="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                <h2 class="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">
                  Professional Chefs
                </h2>
                <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
                  Alper Kamu
                </h1>
                <p class="leading-relaxed">
                  Photo booth fam kinfolk cold-pressed sriracha leggings
                  jianbing microdosing tousled waistcoat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
