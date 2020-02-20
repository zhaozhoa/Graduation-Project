<template>
  <div class="findPwd1 resetbg">
    <img src="./../../assets/login/title.png" alt class="titlePic" />
    <p class="title">重置密码</p>
    <img src="./../../assets/login/line.png" alt class="icon" />
    <van-cell-group>
      <van-field
        v-model="password"
        type="password"
        label="输入新密码"
        placeholder="请输入密码"
        required
        :error-message="passwordTips"
        label-width="90px"
        @blur="checkPsw1"
      />
      <van-field
        v-model="password2"
        type="password"
        label="确认密码"
        placeholder="请输入相同密码"
        required
        :error-message="password2Tips"
        label-width="90px"
        @input="checkPsw2"
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
import qs from 'qs'
import { Field, Button, Cell, CellGroup } from "vant";
export default {
  name: "FindPwd1",
  data() {
    return {
      password: "",
      password2: "",
      passwordTips: "",
      password2Tips: "",
      isClick: true
    };
  },

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },

  computed: {
    uData() {
      return this.$store.state.uData
    }
  },

  mounted() {},

  methods: {
    checkPsw1() {
      if (!/^(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]{5,20}$/.test(this.password)) {
        this.passwordTips = "请输入5~20个字符，包含字母和数字！";
        return;
      } else {
        this.passwordTips = "";
      }
    },
    checkPsw2() {
      if (this.password2 !== this.password) {
        this.password2Tips = "两次输入密码必须保持一致";
        return;
      } else {
        this.password2Tips = "";
        this.isClick = false;
      }
    },
    async next() {
      let {data: res} = await this.axios.post(this.httpurl+'/miniProIndex/updatePWD', qs.stringify({
        PHONE: this.uData.PHONE,
        PWD: this.md5(this.password),
        USERNAME: this.uData.USERNAME
      }))

      if (res.code === '0') {
        this.$router.push({ name: "findPwd4" });
      } else {
        this.$toast.fail('修改失败')
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
    font-size: 0.53rem;
    color: rgba(51, 51, 51, 1);
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
