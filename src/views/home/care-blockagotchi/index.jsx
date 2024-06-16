import { SectionWrapper } from '../../../atomic/wrapper/section.wrapper';
import { BlockagotchiDisplay } from './blockagotchi-display';

// "isLoading": false,
// "id": 1,
// "owner": "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
// "name": "Gottito",
// "birth_time": "1970-01-01T00:00:51.982240Z",
// "age": 0,
// "stage": "Blob",
// "type": null,
// "biotype": "Normal",
// "condition": "Normal",
// "happiness": 50,
// "last_fed_time": "1970-01-01T00:00:51.982368Z",
// "last_walk_time": "1970-01-01T00:00:51.982368Z",
// "last_bath_time": "1970-01-01T00:00:51.982432Z",
// "alive": true,
// "food_history": [],
// "items": [],
// "overall_score": 50

export const CareBlockagotchiSection = props => {
    // console.log('props ->', props);
    return (
        <SectionWrapper>
            <BlockagotchiDisplay />
        </SectionWrapper>
    );
};
