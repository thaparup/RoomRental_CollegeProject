import { createContext, useContext, useState } from "react"


type UserContext = {
    user: object,
    setUser: React.Dispatch<React.SetStateAction<object>>
}
export const UserContext = createContext<UserContext | null>(null)

export default function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState({})

    return (
        <UserContext.Provider value={{ user, setUser }}>

            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (!context) {
        throw new Error("useThemeContext must be useed with in a ThemeContext Provider");
    }
    else return context;
}