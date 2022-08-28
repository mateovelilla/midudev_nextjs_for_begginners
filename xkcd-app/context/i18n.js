import { useRouter } from "next/router";
import { createContext, useContext } from "react";
import es from '../translations/es.json';
import en  from '../translations/en.json';

const I18NContext = createContext()

const languages = {es, en};

export function I18NProvider ({ children }) {
    const { locale } = useRouter();
    const translate = (key) => languages[locale][key];
    return (
        <I18NContext.Provider value={{translate}}>
            {children}
        </I18NContext.Provider>
    )
}
export function useI18N() {
    const context = useContext(I18NContext)
    if (context === undefined) {
        throw new Error("useI18N must be used within a  I18Provider");
    }
    return context
}
