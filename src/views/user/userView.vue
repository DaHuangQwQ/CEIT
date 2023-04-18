<template>
  <div class="home">
    <div class="nav">

    </div>
    <div class="container">
      <div class="layout">
        <div class="layout-side">
          <div class="user">
            <div class="img">
              <img src="../../assets/dahuang.jpg" alt="">
            </div>
            <p>DaHuangQwQ</p>
          </div>
        </div>
        <div class="layout-main">
          <ArticleCard v-for="item in myArticle" :item="item"></ArticleCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useRoute} from "vue-router";
import {ref, onMounted, reactive} from "vue";
import {getOtherArticle} from "../../api/index.js";
import ArticleCard from "../../components/ArticleCard.vue";

const route = useRoute()
const id = route.params.id
const myArticle = ref([])


onMounted(async () => {
  const myArticleRes = await getOtherArticle(id)
  myArticle.value = myArticleRes.data.data
})
</script>

<style lang="scss">
.home {
  .nav {
    height: 100px;
    width: 100%;
    border-bottom: 1px solid #cac6c6;
  }

  .container {
    max-width: 1280px;
    margin-right: auto;
    margin-left: auto;

    .layout {
      display: grid;
      --Layout-gutter: 16px;
      grid-gap: 16px;
      grid-auto-flow: column;
      grid-template-columns: auto 0 minmax(0, calc(100% - 256px - 16px));

      .layout-side {
        width: 256px;
        grid-column: 1;

        .user {
          width: 100%;

          .img {
            width: 100%;
            border-radius: 50%;
            overflow: hidden;
            border: 1px solid black;

            img {
              width: 100%;
            }
          }

          p {
            font-size: 20px;
            font-style: normal;
            font-weight: 300;
            line-height: 34px;
            color: #656d76;
          }
        }
      }

      .layout-main {
        grid-column: 2/span 2;
      }
    }
  }
}
</style>