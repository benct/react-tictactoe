class Board extends React.Component {
    renderSquare(i) {
        return <Square key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    render() {
        let count = 0, rows = [];
        for (let i = 1; i <= 3; i++) {
            let cols = [];
            for (let j = 1; j <= 3; j++) {
                cols.push(this.renderSquare(count));
                count++;
            }
            rows.push(<div key={i} className="board-row">{cols}</div>);
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}