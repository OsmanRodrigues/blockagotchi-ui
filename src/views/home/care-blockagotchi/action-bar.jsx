import { useState } from 'react';
import { Dialog } from '../../../atomic/dialog.mol';
import { Food, feedBlockagotchi } from '../../../services/actions';
import { useRollups } from '../../../services/rollups/rollups.context';
import { useAccountBalance } from '../../../services/context/account-balance.context';
import { useMessage } from '../../../atomic/message';
import { useBlockagotchiInfo } from '../../../services/context/blockagotchi-info.context';

export const ActionBar = () => {
    const message = useMessage();
    const rollups = useRollups();
    const [, getAccountBalance] = useAccountBalance();
    const [, loadBlockagotchi] = useBlockagotchiInfo();

    const [feedDialog, setFeedDialog] = useState({
        isOpen: false,
        onClose: () => setFeedDialog(prev => ({ ...prev, isOpen: false })),
        onOpen: () => setFeedDialog(prev => ({ ...prev, isOpen: true }))
    });
    const [selectedFood, setSelectedFood] = useState();
    const [feedStatus, setFeedStatus] = useState('idle');

    const onConfirmFeed = (food, inputContract, signerAddress) => {
        feedDialog.onClose();
        setFeedStatus('pending');
        feedBlockagotchi(food, inputContract)
            .then(() => {
                getAccountBalance(signerAddress);
                loadBlockagotchi(signerAddress);
                setFeedStatus('success');
            })
            .catch(() => {
                message.error(
                    'Oops! An error occurred on trying feed your blockagotchi.'
                );
                setFeedStatus('error');
            });
    };

    return (
        <div>
            <Dialog
                title="Feed your blockagotchi!"
                cta={feedStatus === 'pending' ? 'Feeding...' : 'Feed'}
                isPending={feedStatus === 'pending'}
                onConfirm={() =>
                    onConfirmFeed(
                        selectedFood,
                        rollups.contracts.inputContract,
                        rollups.signerAddress
                    )
                }
                {...feedDialog}
            >
                <label htmlFor="default_select">Select a food</label>
                <div className="nes-select">
                    <select
                        required
                        id="default_select"
                        value={selectedFood}
                        onChange={e => setSelectedFood(e.target.value)}
                    >
                        <option value="" disabled selected hidden>
                            Select...
                        </option>
                        {Object.values(Food).map(foodKey => (
                            <option key={foodKey} value={foodKey}>
                                {foodKey}
                            </option>
                        ))}
                    </select>
                </div>
            </Dialog>
        </div>
    );
};
