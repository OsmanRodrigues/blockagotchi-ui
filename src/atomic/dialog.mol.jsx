export const Dialog = ({
    isOpen,
    onClose,
    onOpen,
    onConfirm,
    cta,
    title,
    children,
    isPending
}) => {
    return (
        <section>
            <button
                disabled={isPending}
                type="button"
                className={`nes-btn ${isPending ? 'is-disabled' : 'is-primary'}`}
                onClick={onOpen}
            >
                {cta ?? 'Open dialog'}
            </button>
            <dialog
                className="nes-dialog"
                id="dialog-default"
                open={isOpen}
                style={{
                    position: 'fixed',
                    top: '40%',
                    zIndex: 10
                }}
            >
                <p className="title">{title ?? 'Dialog'}</p>
                {children}
                <menu className="dialog-menu">
                    <button className="nes-btn" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="nes-btn is-primary" onClick={onConfirm}>
                        Confirm
                    </button>
                </menu>
            </dialog>
        </section>
    );
};
