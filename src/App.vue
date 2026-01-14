<script setup>
import ChessBoard from './components/board/ChessBoard.vue';
import MoveHistory from './components/ui/MoveHistory.vue';
</script>

<template>
  <main class="app-container">
    <div class="game-layout">
      <div class="board-container">
        <ChessBoard />
      </div>
      <div class="sidebar-container">
        <MoveHistory />
      </div>
    </div>
  </main>
</template>

<style>
/* Global box sizing */
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  background-color: #0f172a; /* Slate 900 */
  color: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  min-height: 100vh;
}
</style>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
}

.game-layout {
  display: flex;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.board-container {
  flex: 0 0 auto;
}

.sidebar-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

@media (max-width: 900px) {
  .game-layout {
    flex-direction: column;
    align-items: center;
  }
  
  .sidebar-container {
    width: 100%;
    max-width: 600px;
    height: 300px;
  }
}
</style>
