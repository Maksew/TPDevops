<script setup>
import { computed } from 'vue';
import BoardSquare from './BoardSquare.vue';
import { chessService } from '../../services/ChessService';

const board = computed(() => chessService.board);

const onMove = ({ from, to }) => {
  // Delegate to service
  chessService.movePiece(from.x, from.y, to.x, to.y);
};
</script>

<template>
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
    
    <!-- Coordinate Labels (Optional but premium) -->
    <div class="coordinates coords-cols">
      <span v-for="l in ['a','b','c','d','e','f','g','h']" :key="l">{{ l }}</span>
    </div>
    <div class="coordinates coords-rows">
      <span v-for="n in ['8','7','6','5','4','3','2','1']" :key="n">{{ n }}</span>
    </div>
  </div>
</template>

<style scoped>
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
  padding-left: 2px; /* Slight adjustment */
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
