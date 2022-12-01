// How to create conext https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/


import { useState, createContext } from 'react'

const AppContext = createContext()

const AppWrapper = ({ children }) => {
    const [cartLength, setCartLength] = useState(0)

    let sharedState = {
        cartState: [cartLength, setCartLength]
    }

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppWrapper }