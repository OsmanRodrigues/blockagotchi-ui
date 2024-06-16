import { useEffect, useState } from 'react';
import { ViewWrapper } from '../../atomic/wrapper/view.wrapper.atm';
import { SectionWrapper } from '../../atomic/wrapper/section.wrapper';
import { getRanking } from '../../services/inspects';
import { useMessage } from '../../atomic/message';
import { textShortener } from '../../utils';
import { Spacer } from '../../atomic/spacer.atm';

function RankingView() {
    const message = useMessage();
    const [ranking, setRanking] = useState({
        status: 'idle'
    });

    useEffect(() => {
        setRanking({ status: 'pending' });
        getRanking()
            .then(res =>
                setRanking({
                    status: 'success',
                    data: res.data
                })
            )
            .catch(() =>
                message.error(
                    'Oops! An error occurred while trying load the ranking.'
                )
            );
    }, []);

    return (
        <ViewWrapper>
            <SectionWrapper>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <i className="nes-icon is-medium star" />
                    <h2 style={{ textAlign: 'center' }}>
                        Blockagotchi ranking
                    </h2>
                    <i className="nes-icon is-medium star" />
                </div>
                <Spacer y={16} />
                <div
                    className="nes-table-responsive"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        maxHeight: 412,
                        overflow: 'auto'
                    }}
                >
                    <table
                        className="nes-table is-bordered"
                        style={{ width: '96%', minHeight: 296 }}
                    >
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>age</th>
                                <th>stage</th>
                                <th>score</th>
                                <th>owner</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ranking.status === 'success' ? (
                                ranking.data?.length ? (
                                    <>
                                        {ranking.data.map(
                                            (blockagotchiInfo, idx) => (
                                                <tr key={blockagotchiInfo.id}>
                                                    <td>
                                                        {blockagotchiInfo.id}
                                                    </td>
                                                    <td>
                                                        {idx >= 0 &&
                                                        idx <= 2 ? (
                                                            <>
                                                                <i
                                                                    className={`nes-icon ${idx > 0 ? 'coin' : 'trophy'} is-small`}
                                                                    style={{
                                                                        marginRight: 4
                                                                    }}
                                                                />
                                                            </>
                                                        ) : null}
                                                        {blockagotchiInfo.name}
                                                    </td>
                                                    <td>
                                                        {blockagotchiInfo.age}
                                                    </td>
                                                    <td>
                                                        {blockagotchiInfo.stage}
                                                    </td>
                                                    <td>
                                                        {
                                                            blockagotchiInfo.overall_score
                                                        }
                                                    </td>
                                                    <td>
                                                        {textShortener(
                                                            blockagotchiInfo.owner
                                                        )}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </>
                                ) : (
                                    <tr>
                                        <td>No blockagotchis ranked yet.</td>
                                    </tr>
                                )
                            ) : null}
                            {ranking.status === 'pending' ? (
                                <tr>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                    <td>...</td>
                                </tr>
                            ) : null}
                            {ranking.status === 'error' ? (
                                <p>Oops! Something went wrong.</p>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </SectionWrapper>
        </ViewWrapper>
    );
}

export default RankingView;
