<template>
  <div>
    <span v-if="error">{{ error }}</span>
    <div v-html="renderedOutput"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Mustache from 'mustache';

@Component
export default class Renderer extends Vue {
  @Prop(String) readonly inputData: string | undefined;
  @Prop(String) readonly inputTemplate: string | undefined;
  public jsonError: Error | null = null;
  public mustacheError: Error | null = null;

  data () {
    return {
      jsonError: undefined,
      mustacheError: undefined,
    };
  }

  get error () {
    return this.jsonError?.message || this.mustacheError?.message || null;
  }

  get renderedOutput () {
    let parsedJson;
    try {
      parsedJson = JSON.parse(this.inputData || '');
      this.jsonError = null;
    } catch (error) {
      this.jsonError = error;
      parsedJson = undefined;
    }
    if (parsedJson) {
      try {
        this.mustacheError = null;
        return Mustache.render(this.inputTemplate || '', parsedJson);
      } catch (e) {
        this.mustacheError = e;
      }
    }
    return '';
  }
}
</script>

<style scoped lang="scss">
</style>
