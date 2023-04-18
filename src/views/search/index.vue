<template>
  <div class="searchIndex">
    <div class="search">
      <Search></Search>
    </div>
    <div class="sort">
      <el-menu
          :default-active="activeIndex"
          mode="horizontal"
      >
        <el-menu-item v-for="item in sort" :index="item.name">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>
    <div class="tag">
      <ul class="tabs">
        <li v-for="item in tag">{{ item.name }}</li>
      </ul>
    </div>
    <div class="center">
      <ArticleCard v-for="item in Data" :item="item"/>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref, computed} from "vue";
import {useStore} from "vuex";
import ArticleCard from "../../components/ArticleCard.vue";
import Search from "../../components/Search.vue";

const store = useStore()
const activeIndex = ref('综合')
const activeName = ref('综合排序')
const sort = [
  {
    name: '综合',
  },
  {
    name: '文章',
  },
  {
    name: '人才',
  }
]
const tag = [
  {
    name: '综合排序'
  },
  {
    name: '最多点击'
  },
  {
    name: '最新发布'
  }
]
const Data = computed(() => store.state.search.resList)

const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<style lang="scss" scoped>
.searchIndex {
  width: 100%;

  .search {
    height: 40px;
    width: 400px;
    margin: 10px auto;
  }

  .sort {
    width: 100%;
    border-bottom: 1px solid #6a737d;
    padding-left: 70px;

    .el-menu {
      justify-content: flex-start;

      .el-menu-item {
        margin-left: 20px;
      }
    }
  }

  .tag {
    .tabs {
      padding-left: 80px;

      li {
        height: 32px;
        width: 80px;
        font-size: 13px;
        line-height: 32px;
        border-radius: 5px;
        text-align: center;
        display: inline-block;
        margin-left: 30px;
        margin-top: 20px;
        //color: #61666d;
        color: #00aeec;
        background-color: #dff6fd;
        //background-color: #00aeec;
      }
    }
  }

  .center {
    height: 100%;
    margin: 0 auto;
    width: 70%;
  }
}
</style>