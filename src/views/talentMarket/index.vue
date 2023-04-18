<template>
  <div className="talent">
    <div className="center">
      <UserCard v-for="item in UserList" :item="item"/>
    </div>
  </div>
</template>


<script setup>
import {useStore} from 'vuex'
import {computed, onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {getUserList} from "../../api/index.js";
import UserCard from "../../components/UserCard.vue";

const store = useStore()
const router = useRouter()

const UserList = ref([])


onMounted(async () => {
  const res = await getUserList(0, 100)
  UserList.value = res.data.data.currentUser
  // console.log(UserList.value)
})
</script>

<style lang="scss">
.talent {
  width: 100%;

  .center {
    height: 100%;
    margin: 0 20px;
    //width: 70%;
  }
}

</style>