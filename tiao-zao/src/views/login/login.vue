<template>
  <div class="login resetbg">
    <img src="./../../assets/login/title.png" alt class="titlePic" />
    <van-cell-group>
      <van-field
        v-model="username"
        label="登录名"
        placeholder="请输入登录名"
        required
        :error-message="usernameTips"
        label-width="70px"
        @blur="checkUserName"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordTips"
        label-width="70px"
        @blur="checkPsw1"
      />

      <div class="checkPicWapper">
        <van-field
          v-model="checkPic"
          label-width="70px"
          label="验证码"
          placeholder="请输入验证码"
          required
          :error-message="checkPicTips"
          @input="checkpic"
        />
        <van-image 
        :src="pic"
        @click="changePic"
         class="picWapper"
        >
          <template v-slot:error>暂无图片</template>
        </van-image>
      </div>
    </van-cell-group>
      <van-button
        type="primary"
        size="large"
        class="btn"
        @click="login"
        :disabled="isClick"
        color="linear-gradient(to right, #4bb0ff, #6149f6)"
      >登录</van-button>

      <div class="findPassword">
        <span @click="toReg" class="reg">注册 | </span>
        <span @click="toFindPwd" class="find">忘记密码？</span>
      </div>
  </div>
</template>

<script>
import qs from "qs";
import { Field, Button, Cell, CellGroup, Image } from "vant";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      checkPic: "",
      usernameTips: "",
      passwordTips: "",
      checkPicTips: "",
      pic: "",
      isClick: true
    };
  },

  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image
  },

  computed: {},

  mounted() {
    this.pic = this.httpurl+"/verify/code?random=" + Math.random();
  },

  methods: {
    changePic() {
      this.pic = this.httpurl+"/verify/code?random=" + Math.random();
    },
    checkUserName() {
      if (!/^[a-zA-Z0-9]{5,20}$/.test(this.username)) {
        this.usernameTips = "请输入5~20个字符，包含字母或数字！";
        return;
      } else {
        this.usernameTips = "";
      }
    },
    checkPsw1() {
      if (!/^(?![a-z]+$)(?![0-9]+$)[a-zA-Z0-9]{5,20}$/.test(this.password)) {
        this.passwordTips = "请输入5~20个字符，包含字母和数字！";
        return;
      } else {
        this.passwordTips = "";
      }
    },
    checkpic() {
      if (this.checkPic.length != 4) {
        this.checkPicTips = "验证码有误";
        return;
      } else {
        this.isClick = false;
        this.checkPicTips = "";
      }
    },
    async login() {
      if (
        this.usernameTips == "" &&
        this.username !== "" &&
        this.passwordTips == "" &&
        this.password !== "" &&
        this.checkPic !== "" &&
        this.checkPicTips == ""
      ) {
        let { data } = await this.axios.post(
          this.httpurl+"/admin/unifiedLogin",
          qs.stringify({
            LOGIN_NAME: this.username,
            PASS_WORD: this.md5(this.password),
            CODE: this.checkPic
          })
        );
        if (data.code === "0") {
          // 将用户信息存到 vuex
          this.$ls.set('user', data.data,20 * 60 * 1000)
          this.$store.commit("changeUserData", data.data);
          this.$router.go(-1);
          this.changePic()
        } else {
          this.$toast.fail(data.msg);
          this.changePic()
        }
      } else {
        this.$toast.fail("* 必填");
      }
    },
    toReg() {
      this.$router.push({name:'register'})
    },
    toFindPwd() {
      this.$router.push({name:'findPwd1'})
      
    }
  }
};
</script>
<style lang='less' scoped>
.login {
  box-sizing: border-box;
  padding: 0.72rem;
}
.titlePic {
  width: 8.53rem;
  margin-top: 2.84rem;
  margin-bottom: 1.5rem;
  display: block;
}
.checkPicWapper {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .picWapper {
    margin-top: 0.2rem;
    width: 2.7rem;
    height: 1rem;
    img {
      display: block;
    }
  }
}
.btn {
  margin-top: 2rem;
}
.findPassword {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  font-size:0.37rem;
color:rgba(51,51,51,1);
.find {
  color: #0096ff;
}
}
</style>
