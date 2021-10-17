import React, { createContext, useState } from "react";

const state = {
    lang: 'en',
    setLang: ()=> {}
};


export const AppContext = createContext(state);

const AppProvider = ({ children }) => {
    const [activeLang, setActiveLang] = useState(state.lang);
    console.log(activeLang)
    const setLang = (value) => {
        setActiveLang(value);
    };

    return (
        <AppContext.Provider value={{ activeLang, setLang }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;