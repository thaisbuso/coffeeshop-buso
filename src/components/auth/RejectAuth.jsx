import { useAuth } from '../../hooks/useAuth';
import { useSearchParams } from "react-router-dom";

export default function RejectAuth({ children }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const auth = useAuth();

   if (auth.initializing === false && auth.user !== null) {
      window.location.href = searchParams.get('redirect') || '/';
   }

   if (auth.user !== null) {
      return <></>;
   } else {
      return children;
   }

}