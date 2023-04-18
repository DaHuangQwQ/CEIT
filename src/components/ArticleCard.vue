<template>
  <el-row :gutter="10">
    <el-col >
      <el-card shadow="hover" @click="articleView(item.id)">
        <el-row :gutter="10">
          <el-col :span="12">
            <h1>{{ item.title }}</h1>
            <p>{{ item.describe }}</p>
          </el-col>
          <el-col :span="12">
            <el-tag style="margin-right:10px" class="sort" v-for="tag in item.sort?.split(',')">{{ tag }}</el-tag>
            <!--                <p>{{ item.userID}}</p>-->
            <p>{{ item.tag }}</p>
            <p>{{ item.createTime }}</p>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter()

defineProps({
  item:{
    type: Object
  }
})

const articleView = (id) => {
  router.push(`/article/${id}`)
}
</script>

<style lang="scss" scoped>
.el-col{
  margin-top: 2rem;
  .el-card{
    border-radius: 15px;
    height: 100px;
    .el-col{
      color: #1f2d3d;
      h1{
        font-size: 24px;
        font-weight: bold;
        transition:all 0.5s;
        &:hover{
          color: skyblue;
        }
      }
      p{
        font-size: 15px;
      }
      margin-top: 0;
    }
  }
}
</style>