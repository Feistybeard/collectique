import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/start');
    console.log('Loging in...');
  };

  return (
    <div>
      <h1>Login</h1>
      <Button
        onClick={() => {
          handleLogin();
        }}
      >
        Log In
      </Button>
    </div>
  );
}

export default Login;
