import { reactive } from 'vue';
import { Piece } from '../domain/Piece';

class ChessService {
    constructor() {
        this.state = reactive({
            board: [], // 8x8 grid
            moveHistory: []
        });
        this.initializeGame();
    }

    initializeGame() {
        this.state.board = this.createInitialBoard();
        this.state.moveHistory = [];
    }

    createInitialBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));

        const setupRow = (row, color, pieces) => {
            pieces.forEach((type, col) => {
                board[row][col] = new Piece(type, color);
            });
        };

        const backRow = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        const pawns = Array(8).fill('pawn');

        setupRow(0, 'black', backRow);
        setupRow(1, 'black', pawns);
        setupRow(6, 'white', pawns);
        setupRow(7, 'white', backRow);

        return board;
    }

    get board() {
        return this.state.board;
    }

    get history() {
        return this.state.moveHistory;
    }

    movePiece(fromX, fromY, toX, toY) {
        const piece = this.state.board[fromY][fromX];
        if (!piece) return false;

        // Capture logic (just overwrite)
        const targetPiece = this.state.board[toY][toX];
        const moveDescription = this.formatMove(piece, fromX, fromY, toX, toY, targetPiece);

        // Update board
        this.state.board[toY][toX] = piece;
        this.state.board[fromY][fromX] = null;

        // Record history
        this.state.moveHistory.push(moveDescription);
        return true;
    }

    formatMove(piece, fromX, fromY, toX, toY, capturedPiece) {
        const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];

        let notation = `${piece.getSymbol()} ${cols[fromX]}${rows[fromY]} -> ${cols[toX]}${rows[toY]}`;
        if (capturedPiece) {
            notation += ` (captures ${capturedPiece.getSymbol()})`;
        }
        return notation;
    }
}

export const chessService = new ChessService();
