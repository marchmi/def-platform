<template>
  <div>
    <mi-date-picker
      v-model="val"
      type="date"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
    />
  </div>
</template>
<script>
export default {
  name: 'datePicker', // 日期选择器
  props: {
    data: {
      type: [String, Number, Date, Array],
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
