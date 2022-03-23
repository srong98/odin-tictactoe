"use strict"

const gameboard = (() => {
    var _board = ['','','','','','','','',''];

    const setBoard = (index, XO) => {
        _board[index] = XO;
    }
    const getBoard = (index) => {
        return _board[index];
    }

    return {
        getBoard,
        setBoard,
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
    var _roundNumber = 0;
    const _round = () => {
        _roundOdd = !_roundOdd;
        _roundNumber++;
    }
    const getRound = () => {
        return _roundNumber;
    }
    
    const playTurn = (index) => {
        if (gameboard.getBoard(index) == '' && _winStatus == false) {
            if (_roundOdd == true) {
                gameboard.setBoard(index, _player1.getXO());
            }
            if (_roundOdd == false) {
                gameboard.setBoard(index, _player2.getXO());
            }
            _round();
            _checkWin();
        }
    }
    
    const resetGame = () => {
        _winner = '';
        _roundOdd = true;
        _roundNumber = 0;
        for (let i = 0; i < 9; i++) {
            gameboard.setBoard(i, '');
        }
    }

    var _winner;
    const getWinner = () => {
        if (_roundOdd == true) {
            _winner = 'Player 2';
        }
        if (_roundOdd == false) {
            _winner = 'Player 1';
        }
        return _winner;
    }

    var _winStatus = false; 
    var _winLine = [];
    const _winConditionIndex = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8],
    ]
    const _checkWin = () => {
        for (let i = 0; i < _winConditionIndex.length; i++) {
            var one = gameboard.getBoard((_winConditionIndex[i])[0]);
            var two = gameboard.getBoard((_winConditionIndex[i])[1]);
            var three = gameboard.getBoard((_winConditionIndex[i])[2]);
            if (one == two && two == three && one != '' && two != '' && three != '') {
                _winStatus = true;
                _winLine = [(_winConditionIndex[i])[0], (_winConditionIndex[i])[1], (_winConditionIndex[i])[2]];
                return _winLine;
            }

        }
    }
    const getWinStatus = () => {
        return _winStatus;
    }
    const getWinLine = () => {
        return _winLine;
    }
    
    return {
        playTurn,
        getWinStatus,
        getRound,
        getWinLine,
        getWinner,
        resetGame,
    }
})();

const display = (() => {
    const _boardSpots = document.querySelectorAll('.boardspot');
    
    _boardSpots.forEach(spot => spot.addEventListener('click', (e) => {
        gameControls.playTurn(e.target.getAttribute('data-index'));
        e.target.innerText = gameboard.getBoard(e.target.getAttribute('data-index'));
        _highlightWinLine();
        setTimeout(_endGameDisplay, 3000);
    }));

    const _highlightWinLine = () => {
        if (gameControls.getWinStatus() == true) {
            _boardSpots[gameControls.getWinLine()[0]].setAttribute('style', 'color: green');
            _boardSpots[gameControls.getWinLine()[1]].setAttribute('style', 'color: green');
            _boardSpots[gameControls.getWinLine()[2]].setAttribute('style', 'color: green');
    }}

    const _endGameDisplay = () => { 
        const _boardContainer = document.getElementById('board');
        const _resultContainer = document.getElementById('result');
        const _resultMessage = document.getElementById('result-message');
        const _replay = document.getElementById('replay');
        _replay.addEventListener('click', resetDisplay);

        if (gameControls.getWinStatus() == true || gameControls.getRound() == 9) {
            _boardContainer.setAttribute('style', 'opacity: 0.3; filter: blur(8px)');
            if (gameControls.getWinStatus() == false && gameControls.getRound() == 9) {
                _resultContainer.classList.add('seen');
                _resultMessage.innerText = 'Draw';
            }
            else if (gameControls.getWinStatus() == true) {
                _resultContainer.classList.add('seen');
                _resultMessage.innerText = `${gameControls.getWinner()} Wins!`;
            }
    }}

    const resetDisplay = () => {
        const _resultContainer = document.getElementById('result');
        const _boardContainer = document.getElementById('board');

        gameControls.resetGame();
        _resultContainer.classList.remove('seen');
        _boardContainer.setAttribute('style', 'opacity: initial; filter: initial');

        for (let i = 0; i < _boardSpots.length; i++) {
            _boardSpots[i].innerText = gameboard.getBoard(i);
        }
    }

    return {

    }
})();