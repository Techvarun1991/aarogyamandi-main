import React from 'react'
import Productdetail from './Productdetail'
import Productdescription from './Productdescription'
import Similarproducts from './Similarproducts'
import Frequentlyboughtproduct from './Frequentlyboughtproduct'
import Rating from './Rating'
import RelatedPost from './RelatedPost'
import Disclaimer from './Disclaimer'

const Productmainpage = () => {
  return (
    <div>

        <Productdetail />

        <Productdescription />

        <Similarproducts /> 

         <Frequentlyboughtproduct />

         <Rating />

         <RelatedPost />

         <Disclaimer />
    </div>
  )
}

export default Productmainpage