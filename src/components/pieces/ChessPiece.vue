<script setup>
defineProps({
  piece: {
    type: Object,
    required: true
  }
});

const onDragStart = (event, piece) => {
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.effectAllowed = 'move';
  // We pass the start coordinates implicitly via logic in the parent or by attaching data here
  // But since the piece doesn't know its own location easily without props, 
  // let's rely on the parent (BoardSquare) or just pass a simple ID if we had one.
  // actually, the parent BoardSquare knows the coords.
  // Better: The drag start is handled by the wrapper in BoardSquare? 
  // No, the piece itself is draggable.
  // Let's pass "text/plain" as a signal.
  // Actually, simpler if we emit an event or let the parent handle the native event.
  // HTML5 DnD bubbles. We can handle @dragstart in the parent components if we want, 
  // but let's keep logic here for the data payload if possible.
  
  // However, `piece` object doesn't have coords. 
  // So we will just decorate the element as draggable, and let the BoardSquare (which knows coords) handle the `dragstart` event payload.
};
</script>

<template>
  <div 
    class="chess-piece"
    :class="piece.color"
    draggable="true"
  >
    {{ piece.getSymbol() }}
  </div>
</template>

<style scoped>
.chess-piece {
  font-size: 3rem;
  cursor: grab;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

.chess-piece:active {
  cursor: grabbing;
  transform: scale(1.2);
}

.white {
  color: #f8fafc;
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
}

.black {
  color: #1e293b;
  text-shadow: 0 2px 4px rgba(255,255,255,0.2);
}
</style>
