<template>
  <nav>
    <el-menu
        :default-active="route.fullPath"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        :router="true"
        :background-color="bgcolor"
        :style="leave"
    >
      <div class="left">
        <el-menu-item index="/">
          <div>
            <img style="height: 40px;margin-bottom: 7px;" src="../assets/CEIT.svg" alt="">
            <span class="logoText">CEIT</span>
          </div>
        </el-menu-item>
        <!--      <div class="flex-grow" />-->
        <div class="search">
          <SearchCom v-if="navIsShow"></SearchCom>
        </div>
      </div>
      <div class="right">
        <div class="menu">

          <el-menu-item index="/roadmap"><el-icon><location /></el-icon>学习路线</el-menu-item>
          <el-menu-item index="/talent"><el-icon><OfficeBuilding /></el-icon>人才市场</el-menu-item>
          <el-menu-item index="/article"><el-icon><Notebook /></el-icon>文章</el-menu-item>
          <el-menu-item index="/write"><el-icon><Edit /></el-icon>写作</el-menu-item>


        </div>
        <div class="sub-menu">

          <el-sub-menu index="1">
            <template #title><el-icon><Operation /></el-icon></template>
            <el-menu-item index="/roadmap"><el-icon><location /></el-icon>学习路线</el-menu-item>
            <el-menu-item index="/talent"><el-icon><OfficeBuilding /></el-icon>人才市场</el-menu-item>
            <el-menu-item index="/article"><el-icon><Notebook /></el-icon>文章</el-menu-item>
            <el-menu-item index="/write"><el-icon><Edit /></el-icon>写作</el-menu-item>
          </el-sub-menu>

        </div>
        <div class="center">
          <el-menu-item index="/home"  v-if="!isLogin"   @click="userHome">
            <el-avatar :size="40" src="" :icon="UserFilled"/>
            <div class="pop">
              <div class="popinner">
                <el-menu-item index="/home">个人资料</el-menu-item>
                <el-menu-item index="/" @click="quit">退出</el-menu-item>
              </div>
            </div>
          </el-menu-item>

          <el-menu-item index="/home"  v-else   @click="userHome">
            <el-avatar :size="40" src="" :icon="UserFilled"/>
          </el-menu-item>
        </div>

      </div>
    </el-menu>
  </nav>
</template>

<script setup>
import { reactive, ref} from 'vue'
import SearchCom from './Search.vue'
import { useRouter,useRoute } from "vue-router";
import { useStore } from "vuex";
import {
  UserFilled,
  Location,
  Notebook,
  Edit,
  OfficeBuilding,
  Search,
  Operation
} from '@element-plus/icons-vue'
const route = useRoute()
const router = useRouter()
const store = useStore()

const navIsShow = ref(true)

const leave = reactive({
  '-webkit-backdrop-filter' : 'none',
  'backdrop-filter' : 'none'
})
const bgcolor = ref('rgba(30,30,30,0)')

const isLogin = ref(true)

router.beforeEach((to,from) => {
  let path = to.path.split('/')

  if(path[1] === 'login'){
    isLogin.value = true
  }else{
    isLogin.value = false
  }

  if(path[1] === 'search'){
    navIsShow.value = false
  }else{
    navIsShow.value = true
  }

})

window.addEventListener('scroll', () => {
  if(window.scrollY <= 100){
    bgcolor.value = 'rgba(30,30,30,0)'
    leave["-webkit-backdrop-filter"] = 'none';
    leave["backdrop-filter"] = 'none';
  }else{
    bgcolor.value = 'rgba(255,255,255,0.5)'
    leave["-webkit-backdrop-filter"] = 'blur(30px) saturate(180%)';
    leave["backdrop-filter"] = 'blur(30px) saturate(180%)';
  }
});

// onBeforeRouteLeave(() => {
//   window.removeEventListener('scroll', () => {}); // 离开当前组件别忘记移除事件监听
// });


const quit = () => {
  localStorage.removeItem("token")
  // console.log(store.state.article.articleData)
  store.state.article.articleData = []
}
const userHome = async () => {
  await router.push('/home')
}
</script>

<style lang="scss">
.el-menu-item>.el-icon{
  margin-right:5px;
}
.el-menu-item span .el-icon{
  margin-right:0px;
}
nav{
  position: sticky;
  top: 0;
  z-index: 999;

}
.el-menu.el-menu--horizontal.el-menu-demo .left .el-menu-item,
.el-menu.el-menu--horizontal.el-menu-demo .left .el-menu-item:hover,
.el-menu.el-menu--horizontal.el-menu-demo .left .el-menu-item:visited{
  background-color:transparent;
}
.el-menu{
  /*-webkit-backdrop-filter: blur(30px) saturate(180%) !important;*/
  /*backdrop-filter: blur(30px) saturate(180%) !important;*/
  z-index: 999 !important;
  border: none !important;
  justify-content: space-between;
  .left{
    display: flex;
    position: relative;
    align-items: center;
    .logoText{
      font-weight: 400;
      font-size: 23px;
      margin-left: 15px;
      background-image: linear-gradient(to right, #10d5d5, #db90e3);
      -webkit-background-clip: text;
      color: transparent;
    }
    .search{
      height: 30px;
    }
  }
  .right{
    display: flex;
    position: relative;
    right: 0;
    .el-menu-item{
      border-radius:15px;

    }
  }
}
.menu{
  display:flex;

}
.left>.el-menu-item {
  margin-left:30px;
}
.flex-grow {
  flex-grow: 1;
}
.el-sub-menu .el-icon{
  margin-right: 0px !important;
}
.sub-menu{
  display:none;
}
@media only screen and (max-width: 800px) {
  .el-menu .right .menu .el-menu-item{
    padding:0;
  }}
@media only screen and (max-width: 600px) {

  .sub-menu{
    display:block;
  }
  .el-input{
    width:auto;
  }
  .menu{
    display:none;
  }
  .left>.el-menu-item {
    margin-left:0px;
  }
}
.center{
  position:relative;
}
.pop{
  position:absolute;
  right:0;
  top:0px;
  padding-top:65px;
  min-width: 200px;
}
.el-menu .center:hover .pop{
  display:block;
}
.el-menu .center .pop {
  display:none;
}
.el-input{
  width:200px;
}

.el-menu .center .pop .el-menu-item{
  border-radius:0;
}
.el-menu .right .center .el-menu-item:hover{
  background-color:#fff;
}
.el-menu .center .pop .el-menu-item:hover{
  background:rgba(24, 24, 24, 0.2);
}
.el-menu .center .popinner{
  background: rgba(30,30,30,0);
  border-radius: var(--el-border-radius-small);
  box-shadow: var(--el-box-shadow-light);
  background:#fff;
}
.right{
  margin-left:15px;
}
</style>
