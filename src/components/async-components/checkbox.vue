<template>
  <div>
    <mi-checkbox-group 
      v-model="val"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
    >
      <mi-checkbox
        v-for="item in options"
        :key="item[labelKey]"
        :label="item[valueKey]"
      >
        {{item[labelKey]}}
      </mi-checkbox>
    </mi-checkbox-group>
  </div>
</template>
<script>
export default {
  name: 'checkbox', // 多选框
  props: {
    data: {
      type: [String, Array],
      default: ''
    },

    labelKey: {
      type: [String, Number],
      default: 'value'
    },

    valueKey: {
      type: [String, Number],
      default: 'key'
    },

    options: {
      type: [Array, String],
      default: () => {
        return []
      }
    }
  },

  computed: {
    val: {
      get () {
        return this.data || []
      },
      set (value) {
        this.$emit('update:data', value)
      }
    }
  }
}
</script>
