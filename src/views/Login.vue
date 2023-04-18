<template>
  <div class="login">
    <div class="top" style="margin-top:50px;">

      <p>登入至 CEIT</p>
    </div>
    <div class="form">
      <el-form
          label-position="top"
          size="small"
      >
        <el-form-item label="账号">
          <el-input v-model="userLogin.username" placeholder="请输入邮箱 或 学号"/>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userLogin.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item>
          <el-button type="success" round style="width: 100%;" @click="onSubmit">登入</el-button>
        </el-form-item>
      </el-form>
    </div>
    <router-link to="/register">
      <p>没有账号？请在这里 <span style="color: skyblue">注册</span></p>
    </router-link>
  </div>
</template>

<script setup>
import {reactive, ref, toRaw} from 'vue'
import {userVerify} from "../api/index.js";
import {useRouter} from 'vue-router'
import {useStore} from "vuex";

const router = useRouter()
const store = useStore()

const userLogin = reactive({
  username: '',
  password: '',
})

const onSubmit = async () => {
  const res = await userVerify(toRaw(userLogin))
  console.log(res)
  if (res.data.data) {
    router.push('/')
    console.log(store.state.userData)
    store.state.userData = res.data.data[0]
    localStorage.setItem("token", res.data.data)
  }
}
</script>

<style lang="scss">
.login {
  margin: 0 auto;
  text-align: center;

  .form {
    margin: 20px auto;
    width: 340px;
    border: 1px solid hsla(210, 18%, 87%, 1);
    border-radius: 6px;
    background-color: #f6f8fa;
    padding: 0 20px;
    box-sizing: border-box;

    .el-form-item {
      margin: 20px 0;
    }

    .el-button {
      margin-top: 20px;
    }
  }
}
</style>
