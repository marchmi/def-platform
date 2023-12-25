<template>
  <div>
    <mi-tree
      :data="options"
      show-checkbox
      :node-key="nodeKey"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
      :props="treeProps"
      @check="checkChange"
      ref="treeRef"
    />
  </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
  const treeRef = ref(null)
  const props = defineProps({
    data: {
      type: [Array],
      default: () => {
        return []
      }
    },
    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          label: 'resourceName',
          id: 'resourceCode'
        }
      }
    },
    nodeKey: {
      type: String,
      default: 'id',
    },
    options: {
      type: [Array, Object],
      default: () => {
        return []
      }
    }
  })
  
  const emit = defineEmits(['update:data'])
  watchEffect(() => {
    treeRef.value?.setCheckedNodes(props.data || [])
  })
  const checkChange = () => {
    const keys = treeRef.value.getCheckedKeys()
    emit('update:data', keys)
  }
</script>
