import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/landing';
import Login from './pages/account/login'
import SignUp from './pages/account/signup';

function App() {

  return (
    <Layout>
      <Routes>

        {/* Landing Page */}
        <Route exact path='/' element={<Landing />} />

        {/* Login Page */}
        <Route exact path='/account/login' element={<Login />} />

        {/* Sign Up Page */}
        <Route exact path='/account/signup' element={<SignUp />} />

      </Routes>
    </Layout>
  );
}

export default App;
