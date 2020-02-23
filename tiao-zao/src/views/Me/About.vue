<template>
  <div class="me">
    <header>
      <div class="avatar">
        <van-image
          :src="logo"
          width="1.7rem"
          height="1.7rem"
          fit="cover"
          class="avatarImg"
          round
        >
          <template v-slot:error>
            暂无头像
          </template>
        </van-image>
      </div>
      <p class="name">
        {{ userData.USERNAME }}
      </p>
      <p class="companyName">
        {{ company?company.COMPANY_NAME_ZH:'' }}
      </p>
    </header>
    <div class="list">
      <div
        class="listItem"
        @click="go('myProduct')"
      >
        <van-icon
          name="bag"
          color="#2885ff"
          class="icon"
        />
        <span>我的产品</span>
      </div>
      <div
        class="listItem"
        @click="go('myCart')"
      >
        <van-icon
          name="shopping-cart"
          color="#39c6b7"
          class="icon"
        />
        <span>我的购物车</span>
      </div>
      <div
        class="listItem"
        @click="go('myTradeInfo')"
      >
        <van-icon
          name="balance-list"
          color="#f7ab27"
          class="icon"
        />
        <span>我的贸易信息</span>
      </div>
      <div
        class="listItem"
        @click="go('setting')"
      >
        <van-icon
          name="setting
"
          color="#f54139"
          class="icon"
        />
        <span>设置</span>
      </div>
    </div>
    <TabBar />
  </div>
</template>

<script>
import qs from 'qs'
import { Image, Icon } from "vant";
export default {
  name: "Me",

  components: {
    [Image.name]: Image,
    [Icon.name]: Icon
  },
  data() {
    return {
      logo: '',
      company: ''
    };
  },

  computed: {
    userData() {
      return this.$ls.get('user')
    }
  },

  mounted() {
    this.getCompany()
  },

  methods: {
    go(router) {
      this.$router.push({
        name: router
      })
    },
    async getCompany() {
      let {data:res} = await this.axios.post(this.httpurl+'/miniProIndex/getEnterpriseByID', qs.stringify({
        // this.$ls.get('user').USER_ID
        // '403217e3c7c34137a5cf081297eee4a5'
        ENTERPRISE_ID: this.$ls.get('user').USER_ID
      }))
      this.company = res.data
      if(res.data) {
        this.$store.commit('changeLoginCompany', res.data);
        this.logo = this.httpurl+"/" + (this.company.COMPANY_LOGO).split('@;@')[0];
      }


    }
  }
};
</script>
<style lang='less' scoped>
.me {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/meBg.png") center / cover;
  header {
    font-size: 0.37rem;
    color: rgba(255, 255, 255, 1);
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    align-items: center;
    height: 7rem;
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }
  .list {
    padding: 0.27rem;
    .listItem {
      border-bottom: 1px solid #f2f2f2;
      height: 1.3rem;
      font-size: 0.4rem;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      display: flex;
      align-items: center;
      .icon {
        margin-right: 10px;
      }
    }
  }
}
</style>
