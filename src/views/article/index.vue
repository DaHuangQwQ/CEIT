<template>
  <div class="article">
    <div class="center">
      <ArticleCard v-for="item in Data" :item="item"/>
    </div>
  </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, onMounted} from 'vue';
import {useRouter} from "vue-router";
import ArticleCard from "../../components/ArticleCard.vue";

const store = useStore()
const router = useRouter()

const Data = computed(() => store.state.article.articleData)


onMounted(() => {
  store.dispatch("getList")
})
</script>

<style lang="scss" scoped>
.article {
  width: 100%;

  .center {
    height: 100%;
    margin: 0 20px;
    //width: 70%;
  }
}

</style>