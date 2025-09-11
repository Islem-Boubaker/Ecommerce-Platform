
import MainLayouts from './Layouts/MainLayouts';
import './App.css'
import About from './Pages/About';
import Brands from './Components/Brands';
import NewArrivals from './Pages/NewArrivals'; 
// import AddProduct from './Components/addProduct';

function App() {
  return (
    
    <MainLayouts>
      
      <About />
      <Brands />
      <NewArrivals /> 
        {/* <AddProduct /> */}
      </MainLayouts>  
    
    
    
    
  )
}

export default App
