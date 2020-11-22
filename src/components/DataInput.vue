<template>
  <div class="pure-form">
    <textarea
      class="pure-input-1"
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DataInput extends Vue {
  @Prop(String) value: string | undefined;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
