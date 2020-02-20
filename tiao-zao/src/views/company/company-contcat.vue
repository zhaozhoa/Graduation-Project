<template>
  <div class="Company">
    <CompanySwiper></CompanySwiper>
    <div class="companyInfo">
      <div class="infoItem">
        <li class="title">
          <i></i>
          <span>联系方式</span>
        </li>
        <p class="info">
          {{link.COMPANY_MOBILE}}
        </p>
      </div>
      <div class="infoItem">
        <li class="title">
          <i></i>
          <span>联系人</span>
        </li>
        <p class="info">
          {{link.LAGAL_PERSON_ZH}}
        </p>
      </div>
      <div class="infoItem">
        <li class="title">
          <i></i>
          <span>企业性质</span>
        </li>
        <p class="info">{{link.COMPANY_TYPE}}</p>
      </div>
      <div class="infoItem">
        <li class="title">
          <i></i>
          <span>所在地</span>
        </li>
        <p class="info">
          {{link.ADDRESS_ZH}}
        </p>
      </div>
      <div class="infoItem">
        <li class="title">
          <i></i>
          <span>地址</span>
        </li>
        <p class="info">{{link.ADDRESS_ZH}}</p>
      </div>
      <div class="infoItem">
        <li class="title">
          <i></i>
          <span>公司主页</span>
        </li>
        <p class="info">{{link.WEB_SITE}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import CompanySwiper from "../../components/campany/campanySwiper";
export default {
  name: "companyInfo",
  data() {
    return {
      link:{}
    };
  },

  components: {
    CompanySwiper
  },

  computed: {},

  mounted() {
    this.link = this.$store.state.companyData
  },

  methods: {}
};
</script>
<style lang='less' scoped>
.Company {
  background: #f0f0f0;
  margin: 0.27rem;
  .companyInfo {
    overflow: hidden;
    margin-top: 0.24rem;
    background: #fff;
    height: 100%;
    .infoItem {
      margin-top: 0.4rem;
      li {
        display: block;
        font-size: 0.35rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        list-style: none;
        margin-left: 10px;
        position: relative;
        i {
          display: inline-block;
          width: 0.13rem;
          height: 0.13rem;
          margin-right: 10px;
          background: #000;
          border-radius: 50%;
          text-align: center;
          position: absolute;
          margin-top: 6px;
        }
        span {
          margin-left: 10px;
        }
      }
      .info {
        font-size: 0.32rem;
        // font-weight:bold;
        color: rgba(153, 153, 153, 1);
        line-height: 0.53rem;
        padding: 0 0.35rem 0 0.45rem;
        margin: 0;
        margin-top: 0.28rem;
      }
    }
  }
}
</style>
