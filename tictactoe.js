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

const player = (XO, number) => {
    const getXO = () => {
        return XO;
    }

    const _playerInput = document.getElementById(`p${number}name`);
    const _playerLabel = document.getElementById(`p${number}label`);

    var _playerName = `Player ${number}`;
    _playerInput.addEventListener('change', (e) => {
            _playerLabel.innerText = e.target.value;
            _playerName = e.target.value;
            if (e.target.value == '') {
                _playerLabel.innerText = `Player ${number}`; 
                _playerName = `Player ${number}`;
            }
        })
    const getPlayerName = () => {
        return _playerName;
    }

    const _playerReady = document.getElementById(`p${number}ready`);

    var _playerIsReady = false;
    _playerReady.addEventListener('click', (e) => {
        _playerIsReady = !_playerIsReady;
        if (_playerIsReady == false) {
            _playerReady.classList.remove('ready');
            _playerReady.classList.add('not-ready');
            _playerReady.innerText = 'Not Ready';
        }
        if (_playerIsReady == true) {
            _playerReady.classList.add('ready');
            _playerReady.classList.remove('not-ready');
            _playerReady.innerText = 'Ready';
        }
    })
    const getPlayerReady = () => {
        return _playerIsReady;
    }

    return {
        getXO,
        getPlayerName,
        getPlayerReady,
    }
}

const gameControls = (() => {
    const _player1 = player('X', 1);
    const _player2 = player('O', 2);

    const getPlayerOneName = () => {
        return _player1.getPlayerName();
    }
    const getPlayerOneReady = () => {
        return _player1.getPlayerReady();
    }

    const getPlayerTwoReady = () => {
        return _player2.getPlayerReady();
    }
    const getPlayerTwoName = () => {
        return _player2.getPlayerName();
    }

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
                
            } 
        if (display.getComputerMode() == false) {  
            _round();
        }
        _checkWin();
    }
    

    var _overallRound = false;
    const resetGame = () => {
        if (_winStatus == true || _roundNumber == 9) {
            _overallRound = !_overallRound;
            _winner = '';
            _winStatus = false;
            if (display.getComputerMode() == false) {
                _roundOdd = true;
            }
            if (display.getComputerMode() == true) {
                _roundOdd = !_roundOdd;
            }
            _roundNumber = 0;
            for (let i = 0; i < 9; i++) {
                gameboard.setBoard(i, '');
            }
        }
    }
    const getOverallRound = () => {
        return _overallRound;
    }

    var _winner;
    const _updateWinner = () => {
        if (_overallRound == false) {
            if (_roundOdd == true && display.getComputerMode() == false) {
                _winner = _player2.getPlayerName();
            }
            else if (_roundOdd == false) {
                _winner = _player1.getPlayerName();
            }
            else  {
                _winner = 'Computer';
            }
        }
        if (_overallRound == true) {
            if (_roundOdd == true) {
                _winner = _player1.getPlayerName();
            }
            else if (_roundOdd == false && display.getComputerMode() == false) {
                _winner = _player2.getPlayerName();
            }
            else {
                _winner = 'Computer';
            }
        }
    }
    const getWinner = () => {
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
                _updateWinner();
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

    var _computerIndex;
    const _getComputerMove = () => {
        var _legalIndex = [];
        for (let i = 0; i < 9; i++) {
            if (gameboard.getBoard(i) == '') {
                _legalIndex.push(i);
            }
        }
       _computerIndex = _legalIndex[Math.floor(Math.random() * _legalIndex.length)]
    }

    const playComputerTurn = () => {
        const _boardSpots = document.querySelectorAll('.boardspot');
        if (_overallRound == false) {
            _getComputerMove();
            gameboard.setBoard(_computerIndex, `O`);
            _boardSpots[_computerIndex].innerText = `O`;
        }
        if (_overallRound == true) {
            _getComputerMove();
            gameboard.setBoard(_computerIndex, `X`);
            _boardSpots[_computerIndex].innerText = `X`;
        }
    }

    return {
        playTurn,
        playComputerTurn,
        getWinStatus,
        getRound,
        getWinLine,
        getWinner,
        getOverallRound,
        getPlayerOneName,
        getPlayerOneReady,
        getPlayerTwoName,
        getPlayerTwoReady,
        resetGame,
    }
})();

