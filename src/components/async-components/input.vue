<template>
  <div>
    <mi-input 
      v-model.trim="val"
      clearable
      v-bind="$attrs"
      v-on="$attrs.events || {}"
    />
  </div>
</template>
<script>
export default {
  name: 'input', // 文本输入框
  props: {
    data: {
      type: [String, Number],
      default: ''
    }
  },

  computed: {
    val: {
      get () {
        return this.data
      },
      set (value) {
        this.$emit('update:data', value)
      }
    }
  }
}
</script>
