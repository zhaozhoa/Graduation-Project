<template>
  <div class="Company">
    <CompanySwiper />
    <template v-for="(item) in companyInfo">
      <div class="companyInfo">
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>公司简介</span>
          </li>
          <p class="info">
            {{item.COMPANY_DESCRIPTION_ZH}}
          </p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>公司注册地址</span>
          </li>
          <p class="info">{{storeCompanyInfo?storeCompanyInfo.ADDRESS_ZH:''}}</p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>企业性质</span>
          </li>
          <p class="info">
            {{storeCompanyInfo?storeCompanyInfo.COMPANY_TYPE:''}}
          </p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>注册资本金额</span>
          </li>
          <p class="info">{{item.money}}</p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>经营范围</span>
          </li>
          <p class="info">{{storeCompanyInfo?storeCompanyInfo.BUSINESS_SCOPE_ZH:''}}</p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>公司成立日期:</span>
          </li>
          <p class="info">{{getDate(item.BUSINESS_START_TIME)}}</p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>经营期限:</span>
          </li>
          <p class="info">{{getDate(item.FOUND_DATE)}}</p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>统一信用代码/注册号:</span>
          </li>
          <p class="info">{{item.CREDIT_CODE}}</p>
        </div>
        <div class="infoItem">
          <li class="title">
            <i></i>
            <span>公司网站:</span>
          </li>
          <p class="info">{{storeCompanyInfo?storeCompanyInfo.WEB_SITE:''}}</p>
        </div>
        
      </div>
    </template>
  </div>
</template>

<script>
import qs from 'qs'
import CompanySwiper from "../../components/campany/campanySwiper";
export default {
  name: "CompanyInfo",
  data() {
    return {
      companyInfo: [],
      storeCompanyInfo: this.$store.state.companyData
    };
  },

  components: {
    CompanySwiper
  },

  computed: {
    companyData () {
      return this.$store.state.companyData
    }
  },

  async mounted() {
     let {data: res} = await this.axios.post(this.httpurl + '/miniProIndex/getEnterpriseProfile', qs.stringify({
     ENTERPRISE_ID: this.$store.state.companyData.ENTERPRISE_ID
   }))
   this.companyInfo = res.data
  
   let  regMoneyUnit , regMoneyCurrency
   this.companyInfo[0].UNIT == 0 ? regMoneyUnit = '万' : regMoneyUnit = '亿'
   let nameArr = ['人民币','欧元','美元','日元','英镑','法郎','港元','澳元','新台币']
    regMoneyCurrency = nameArr.filter((ele,index) => index == this.companyInfo[0].CURRENCY)[0]

    this.companyInfo[0].money = this.companyInfo[0].NUM + regMoneyUnit +regMoneyCurrency
   
  },

  methods: {
    getDate(time) {
      if(time) {
        return time.split('T')[0];
      }else {
        return "";
      }




    }

  }
};
</script>
<style lang='less' scoped>
.Company {
  background: #f0f0f0;
  margin: 0.27rem;
  margin-bottom: 1.5rem;
  .companyInfo {
    overflow: hidden;
    margin-top: 0.24rem;
    background: #fff;
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
      }
    }
  }
}
</style>
