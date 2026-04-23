import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
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
      <ThemeProvider>
        <Root />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App
