import React, { useState } from 'react';
import './styles.css'

const initialBoard = Array(9).fill(null);

const Tateti = () => {
    const [board, setBoard] = useState(initialBoard);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [winner, setWinner] = useState(null);

    const handleCellClick = (index) => {
        if (board[index] || winner) {
            return;
        }

        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        checkWinner(newBoard);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    };

    const checkWinner = (board) => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return;
            }
        }

        if (!board.includes(null)) {
            setWinner('draw');
        }
    };

    const resetGame = () => {
        setBoard(initialBoard);
        setCurrentPlayer('X');
        setWinner(null);
    };

    const renderCell = (index) => {
        return (
            <div
                className={`cell ${board[index]}`}
                onClick={() => handleCellClick(index)}
                key={index}
            >
                {board[index]}
            </div>
        );
    };

    return (
        <div className="app">
            <h1>Tateti</h1>
            <div className="board">
                {board.map((cell, index) => (
                    renderCell(index)
                ))}
            </div>
            {winner && (
                <div className="message">
                    {winner === 'draw' ? '¡Empate!' : `¡Ganador: ${winner}!`}
                    <button onClick={resetGame}>Reiniciar</button>
                </div>
            )}
        </div>
    );
};

export default Tateti;
