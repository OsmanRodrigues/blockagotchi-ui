import { SectionWrapper } from '../../../atomic/wrapper/section.wrapper';
import { ActionBar } from './action-bar';
import { BlockagotchiDisplay } from './blockagotchi-display';
import { StatusBar } from './status-bar';

export const CareBlockagotchiSection = props => {
    return (
        <SectionWrapper>
            <StatusBar {...props} />
            <BlockagotchiDisplay />
            <ActionBar />
        </SectionWrapper>
    );
};
