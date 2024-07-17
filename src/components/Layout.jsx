import { Routes, Route } from 'react-router-dom';
import Home from '../Home';
import CraftSledges from './sledges/CraftSledges';
import Sledges from './sledges/Sledges';
import DogsPage from './dogs/DogsPage';
import DogDetails from './dogs/DogDetails';
import Login from './login/Login';
import ArrowUp from './ArrowUp';
import { FaHome, FaRegArrowAltCircleLeft  } from "react-icons/fa";


const Layout = () => {
  return (
    <div>
      <header>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/make_sledge" element={<CraftSledges />} />
          <Route path="/sledges" element={<Sledges />} />
          <Route path="/dogs" element={<DogsPage />} />
          <Route path="/dogs/:id" element={<DogDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
      <footer>
            <div>
                { window.location.pathname === "/" ? 
                    null :
                    <div className='m-5'>
                        <a href="/" className="btn btn-primary me-2"><FaHome size="1.5em"/></a>
                        <button className="btn btn-primary" onClick={() => window.history.back()}><FaRegArrowAltCircleLeft size="1.5em" /></button>
                    </div>
                }
            </div>
      </footer>
      <ArrowUp />
    </div>
  );
}

export default Layout;
