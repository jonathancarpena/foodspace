import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/landing';

function App() {

  return (
    <Layout>
      <Routes>

        {/* Landing Page */}
        <Route exact path='/' element={<Landing />} />

      </Routes>
    </Layout>
  );
}

export default App;
