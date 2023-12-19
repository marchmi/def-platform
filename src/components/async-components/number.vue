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
import { limitEnterNumeric } from '@/plugins/useRegexRule'
export default {
  props: {
    data: {
      type: [String, Number],
      default: ''
    }
  },

  data() {
    return {
      limitEnterNumeric
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
