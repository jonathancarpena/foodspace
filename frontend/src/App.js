import { useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Router
import { Routes, Route, useNavigate } from 'react-router-dom';

// Pages
import Layout from './components/Layout';
import Landing from './pages/landing';
import Account from './pages/account'
import Login from './pages/account/login'
import SignUp from './pages/account/signup';
import OnBoarding from './pages/account/onboarding';
import CreateFoodSpace from './pages/foodspace/create'


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

      </Routes>
    </Layout>
  );
}

export default App;
