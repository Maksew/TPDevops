
export class Piece {
    constructor(type, color) {
        this.type = type;   // 'pawn', 'rook', 'knight', 'bishop', 'queen', 'king'
        this.color = color; // 'white', 'black'
    }

    getSymbol() {
        const symbols = {
            white: {
                king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙'
            },
            black: {
                king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟'
            }
        };
        return symbols[this.color][this.type];
    }

    getId() {
        // Unique ID for v-for keys (simple implementation)
        return `${this.color}-${this.type}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
