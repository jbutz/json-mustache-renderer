<template>
  <div>
    <textarea v-model="inputData"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue } from 'vue-property-decorator';

@Component
export default class DataInput extends Vue {
  @Model('change', { type: String }) inputData = '';

  handleDataChange (event: Event) {
    // v-on:change="handleDataChange"
    const el = event.target as HTMLTextAreaElement;
    console.log('>>>', el.value, this.inputData);
    // this.inputData = el.value;
    // console.log('>>>', el.value);
    // this.$emit('data-change', el.value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
