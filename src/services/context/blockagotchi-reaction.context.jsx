import { createContext, useContext, useState } from 'react';

const BlockagotchiReactionContext = createContext();

export const BlockagotchiReactionProvider = ({ children }) => {
    const value = useState('idle');

    return (
        <BlockagotchiReactionContext.Provider value={value}>
            {children}
        </BlockagotchiReactionContext.Provider>
    );
};

export const useBlockagotchiReaction = () => {
    const context = useContext(BlockagotchiReactionContext);

    if (typeof context === 'undefined')
        throw new Error(
            'An useBlockagotchiReaction consumer must be inside of a BlockagotchiReactionProvider child node.'
        );

    return context;
};
