<script setup>
import { computed } from 'vue';
import BoardSquare from './BoardSquare.vue';
import { chessService } from '../../services/ChessService';

const board = computed(() => chessService.board);
const currentTurn = computed(() => chessService.currentTurn);
const isCheck = computed(() => chessService.isCheck);
const isCheckmate = computed(() => chessService.isCheckmate);
const isStalemate = computed(() => chessService.isStalemate);
const isDraw = computed(() => chessService.isDraw);
const isGameOver = computed(() => chessService.isGameOver);

const statusText = computed(() => {
  if (isCheckmate.value) return `Checkmate! ${currentTurn.value === 'white' ? 'Black' : 'White'} wins!`;
  if (isStalemate.value) return 'Stalemate! Draw.';
  if (isDraw.value) return 'Draw!';
  if (isCheck.value) return `${currentTurn.value === 'white' ? 'White' : 'Black'} is in check!`;
  return `${currentTurn.value === 'white' ? 'White' : 'Black'}'s turn`;
});

const onMove = ({ from, to }) => {
  chessService.movePiece(from.x, from.y, to.x, to.y);
};

const resetGame = () => {
  chessService.initializeGame();
};
</script>

<template>
  <div class="chess-board-wrapper">
    <div class="game-status" :class="{ 'status-check': isCheck, 'status-gameover': isGameOver }">
      {{ statusText }}
      <button v-if="isGameOver" class="reset-btn" @click="resetGame">New Game</button>
    </div>
    <div class="chess-board">
      <div v-for="(row, y) in board" :key="y" class="board-row">
        <BoardSquare 
          v-for="(piece, x) in row" 
          :key="`${x}-${y}`"
          :x="x"
          :y="y"
          :is-black="(x + y) % 2 === 1"
          :piece="piece"
          @move="onMove"
        />
      </div>
      
      <!-- Coordinate Labels -->
      <div class="coordinates coords-cols">
        <span v-for="l in ['a','b','c','d','e','f','g','h']" :key="l">{{ l }}</span>
      </div>
      <div class="coordinates coords-rows">
        <span v-for="n in ['8','7','6','5','4','3','2','1']" :key="n">{{ n }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chess-board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.game-status {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.status-check {
  border-color: #f59e0b;
  color: #fbbf24;
  background-color: rgba(245, 158, 11, 0.1);
}

.status-gameover {
  border-color: #ef4444;
  color: #f87171;
  background-color: rgba(239, 68, 68, 0.1);
}

.reset-btn {
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #38bdf8;
  background: transparent;
  color: #38bdf8;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
}

.reset-btn:hover {
  background-color: #38bdf8;
  color: #0f172a;
}

.chess-board {
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 600px;
  border: 12px solid #1e293b;
  border-radius: 8px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  background-color: #1e293b;
}

.board-row {
  display: flex;
  flex: 1;
}

/* Coordinates */
.coordinates {
  position: absolute;
  pointer-events: none;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.5);
}

.coords-cols {
  bottom: -25px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding-left: 2px;
}

.coords-rows {
  left: -20px;
  top: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-top: 2px;
}
</style>
