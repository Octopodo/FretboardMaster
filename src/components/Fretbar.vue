<template>
  <div :style="sizeStyle">
  </div>
</template>

<script>
  export default {
    props: {
      width: {
        type: Number,
        default: 4,
      },
      height: {
        type: Number,
        default: 200,
      },
      color: {
        type: String
      },
      shadowColor: {
        type: String
      },
      shadowWidth: {
        type: Number
      }
    },
    computed:{
      style() {

      }
    }
  }
</script>

<style lang="scss" scoped>

</style>