import { SectionWrapper } from '../../../atomic/wrapper/section.wrapper';
import { BlockagotchiReactionProvider } from '../../../services/context/blockagotchi-reaction.context';
import { ActionBar } from './action-bar';
import { BlockagotchiDisplay } from './blockagotchi-display';
import { StatusBar } from './status-bar';

export const CareBlockagotchiSection = props => {
    return (
        <SectionWrapper>
            <StatusBar {...props} />
            <BlockagotchiReactionProvider>
                <BlockagotchiDisplay />
                <ActionBar />
            </BlockagotchiReactionProvider>
        </SectionWrapper>
    );
};
