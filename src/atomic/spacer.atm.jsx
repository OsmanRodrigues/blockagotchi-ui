export const Spacer = ({ x, y }) => (
    <div
        style={
            x
                ? { marginLeft: x, marginRight: x }
                : y
                  ? { marginTop: y, marginBottom: y }
                  : null
        }
    />
);
