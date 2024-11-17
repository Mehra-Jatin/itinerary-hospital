
import PetCareSection from '../components/Petcare'
import PetServices from '../components/Petservice'
import BenefitSection from '../components/Benefit'
import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import ReviewSlider from '../components/reviewSlider'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import DoctorProfile from './DoctorProfile'
import UserProfile from './UserProfile'

const Home = () => {
  return (
    <div className='font-paytone'>
<Hero/>
<PetCareSection/>
<PetServices/>
<BenefitSection/>
<Gallery />
  <ReviewSlider />
  <DoctorProfile />
  <UserProfile />
  <Footer />
    </div>
  )
}

export default Home



