<template>
  <div>
    <mi-radio-group 
      v-model="val"
      v-bind="$attrs"
      v-on="$attrs.events || {}"
    >
      <mi-radio
        v-for="item in options"
        :key="item[labelKey]"
        :label="item[valueKey]"
      >
        {{item[labelKey]}}
      </mi-radio>
    </mi-radio-group>
  </div>
</template>
<script>
export default {
  name: 'radio', // 单选框
  props: {
    data: {
      type: [String, Number],
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
