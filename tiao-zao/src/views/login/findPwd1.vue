<template>
  <div class="findPwd1 resetbg">
    <img src="./../../assets/login/title.png" alt class="titlePic" />
    <p class="title">忘记密码</p>
    <img src="./../../assets/login/line.png" alt class="icon" />
    <van-cell-group>
      <van-field
        v-model="username"
        label="登录名"
        placeholder="请输入登录名"
        required
        :error-message="usernameTips"
        label-width="70px"
        @input="checkUserName"
      />
    </van-cell-group>
    <van-button
      type="primary"
      size="large"
      class="btn"
      @click="next"
      :disabled="isClick"
      color="linear-gradient(to right, #4bb0ff, #6149f6)"
    >下一步</van-button>
  </div>
</template>

<script>
import qs from "qs";
import { Field, Button, Cell, CellGroup } from "vant";
export default {
  name: "FindPwd1",
  data() {
    return {
      username: "",
      usernameTips: "",
      isClick: true
    };
  },

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },

  computed: {},

  mounted() {},

  methods: {
    checkUserName() {
      
      if (!/^[a-zA-Z0-9]{5,20}$/.test(this.username)) {
        this.usernameTips = "请输入5~20个字符，包含字母和数字！";
        return
      } else {
        this.usernameTips = "";
        this.isClick = false
      }
    },
    async next() {
      let {data:res} = await this.axios.post(this.httpurl+'/miniProIndex/getUSER', qs.stringify({USERNAME: this.username}) )

      if (res.data == null) {
        this.usernameTips = '该用户不存在'
      } else {
        this.$store.commit('changeUData', res.data)
      this.$router.push({name: 'findPwd2'})
      }
     
    }
  }
};
</script>
<style lang='less' scoped>
.findPwd1 {
  box-sizing: border-box;
  padding: 0.72rem;
  .titlePic {
    width: 8.53rem;
    // margin-top: 2.84rem;
    margin-bottom: 1.5rem;
    display: block;
  }
  .title {
    margin-bottom: 0;
    width: 2.7rem;
    text-align: center;
    font-size:0.53rem;
color:rgba(51,51,51,1);
  }
  .icon {
    display: block;
    margin-bottom: 1rem;
    width: 2.7rem;
  }
  .btn {
    margin-top: 1rem;
  }
}
</style>
