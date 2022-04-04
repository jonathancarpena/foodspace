import { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Router
import { Routes, Route, useNavigate } from 'react-router-dom';

// Pages
import Layout from './components/Layout';
import Landing from './pages/landing';
import Login from './pages/account/login'
import SignUp from './pages/account/signup';
import OnBoarding from './pages/account/onboarding';
import Products from './pages/product'
import ProductDetails from './pages/product/details'

// Regular User
import Account from './pages/account'
import CreateProduct from './pages/product/create'
import MyProducts from './pages/product/me'
import CreateFoodSpace from './pages/foodspace/create'
import FoodSpace from './pages/foodspace'
import AddItem from './pages/foodspace/addItem'


// Admin Pages
import AdminFoodSpace from './pages/foodspace/admin'
import AddArea from './pages/foodspace/admin/addArea'
import ManageUsers from './pages/foodspace/admin/manageUsers';


function App() {
  const navigate = useNavigate()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (auth.user) {
      navigate('/account')
    }
  }, [auth])
  return (
    <Layout>
      <Routes>

        {/* Landing Page */}
        <Route exact path='/' element={<Landing />} />

        {/* Account Page */}
        <Route exact path='/account/' element={<Account />} />

        {/* Login Page */}
        <Route exact path='/account/login' element={<Login />} />

        {/* Sign Up Page */}
        <Route exact path='/account/signup' element={<SignUp />} />

        {/* Onboarding Page */}
        <Route exact path='/account/onboarding' element={<OnBoarding />} />

        {/* Products Page */}
        <Route exact path='/product' element={<Products />} />

        {/* Product Details Page */}
        <Route exact path='/product/:id' element={<ProductDetails />} />

        {/* Create Product Page */}
        <Route exact path='/product/create' element={<CreateProduct />} />

        {/* My Food Page */}
        <Route exact path='/product/me' element={<MyProducts />} />

        {/* Create FoodSpace Page */}
        <Route exact path='/foodSpace/create' element={<CreateFoodSpace />} />

        {/* Admin: FoodSpace Page */}
        <Route exact path='/foodSpace/admin/:name' element={<AdminFoodSpace />} />

        {/* Admin: Add Area */}
        <Route exact path='/foodSpace/admin/:name/add-area' element={<AddArea />} />

        {/* Admin: Manage Users*/}
        <Route exact path='/foodSpace/admin/:name/manage/users' element={<ManageUsers />} />

        {/* FoodSpace Page */}
        <Route exact path='/foodSpace/:name' element={<FoodSpace />} />

        {/* Add Item to FoodSpace Page */}
        <Route exact path='/foodSpace/:name/add-item' element={<AddItem />} />




      </Routes>
    </Layout>
  );
}

export default App;
