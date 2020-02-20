<template>
  <div class="productShow">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      background="rgba(0,0,0,0)"
      class="search"
      @search="onSearch"
    />

    <van-tabs
      v-model="activeId"
      class="tabTop"
      :ellipsis="false"
      title-active-color="#3195FF"
      color="#3195FF"
      @click="onClick"
    >
      <van-tab
        v-for="item in categories"
        :key="item.categoryId"
        :title="item.categoryName "
        :name="item.categoryId"
      />
    </van-tabs>

    <div class="product">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有数据了 "
        :offset="offset"
        :immediate-check="false"
        class="vlist"
        @load="getProductData"
      >
        <div
          v-for="item in productData"
          :key="item.GOODS_ID"
          class="productWapper"
          @click="toProductDetails(item.GOODS_ID)"
        >
          <i class="proImg">
            <img
              :src="item.IMAGE_PATH"
              alt
            >
          </i>
          <p>{{ item.GOODS_NAME }}</p>
          <div class="price">
            <van-icon
              name="gold-coin"
              class="icon"
              size="15"
            />
            <span>{{ item.PRICE }}</span>
          </div>
        </div>
      </van-list>
    </div>

    <TabBar />
  </div>
</template>

<script>
import qs from "qs";
import { Search, Image, List, Icon, Tab, Tabs } from "vant";
export default {
  name: "ProductShow",

  components: {
    [Search.name]: Search,
    [Image.name]: Image,
    [List.name]: List,
    [Icon.name]: Icon,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      value: "",
      src: "",
      activeId: "",
      categories: [],
      productData: [],
      immediate: false,
      loading: false,
      finished: false,
      currentPage: 1,
      showCount: 10,
      offset: 30
    };
  },

  computed: {
    categoriesId() {
      return this.$store.state.categoriesId;
    }
  },

  mounted() {
    this.productData = [];
    this.getOneCategories();
    this.activeId = this.categoriesId;
  },

  methods: {
    onSearch() {
      this.$router.push({
        name: "productList",
        params: { keyWord: this.value }
      });
    },
    async getOneCategories() {
      let { data: res } = await this.$api.productsApi.getProductCategories({
          PARENT_ID: "00000000000000000000000000000000"
        }
      );
      this.categories = res.data;

      
      if (this.activeId === "") {
        this.$store.commit(
          "changeCategoriesId",
          this.categories[0].CATEGORY_ID
        );
      } else {
        this.$store.commit("changeCategoriesId", this.activeId);
      }
      this.getProductData();
    },
    onClick(id) {
      this.$store.commit("changeCategoriesId", id);
      this.productData = [];
      this.loading = true;
      this.finished = false;
      this.currentPage = 1;
      this.showCount = 10;
      this.offset = 30;
      this.getProductData();
    },
    async getProductData() {
      try {
        let { data: res } = await this.$api.productsApi.getCategoryProducts(
          {
            CATEGORY_ID: this.categoriesId,
            currentPage: this.currentPage,
            showCount: this.showCount
          }
        );
        res.data.forEach(ele => {
          if (ele.IMAGE_PATH.includes("@;@")) {
            ele.IMAGE_PATH = this.httpurl + ele.IMAGE_PATH.split("@;@")[0];
          }
        });
        this.loading = false;
        this.finished = true;
        this.productData = [...this.productData, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
          this.finished = true;
        } else {
          this.finished = false;

          this.currentPage++;
        }
        this.productData.forEach((item, index) => {
          if (item.IMAGE_PATH.indexOf("http:") == -1) {
            item.IMAGE_PATH = this.httpurl + item.IMAGE_PATH;
          }
        });
      } catch (error) {
        this.$toast("网络异常");
      }
    },
    toProductDetails(GoodsId) {
      this.$router.push({ name: "productDetail", params: { GoodsId } });
    }
  }
};
</script>
<style lang='less' scoped>
.productShow {
  // width: 100vw;
  // height: 100vh;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
}
.search {
  position: fixed;
  top: 0.21rem;
  width: 8.61rem;
  left: 0.69rem;
  z-index: 100;
}
.tabTop {
  margin-top: 1.8rem;
}
.product {
  width: 100%;
  // background: #fff;
  margin-top: 0.27rem;
  .productWapper {
    width: 4.6rem;
    height: 5.5rem;
    margin-bottom: 0.27rem;
    background: #fff;
    float: left;
    margin-left: 0.2rem;
    // border: 1px solid #000;
    &:nth-child(2n) {
      float: right;
      margin-right: 0.2rem;
    }
    i.proImg {
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
      height: 0.8rem;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.37rem;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      margin: 0;
    }
  }
}
.proImg {
  box-sizing: border-box;
  width: 4.13rem;
  height: 4.6rem;
  // padding: 0.27rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.price {
  color: red;
  margin: 0;
  font-size: 12px;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
}
</style>
