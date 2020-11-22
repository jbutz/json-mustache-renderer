<template>
  <div id="app">
    <div class="pure-g input-container">
      <div class="pure-u-1-2 pad-right">
        <div>
          <DataInput v-model="dataInput" />
        </div>
      </div>
      <div class="pure-u-1-2 pad-left">
        <div>
          <DataInput v-model="mustacheInput" />
        </div>
      </div>
    </div>
    <div style="padding-top: 1em; padding-bottom: 1em"><hr /></div>
    <div style="padding-top: 1em; padding-bottom: 1em"><hr /></div>
    <div class="pure-g">
      <div class="pure-u-1-5"></div>
      <div class="pure-u-3-5">
        <article>
          <Renderer :inputData="dataInput" :inputTemplate="mustacheInput" />
        </article>
      </div>
      <div class="pure-u-1-5"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DataInput from './components/DataInput.vue';
import Renderer from './components/Renderer.vue';

@Component({
  components: {
    DataInput,
    Renderer,
  },
})
export default class App extends Vue {
  public dataInput = '{"world":"world"}';
  public mustacheInput = 'Hello {{ world }}';

  get validJsonInput () {
    try {
      JSON.parse(this.dataInput);
      return true;
    } catch (error) {
      return false;
    }
  }
}
</script>

<style lang="scss">
@import "../node_modules/purecss/build/base.css";
@import "../node_modules/purecss/build/grids.css";
@import "../node_modules/purecss/build/forms.css";
#app {
  margin: 2em;
}

.pad-right {
  > * {
    padding-right: 0.5em;
  }
}

.pad-left {
  > * {
    padding-left: 0.5em;
  }
}
</style>
