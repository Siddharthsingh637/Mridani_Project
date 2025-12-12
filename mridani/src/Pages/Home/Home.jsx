import React from 'react'
import './Home.css'
import Category from './Category'
import CollectionList from './CollectionList'
import Footer from '../../Components/Footer'
import ShowcaseWrap from './Showcase/ShowcaseWrap'
import WhyWrap from './Why/WhyWrap'
import InstaWrap from './Insta/InstaWrap'
import TrendingWrap from './Trending/TrendingWrap'
import HeroWrap from './Hero/HeroWrap'
import Button from '../../Components/Chatbot/Button'

const Home = () => {
  return (
    <div className='overflow-x-hidden'>
      <HeroWrap/>
      <Category/>
      <TrendingWrap/>
      <ShowcaseWrap/>
      <WhyWrap/>
      <CollectionList/>
      <InstaWrap/>
      <Footer/>
      <Button/>
    </div>
  )
}

export default Home