const display = (() => {
    const _boardSpots = document.querySelectorAll('.boardspot');
    const _boardContainer = document.getElementById('board');
    const _resultContainer = document.getElementById('result');
    const _vs = document.getElementById('vs');
    
    _boardSpots.forEach(spot => spot.addEventListener('click', (e) => {
        if (display.getComputerMode() == true) {
            if (gameControls.getOverallRound() == true) {
                gameControls.playComputerTurn();
                gameControls.playTurn(e.target.getAttribute('data-index'));
                e.target.innerText = gameboard.getBoard(e.target.getAttribute('data-index'));
            }
            if (gameControls.getOverallRound() == false) {
                gameControls.playTurn(e.target.getAttribute('data-index')); 
                e.target.innerText = gameboard.getBoard(e.target.getAttribute('data-index'));
                setTimeout(gameControls.playComputerTurn, 1000);
                
            }
        }
        if (display.getComputerMode() == false) {
            gameControls.playTurn(e.target.getAttribute('data-index'));
            e.target.innerText = gameboard.getBoard(e.target.getAttribute('data-index'));
        }
        _highlightWinLine();
        setTimeout(_endGameDisplay, 3000);
    }))

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

        if (gameControls.getOverallRound() == false && display.getComputerMode() == false) {
            _vs.innerText = `${gameControls.getPlayerOneName()} (X) vs. ${gameControls.getPlayerTwoName()} (O)`
        };
        if (gameControls.getOverallRound() == true && display.getComputerMode() == false) {
            _vs.innerText = `${gameControls.getPlayerTwoName()} (X) vs. ${gameControls.getPlayerOneName()} (O)`
        };
        if (gameControls.getOverallRound() == false && display.getComputerMode() == true) {
            _vs.innerText = `${gameControls.getPlayerOneName()} (X) vs. Computer (O)`
        };
        if (gameControls.getOverallRound() == true && display.getComputerMode() == true) {
            _vs.innerText = `Computer (X) vs. ${gameControls.getPlayerOneName()} (O)`
        };


        for (let i = 0; i < _boardSpots.length; i++) {
            _boardSpots[i].innerText = gameboard.getBoard(i);
            _boardSpots[i].setAttribute('style', 'color: white');
        }
    } 
    
    const _vsPlayer = document.getElementById('vsplayer');
    _vsPlayer.addEventListener('click', () => {
        _computerMode = false;
        const _player2OrComputer = document.getElementById('player2-or-comp')
        const _p2 = document.getElementById('player2');
        _p2.classList.remove('hidden');
        _player2OrComputer.classList.add('hidden');
    })

    var _computerMode = true;
    const _vsComputer = document.getElementById('vscomputer');
    _vsComputer.addEventListener('click', () => {       
        const _compChoice = document.querySelectorAll('.computer');
        _compChoice.forEach(item => item.classList.remove('hidden'))
        _vsPlayer.classList.add('hidden');
        _vsComputer.classList.add('hidden');
    })
    const getComputerMode = () => {
        return _computerMode;
    }

    const _startGame = () => {
            const _choiceContainer = document.getElementById('player-choice');
            if (_computerMode === true && gameControls.getPlayerOneReady() === true) {
                _boardContainer.classList.remove('hidden');
                _vs.classList.remove('hidden');
                _choiceContainer.classList.add('hidden');
                _vs.innerText = `${gameControls.getPlayerOneName()} (X) vs. Computer (O)`;
            }
            if (gameControls.getPlayerOneReady() === true && gameControls.getPlayerTwoReady() === true) {
                _boardContainer.classList.remove('hidden');
                _vs.classList.remove('hidden');
                _choiceContainer.classList.add('hidden');
                _vs.innerText = `${gameControls.getPlayerOneName()} (X) vs. ${gameControls.getPlayerTwoName()} (O)`;
            }
        }
        
    const _startButton = document.getElementById('start');
    _startButton.addEventListener('click', _startGame);

    return {
        getComputerMode,
    }
})();