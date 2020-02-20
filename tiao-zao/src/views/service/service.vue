<template>
  <div class="service resetbg">
    <img src="../../assets/service.png" width="100%" height="156px" alt />
    <div class="btnGrop">
      <van-button color="linear-gradient(to right, #ffb8a4, #ff8667)" class="btn" @click="go(' https://www.xaport.net/login#/log in')">物流服务</van-button>
      <van-button color="linear-gradient(to right, #ffb8a4, #ff8667)" class="btn" @click="go('https://www.rmbsilkroad.com')">金融服务</van-button>
       <van-button color="linear-gradient(to right, #ffb8a4, #ff8667)" class="btn" @click="linkto('consultation')">商事调解仲裁咨询</van-button>
      <van-button color="linear-gradient(to right, #ffb8a4, #ff8667)" class="btn" @click="go('https://co.ccpit.org/')">企业原产地证申报</van-button>
      <van-button color="linear-gradient(to right, #ffb8a4, #ff8667)" class="btn" @click="go('https://www.rzccpit.com/')">商事认证</van-button>
      <van-button color="linear-gradient(to right, #ffb8a4, #ff8667)" class="btn" @click="go('http://www.atachina.org/')">ATA单证册申办</van-button>
    </div>

    <van-tabs v-model="active" title-active-color="#3195FF" color="#3195FF" class="tab">
      <van-tab title="摩擦预警">
        <WarningInfo></WarningInfo>
      </van-tab>
      <van-tab title="联系我们">
        <div class="linkWapper">
          <p>
            <i></i>
            <span>办公室：</span>
            <span>029-63917599</span>
          </p>
          <p>
            <i></i>
            <span>国际联络部：</span>
            <span>029-63917591</span>
          </p>
          <p>
            <i></i>
            <span>法律事务部：</span>
            <span>029-63917591</span>
          </p>
          <p>
            <i></i>
            <span>展览部：</span>
            <span>029-63917598</span>
          </p>
          <p>
            <i></i>
            <span>顾问秘书部：</span>
            <span>029-63917601</span>
          </p>
          <p>
            <i></i>
            <span>经济信息部：</span>
            <span>029-63917593</span>
          </p>
          <p>
            <i></i>
            <span>商事服务中心：</span>
            <span>029-63917622</span>
          </p>
          <p>
            <i></i>
            <span>西安世界贸易中心：</span>
            <span>029-63917620</span>
          </p>
          <p>
            <i></i>
            <span>陕西国际商会秘书处：</span>
            <span>029-63917623</span>
          </p>
          <p>
            <i></i>
            <span>陕西省国际贸易展览公司：</span>
            <span>029-87370356</span>
          </p>
          <p>
            <i></i>
            <span>陕西省秦商联合会：</span>
            <span>029-87298395</span>
          </p>
          <p>
            <i></i>
            <span>陕西省国际投资促进会：</span>
            <span>029-63917635</span>
          </p>
        </div>
      </van-tab>
    </van-tabs>

    <TabBar></TabBar>
  </div>
</template>

<script>
import WarningInfo from "./warning";
import { Image, Icon, Button, Tab, Tabs, Dialog } from "vant";
export default {
  name: "Service",
  data() {
    return {
      active: 2
    };
  },

  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Dialog.name]: Dialog,
    WarningInfo
  },

  computed: {},

  mounted() {},

  methods: {
    go(path) {
      window.location.href= path
    },
    linkto(name) {
       if (!this.$ls.get('user')) {
        Dialog.confirm({
          title: "温馨提示",
          message: "登录后才能进行下一步操作"
        })
          .then(() => {
            this.$router.push({
              name: "login"
            });
          })
          .catch(() => {
            return;
          });
      } else {
        this.$router.push({name})
      }
    }
  }
};
</script>
<style lang='less' scoped>
.service {
  box-sizing: border-box;
  padding: 0.27rem;
  .btnGrop {
    display: flex;
    height: 3.5rem;
    flex-wrap: wrap;
    border-top: 3px solid #f0f0f0;
    border-bottom: 3px solid #f0f0f0;
    justify-content: space-around;
    align-content: space-around;
    padding: 0.27rem;
    .btn {
      width: 3.79rem;
      height: 0.93rem;
      line-height: 0.93rem;
    }
  }
  .tab {
    margin-bottom: 1.5rem;
  }
  .linkWapper {
    p {
      display: flex;
      margin: 0;
      align-items: center;
      font-size: 0.37rem;
      color: rgba(51, 51, 51, 1);
      margin: 0.27rem;
      i {
        display: block;
        width: 0.16rem;
        height: 0.16rem;
        background: #333;
        border-radius: 50%;
        margin-right: 10px;
      }
      span:nth-child(3) {
        color: #999;
      }
    }
  }
}
</style>
