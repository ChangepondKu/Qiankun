import './App.css';
import { Services } from './components/Services';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use BrowserRouter for routing
import { ProductPage } from './components/product/ProductPage';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AboutUsPage from './components/aboutus/AboutUsPage';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { ProductList } from './components/product/ProductList';

function App({user}) {
  const dispatch=useDispatch();
  useEffect(()=>{
    if (user?.message === 'Login successful') {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      // Cookies.set('authToken', JSON.stringify(user?.token), { expires: user?.exp_hr / 24 });
    }
  },[])
  return (
    // <>
    // <ProductList/>
    // </>
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<ProductPage/>}/>
        <Route path='/app2' element={<ProductPage/>}/>
        {/* <Route path='/app2/services' element={<Services/>} /> */}
        <Route path='/app2/aboutus' element={<AboutUsPage/>} />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
