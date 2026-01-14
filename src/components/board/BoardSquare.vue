<script setup>
import ChessPiece from '../pieces/ChessPiece.vue';

const props = defineProps({
  x: Number,
  y: Number,
  isBlack: Boolean,
  piece: Object
});

const emit = defineEmits(['move']);

const handleDragStart = (event) => {
  if (!props.piece) {
    event.preventDefault();
    return;
  }
  event.dataTransfer.setData('text/plain', JSON.stringify({ x: props.x, y: props.y }));
  event.dataTransfer.effectAllowed = 'move';
};

const handleDrop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData('text/plain');
  if (data) {
    const from = JSON.parse(data);
    emit('move', { from, to: { x: props.x, y: props.y } });
  }
};

// Allow drop
const handleDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};
</script>

<template>
  <div 
    class="board-square" 
    :class="{ 'black-square': isBlack, 'white-square': !isBlack }"
    @dragover="handleDragOver"
    @drop="handleDrop"
  >
    <div 
      v-if="piece" 
      class="piece-container"
      @dragstart="handleDragStart"
    >
      <ChessPiece :piece="piece" />
    </div>
  </div>
</template>

<style scoped>
.board-square {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.black-square {
  background-color: #334155; /* Slate 700 */
}

.white-square {
  background-color: #cbd5e1; /* Slate 300 */
}

.board-square:hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
}
</style>
