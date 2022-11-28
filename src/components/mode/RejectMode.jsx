import { useMode } from '../../hooks/useMode';
import { useSearchParams } from "react-router-dom";

export default function RejectAuth({ children }) {
   const [searchParams, setSearchParams] = useSearchParams();
   const modeHook = useMode();

   if (modeHook.initializing === false && modeHook.mode !== null) {
      window.location.href = searchParams.get('redirect') || '/';
   }

   if (modeHook.mode !== null) {
      return <></>;
   } else {
      return children;
   }

}