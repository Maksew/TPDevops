
import { test, expect } from '@playwright/test';

test('Chess Board Initial State', async ({ page }) => {
    await page.goto('/');

    // Check board exists
    const board = page.locator('.chess-board');
    await expect(board).toBeVisible();

    // Check 64 squares
    const squares = page.locator('.board-square');
    await expect(squares).toHaveCount(64);

    // Check for a White Pawn (♙ symbol with white class)
    const whitePawn = page.locator('.chess-piece.white').filter({ hasText: '♙' }).first();
    await expect(whitePawn).toBeVisible();

    // Check game status shows White's turn
    const status = page.locator('.game-status');
    await expect(status).toContainText("White's turn");
});

test('Piece Movement (Drag and Drop)', async ({ page }) => {
    await page.goto('/');

    // Move white pawn e2 -> e4
    // e2 is row 6, col 4. e4 is row 4, col 4.
    const sourceSquare = page.locator('.board-row').nth(6).locator('.board-square').nth(4);
    const targetSquare = page.locator('.board-row').nth(4).locator('.board-square').nth(4);

    const piece = sourceSquare.locator('.chess-piece');
    await expect(piece).toBeVisible();

    // Drag piece
    await piece.dragTo(targetSquare);

    // Verification: The target square should now contain the piece
    await expect(targetSquare.locator('.chess-piece')).toBeVisible();
    // The source square should be empty
    await expect(sourceSquare.locator('.chess-piece')).not.toBeVisible();

    // Status should now show Black's turn
    const status = page.locator('.game-status');
    await expect(status).toContainText("Black's turn");
});
