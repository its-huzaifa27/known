import { AuthProvider, useAuth } from './context/AuthContext'
import LandingPage from './components/LandingPage'
import DashBoard from './components/DashBoard'

function Root() {
  const { token } = useAuth();
  
  return (
    <>
      {token ? <DashBoard /> : <LandingPage />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}

export default App
