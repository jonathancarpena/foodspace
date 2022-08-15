import { useEffect } from 'react';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from './redux/features/auth/authSlice';

// Router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Pages
import Layout from './components/Layout';
import Landing from './pages/landing';
import Login from './pages/login'
import Contact from './pages/contact'
import SignUp from './pages/signup';
import OnBoarding from './pages/onboarding';
import Products from './pages/product'
import ProductDetails from './pages/product/[id]'
import NotFound from './pages/404';

// Regular User
import Account from './pages/account/'
import ManageAccount from './pages/account/manage'
import DeleteAccount from './pages/account/manage/deleteAccount';
import Dashboard from './pages/account/dashboard'
import CreateProduct from './pages/product/create'
import MyProducts from './pages/product/me'
import CreateFoodSpace from './pages/foodspace/create'
import FoodSpace from './pages/foodspace'
import AddItem from './pages/foodspace/addItem'
import AddItemDetails from './pages/foodspace/addItem/[id]'
import Tasks from './pages/account/tasks'
import FoodSpaceItem from './pages/foodspace/item'

// Admin Pages
import AddArea from './pages/foodspace/admin/addArea'
import AddUser from './pages/foodspace//admin/addUser'
import ManageFoodSpace from './pages/foodspace/admin/manage';
import ChooseFoodSpace from './pages/foodspace/chooseFoodSpace';


function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (auth.user && location.pathname === '/') {
      navigate('/account/dashboard')
    }
    if (!auth.user && auth.ready) {
      dispatch(clearAuth())
      navigate('/')
    }
  }, [auth, dispatch, location.pathname, navigate])
  return (
    <Layout>
      <Routes>

        {/* Landing Page */}
        <Route exact path='/' element={<Landing />} />

        {/* Contact */}
        <Route exact path='/contact' element={<Contact />} />

        {/* Account Page */}
        <Route exact path='/account/' element={<Account />} />

        {/* Manage Account Page */}
        <Route exact path='/account/manage' element={<ManageAccount />} />

        {/* Delete Account */}
        <Route exact path='/account/manage/delete' element={<DeleteAccount />} />

        {/* Tasks Page */}
        <Route exact path='/account/tasks' element={<Tasks />} />

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
        <Route exact path='/foodSpace/:name' element={<FoodSpace />} />

        {/* Choose FoodSpace Page */}
        <Route exact path='/foodSpace/choose' element={<ChooseFoodSpace />} />

        {/* Create FoodSpace Page */}
        <Route exact path='/foodSpace/create' element={<CreateFoodSpace />} />

        {/* FoodSpace: Stock Item */}
        <Route exact path='/foodSpace/:name/item/:stockNum' element={<FoodSpaceItem />} />

        {/* Add Item  */}
        <Route exact path='/foodSpace/add-item' element={<AddItem />} />

        {/* Add Item Details  */}
        <Route exact path='/foodSpace/add-item/:id' element={<AddItemDetails />} />

        {/* Admin: Add User  */}
        <Route exact path='/foodSpace/admin/:name/add-user' element={<AddUser />} />

        {/* Admin: Add Area */}
        <Route exact path='/foodSpace/admin/:name/add-area' element={<AddArea />} />

        {/* Admin: Manage */}
        <Route exact path='/foodSpace/admin/:name/manage' element={<ManageFoodSpace />} />

        {/* 404 Page */}
        <Route path='*' element={<NotFound />} />


      </Routes>
    </Layout>
  );
}

export default App;
