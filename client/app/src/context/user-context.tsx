import React, { useState, useEffect, createContext } from 'react';
import type { MagicUserMetadata } from 'magic-sdk'
import { magic } from '@src/utils/magic'

export type UserContextData = {
    user?: MagicUserMetadata
    setUser?: (user: MagicUserMetadata | undefined) => void
} 

export const UserContext = createContext<UserContextData>({});

export const UserProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<UserContextData['user']>();
  
    // If isLoggedIn is true, set the UserContext with user data
    // Otherwise, set it to {user: null}
    useEffect(() => {
        magic.user.isLoggedIn().then((isLoggedIn) => {
        if(isLoggedIn) {
            magic.user.getMetadata().then((userData) => setUser(userData))
        } else {
            setUser(undefined)
        }
        });
    }, []);
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}
