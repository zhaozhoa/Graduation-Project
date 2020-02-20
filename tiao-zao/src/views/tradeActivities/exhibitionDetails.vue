<template>
  <div class="ExhibitionDetails">
    <header>
      <div class="title">{{data.TITLE}}</div>
      <div class="time">
        <van-icon name="clock" size="13" class="icon" />
        {{data.PUBLISH_DATE}}
      </div>
    </header>
    <div class="info">
      <div class="item">
        <div class="desc" v-html="data.CONTENT"></div>
      </div>
    </div>
    <div class="activeBtn">
      <van-button icon="records" type="primary" @click="activeSign">活动报名</van-button>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from "qs";
import { Icon, Button, Dialog } from "vant";
export default {
  name: "ExhibitionDetails",
  data() {
    return {
      data: "",
      id: ""
    };
  },

  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },

  computed: {},

  mounted() {
    if (this.$route.params.TRADE_ID) {
      this.id = this.$route.params.TRADE_ID;
      this.$ls.set("ID", this.id);
    } else {
      this.id = this.$ls.get("ID");
    }
    this.getData(this.id);
  },

  methods: {
    async getData(id) {
      let { data: res } = await this.axios.post(
        this.httpurl + "/miniProIndex/getTradeDetail",
        qs.stringify({
          TRADE_ID: id
        })
      );
      res.data.PUBLISH_DATE = res.data.PUBLISH_DATE.split("T")[0];
      this.data = res.data;
      this.$ls.set('Exhibition', {
        ACTIVITY_SESSION: res.data.ACTIVITY_SESSION,
        ACTIVITY_SESSION2: res.data.ACTIVITY_SESSION2,
        TEMPLATE_ID: res.data.TEMPLATE_ID
      })
    },

    // 点击活动报名跳转至报名页面
    activeSign() {
      if (new Date(this.data.REGISTRATION_DEADLINE).getTime() < new Date().getTime()) {
        this.$toast.fail("该经贸活动已经停止报名");
        return;
      }
      //判断是否登录
      this.isLogin();
    },

    // 判断用户是否登录
    isLogin() {
      if (!this.$ls.get("user")) {
        Dialog.confirm({
          title: "温馨提示",
          message: "请登录后报名"
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
        this.$router.push({
          name: "EnrollSurface",
          params: { params: this.data, TRADE_ID: this.id }
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.ExhibitionDetails {
  box-sizing: border-box;
  padding: 0.27rem;
  // width: 100vw;
  position: relative;
  header {
    font-size: 0.48rem;

    color: rgba(51, 51, 51, 1);
    border-bottom: 4px solid #f0f0f0;
    .title {
      font-weight: bold;
    }
    .time {
      font-size: 0.32rem;
      color: rgba(188, 188, 188, 1);
      margin: 0.27rem 0;
      height: 0.8rem;
      line-height: 0.8rem;
      .icon {
        vertical-align: middle;
        margin: 5px;
      }
    }
  }
  .info {
    margin-bottom: 3rem;
    .infoName {
      display: flex;
      align-items: center;
      margin-bottom: 0.2rem;
      margin-top: 0.4rem;
      i {
        display: block;
        width: 0.13rem;
        height: 0.13rem;
        background: #000;
        border-radius: 50%;
        margin-right: 10px;
      }
      span {
        font-size: 0.35rem;
        color: rgba(51, 51, 51, 1);
      }
    }
    .desc {
      font-size: 0.32rem;
      margin: 0.1rem 0 0 0;
      display: flex;
      flex-direction: column;
      .descItem {
        display: flex;
        flex-direction: row;
        margin-top: 0.17rem;
        .descTitle {
          font-size: 0.35rem;
          color: rgba(51, 51, 51, 1);
        }
      }
    }
  }
  .activeBtn {
    position: fixed;
    bottom: 1.3rem;
    width: 100%;
    button {
      width: 95%;
      background: #2882b8;
      border: none;
    }
  }
}
</style>
