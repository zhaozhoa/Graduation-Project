<template>
  <div class="myProduct">
    <div class="productList">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="getData"
      >
        <div
          class="productItem"
          v-for="item in data"
          :key="item.GOODS_ID"
          @click="detail(item.GOODS_ID)"
        >
          <van-image
            :src="item.IMAGE_PATH"
            width="3.2rem"
            height="3.2rem"
            fit="cover"
            class="avatarImg"
          >
            <template v-slot:error>暂无图片</template>
          </van-image>
          <div class="info">
            <p>{{item.GOODS_NAME}}</p>
            <div class="price" v-if="item.PRICE_TYPE == 1 ? true : false">
              <div class="priceTitle">
                <van-icon name="gold-coin" class="icon" size="15" />
                <span>价格 {{item.FIXED_PRICE}}</span>
              </div>
            </div>
            <div class="price" v-if="item.PRICE_TYPE == 0 ? true : false">
              <div class="priceTitle">
                <van-icon name="gold-coin" class="icon" size="15" />
                <span>价格面议</span>
              </div>
            </div>
            <van-tag type="success" size="medium" v-if="item.STATE === '1'">已上架</van-tag>
            <van-tag type="primary" size="medium" v-else-if="item.STATE === '0'">待审核</van-tag>
            <van-tag type="danger" size="medium" v-else-if="item.STATE === '2'">审核不通过</van-tag>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from "qs";
import { Image, Tag, Icon, List } from "vant";
export default {
  name: "myProduct",
  data() {
    return {
      data: "",
      loading: false,
      finished: false,
      currentPage: 1,
      showCount: 10,
      offset: 30
    };
  },

  components: {
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Icon.name]: Icon,
    [List.name]: List
  },

  computed: {},

  mounted() {
    // this.getData();
  },

  methods: {
    async getData() {

      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/listMyProduct",
          qs.stringify({
            // this.$ls.get('user').USER_ID
            // "b5013c29ea594a03a7c89a9187b0906a"
            ENTERPRISE_ID: this.$ls.get('user').USER_ID,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        res.data.forEach(ele => {
          if (ele.hasOwnProperty('IMAGE_PATH')) {
            if ((ele.IMAGE_PATH).includes('@;@')) {
              ele.IMAGE_PATH = this.httpurl + ele.IMAGE_PATH.split("@;@")[0];
            } else {
              ele.IMAGE_PATH = this.httpurl + ele.IMAGE_PATH
            }
          }
        });

        this.loading = false;
        this.data = [...this.data, ...res.data];

        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.currentPage++;
        }
      } catch (error) {
        console.log(error);
      }
    },

    // async getData() {
    //   let { data: res } = await this.axios.post(
    //     this.httpurl+"/miniProIndex/listMyProduct",
    //     qs.stringify({
    //       // this.$ls.get('user').USER_ID
    //       ENTERPRISE_ID: "b5013c29ea594a03a7c89a9187b0906a"
    //     })
    //   );
    // res.data.forEach(ele => {
    //   ele.IMAGE_PATH = this.httpurl+"/" + ele.IMAGE_PATH.split(";")[0];
    // });
    //   this.data = res.data;
    // },
    detail(GOODS_ID) {
      this.$router.push({
        name: "productDetail",
        params: { GoodsId: GOODS_ID }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.myProduct {
  background: #fff;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 0.27rem;
  padding-bottom: 1.5rem;
  .productItem {
    display: flex;
    align-items: center;
    width: 100%;
    height: 4.1rem;
    border-bottom: 1px solid #f0f0f0;
    .info {
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      width: 4rem;
      height: 3.2rem;
      margin-left: 0.64rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
      // flex-wrap: wrap;
      p {
        margin: 0;
      }
      p:nth-child(2) {
        color: #999;
        font-weight: 400;
      }
    }
  }
  .price {
    padding: 0.27rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.32rem;
    padding: 0;
    .priceTitle {
      display: flex;
      align-items: center;
      font-size: 0.35rem;
      color: #ff0000;
      .icon {
        margin-right: 5px;
      }
    }
  }
}
</style>
