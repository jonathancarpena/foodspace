import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';

function App() {

  return (
    <Routes>

      {/* Landing Page */}
      <Route exact path='/' element={<Landing />} />

    </Routes>
  );
}

export default App;
