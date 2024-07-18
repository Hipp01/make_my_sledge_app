import { useState } from 'react';
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      setError('username or password incorrect');
    }
  };

  return (
    isAuthenticated ? (
      <div>
        <p>You are connected</p>
        <a className="btn btn-primary" href="/logout">Logout</a>
      </div>
    ) : (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          {error && <p>{error}</p>}
          <div>
            <label>Username :</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Password :</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button className='btn btn-primary' type="submit">Connexion</button>
        </form>
      </div>
    )
  );
};

export default Login;
