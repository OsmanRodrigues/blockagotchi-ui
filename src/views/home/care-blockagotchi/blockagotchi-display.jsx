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

const selectPetRandom = () => {
    const random = Math.random() * 10;
    const idx = random > 9 ? Math.floor(random) : Math.ceil(random);

    return pet[idx];
};

export const BlockagotchiDisplay = () => {
    const currentPet = useRef(selectPetRandom());
    const [scope, animate] = useAnimate();
    const stylesDefault = {
        position: 'absolute',
        width: '150px',
        height: '150px',
        top: 0,
        objectFit: 'cover'
    };

    useEffect(() => {
        animate(
            '#frame1',
            { opacity: [0, 1] },
            {
                times: [0, 0.5],
                duration: 0.5,
                ease: 'anticipate',
                repeat: Infinity,
                repeatDelay: 0.8
            }
        );
        animate(
            '#frame2',
            { opacity: [1, 0] },
            {
                times: [0, 0.6],
                duration: 0.6,
                ease: 'anticipate',
                repeat: Infinity,
                repeatDelay: 0.7
            }
        );
        animate(
            '#frame3',
            { opacity: [1, 0] },
            {
                times: [0, 0.7],
                duration: 0.7,
                ease: 'anticipate',
                repeat: Infinity,
                repeatDelay: 0.6
            }
        );
    }, []);

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
                                objectPosition: '6% 25%'
                            }}
                        />
                    </div>
                    <div id="frame2" style={{ opacity: 0 }}>
                        <img
                            src={currentPet.current}
                            style={{
                                ...stylesDefault,
                                objectPosition: '37% 25%'
                            }}
                        />
                    </div>
                    <div id="frame3" style={{ opacity: 0 }}>
                        <img
                            src={currentPet.current}
                            style={{
                                ...stylesDefault,
                                objectPosition: '68% 25%'
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
