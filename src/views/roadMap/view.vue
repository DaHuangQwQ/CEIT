<template>
  <div class="roadMap">

    <div class="roadMapTop">
      <div class="center">
        <h1>{{ id }} Developer</h1>
        <p>欢迎来学习{{ id }}!</p>
      </div>
    </div>
    <div class="content">
      <div class="center">
        <vue-pdf-embed width="1000" :source="source1"/>
      </div>
    </div>

    <!--    <h1>Base64</h1>-->
    <!--    <vue-pdf-embed :source="source2" />-->
  </div>
</template>

<script setup>
import VuePdfEmbed from 'vue-pdf-embed'
import {useRoute} from 'vue-router'
import {reactive} from "vue";

const route = useRoute()
const id = route.params.id
const source1 = `http://api.dahuang.pro/pdf/${id}.pdf`
console.log(source1)

</script>


<style lang="scss">
.roadMap {
  .roadMapTop {
    width: 100%;
    height: 200px;

    .center {
      text-align: center;
      margin: 0 auto;
      //background-color: #eee;
      width: 800px;
      height: 100%;

      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        margin-top: 3rem;
        background-image: linear-gradient(to right, orange, purple);
        -webkit-background-clip: text;
        color: transparent;
      }

      p {
        color: #e0e2e8;
      }
    }
  }

  .content {
    width: 100%;
    background-color: #f4f4f5;

    .center {
      margin: 0 auto;
      width: 1000px;
      height: 100%;

      .textLayer {
        background-color: #cac6c6;
      }

    }
  }
}

</style>