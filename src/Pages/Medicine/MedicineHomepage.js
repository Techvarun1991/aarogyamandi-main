import React, { useState } from "react";
import SpecialOffer from "./SpecialOffer";
import Halfpricestore from "./Halfpricestore";
import ComboOffer from "./ComboOffer";
import HealthCondition from "./HealthCondition";
import Festiveoffers from "./Festiveoffers";
import Ratings from "./Ratings";
import Faq from "./Faq";
import Banner from "./Banner";



const MedicineHomepage = () => {
  return (
    <div>
      <SpecialOffer />

      <Halfpricestore />

      <ComboOffer />

      <HealthCondition />

      <Festiveoffers />

     
      <Banner />

      <Ratings />

      <Faq />
      
    </div>
  );
};

export default MedicineHomepage;
