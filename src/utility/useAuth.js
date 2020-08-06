import { useContext } from 'react';
import { AuthContext } from 'contexts/AuthContext';

function useAuth() {
  const data = useContext(AuthContext);
  return data;
}

export { useAuth };
