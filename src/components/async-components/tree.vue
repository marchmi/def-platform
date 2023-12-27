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
import { ref, watchEffect, watch, nextTick } from 'vue'
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
          resourceCode: 'resourceCode'
        }
      }
    },
    nodeKey: {
      type: String,
      default: 'resourceCode',
    },
    options: {
      type: [Array, Object],
      default: () => {
        return []
      }
    }
  })
  
  const emit = defineEmits(['update:data'])
  watch(
    () => props.options,
    (options) => {
      nextTick(()=>{
        if(treeRef.value){
          props.data.forEach((key) => {
            console.log(key)
            treeRef.value.setChecked(key, true, false)
          })
        }
      })
    },
    {
      immediate: true,
      deep: true
    }
  )
  const checkChange = () => {
    const keys = treeRef.value.getCheckedNodes().map(i => {
      return i[props.nodeKey]
    })
    emit('update:data', keys)
  }
</script>
