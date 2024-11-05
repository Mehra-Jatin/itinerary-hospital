
import PetCareSection from '../components/Petcare'
import PetServices from '../components/Petservice'
import BenefitSection from '../components/Benefit'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import ReviewSlider from '../components/reviewSlider'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

const Home = () => {
  return (
    <div className='font-paytone'>
<Navbar/>
<Hero/>
<PetCareSection/>
<PetServices/>
<BenefitSection/>
<Gallery />
  <ReviewSlider />
  <Footer />
    </div>
  )
}

export default Home



