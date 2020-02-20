<template>
  <div class="needBuyInfo resetbg">
    <div class="searchItem">
      <p>{{info.TITLE}}</p>
      <div>
        <span><van-tag round   color="#9EB4EC"  v-for=" lb in info.LABEL?info.LABEL.split(','):''">{{lb}}</van-tag></span>
        <span>
          <van-icon name="clock" size="13" class="icon" />{{info.CREATE_DATE}}
        </span>
      </div>
    </div>

    <article v-html="info.CONTENT" class="contentInfo">
      
    </article>


    <div style="width:100%; height: 1.5rem"></div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from 'qs'
import { Icon,Tag } from "vant";
export default {
  name: "NeedBuyInfo",
  data() {
    return {
      info: ''
    };
  },

  components: {
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },

  computed: {},

  mounted() {
    let INFORMATION_ID = this.$route.params.INFORMATION_ID
    this.getData (INFORMATION_ID)
  },

  methods: {
    async getData (INFORMATION_ID) {
     try {
        let {data: res} = await this.axios.post(this.httpurl+'/miniProIndex/getDetail', qs.stringify({INFORMATION_ID}))
         this.info = res.data
     } catch (error) {
       this.$toast.fail('网络异常')
     }
      
    }
  }
};
</script>
<style lang='less' scoped>
.needBuyInfo {
  box-sizing: border-box;
  width: 100vw;
  background: #fff;
  white-space: normal;
  overflow: hidden;
  padding: 0.27rem;
}
.searchItem {
  padding: 0.27rem;
  background: #fff;
  padding: 0 0.28rem;
  font-size: 0.37rem;
  border-bottom: 2px solid #f0f0f0;
  height: 2.35rem;
  p {
    font-size: 0.37rem;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    margin-top: 0.3rem;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.32rem;
    font-family: PingFang SC;
    color: rgba(153, 153, 153, 1);
    margin-top: 0.59rem;
  }
  span:nth-child(2) {
    .icon {
      vertical-align: middle;
      margin: 5px;
    }
  }
}

article {
  box-sizing: border-box;
  font-size: 0.43rem;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 0.67rem;
  // padding: 0.45rem;
  p {
    margin-top: 0;
  }
}
.othersTitle {
  width: 100%;
  height: 1.19rem;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin: 0;
  font-size: 0.4rem;
  font-weight: bold;
  color: rgba(121, 121, 121, 1);
  line-height: 1.19rem;
  i {
    display: inline-block;
    vertical-align: middle;
    width: 0.16rem;
    height: 0.16rem;
    background: #008cee;
    border-radius: 50%;
    margin: 0 10px;
  }
}


</style>

<style >
.needBuyInfo .contentInfo table {
   width: 100%;
   padding: .27rem;
 }
.needBuyInfo .contentInfo tr {
  text-align: left;
}
.needBuyInfo .contentInfo tr td {
  word-break: break-all;
}
</style>
