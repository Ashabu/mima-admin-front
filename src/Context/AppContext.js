import React, { createContext, useState } from "react";

const state = {
    lang: 'en',
    setLang: ()=> {},
    isUserAuthorized: false,
    setUserAuthorized: () => {}
};


export const AppContext = createContext(state);

const AppProvider = ({ children }) => {
    const [activeLang, setActiveLang] = useState(state.lang);
    const [isUserAuthorized, setIsUserAuthorized] = useState(state.isUserAuthorized);

   
    const setLang = (value) => {
        setActiveLang(value);
    };

    const setUserAuthorized = (value) => {
        setIsUserAuthorized(value);
    };

    return (
        <AppContext.Provider value={{ activeLang, setLang, isUserAuthorized, setUserAuthorized  }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;