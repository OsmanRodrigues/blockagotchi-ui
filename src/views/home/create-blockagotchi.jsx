import { useState } from 'react';
import { SectionWrapper } from '../../atomic/wrapper/section.wrapper';
import { Spacer } from '../../atomic/spacer.atm';
import { useMessage } from '../../atomic/message';
import { createBlockagotchi } from '../../services/actions';
import { useRollups } from '../../services/rollups/rollups.context';

export const CreateBlockagotchiSection = ({ onCreateSuccess }) => {
    const message = useMessage();
    const rollups = useRollups();
    const [createStatus, setCreateStatus] = useState('idle');
    const [name, setName] = useState('');
    const minLen = 3;
    const maxLen = minLen + 20;
    const isValid = name.length >= minLen && name.length <= maxLen;
    const isSubmitting = createStatus === 'pending';
    const inputValidationClassName =
        name.length === 0 ? '' : isValid ? ' is-success' : ' is-error';
    const btnValidationClassName =
        !isSubmitting && isValid ? ' is-primary' : ' is-disabled';

    const handleNameChange = e => setName(e.target.value);
    const handleSubmit = (name, inputContract) => {
        setCreateStatus('pending');
        createBlockagotchi(name, inputContract)
            .then(() => {
                message.success(`"${name}" was created!`);
                setCreateStatus('success');
                onCreateSuccess?.();
            })
            .catch(() => {
                message.error(
                    `Oops! An error occurred on try create your blockagotchi.`
                );
                setCreateStatus('error');
            });
    };

    return (
        <SectionWrapper>
            <h2 style={{ textAlign: 'center' }}>Create a blockagotchi</h2>
            <div className="nes-field">
                <label htmlFor="name_field">Name</label>
                <input
                    type="text"
                    id="name_field"
                    className={`nes-input${inputValidationClassName}`}
                    placeholder="Insert a name"
                    value={name}
                    onChange={handleNameChange}
                    min={minLen}
                    max={maxLen}
                />
            </div>
            <Spacer y={16} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    type="button"
                    className={`nes-btn${btnValidationClassName}`}
                    disabled={isSubmitting || !isValid}
                    onClick={() =>
                        handleSubmit(name, rollups.contracts.inputContract)
                    }
                >
                    {isSubmitting ? 'Creating...' : 'Create'}
                </button>
            </div>
        </SectionWrapper>
    );
};
