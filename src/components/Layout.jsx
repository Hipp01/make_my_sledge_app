import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../Home';
import CraftSledges from './sledges/CraftSledges';
import Sledges from './sledges/Sledges';
import DogsPage from './dogs/DogsPage';
import DogDetails from './dogs/DogDetails';
import Login from './login/Login';
import Logout from './login/Logout';
import ArrowUp from './ArrowUp';
import { FaHome, FaRegArrowAltCircleLeft  } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";



const Layout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

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
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </main>
      <footer>
          { window.location.pathname === "/" ? 
              null :
              <div className='d-flex bd-highlight'>
                  <div className=''>
                      <div className='mx-5 p-2 bd-highlight'>
                          <a href="/" className="btn btn-primary me-2"><FaHome size="1.5em"/></a>
                          <button className="btn btn-primary" onClick={() => window.history.back()}><FaRegArrowAltCircleLeft size="1.5em" /></button>
                      </div>
                  </div>
                  <div className='ms-auto p-2 bd-highlight pe-5 me-5'>
                  {(location.pathname === '/login') ? null : (
                    isAuthenticated ? (
                      <div><a href="/logout" className="btn btn-primary">Logout</a></div>
                    ) : (
                      <div><a href="/login" className="btn btn-primary">Login</a></div>
                    )
                  )}
                  </div>
              </div>
          }
      </footer>
      <ArrowUp />
    </div>
  );
}

export default Layout;
