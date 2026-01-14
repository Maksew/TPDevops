
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

    it('moves a piece to an empty square', () => {
        // Move white pawn from (0, 6) to (0, 4) - simplified move logic allowed
        const success = chessService.movePiece(0, 6, 0, 4)
        expect(success).toBe(true)

        expect(chessService.board[4][0]).not.toBeNull()
        expect(chessService.board[4][0].type).toBe('pawn')
        expect(chessService.board[4][0].color).toBe('white')

        // Old position should be empty
        expect(chessService.board[6][0]).toBeNull()
    })

    it('captures a piece', () => {
        // Setup: Place a black pawn where white pawn will land
        // We can manipulate state directly since it's reactive, but better to use moves if possible.
        // Since movement is free, we can just move.

        // Move white pawn to (0, 4)
        chessService.movePiece(0, 6, 0, 4)

        // Move black pawn to (0, 4) - Capture
        const success = chessService.movePiece(0, 1, 0, 4)
        expect(success).toBe(true)

        const piece = chessService.board[4][0]
        expect(piece.color).toBe('black')
        expect(piece.type).toBe('pawn')

        const lastMove = chessService.history[chessService.history.length - 1]
        expect(lastMove).toContain('captures')
    })

    it('updates history correctly', () => {
        chessService.movePiece(0, 6, 0, 5)
        expect(chessService.history.length).toBe(1)
        // Check format roughly: "♙ a2 -> a3"
        expect(chessService.history[0]).toMatch(/a2 -> a3/)
    })
})
