export const StatusBar = props => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
            <StatusDisplay title="Id" data={props.id} />
            <StatusDisplay title="Name" data={props.name} />
            <StatusDisplay title="Age" data={props.age} />
            <StatusDisplay title="Stage" data={props.stage} />
        </div>
        <div>
            <StatusDisplay title="Biotype" data={props.biotype} />
            <StatusDisplay title="Condition" data={props.condition} />
            <StatusDisplay title="Happiness" data={props.happiness} />
            <StatusDisplay title="Score" data={props.overall_score} />
        </div>
    </div>
);
const StatusDisplay = ({ title, data }) => (
    <p>{`${title}: ${data ?? 'no data'}`}</p>
);
