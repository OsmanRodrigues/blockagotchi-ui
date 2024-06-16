import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState(new Map());
    const timers = useRef([]);
    const msgs = Array.from(messages, ([, value]) => value);

    const show = useCallback((text = '', className = 'primary', onClear) => {
        const id = Date.now();
        const timerId = window.setInterval(() => {
            setMessages(prev => {
                onClear?.();
                const newMessages = new Map(prev);
                const timerId = newMessages.get(id)?.timerId;

                if (!timerId) return prev;

                timers.current = timers.current.length
                    ? [...timers.current, timerId]
                    : [timerId];
                newMessages.delete(id);
                return newMessages;
            });
        }, 4000);
        const message = {
            id,
            text,
            timerId,
            className: `is-${className}`
        };

        setMessages(prev => {
            const newMessages = new Map(prev);
            newMessages.set(id, message);
            return newMessages;
        });
    }, []);
    const value = useMemo(
        () => ({
            success: (text, onClear) => show(text, 'success', onClear),
            warning: (text, onClear) => show(text, 'warning', onClear),
            error: (text, onClear) => show(text, 'error', onClear),
            show: (text, onClear) => show(text, 'primary', onClear)
        }),
        []
    );

    useEffect(() => {
        return () => {
            if (messages.size > 0 && timers.current.length) {
                timers.current.forEach(id => window.clearInterval(id));
                timers.current = [];
            }
        };
    }, [messages]);

    return (
        <MessageContext.Provider value={value}>
            {msgs.map(message => (
                <section
                    key={message.id}
                    className="message-right"
                    style={{
                        position: 'fixed',
                        top: 8,
                        right: 8,
                        zIndex: 10
                    }}
                >
                    <div
                        className="nes-balloon from-right"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4
                        }}
                    >
                        <span className="nes-badge" style={{ width: 16 }}>
                            <span className={message.className}>.</span>
                        </span>
                        <p>{message.text}</p>
                    </div>
                </section>
            ))}
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    const context = useContext(MessageContext);

    if (typeof context === 'undefined')
        throw new Error(
            'The useMessage hook must be consumed inside of a MessageProvider child node.'
        );

    return context;
};
