import { useMode } from '../../hooks/useMode';

export default function RequireAuth({ children }) {
   const modeHook = useMode();

   if (modeHook.initializing === false && modeHook.mode === null) {
      window.location.href = `/selecao?redirect=${window.location.pathname}`;
   }

   if (modeHook.mode === null) {
      return <></>;
   } else {
      return children;
   }

}