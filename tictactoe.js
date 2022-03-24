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

const playerStart = (() => {
    const _playerInput1 = document.getElementById('p1name');
    const _playerLabel1 = document.getElementById('p1label');

    var _playerOneName = 'Player 1';
    _playerInput1.addEventListener('change', (e) => {
            _playerLabel1.innerText = e.target.value;
            _playerOneName = e.target.value;
            if (e.target.value == '') {
                _playerLabel1.innerText = 'Player 1'; 
                _playerOneName = 'Player 1';
            }
        });
    const getPlayerOneName = () => {
        return _playerOneName;
    }

    const _playerInput2 = document.getElementById('p2name');
    const _playerLabel2 = document.getElementById('p2label');

    var _playerTwoName = 'Player 2';
    _playerInput2.addEventListener('change', (e) => {
            _playerLabel2.innerText = e.target.value;
            _playerTwoName = e.target.value;
            if (e.target.value == '') {
                _playerLabel2.innerText = 'Player 2'; 
                _playerOneName = 'Player 2';
            }
        });
    const getPlayerTwoName = () => {
        return _playerTwoName;
    }

    const _playerReadyOne = document.getElementById('p1ready'); 
    var _playerReady1 = false;

    _playerReadyOne.addEventListener('click', (e) => {
        _playerReady1 = !_playerReady1;
        if (_playerReady1 == false) {
            _playerReadyOne.classList.remove('ready');
            _playerReadyOne.classList.add('not-ready');
            _playerReadyOne.innerText = 'Not Ready';
        }
        if (_playerReady1 == true) {
            _playerReadyOne.classList.add('ready');
            _playerReadyOne.classList.remove('not-ready');
            _playerReadyOne.innerText = 'Ready';
        }
    })
    const getPlayerOneReady = () => {
        return _playerReady1;
    }

    const _playerReadyTwo = document.getElementById('p2ready'); 
    var _playerReady2 = false;

    _playerReadyTwo.addEventListener('click', (e) => {
        _playerReady2 = !_playerReady2;
        if (_playerReady2 == false) {
            _playerReadyTwo.classList.remove('ready');
            _playerReadyTwo.classList.add('not-ready');
            _playerReadyTwo.innerText = 'Not Ready';
        }
        if (_playerReady2 == true) {
            _playerReadyTwo.classList.add('ready');
            _playerReadyTwo.classList.remove('not-ready');
            _playerReadyTwo.innerText = 'Ready';
        }
    })
    const getPlayerTwoReady = () => {
        return _playerReady2;
    }

    return {
        getPlayerOneName,
        getPlayerTwoName,
        getPlayerOneReady,
        getPlayerTwoReady,
    }
})();

const player = (XO, name) => {
    const getXO = () => {
        return XO;
    }
    const getName = () => {
        return name;
    }
    return {
        getXO,
        getName,
    }
}

const gameControls = (() => {
    const _player1 = player('X', playerStart.getPlayerOneName());
    const _player2 = player('O', playerStart.getPlayerTwoName());

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
        _winStatus = false;
        _roundOdd = true;
        _roundNumber = 0;
        for (let i = 0; i < 9; i++) {
            gameboard.setBoard(i, '');
        }
    }

    var _winner;
    const getWinner = () => {
        if (_roundOdd == true) {
            _winner = _player2.getName();
        }
        if (_roundOdd == false) {
            _winner = _player1.getName();
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
    const _boardContainer = document.getElementById('board');
    const _resultContainer = document.getElementById('result');
    
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
        const _resultMessage = document.getElementById('result-message');
        const _replay = document.getElementById('replay');
        _replay.addEventListener('click', _resetDisplay);

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

    const _resetDisplay = () => {
        gameControls.resetGame();
        _resultContainer.classList.remove('seen');
        _boardContainer.setAttribute('style', 'opacity: initial; filter: initial');

        for (let i = 0; i < _boardSpots.length; i++) {
            _boardSpots[i].innerText = gameboard.getBoard(i);
            _boardSpots[i].setAttribute('style', 'color: white');
        }
    } 
    
    const _startGame = () => {
        const _vs = document.getElementById('vs')
        const _choiceContainer = document.getElementById('player-choice')
        if (playerStart.getPlayerOneReady() === true && playerStart.getPlayerTwoReady() === true) {
            _boardContainer.classList.remove('hidden');
            _vs.classList.remove('hidden');
            _choiceContainer.classList.add('hidden');
            _vs.innerText = `${playerStart.getPlayerOneName()} (X) vs. ${playerStart.getPlayerTwoName()} (O)`;
        }
    }
    
    const _startButton = document.getElementById('start');
    _startButton.addEventListener('click', _startGame)


    return {

    }
})();