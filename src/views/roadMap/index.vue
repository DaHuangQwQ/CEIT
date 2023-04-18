<template>
  <div class="roadMapIndex">
    <!--  <Nav></Nav>-->
    <div class="top">
      <div class="center">
        <h1>
          Developer Roadmaps
        </h1>
        <p>
          roadmap.sh is a community effort to create roadmaps, guides and other educational content to help guide the
          developers in picking up the path and guide their learnings.
        </p>
      </div>
    </div>

    <div class="map">
      <div class="center">
        <el-row :gutter="20" justify="space-between">
          <el-col :span="8" v-for="item in mapList" @click="view(item.title)">
            <el-card shadow="hover">
              {{ item.title }}
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const mapList = reactive([
  {
    title: 'vue',
  },
  {
    title: 'java',
  },
  {
    title: 'javascript',
  },
  {
    title: 'nodejs',
  }
])

const view = (id) => {
  router.push(`/roadmap/${id}`)
}

</script>

<style lang="scss">
.roadMapIndex {
  .top {
    width: 100%;
    height: 300px;
    border-bottom: 2px solid red;

    .center {
      width: 60%;
      margin: 0 auto;
      text-align: center;
      height: 100%;
      overflow: hidden;
      //background-color: red;
      h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
        margin-top: 6rem;
        background-image: linear-gradient(to right, orange, purple);
        -webkit-background-clip: text;
        color: transparent;
      }

      p {
        color: #e0e2e8;
      }
    }
  }

  .map {
    width: 100%;
    height: 400px;
    margin-top: 20px;

    .center {
      margin: 0 auto;
      height: 100%;
      width: 50%;
      min-width: 500px;
      overflow: hidden;
      //background-color: red;
      .el-card {
        margin: 10px;

      }
    }
  }
}
</style>