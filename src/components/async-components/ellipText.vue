<template>
  <div class="popover-text-wrap" :class="`popover-text-wrap-${wrapKey}`">
    <div class="ellipsis" :style="{'-webkit-line-clamp': clamp}" v-show="!usePopoverView">{{content}}</div>
    <mi-popover
      v-if="usePopoverView"
      placement="top-start"
      title=""
      :width="poverWidth"
      trigger="hover"
      :content="content"
    >
      <template #reference>
        <div class="ellipsis" :style="{'-webkit-line-clamp': clamp,'cursor':'pointer'}">{{content}}</div>
      </template>
    </mi-popover>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getTextWidth } from '@/utils/elAutoWidthUtil'
const usePopoverView = ref(false)
const poverWidth = ref(-1)
const wrapKey = ref(new Date().getTime() + '' + (Math.floor(Math.random() * 100)))
const props = defineProps({
  clamp: { // 指定内容超出多少行时省略
    type: Number,
    default: 1
  },
  content: {
    type: [String, Number]
  }
})

onMounted(() => {
  const el = document.querySelector(`.popover-text-wrap-${wrapKey.value}`)
  let resizeTimeout = null

  const resizeObserver = new ResizeObserver(entries => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      for (const entry of entries) {
        const { width } = entry.contentRect
        if (poverWidth.value !== width) {
          poverWidth.value = width
          usePopoverView.value = getTextWidth(props.content) >= props.clamp * width
        }
      }
    })
  })

  resizeObserver.observe(el)
})

watch(
  () => props.content,
  (content) => {
    usePopoverView.value = getTextWidth(content) >= props.clamp * poverWidth.value
  }
)

</script>

<style lang="less" scoped>
.popover-text-wrap {
  margin: 3px 0;
}
.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
