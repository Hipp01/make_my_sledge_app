import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
