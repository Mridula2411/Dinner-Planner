export function SuspenseView(props) {
    const { promise, error } = props;

    if (!promise) {
        return <span>no data</span>;
    }
    if (promise && error) {
        return <span>{error.toString()}</span>;
    }
    return (
        <img src="https://brfenergi.se/iprog/loading.gif" />
    );
}
