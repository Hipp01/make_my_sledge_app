import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';
import "./assets/css/app.css";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;
