import React from "react";
import Navbar from "../components/Navbar";


const About = () => {
  return (
    <section className="text-gray-600 body-font">
    <Navbar />
      <div className="container px-5 py-24 mx-auto">
        <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
          <img alt="testimonial" className="w-20 h-20 mb-8 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100" src="https://scontent.fisb3-2.fna.fbcdn.net/v/t1.6435-9/147843980_1375474816132079_2492774788180785077_n.jpg?stp=dst-jpg_p526x296&_nc_cat=111&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeH65ZhraSy-7w9_KiLqmGgi0vjhxp9cXOTS-OHGn1xc5F1WLPT_z6En4hz4GySPaQWIk9mUJDrvEqc8I6X2x96j&_nc_ohc=93e3lND0SmkAX90cM-J&_nc_ht=scontent.fisb3-2.fna&oh=00_AfDspKV2H4X3Lr-y0fOrT7FLPkuBuFV4BOUcFeZBP1i1Sg&oe=641B30A3" />
          <p className="leading-relaxed text-lg">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware. Man bun next level coloring book skateboard four loko knausgaard. Kitsch keffiyeh master cleanse direct trade indigo juice before they sold out gentrify plaid gastropub normcore XOXO 90's pickled cindigo jean shorts. Slow-carb next level shoindigoitch ethical authentic, yr scenester sriracha forage franzen organic drinking vinegar.</p>
          <span className="inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6"></span>
          <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">Asim khan</h2>
          <p className="text-gray-500">Senior UI Designer</p>
        </div>
      </div>
    </section>
  )
}

export default About;