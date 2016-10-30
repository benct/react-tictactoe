function Square(props) {
    return (
        <button className={'square' + (props.mark ? ' win' : '')} onClick={() => props.onClick()}>
            {props.value}
        </button>
    );
}