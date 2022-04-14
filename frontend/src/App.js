import { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Pages
import Layout from './components/Layout';
import Landing from './pages/landing';
import Login from './pages/login'
import SignUp from './pages/signup';
import OnBoarding from './pages/onboarding';
import Products from './pages/product'
import ProductDetails from './pages/product/details'
import NotFound from './pages/404';

// Regular User
import Account from './pages/account/'
import Manage from './pages/account/manage'
import Dashboard from './pages/account/dashboard'
import CreateProduct from './pages/product/create'
import MyProducts from './pages/product/me'
import CreateFoodSpace from './pages/foodspace/create'
import FoodSpace from './pages/foodspace'
import AddItem from './pages/foodspace/addItem'
import Notifcations from './pages/account/notifications'

// Admin Pages
import AdminFoodSpace from './pages/foodspace/admin'
import AddArea from './pages/foodspace/admin/addArea'
import ManageUsers from './pages/foodspace/admin/manageUsers';
import AddUser from './pages/foodspace//admin/addUser'
import ChooseFoodSapce from './pages/foodspace/chooseFoodSpace';


function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (auth.user && location.pathname === '/') {
      navigate('/account/dashboard')
    }
  }, [auth])
  return (
    <Layout>
      <Routes>

        {/* Landing Page */}
        <Route exact path='/' element={<Landing />} />

        {/* Account Page */}
        <Route exact path='/account/' element={<Account />} />

        {/* Manage Account Page */}
        <Route exact path='/account/manage' element={<Manage />} />

        {/* Notifications Page */}
        <Route exact path='/account/notifications' element={<Notifcations />} />

        {/* Dashboard Page */}
        <Route exact path='/account/dashboard' element={<Dashboard />} />

        {/* Login Page */}
        <Route exact path='/login' element={<Login />} />

        {/* Sign Up Page */}
        <Route exact path='/signup' element={<SignUp />} />

        {/* Onboarding Page */}
        <Route exact path='/onboarding' element={<OnBoarding />} />

        {/* Products Page */}
        <Route exact path='/product' element={<Products />} />

        {/* Product Details Page */}
        <Route exact path='/product/:id' element={<ProductDetails />} />

        {/* Create Product Page */}
        <Route exact path='/product/create' element={<CreateProduct />} />

        {/* My Food Page */}
        <Route exact path='/product/me' element={<MyProducts />} />

        {/* FoodSpace Page */}
        <Route exact path='/foodSpace/:name' element={<AdminFoodSpace />} />

        {/* Choose FoodSpace Page */}
        <Route exact path='/foodSpace/choose' element={<ChooseFoodSapce />} />

        {/* Create FoodSpace Page */}
        <Route exact path='/foodSpace/create' element={<CreateFoodSpace />} />

        {/* Add Item to FoodSpace Page */}
        <Route exact path='/foodSpace/add-item' element={<AddItem />} />

        {/* Admin: Add User  */}
        <Route exact path='/foodSpace/admin/:name/add-user' element={<AddUser />} />

        {/* Admin: Add Area */}
        <Route exact path='/foodSpace/admin/:name/add-area' element={<AddArea />} />

        {/* Admin: Manage Users*/}
        <Route exact path='/foodSpace/admin/:name/manage/users' element={<ManageUsers />} />

        {/* 404 Page */}
        <Route path='*' element={<NotFound />} />


      </Routes>
    </Layout>
  );
}

export default App;
