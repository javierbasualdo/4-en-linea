import Piece from './Piece.js';

runGame();

function runGame() {

    const boardEl = document.querySelector('.board');

    const PIECES_COLUMNS = 7;
    const PIECES_ROWS = 6;
    const PIECES_COLORS = ['red', 'yellow'];
    const piecesAdded = { 'red': [], 'yellow': [] };
    const WIN_COMBINATIONS = [
        // Horizontal
        [0,1,2,3], [1,2,3,4], [2,3,4,5], [3,4,5,6],
        [7,8,9,10], [8,9,10,11], [9,10,11,12], [10,11,12,13],
        [14,15,16,17], [15,16,17,18], [16,17,18,19], [17,18,19,20],
        [21,22,23,24], [22,23,24,25], [23,24,25,26], [24,25,26,27],
        [28,29,30,31], [29,30,31,32], [30,31,32,33], [31,32,33,34],
        [35,36,37,38], [36,37,38,39], [37,38,39,40], [38,39,40,41],
        // Vertical
        [0,7,14,21], [7,14,21,28], [14,21,28,35],
        [1,8,15,22], [8,15,22,29], [15,22,29,36],
        [2,9,16,23], [9,16,23,30], [16,23,30,37],
        [3,10,17,24], [10,17,24,31], [17,24,31,38],
        [4,11,18,25], [11,18,25,32], [18,25,32,39],
        [5,12,19,26], [12,19,26,33], [19,26,33,40],
        [6,13,20,27], [13,20,27,34], [20,27,34,41],
        // Diagonal
        [0,8,16,24], [8,16,24,32], [16,24,32,40],
        [1,9,17,25], [9,17,25,33], [17,25,33,41],
        [2,10,18,26], [10,18,26,34], [3,11,19,27],
        [7,15,23,31], [15,23,31,39],
        [14,22,30,38],
        [3,9,15,21], 
        [4,10,16,22], [10,16,22,28],
        [5,11,17,23], [11,17,23,29], [17,23,29,35],
        [6,12,18,24], [12,18,24,30], [18,24,30,36],
        [13,19,25,31], [19,25,31,37],
        [20,26,32,38]
    ];
    const BOARD_ANIMATION_OUT = ['animate__animated', 'animate__bounceOutRight'];
    const BOARD_ANIMATION_IN = ['animate__animated', 'animate__bounceInLeft'];
    let currentColor = PIECES_COLORS[0];

    boardAnimationListener();
    createEmptySquares();

    function boardAnimationListener() {
        boardEl.addEventListener('animationend', (anim) => {
            if (anim.animationName == 'bounceOutRight') {
                boardEl.classList.remove(...BOARD_ANIMATION_OUT);
                reload();
            } else {
                boardEl.classList.remove(...BOARD_ANIMATION_IN);
            }
        })
    }

    function createEmptySquares() {
        let n = 0;
        for (let rowSq = 0; rowSq < PIECES_ROWS; rowSq++) {
            for (let colSq = 0; colSq < PIECES_COLUMNS; colSq++) {
                const sq = document.createElement('div');
                sq.classList.add('empty-square');
                sq.dataset.row = rowSq;
                sq.dataset.col = colSq; 
                sq.dataset.id = n;
                sq.onclick = (e) => addSquare(e.target);
                boardEl.appendChild(sq);
                n++;
            }
        }
    }

    function addSquare(sq) {
        currentColor = currentColor === PIECES_COLORS[0] ? PIECES_COLORS[1] : PIECES_COLORS[0];
        const squareEmpty = availableRowColumns(sq);

        if (squareEmpty !== null) {
            piecesAdded[currentColor].push(+squareEmpty.dataset.id);
            const props = { color: currentColor, taken: () => squareTaken(currentColor) };
            const piece = new Piece(props);
            squareEmpty.appendChild(piece);
            squareEmpty.classList.add('disabled');
            squareEmpty.onclick = false;
        } else {
            alert(`No more pieces in column`)
        }
    }

    function availableRowColumns(sq) {
        const col = sq.dataset.col;
        const columnEl = document.querySelectorAll(`[data-col="${col}"]`);
        const columns = [...columnEl].reverse();
        const empty = columns.find(col => col.innerHTML === "");
        
        if (empty) {
            return empty;
        }
        return null
    }

    function squareTaken(color) {
        checkWin(color);
    }

    function checkWin(color) {
        const winner = WIN_COMBINATIONS.filter(combination => 
            combination.every(comb => piecesAdded[color].sort().includes(comb)));
        
        if (winner.length) {
            showWinPieces(winner);
            changeLosePieces();
            showNewGame();
        }
    }

    function showWinPieces(squaresID) {
        squaresID.forEach(ids => {
            ids.forEach(id => {
                const el = document.querySelector(`[data-id="${id}"]`);
                el.classList.add('win-square');
            })
        });
    }

    function changeLosePieces() {
        const nowin = document.querySelectorAll('.board div:not(.win-square)');
        [...nowin].map(square => {
            square.classList.add('lose-square','disabled');
            square.onclick = false;
        });
    }

    function showNewGame() {
        setTimeout(() => {
            if (confirm('New Game?')) {
                boardEl.classList.add(...BOARD_ANIMATION_OUT);
            }
        }, 400);
    }

    function reload() {
        piecesAdded.yellow.splice(0);
        piecesAdded.red.splice(0);
        currentColor = PIECES_COLORS[0];
        const squares = document.querySelectorAll('.empty-square');
        [...squares].map(square => {
            square.onclick = (e) => addSquare(e.target);
            square.innerHTML = null;
            square.classList.remove('disabled','win-square','lose-square');
        });
        boardEl.classList.add(...BOARD_ANIMATION_IN);
    }
}