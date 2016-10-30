class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            history: [{
                squares: new Array(9).fill(null),
                lastMove: null
            }],
            stepNumber: 0,
            xIsNext: true
        };
    }

    calculateWinner(squares) {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return lines[i];
            }
        }
        return null;
    }

    calculateDraw(squares) {
        return squares.every((square) => square);
    }

    getMoveLocation(i) {
        const row = i < 3 ? 1 : i < 6 ? 2 : 3;
        const col = i == 0 || i == 3 || i == 6 ? 1 : i == 1 || i == 4 || i == 7 ? 2 : 3;
        return [row, col];
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || this.calculateDraw(squares) || squares[i]) {
            return;
        }
        const [row, col] = this.getMoveLocation(i);
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                lastMove: squares[i] + ' (' + row + ', ' + col + ')'
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) ? false : true
        });
    }

    renderMoves() {
        return this.state.history.map((state, move) => {
            const desc = move ? state.lastMove : 'Game start';
            return (
                <li key={move} style={{fontWeight: this.state.stepNumber == move ? 'bold' : 'normal'}}>
                    <a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
                </li>
            );
        });
    }

    render() {
        const current = this.state.history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        const draw = this.calculateDraw(current.squares);
        const prefix = winner ? 'Game over! Winner:' : draw ? 'Game over!' : 'Next player:';
        const status = winner ? current.squares[winner[0]] : draw ? 'Draw!' : this.state.xIsNext ? 'X' : 'O';

        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} winner={winner} onClick={(i) => this.handleClick(i)} />
                </div>
                <div className="game-info">
                    <div>{prefix} <span className="status">{status}</span></div>
                    <ol>{this.renderMoves()}</ol>
                </div>
            </div>
        );
    }
}