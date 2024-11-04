
import PetCareSection from '../components/Petcare'
import PetServices from '../components/Petservice'
import BenefitSection from '../components/Benefit'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import ReviewSlider from '../components/reviewSlider'

const Home = () => {
  return (
    <div>
Home page
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



