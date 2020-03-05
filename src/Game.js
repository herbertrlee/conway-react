import React from 'react';
import Board from './Board';

class Game extends React.Component {
    constructor (props) {
        super(props);
        this.boardSize = 50;
        this.state = {
            cells: this.createInitialCells(),
            generation: 0,
            running: false
        };
    }

    componentDidMount() {
        this.timerId = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    createInitialCells() {
        let cells = Array(this.boardSize);

        for (let i = 0; i < this.boardSize; i++) {
            cells[i] = Array(this.boardSize);
            for (let j=0; j < this.boardSize; j++) {
                cells[i][j] = {
                    row: i,
                    col: j,
                    value: false
                };
            }
        }

        return cells;
    }

    handleClick(row, col) {
        let cells = this.state.cells;
        cells[row][col].value = !cells[row][col].value;

        this.setState({cells: cells});
    }

    toggleRunning() {
        this.setState({running: !this.state.running});
    }

    tick() {
        if (this.state.running) {
            let cells = Array(this.boardSize);

            for (let i = 0; i < this.boardSize; i++) {
                cells[i] = Array(this.boardSize);
                for (let j=0; j < this.boardSize; j++) {
                    cells[i][j] = {
                        row: i,
                        col: j,
                        value: this.getNextValue(i, j)
                    };
                }
            }

            this.setState({
                cells: cells,
                generation: this.state.generation + 1
            });
        }
    }

    getNextValue(i, j) {
        const livingNeighborCount = this.getLivingNeighborCount(i, j);
        const isAlive = this.isAlive(i, j);

        if (isAlive && (livingNeighborCount === 2 || livingNeighborCount === 3)) {
            return true;
        } else if (!isAlive && livingNeighborCount === 3) {
            return true;
        }

        return false;
    }

    getLivingNeighborCount(i, j) {
        const neighborIndices = [
            [i - 1, j - 1], [i, j - 1], [i + 1, j - 1],
            [i - 1, j], [i + 1, j],
            [i - 1, j + 1], [i, j + 1], [i + 1, j + 1]
        ];

        return neighborIndices.map(indices => {
            if (this.isAlive(indices[0], indices[1]) === true) {
                return 1;
            } else {
                return 0;
            }
        }).reduce((a,b) => a + b, 0);
    }

    isAlive(i, j) {
        if (i < 0 || i >= this.state.cells.length) {
            return false;
        }
        const row = this.state.cells[i];

        if (j < 0 || j >= row.length) {
            return false;
        }

        return row[j].value;
    }

    getButtonText() {
        let buttonText = "Start";

        if (this.state.running) {
            buttonText = "Stop";
        }

        return buttonText;
    }

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        cells={this.state.cells}
                        onClick={(i, j) => {this.handleClick(i, j)}}
                    />
                </div>
                <div className="game-info">
                    <button onClick={() => this.toggleRunning()}>{this.getButtonText()}</button>
                    <p>Generation: {this.state.generation}</p>
                </div>
            </div>
        );
    }
}

export default Game;
