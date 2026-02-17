import './App.css'
import BestShopsSection from './components/BestShopSection/BestShopSection';
import BestShopsSlider from './components/BestShopSlider/BestShopSlider';
import FlavorSection from './components/FlavorSection/FlavorSection';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import HeroSlider from './components/HeroSlider/HeroSlider';
import SummerSection from './components/SummerSection/SummerSection';
import SweetSection from './components/SweetSection/SweetSection';
import TastiestUpdates from './components/TestUpdate/TastiestUpdates';


function App() {
  return (
    <>
      <Header/>
      <HeroSlider/>
      <BestShopsSection/>
      <SummerSection/>
      <BestShopsSlider/>
      <SweetSection/>
      <FlavorSection/>
      <TastiestUpdates/>
      <Footer/>
    </>
  );
}

export default App;


