import React from 'react'
import PetCareSection from '../components/Petcare'
import PetServices from '../components/Petservice'
import BenefitSection from '../components/Benefit'

const Home = () => {
  return (
    <div>
Home page
<PetCareSection/>
<PetServices/>
<BenefitSection/>
    </div>
  )
}

export default Home
