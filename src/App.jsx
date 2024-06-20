import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CraftSledges from './components/sledges/CraftSledges';
import DogDetails from './components/dogs/DogDetails';
import DogsPage from './components/dogs/DogsPage';
import Sledges from './components/sledges/Sledges';
import Home from './Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make_sledge" element={<CraftSledges />} />
        <Route path="/sledges" element={<Sledges />} />
        <Route path="/dogs" element={<DogsPage />} />
        <Route path="/dogs/:id" element={<DogDetails />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
