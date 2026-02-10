<script setup lang="ts">
import { ref } from 'vue'

export type BaseItem = {
  id: number | string
  [key: string]: any
}

const props = defineProps<{
  items: BaseItem[]
  handle?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:items', value: BaseItem[]): void
  (e: 'orderChanged', value: { id: BaseItem['id']; order: number }[]): void
}>()

const draggedIndex = ref<number | null>(null)

// ---------------------
// Core Reorder Logic
// ---------------------
const updateOrder = (from: number, to: number) => {
  if (from === to) return

  const updated = [...props.items]
  const [dragged] = updated.splice(from, 1)
  updated.splice(to, 0, dragged)

  emit('update:items', updated)

  emit(
      'orderChanged',
      updated.map((item, index) => ({
        id: item.id,
        order: index + 1
      }))
  )
}

// ---------------------
// Desktop Drag
// ---------------------
const onDragStart = (event: DragEvent, index: number) => {
  if (props.disabled) return

  if (props.handle) {
    const target = event.target as HTMLElement
    if (!target.closest(props.handle)) {
      event.preventDefault()
      return
    }
  }

  draggedIndex.value = index
}

const onDragOver = (e: DragEvent) => {
  if (props.disabled) return
  e.preventDefault()
}

const onDrop = (dropIndex: number) => {
  if (draggedIndex.value === null || props.disabled) return
  updateOrder(draggedIndex.value, dropIndex)
  draggedIndex.value = null
}

// ---------------------
// Mobile Touch Support
// ---------------------
const onTouchStart = (event: TouchEvent, index: number) => {
  if (props.disabled) return

  if (props.handle) {
    const target = event.target as HTMLElement
    if (!target.closest(props.handle)) return
  }

  draggedIndex.value = index
}

const onTouchEnd = (_event: TouchEvent, dropIndex: number) => {
  if (draggedIndex.value === null || props.disabled) return
  updateOrder(draggedIndex.value, dropIndex)
  draggedIndex.value = null
}
</script>

<template>
  <div>
    <div
        v-for="(item, index) in items"
        :key="item.id"
        draggable="true"
        @dragstart="(e) => onDragStart(e, index)"
        @dragover="onDragOver"
        @drop="onDrop(index)"
        @touchstart="(e) => onTouchStart(e, index)"
        @touchend="(e) => onTouchEnd(e, index)"
    >
      <slot :item="item" :index="index" />
    </div>
  </div>
</template>
