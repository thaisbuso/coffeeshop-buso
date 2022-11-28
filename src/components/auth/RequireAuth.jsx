import { useAuth } from '../../hooks/useAuth';

export default function RequireAuth({ children }) {
   const auth = useAuth();

   if (auth.initializing === false && auth.user === null) {
      window.location.href = `/login?redirect=${window.location.pathname}`;
   }

   if (auth.user === null) {
      return <></>;
   } else {
      return children;
   }

}