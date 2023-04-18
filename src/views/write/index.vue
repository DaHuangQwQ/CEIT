<template>
  <div class="content">
    <div id="vditor"></div>
    <div class="submit">
      <el-button type="primary" @click="dialogVisible = true" size="large">下一步</el-button>
    </div>
  </div>


  <el-dialog
      v-model="dialogVisible"
      title="提交表单"
      width="50%"
      :before-close="handleClose"
  >
    <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" autocomplete="off" />
      </el-form-item>
      <el-form-item label="类别" prop="sort">
        <el-checkbox-group v-model="ruleForm.sort">
          <el-checkbox v-for="item in tagType" :label="item" name="type" />
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="标签">
        <el-tag
            v-for="tag in ruleForm.tag"
            :key="tag"
            class="mx-1"
            closable
            :disable-transitions="false"
            @close="handleCloseTag(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
            v-if="inputVisible"
            ref="InputRef"
            v-model="inputValue"
            class="ml-1 w-20"
            size="small"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
        />
        <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
          添加标签
        </el-button>
      </el-form-item>
      <el-form-item label="是否可见" prop="isVis">
        <el-switch  v-model="ruleForm.isVis" />
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input v-model="ruleForm.describe" />
      </el-form-item>
    </el-form>
    <template #footer>

      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, reactive, nextTick } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { nanoid } from "nanoid";
import { ElMessageBox } from 'element-plus'
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import { addArticle } from "../../api/index.js";
import {userLogin} from "../../hooks/userHook.js";

const dialogVisible = ref(false)
const store = useStore()
const router = useRouter()
const vditor = ref(null);
const ruleFormRef = ref()
let textData = ref('')
const inputVisible = ref(false)
const InputRef = ref()
const inputValue = ref('')
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3'])

const tagType = reactive([
    "c,c++",
    "java",
    "html",
    "css",
    "js",
    "vue2",
    "vue3"
])

const ruleForm = reactive({
  title: '',
  sort: [],
  tag: [],
  describe: '',
  isVis: 1
})



const handleClose = (done) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done()
      })
      .catch(() => {
        // catch error
      })
}


const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入标题'))
  } else {
    if (ruleForm.title !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入类别'))
  } else {
    callback()
  }
}
const checkAge = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入描述'))
  } else {
    callback()
  }
}

const rules = reactive({
  title: [{ validator: validatePass, trigger: 'blur' }],
  sort: [{ validator: validatePass2, trigger: 'blur' }],
  describe: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(addArticle({
        id: nanoid(),
        title: ruleForm.title,
        data: textData.value,
        sort: ruleForm.sort,
        tag: ruleForm.tag,
        describe: ruleForm.describe,
        isVis: ruleForm.isVis
      }))
      console.log(textData.value)
      dialogVisible.value = false
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}


const handleCloseTag = (tag) => {
  ruleForm.tag.splice( ruleForm.tag.indexOf(tag), 1)
}


const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    ruleForm.tag.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}


onMounted(async () => {
  await userLogin(40100,() => {
    router.push('/login')
  })
  vditor.value = new Vditor('vditor', {
    after: () => {
      vditor.value.setValue('# welcome to write');
      textData.value = vditor.value.getValue()
    },
    toolbarConfig: {
      pin: true,
    },
    input: (value) => {
      textData.value = value;
    },
    preview: {
      hljs:{
        style: 'xcode'
      }
    }
  });
  console.log()

});
</script>

<style lang="scss">
.content {
  margin: 0 auto;
  width: 75%;
  #vditor {
    margin-top: 30px;
    min-height: 75vh;
  }

  .submit{
    margin-top: 30px;
    text-align: center;
  }
}
</style>
