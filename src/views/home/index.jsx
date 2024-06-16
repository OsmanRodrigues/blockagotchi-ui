import { ViewWrapper } from '../../atomic/wrapper/view.wrapper.atm';

function HomeView() {
    return (
        <ViewWrapper>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: 12
                }}
            ></div>
            <button className="nes-btn is-primary">create</button>
        </ViewWrapper>
    );
}

export default HomeView;
