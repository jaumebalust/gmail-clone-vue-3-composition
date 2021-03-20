<template>
  <div class="ModalView modal">
    <div class="ModalView__title overlay" @click="emit('closeModal')"></div>
    <div class="ModalView__content modal-card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import useKeyDown from '../composables/use-keydown'

export default {
  name: 'ModalView',
  setup(props, {emit}) {
    useKeyDown([
      {key: 'Escape', fn: () => emit('closeModal')},
    ])


    return {
      emit
    }
  },
  mixins: [],
  data() {
    return {}
  },
  mounted() {

  },
  methods: {},
  computed: {}
}
</script>
<style>


</style>

