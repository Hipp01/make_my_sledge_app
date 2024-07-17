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
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    isAuthenticated ? (
      <div>
        <p>Vous êtes connecté!</p>
      </div>
    ) : (
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          {error && <p>{error}</p>}
          <div>
            <label>Nom d&apos;utilisateur:</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Mot de passe:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Connexion</button>
        </form>
      </div>
    )
  );
};

export default Login;
