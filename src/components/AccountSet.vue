<template>
  <div>
    <ResetPwd :account="userInfo.email"></ResetPwd>
  </div>
</template>

<script>
import ResetPwd from "../components/ResetPwd.vue";

export default {
  name: "AccountSet",
  components: {
    ResetPwd,
  },

  data() {
    return {
      userInfo: {}
    }
  },

  created() {
    this.userInfo = this.$func.getLocalUser()
  }
}
</script>

<style scoped>

</style>