<template>
  <el-input
      v-model.lazy="input"
      placeholder=""
      :suffix-icon="Search"
      size="small"
      @keyup.enter ="submit"
      class="search"
  />
</template>

<script setup>
import {
  Search
} from '@element-plus/icons-vue'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {reactive, ref} from "vue";

const store = useStore()
const router = useRouter()
const input = ref("")
input.value = store.state.search.searchData
const submit = () => {
  store.state.search.searchData = input.value
  store.dispatch("getTagList")
  router.push(`/search`)
}
</script>

<style scoped>
.search{
  height: 100%;
}
</style>