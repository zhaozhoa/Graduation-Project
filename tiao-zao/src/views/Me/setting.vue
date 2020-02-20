<template>
  <div class="Setting">
    <p class="title">设置</p>
    <img src="./../../assets/login/line.png" alt class="iconSetting" />
    <div class="itemList">
      <div class="item">
        <p>头像</p>
        <van-image
          :src="this.httpurl+ loginCompany.COMPANY_LOGO"
          width="1.7rem"
          height="1.7rem"
          fit="cover"
          class="avatarImg"
          round
        >
          <template v-slot:error>暂无头像</template>
        </van-image>
      </div>
    </div>
     <div class="itemList">
      <div class="item">
        <p>公司名称</p>
        <div class="companyName">
          <van-tag type="success" class="lab" v-if="loginCompany.STATE == 0">待审核</van-tag>
          <van-tag type="success" class="lab" v-if="loginCompany.STATE == 1">审核通过</van-tag>
          <van-tag type="success" class="lab" v-if="loginCompany.STATE == 2">审核不通过</van-tag>
          <van-tag type="success" class="lab" v-if="loginCompany.STATE == 3">资料不全</van-tag>
          <span>{{loginCompany.COMPANY_NAME_ZH}}</span>
        </div>
      </div>
    </div>
     <div class="itemList">
      <div class="item">
        <p>所在地</p>
        <p>{{loginCompany.ADDRESS_ZH}}</p>
      </div>
    </div>
     <div class="itemList">
      <div class="item" @click="toChangePassword">
        <p>账户密码</p>
        
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Tag  } from "vant";

export default {
  name: "Setting",
  data() {
    return {};
  },

  components: {
    [Image.name]: Image,
    [Tag .name]: Tag 
  },

  computed: {
    loginCompany () {
      return this.$store.state.loginCompany
    }
  },

  mounted() {},

  methods: {
    toChangePassword() {
      this.$router.push({
        name: 'changePassword'
      })
    }
  }
};
</script>
<style lang='less' scoped>
.Setting {
  padding: 0.27rem;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
}
.title {
  margin-top: 2rem;
  margin-bottom: 0;
  width: 1.7rem;
  text-align: center;
  font-size: 0.53rem;
  color: rgba(51, 51, 51, 1);
}
.iconSetting {
  display: block;
  margin-bottom: 1rem;
  width: 1.7rem;
  height: 8px;
}
.itemList {
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 2.11rem;
    font-size: 0.4rem;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    border-bottom: 1px solid #f2f2f2;
    .companyName {
      display: flex;
      align-items: center;
    }
    .lab {
      margin-right: 5px;
    }
  }
}
</style>
