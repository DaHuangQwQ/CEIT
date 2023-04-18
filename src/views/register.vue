<template>
  <div class="reg">
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <el-form-item label="名字" prop="name">
        <el-input v-model="ruleForm.name"/>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"/>
      </el-form-item>
      <el-form-item label="学号" prop="username">
        <el-input v-model.number.trim="ruleForm.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-select-v2
            v-model="ruleForm.age"
            placeholder="请出入年龄"
            :options="options"
        />
      </el-form-item>
      <el-form-item label="地点" prop="addr">
        <el-input v-model="ruleForm.addr"/>
      </el-form-item>
      <el-form-item label="生日" required>
        <el-col :span="11">
          <el-form-item prop="birth">
            <el-date-picker
                v-model="ruleForm.birth"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="技术栈" prop="skillStack">
        <el-checkbox-group v-model="ruleForm.skillStack">
          <el-checkbox v-for="item in skillStack" :label="item" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="想参加的竞赛" prop="contest">
        <el-checkbox-group v-model="ruleForm.contest">
          <el-checkbox v-for="item in contest" :label="item" name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男"/>
          <el-radio label="女"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="自我介绍" prop="introduction">
        <el-input v-model="ruleForm.introduction" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {reactive, ref, toRaw} from 'vue'
import {nanoid} from "nanoid";
import {addUser} from '../api/index'
import {useRouter} from "vue-router";

const formSize = ref('default')
const ruleFormRef = ref()
const router = useRouter()
const ruleForm = reactive({
  name: '',
  email: '',
  captcha: '',
  username: '',
  password: '',
  introduction: '',
  age: '',
  sex: '',
  birth: '',
  addr: '',
  skillStack: [],
  contest: [],
})
const skillStack = [
  "c",
  "c++",
  "html",
  "css",
  "js",
  "vue",
  "react",
  "java"
]
const contest = [
  "蓝桥杯",
  "天梯赛",
  "程序设计大赛"
]

const isEmail = (rule, value, callback) => {
  const regEmail =
      /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!regEmail.test(value)) {
    callback(new Error('输入正确的邮箱'))
  } else {
    callback()
  }
}

const rules = reactive({
  name: [
    {required: true, message: '请输入名字', trigger: 'blur'},
    {min: 2, max: 5, message: '长度在 2 到 5', trigger: 'blur'},
  ],
  email: [
    {required: true, message: '请输入正确的邮箱', trigger: 'blur', validator: isEmail}
  ],
  username: [
    {
      required: true,
      message: '请输入学号',
      trigger: 'change',
    },
    {
      type: 'number', message: '请输入学号'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'change',
    },
  ],
  introduction: [
    {
      required: true,
      message: '请输入自我介绍',
      trigger: 'change',
    },
  ],
  age: [
    {
      required: true,
      message: '请输入年龄',
      trigger: 'change',
    },
  ],
  birth: [
    {
      type: 'date',
      required: true,
      message: 'Please pick a time',
      trigger: 'change',
    },
  ],
  skillStack: [
    {
      type: 'array',
      required: true,
      message: '请输入技术',
      trigger: 'change',
    },
  ],
  contest: [
    {
      type: 'array',
      required: true,
      message: '请输入技术',
      trigger: 'change',
    },
  ],
  sex: [{
    required: true,
    message: '请输入性别',
    trigger: 'change',
  }],
  addr: [{
    required: true,
    message: '请输入地点',
    trigger: 'change',
  }]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {

      console.log(await addUser({
        id: nanoid(),
        ...toRaw(ruleForm)
      }).then())
      router.push('/login')
    } else {
      console.log('错误的提交', fields)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({length: 30}).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>

<style lang="scss" scoped>
.reg {
  margin: 60px auto;
  width: 50%;
  min-width: 350px;
}
</style>