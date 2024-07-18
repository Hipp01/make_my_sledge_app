import '../../assets/css/login.css';
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goBack = () => {
    navigate(-2);
  }

  return (
    <div className="login-container">
      <form>
        <h2>Disconnect</h2>
        <div>
          { isAuthenticated ? 
            <div>
              <p>Are you sure to disconnect ?</p>
              <div className='d-flex justify-content-between'>
                <button className="btn btn-primary mx-3" onClick={goBack}>No</button>
                <button className='btn btn-danger mx-3' onClick={handleLogout}>Yes</button>
              </div>
            </div> :
            <p>Vous êtes maintenant déconnecté !</p>
          }
        </div>
      </form>
    </div>
  );
};

export default Logout;
