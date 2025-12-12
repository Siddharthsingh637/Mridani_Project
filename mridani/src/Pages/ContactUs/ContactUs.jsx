import React from 'react'
import GetInfo from './GetInfo'
import InfoBar from './InfoBar'
import Ask from './Ask'
import Map from './Map'
import FAQs from './FAQs'
import Footer from '../../Components/Footer';

const ContactUs = () => {
  return (
    <div>
      <GetInfo/>
      <InfoBar/>
      <Ask/>
      <Map/>
      <FAQs/>
      <Footer/>
    </div>
  )
}

export default ContactUs
