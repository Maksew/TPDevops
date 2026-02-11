import { reactive } from 'vue';
import { Chess } from 'chess.js';
import { Piece } from '../domain/Piece';

class ChessService {
    constructor() {
        this.chess = new Chess();
        this.state = reactive({
            board: [],
            moveHistory: [],
            currentTurn: 'white',
            isCheck: false,
            isCheckmate: false,
            isStalemate: false,
            isDraw: false,
            isGameOver: false
        });
        this.syncState();
    }

    /**
     * Sync our reactive state from the chess.js engine
     */
    syncState() {
        this.state.board = this.convertBoard(this.chess.board());
        this.state.moveHistory = this.chess.history();
        this.state.currentTurn = this.chess.turn() === 'w' ? 'white' : 'black';
        this.state.isCheck = this.chess.isCheck();
        this.state.isCheckmate = this.chess.isCheckmate();
        this.state.isStalemate = this.chess.isStalemate();
        this.state.isDraw = this.chess.isDraw();
        this.state.isGameOver = this.chess.isGameOver();
    }

    /**
     * Convert chess.js board format to our Piece objects
     * chess.js board() returns 8x8 array of { type, color } or null
     */
    convertBoard(chessBoard) {
        const typeMap = {
            p: 'pawn',
            r: 'rook',
            n: 'knight',
            b: 'bishop',
            q: 'queen',
            k: 'king'
        };
        const colorMap = {
            w: 'white',
            b: 'black'
        };

        return chessBoard.map(row =>
            row.map(square => {
                if (!square) return null;
                return new Piece(typeMap[square.type], colorMap[square.color]);
            })
        );
    }

    initializeGame() {
        this.chess = new Chess();
        this.syncState();
    }

    get board() {
        return this.state.board;
    }

    get history() {
        return this.state.moveHistory;
    }

    get currentTurn() {
        return this.state.currentTurn;
    }

    get isCheck() {
        return this.state.isCheck;
    }

    get isCheckmate() {
        return this.state.isCheckmate;
    }

    get isStalemate() {
        return this.state.isStalemate;
    }

    get isDraw() {
        return this.state.isDraw;
    }

    get isGameOver() {
        return this.state.isGameOver;
    }

    /**
     * Convert board coordinates (x, y) to algebraic notation (e.g., 'e2')
     * x = column (0=a, 7=h), y = row (0=top=rank8, 7=bottom=rank1)
     */
    toAlgebraic(x, y) {
        const cols = 'abcdefgh';
        const rows = '87654321';
        return cols[x] + rows[y];
    }

    /**
     * Attempt to move a piece. Returns true if legal, false otherwise.
     */
    movePiece(fromX, fromY, toX, toY) {
        const from = this.toAlgebraic(fromX, fromY);
        const to = this.toAlgebraic(toX, toY);

        try {
            // Try the move — chess.js will throw/return null if illegal
            const result = this.chess.move({ from, to, promotion: 'q' });
            if (result) {
                this.syncState();
                return true;
            }
            return false;
        } catch (e) {
            // Illegal move
            return false;
        }
    }
}

export const chessService = new ChessService();
