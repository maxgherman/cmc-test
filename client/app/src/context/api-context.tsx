import React, { createContext } from 'react';
import { createAPI } from '@src/back-end'
import type { API } from '@src/back-end'

export const APIContext = createContext<API>({} as API);
export const APIConsumer = APIContext.Consumer;

export const APIProvider: React.FC = ({ children }) => {
    return (
        <APIContext.Provider value={createAPI()}>
            {children}
        </APIContext.Provider>
    )

}