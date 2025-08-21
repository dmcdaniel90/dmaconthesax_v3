'use client'
import { useContext, createContext, useReducer } from "react";

type HeaderContextType = {
    state: {
        activeLink: string
    },
    dispatch: (action: { type: string, payload: string }) => void
}
const HeaderContext = createContext<HeaderContextType>({
    state: {
        activeLink: ''
    },
    dispatch: () => {
        console.warn("Dispatch not implemented")
    }
});

const initialState = {
    activeLink: 'home'
};

const reducer = (state: { activeLink: string }, action: { type: string, payload: string }) => {
    switch (action.type) {
        case 'SET_ACTIVE_LINK':
            return { ...state, activeLink: action.payload };
        default:
            throw new Error("Unknown action")
    }
};

export const HeaderProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <HeaderContext.Provider value={{ state, dispatch }}>
            {children}
        </HeaderContext.Provider>
    );
}

export const useHeaderContext = () => {
    return useContext(HeaderContext)
}

