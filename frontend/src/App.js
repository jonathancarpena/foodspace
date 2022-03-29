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

// Regular User
import Account from './pages/account'
import CreateFoodSpace from './pages/foodspace/create'
import FoodSpace from './pages/foodspace/[id]'
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

        {/* Create FoodSpace Page */}
        <Route exact path='/foodSpace/create' element={<CreateFoodSpace />} />

        {/* FoodSpace Page */}
        <Route exact path='/foodSpace/:id' element={<FoodSpace />} />

        {/* Admin FoodSpace Page */}
        <Route exact path='/foodSpace/admin/:id' element={<AdminFoodSpace />} />

        {/* Add Item to FoodSpace Page */}
        <Route exact path='/foodSpace/:foodSpaceName/add-item' element={<AddItem />} />

        {/* Add Area to FoodSpace Page */}
        <Route exact path='/foodSpace/:foodSpaceName/add-area' element={<AddArea />} />

        {/* Add User to FoodSpace Page */}
        <Route exact path='/foodSpace/:foodSpaceName/manage/users' element={<ManageUsers />} />

      </Routes>
    </Layout>
  );
}

export default App;
