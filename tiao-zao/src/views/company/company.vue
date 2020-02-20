<template>
  <div class="Company">
    <CompanySwiper></CompanySwiper>
    <div class="title">
      <van-icon name="fire" color="#ff9376" size="0.4rem" class="icon-fire" />
      <span>产品信息</span>
    </div>
    <div class="product">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有数据了"
        :offset="offset"
        :immediate-check="false"
        @load="onload"
        class="vlist"
      >
        <div class="productWapper" v-for="item in company" :key="item.GOODS_ID" @click="toProductDetails(item.GOODS_ID)">
          <i>
            <img :src="httpurls+item.IMAGE_PATH.split('@;@')[0]" alt />
          </i>
          <p>{{item.GOODS_NAME}}</p>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import CompanySwiper from "@/components/campany/campanySwiper";
import { Icon, List } from "vant";
export default {
  name: "",
  data() {
    return {
      company: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 6,
      offset: 30,
      httpurls:this.httpurl
    };
  },

  components: {
    CompanySwiper,
    [Icon.name]: Icon,
    [List.name]: List
  },

  computed: {
    companyData() {
      return this.$store.state.companyData;
    }
  },

  async mounted() {
    this.onload();
  },

  methods: {
    async onload() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/getEnterpriseIndex",
          qs.stringify({
            ENTERPRISE_ID: this.$store.state.companyData.ENTERPRISE_ID,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        // res.data.IMAGE_PATH.map(ele => ele.)
        // debugger
        // res.data.forEach(ele => {
        //   if (ele.IMAGE_PATH.includes("@;@")) {
        //     ele.IMAGE_PATH = ele.IMAGE_PATH.split("@;@");
        //     ele.IMAGE_PATH = ele.IMAGE_PATH.map(ele2 => this.httpurl + ele2);
        //   } else {
        //     ele.IMAGE_PATH = this.httpurl + ele.IMAGE_PATH
        //   }
        // });
        
        this.loading = false;
        this.company = [...this.company, ...res.data];
        if (this.currentPage >= res.page.totalPage) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        this.$toast("网络异常" );
      }
    },
    toProductDetails(GoodsId) {
      this.$router.push({ name: "productDetail", params: {GoodsId} });
    },
  }
};
</script>
<style lang='less' scoped>
.Company {
  background: #f0f0f0;
  margin: 0.27rem;
  margin-bottom: 1.5rem;
  .title {
    width: 100%;
    height: 1.13rem;
    background: #fff;
    text-align: center;
    line-height: 1.13rem;
    font-size: 0.35rem;
    margin: 0.12rem 0;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    .icon-fire {
      margin-right: 0.12rem;
      top: 2px;
    }
  }
  .product {
    width: 100%;
    // background: #fff;
    margin-top: 0.27rem;

    .vlist {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
    }
    .productWapper {
      width: 4.6rem;
      height: 5.3rem;
      margin-bottom: 0.27rem;
      background: #fff;
      i {
        display: block;
        width: 4.6rem;
        height: 4.13rem;
        overflow: hidden;
        position: relative;
        float: left;

        img {
          display: block;
          width: 100%;
          min-width: 4.13rem;
        }
      }
      p {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        height: 1.2rem;
        text-align: center;
        line-height: 1.2rem;
        font-size: 0.37rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        margin: 0;
      }
    }
  }
}
</style>
