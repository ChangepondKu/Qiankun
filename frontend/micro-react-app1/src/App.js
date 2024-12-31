import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import { User } from './components/user/User';
import { Dashboard } from './components/productHome/Dashborad';
import { getAllProducts } from './components/api/apiRepository';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dummyProductData } from './components/fallbackStore.js/dummyProductData';
import Cookies from 'js-cookie';

function App({ user }) {
  const [products, setProducts] = useState([]);
  const state = useSelector((state) => state?.app);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.message === 'Login successful') {
      console.log("STAND ALONE");
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      // Cookies.set('authToken', JSON.stringify(user?.token), { expires: user?.exp_hr / 24 });
    } 
  }, [])
  // Fetch Products
  const getProductList = async () => {
    const authToken = state?.token;
    // const authToken = Cookies.get('authToken');
    const productList = await getAllProducts(authToken);
    if (productList?.length > 0) {
      setProducts(productList);
    } else {
      //set the dummyData
      // setProducts(dummyProductData);
      setProducts([])
    }
  };

  useEffect(() => {
    getProductList();
  }, []);



  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/app1" element={<HomePage/>} /> */}
          <Route path="/" element={<Dashboard products={products} />} />
          <Route path="/app1" element={<Dashboard products={products} />} />
          <Route path="/app1/user" element={<User />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
