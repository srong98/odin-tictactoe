"use strict"

const gameboard = (() => {
    var _board = ['','','','','','','','',''];

    const setBoard = (index, XO) => {
        _board[index]  = XO;
    }
    const getBoard = (index) => {
        return _board[index];
    }
    const fullBoard = () => {
        return _board;
    }

    return {
        getBoard,
        setBoard,
        fullBoard,
    }
})();

const player = (XO) => {
    const getXO = () => {
        return XO;
    }
    return {
        getXO,
    }
}

const gameControls = (() => {
    const _player1 = player('X');
    const _player2 = player('O');

    var _roundOdd = true;
    var _roundNumber = 1;
    const _round = () => {
        _roundOdd = !_roundOdd;
        _roundNumber++;
    }
    
    const playTurn = (index) => {
        if (gameboard.getBoard(index) == '' && winStatus == false) {
            if (_roundOdd == true) {
                gameboard.setBoard(index, _player1.getXO());
            }
            if (_roundOdd == false) {
                gameboard.setBoard(index, _player2.getXO());
            }
            _round();
            checkWin();
        }
    }

    const winConditionIndex = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ]

    var winStatus = false;
    const checkWin = () => {
        for (let i = 0; i < winConditionIndex.length; i++) {
            var one = gameboard.getBoard((winConditionIndex[i])[0]);
            var two = gameboard.getBoard((winConditionIndex[i])[1]);
            var three = gameboard.getBoard((winConditionIndex[i])[2]);

            if (one == two && two == three && one != '' && two != '' && three != '') {
                winStatus = true;
            }
        }
    }

    return {
        playTurn,
    }
})();

const display = (() => {
    const _boardSpots = document.querySelectorAll('.boardspot')
    _boardSpots.forEach(spot => spot.addEventListener('click', (e) => {
        gameControls.playTurn(e.target.getAttribute('data-index'));
        e.target.innerText = gameboard.getBoard(e.target.getAttribute('data-index'));
    }));


    const _boardContainer = document.getElementById('board');
    return {

    }
})();