
import { describe, it, expect, beforeEach } from 'vitest'
import { chessService } from '../ChessService'

describe('ChessService', () => {
    beforeEach(() => {
        chessService.initializeGame()
    })

    it('initializes the board correctly', () => {
        const board = chessService.board
        expect(board.length).toBe(8)
        expect(board[0].length).toBe(8)

        // Check corners for Rooks
        expect(board[0][0].type).toBe('rook')
        expect(board[0][0].color).toBe('black')
        expect(board[7][7].type).toBe('rook')
        expect(board[7][7].color).toBe('white')
    })

    it('allows a legal move', () => {
        // White pawn e2 -> e4 (x=4, fromY=6, toY=4)
        const success = chessService.movePiece(4, 6, 4, 4)
        expect(success).toBe(true)

        expect(chessService.board[4][4]).not.toBeNull()
        expect(chessService.board[4][4].type).toBe('pawn')
        expect(chessService.board[4][4].color).toBe('white')

        // Old position should be empty
        expect(chessService.board[6][4]).toBeNull()
    })

    it('rejects an illegal move', () => {
        // White pawn e2 -> e5 is illegal (3 squares forward)
        const success = chessService.movePiece(4, 6, 4, 3)
        expect(success).toBe(false)

        // Piece should still be at original position
        expect(chessService.board[6][4]).not.toBeNull()
        expect(chessService.board[6][4].type).toBe('pawn')
    })

    it('enforces turn order', () => {
        expect(chessService.currentTurn).toBe('white')

        // White moves
        chessService.movePiece(4, 6, 4, 4) // e2 -> e4
        expect(chessService.currentTurn).toBe('black')

        // Black tries an illegal move (wrong color — white piece)
        const illegal = chessService.movePiece(3, 6, 3, 4) // d2 -> d4 is white's piece
        expect(illegal).toBe(false)

        // Black makes a legal move
        const success = chessService.movePiece(4, 1, 4, 3) // e7 -> e5
        expect(success).toBe(true)
        expect(chessService.currentTurn).toBe('white')
    })

    it('handles captures correctly', () => {
        // Setup: e2->e4, d7->d5, e4xd5 (legal capture)
        chessService.movePiece(4, 6, 4, 4) // e2 -> e4
        chessService.movePiece(3, 1, 3, 3) // d7 -> d5
        const capture = chessService.movePiece(4, 4, 3, 3) // e4 x d5
        expect(capture).toBe(true)

        const piece = chessService.board[3][3]
        expect(piece.color).toBe('white')
        expect(piece.type).toBe('pawn')
    })

    it('updates history correctly', () => {
        chessService.movePiece(4, 6, 4, 4) // e2 -> e4
        expect(chessService.history.length).toBe(1)
        expect(chessService.history[0]).toBe('e4')
    })
})
