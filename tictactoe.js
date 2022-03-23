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
    const _Player1 = player('X');
    const _Player2 = player('O');

    var roundOdd = true;
    const _round = () => {
        roundOdd = !roundOdd;
    }
    
    const playTurn = (index) => {
        if (gameboard.getBoard(index) == '') {
            if (roundOdd == true) {
                gameboard.setBoard(index, _Player1.getXO());
            }
            if (roundOdd == false) {
                gameboard.setBoard(index, _Player2.getXO());
            }
            _round();
        }
    }
/* Unfinished

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
            var one = gameboard.getBoard[(winConditionIndex[i])[0]]
            var two = gameboard.getBoard[(winConditionIndex[i])[1]]
            var three = gameboard.getBoard[(winConditionIndex[i])[3]]
            if (one === two && two === three && one === three) 
                return winStatus = true;
        }
    }*/

    return {
        playTurn,
    }
})();

const display = (() => {
    const boardSpots = document.querySelectorAll('.boardspot')
    boardSpots.forEach(spot => spot.addEventListener('click', (e) => {
        gameControls.playTurn(e.target.getAttribute('data-index'));
        e.target.innerText = gameboard.getBoard(e.target.getAttribute('data-index'));
    }));

    return {

    }
})();