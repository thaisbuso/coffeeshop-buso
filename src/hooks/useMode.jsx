import React, { useState, useEffect, useContext, createContext } from 'react'

import { makeRequest, useApi } from './useApi';
import { useLocalStorage } from './useLocalStorage';

const modeContext = createContext(null);

export function ProvideMode({ children }) {
    const mode = useProvideMode()
    return <modeContext.Provider value={mode}>{children}</modeContext.Provider>
}

export const useMode = () => {
    return useContext(modeContext);
};

function useProvideMode() {

    const [initializing, setInitializing] = useState(true);
    const [modeLocalStorage, setModeLocalStorage] = useLocalStorage("mode", "");
    const [table, setTable] = useLocalStorage("table", "");

    const [mode, setMode] = useState(null);

    useEffect(() => {
        if (modeLocalStorage === "" && mode === null) {
            setInitializing(false);
        }

        if (modeLocalStorage !== "" && mode === null && initializing === true) {
            setMode(modeLocalStorage);
        }

        if (modeLocalStorage !== "" && mode === null && initializing === false) {
            setModeLocalStorage("");
        }

        if (modeLocalStorage !== mode && mode !== null) {
            setModeLocalStorage(mode);
            setInitializing(false);
        }

        if (modeLocalStorage === mode){
            setInitializing(false);
        }
    }, [mode, modeLocalStorage]);

    useEffect(() => {
        if (mode !== 'table' && table !== "" && initializing === false) {
            setTable("");
        }
    }, [mode]);

    return {
        initializing,
        mode,
        setMode,
        table,
        setTable
    };
}
