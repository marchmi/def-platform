<template>
  <div>
    <mi-select 
      v-model="val" 
      v-bind="$attrs"
      v-on="$attrs.events || {}"
      style="width:100%"
    >
      <mi-option
        v-for="item in options"
        :key="item[labelKey]"
        :label="item[labelKey]"
        :value="item[valueKey]"
      >
      </mi-option>
    </mi-select>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: [Object, Array, String],
      default: ''
    },

    labelKey: {
      type: [String],
      default: 'value'
    },

    valueKey: {
      type: [String],
      default: 'key'
    },

    options: {
      type: [Array, Object],
      default: () => {
        return []
      }
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
