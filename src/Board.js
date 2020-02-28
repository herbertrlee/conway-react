import React from 'react';

function Square(props) {
    let cellClass = "cell-dead";

    if (props.value === true) {
        cellClass = "cell-alive";
    }

    return <button className={cellClass} onClick={props.onClick}>&nbsp;</button>;
}

class Board extends React.Component {

    renderCell(cell) {
        return <Square
            value={cell.value}
            onClick={() => this.props.onClick(cell.row, cell.col)}
        />
    }

    renderRow(row) {
        let cells = row.map(cell => {
            return this.renderCell(cell);
        });

        return (<div>{cells}</div>);
    }

    render() {
        let rows = this.props.cells.map(row => {
            return this.renderRow(row);
        });

        return (<div>{rows}</div>);
    }
}

export default Board;
