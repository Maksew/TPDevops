<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import { chessService } from '../../services/ChessService';

const history = computed(() => chessService.history);
const listRef = ref(null);

watch(history, async () => {
  await nextTick();
  if (listRef.value) {
    listRef.value.scrollTop = listRef.value.scrollHeight;
  }
}, { deep: true });
</script>

<template>
  <div class="move-history">
    <h3>Move History</h3>
    <div class="history-list" ref="listRef">
      <div v-show="history.length === 0" class="empty-state">
        No moves yet.
      </div>
      <div 
        v-for="(move, index) in history" 
        :key="index" 
        class="history-item"
      >
        <span class="move-number">{{ index + 1 }}.</span>
        <span class="move-text">{{ move }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.move-history {
  width: 300px;
  background-color: #1e293b;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #e2e8f0;
  border: 1px solid #334155;
}

h3 {
  margin: 0;
  padding: 1rem;
  background-color: #0f172a;
  border-bottom: 1px solid #334155;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #38bdf8;
}

.history-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;
}

.empty-state {
  color: #64748b;
  text-align: center;
  margin-top: 2rem;
  font-style: italic;
}

.history-item {
  display: flex;
  padding: 0.5rem;
  border-bottom: 1px solid #334155;
  transition: background-color 0.2s;
}

.history-item:hover {
  background-color: #334155;
}

.move-number {
  color: #94a3b8;
  margin-right: 0.75rem;
  min-width: 2rem;
}

.move-text {
  font-family: monospace;
  font-weight: bold;
}

/* Custom Scrollbar */
.history-list::-webkit-scrollbar {
  width: 6px;
}
.history-list::-webkit-scrollbar-track {
  background: #1e293b;
}
.history-list::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 3px;
}
</style>
