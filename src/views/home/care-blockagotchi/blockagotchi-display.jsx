import Bird from '../../../../assets/Images/Bird.png';
import Cat from '../../../../assets/Images/Cat.png';
import Dog from '../../../../assets/Images/Dog.png';
import Duck from '../../../../assets/Images/Duck.png';
import Lion from '../../../../assets/Images/Lion.png';
import Owl from '../../../../assets/Images/Owl.png';
import Tiger from '../../../../assets/Images/Tiger.png';
import Toucan from '../../../../assets/Images/Toucan.png';
import Wolf from '../../../../assets/Images/Wolf.png';

import { useAnimate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useBlockagotchiReaction } from '../../../services/context/blockagotchi-reaction.context';

const pet = {
    1: Bird,
    2: Cat,
    3: Dog,
    4: Duck,
    5: Lion,
    6: Owl,
    7: Tiger,
    8: Toucan,
    9: Wolf
};
const timeDefault = {
    frame1: {
        times: [0, 0.5],
        duration: 0.5,
        repeatDelay: 0.8
    },
    frame2: {
        times: [0, 0.6],
        duration: 0.6,
        repeatDelay: 0.7
    },
    frame3: {
        times: [0, 0.7],
        duration: 0.7,
        repeatDelay: 0.6
    }
};

const timeFast = {
    frame1: {
        times: [0, 0.1],
        duration: 0.1,
        repeatDelay: 0.4
    },
    frame2: {
        times: [0, 0.2],
        duration: 0.2,
        repeatDelay: 0.3
    },
    frame3: {
        times: [0, 0.3],
        duration: 0.3,
        repeatDelay: 0.2
    }
};

const selectPetRandom = () => {
    const random = Math.random() * 10;
    const idx = random > 9 ? Math.floor(random) : Math.ceil(random);

    return pet[idx];
};

export const BlockagotchiDisplay = () => {
    const currentPet = useRef(selectPetRandom());
    const [scope, animate] = useAnimate();
    const [reaction] = useBlockagotchiReaction();
    const stylesDefault = {
        position: 'absolute',
        width: '180px',
        height: '180px',
        top: 0,
        objectFit: 'cover'
    };
    const timeFallback = reaction === 'excited' ? timeFast : timeDefault;

    useEffect(() => {
        animate(
            '#frame1',
            { opacity: [0, 1] },
            {
                ...timeFallback.frame1,
                ease: 'anticipate',
                repeat: Infinity
            }
        );
        animate(
            '#frame2',
            { opacity: [1, 0] },
            {
                ...timeFallback.frame2,
                ease: 'anticipate',
                repeat: Infinity
            }
        );
        animate(
            '#frame3',
            { opacity: [1, 0] },
            {
                ...timeFallback.frame3,
                ease: 'anticipate',
                repeat: Infinity
            }
        );
    }, [timeFallback]);

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        width: stylesDefault.width,
                        height: stylesDefault.height
                    }}
                    ref={scope}
                >
                    <div id="frame1">
                        <img
                            src={currentPet.current}
                            style={{
                                ...stylesDefault,
                                objectPosition: '4% 50%'
                            }}
                        />
                    </div>
                    <div id="frame2" style={{ opacity: 0 }}>
                        <img
                            src={currentPet.current}
                            style={{
                                ...stylesDefault,
                                objectPosition: '35% 50%'
                            }}
                        />
                    </div>
                    <div id="frame3" style={{ opacity: 0 }}>
                        <img
                            src={currentPet.current}
                            style={{
                                ...stylesDefault,
                                objectPosition: '66% 50%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
