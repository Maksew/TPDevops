
import { test, expect } from '@playwright/test';

test('Chess Board Initial State', async ({ page }) => {
    await page.goto('/');

    // Check board exists
    const board = page.locator('.chess-board');
    await expect(board).toBeVisible();

    // Check 64 squares
    const squares = page.locator('.board-square');
    await expect(squares).toHaveCount(64);

    // Check for a White Pawn at (0, 6) -> a2
    // grid layout: row 6, col 0. 
    // In our nested v-for: rowIndex 6, colIndex 0.
    // We can look for the piece symbol or class.
    // The piece has class 'white' and content '♙'
    const whitePawn = page.locator('.chess-piece.white').filter({ hasText: '♙' }).first();
    await expect(whitePawn).toBeVisible();
});

test('Piece Movement (Drag and Drop)', async ({ page }) => {
    await page.goto('/');

    // We need to move a piece.
    // Let's move the white pawn at a2 (index 6, 0) to a3 (index 5, 0).
    // Note: Our board renders rows 0..7. Row 6 is white pawns.
    // Target is Row 5 (empty).

    // Select specific elements based on the board structure logic?
    // Use easier selectors if possible.
    // Let's locate the square at row 6, col 0

    // However, dragging in Playwright is `dragTo`.
    // formatting is tricky without specific IDs. 
    // But we have `draggable="true"` on `.chess-piece`.

    const sourceSquare = page.locator('.board-row').nth(6).locator('.board-square').nth(0);
    const targetSquare = page.locator('.board-row').nth(4).locator('.board-square').nth(0); // Move 2 steps forward? No let's move 1 step: row 5.

    const piece = sourceSquare.locator('.chess-piece');

    await expect(piece).toBeVisible();

    // Drag logic
    await piece.dragTo(targetSquare);

    // Verification
    // The target square should now contain the piece
    await expect(targetSquare.locator('.chess-piece')).toBeVisible();
    // The source square should be empty
    await expect(sourceSquare.locator('.chess-piece')).not.toBeVisible();
});
