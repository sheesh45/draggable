<h1 align="center">
  @sheeshk18/vue-smart-draggable
</h1>

<p align="center">
  🚀 Lightweight draggable component for Vue 3  
  📱 Mobile + Desktop support  
  🧠 TypeScript ready
</p>

---

## ✨ Features

- Built for Vue 3
- Supports touch (mobile) and mouse (desktop)
- Emits clean drag events
- Small bundle size
- TypeScript support out of the box

---

## 📦 Installation

```bash
npm install @sheeshk18/vue-smart-draggable
```

---

## 🚀 Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Draggable from '@sheeshk18/vue-smart-draggable'

const items = ref([
  { id: 1, name: 'Quote Table' },
  { id: 2, name: 'Conditions' },
  { id: 3, name: 'Notes' }
])
</script>

<template>
  <Draggable v-model:items="items">
    <template #default="{ item }">
      <div class="item">
        {{ item.name }}
      </div>
    </template>
  </Draggable>
</template>
```
