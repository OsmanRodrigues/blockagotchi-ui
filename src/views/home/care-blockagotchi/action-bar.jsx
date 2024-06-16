import { useState } from 'react';
import { Dialog } from '../../../atomic/dialog.mol';
import { useMessage } from '../../../atomic/message';
import { Spacer } from '../../../atomic/spacer.atm';
import {
    Food,
    feedBlockagotchi,
    takeAWalkWithBlockagotchi,
    batheBlockagotchi
} from '../../../services/actions';
import { useRollups } from '../../../services/rollups/rollups.context';
import { useBlockagotchiInfo } from '../../../services/context/blockagotchi-info.context';
import { useAccountBalance } from '../../../services/context/account-balance.context';

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
    const [actionStatus, setActionStatus] = useState('idle');
    const shouldDisableAllActions = actionStatus.includes('pending');

    const onActionSucceed = signerAddress => {
        getAccountBalance(signerAddress);
        loadBlockagotchi(signerAddress);
        setActionStatus('success');
    };
    const onActionFails = msg => {
        message.error(msg);
        setActionStatus('error');
    };

    const onConfirmFeed = (food, inputContract, signerAddress) => {
        feedDialog.onClose();
        setActionStatus('pendingFeed');
        feedBlockagotchi(food, inputContract)
            .then(() => {
                onActionSucceed(signerAddress);
                message.success(
                    'Your blockagotchi loved this food! Nhom, nhom!'
                );
            })
            .catch(() =>
                onActionFails(
                    'Oops! An error occurred on trying feed your blockagotchi.'
                )
            );
    };

    const handleTakeAWalk = (inputContract, signerAddress) => {
        setActionStatus('pendingTakeAWalk');
        takeAWalkWithBlockagotchi(inputContract)
            .then(() => {
                onActionSucceed(signerAddress);
                message.success('Your blockagotchi got a hard workout! Yeah!');
            })
            .catch(() =>
                onActionFails(
                    'Oops! An error occurred on trying to walk your blockagotchi.'
                )
            );
    };

    const handleBathe = (inputContract, signerAddress) => {
        setActionStatus('pendingBathe');
        batheBlockagotchi(inputContract)
            .then(() => {
                message.success(
                    'Your blockagotchi got a refreshed bath! Whoopi!'
                );
                onActionSucceed(signerAddress);
            })
            .catch(() =>
                onActionFails(
                    'Oops! An error occurred on trying to bathe your blockagotchi.'
                )
            );
    };

    return (
        <>
            <Spacer y={24} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    style={{ marginBottom: 16 }}
                    disabled={shouldDisableAllActions}
                    className={`nes-btn ${shouldDisableAllActions ? 'is-disabled' : 'is-primary'}`}
                    onClick={() =>
                        handleBathe(
                            rollups.contracts.inputContract,
                            rollups.signerAddress
                        )
                    }
                >
                    {actionStatus === 'pendingBathe' ? 'Bathing...' : 'Bathe'}
                </button>
                <Spacer x={16} />
                <div style={{ marginTop: 16 }}>
                    <Dialog
                        title="Feed your blockagotchi!"
                        cta={
                            actionStatus === 'pendingFeed'
                                ? 'Feeding...'
                                : 'Feed'
                        }
                        isPending={shouldDisableAllActions}
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
                <Spacer x={16} />
                <button
                    style={{ marginBottom: 16 }}
                    disabled={shouldDisableAllActions}
                    className={`nes-btn ${shouldDisableAllActions ? 'is-disabled' : 'is-primary'}`}
                    onClick={() =>
                        handleTakeAWalk(
                            rollups.contracts.inputContract,
                            rollups.signerAddress
                        )
                    }
                >
                    {actionStatus === 'pendingTakeAWalk'
                        ? 'Walking...'
                        : 'Take a walk'}
                </button>
            </div>
        </>
    );
};
