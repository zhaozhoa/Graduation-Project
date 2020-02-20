<template>
  <div class="productList">
    <van-search
      v-model="keyWord"
      placeholder="请输入搜索关键词"
      shape="round"
      background="rgba(0,0,0,0)"
      class="search"
      @search="onSearch2"
    />
    <div class="container">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="onSearch"
      >
        <div
          v-for="item in searchData"
          :key="item.GOODS_ID"
          class="searchItem"
          @click="toProductDetails(item.GOODS_ID)"
        >
          <van-image
            :src="httpurl+'/'+ (item.IMAGE_PATH).split('@;@')[0]"
            width="3.2rem"
            height="3.28rem"
            fit="cover"
          >
            <template v-slot:error>
              暂无图片
            </template>
          </van-image>

          <div class="productInfo">
            <p class="title">
              {{ item.GOODS_NAME }}
            </p>
            <p class="local">
              <span>所在地：</span>
              <span>{{ item.ADDRESS_ZH }}</span>
            </p>
            <p class="num">
              <span>总量：</span>
              <span>{{ item.SUPPLY_QUANTITY }}</span>
            </p>
            <div
              v-if="item.PRICE.indexOf('[') === -1"
              class="price"
            >
              <van-icon
                name="gold-coin"
                class="icon"
              />
              <span>{{ item.PRICE }}</span>
            </div>
            <div
              v-else-if="item.PRICE.indexOf('[') !== -1"
              class="price"
            >
              <van-icon
                v-show="!tableShow"
                name="gold-coin"
                class="icon"
              />
              <div v-show="!tableShow">
                <span>{{ item.PRICE.split(',')[0].split(']')[1] }}</span>
                <van-tag
                  color="#ffe1e1"
                  text-color="#ad0000"
                  class="more"
                  @click="tableShow = !tableShow"
                >
                  更多
                </van-tag>
              </div>
              <div>
                <table v-show="tableShow">
                  <tbody>
                    <tr
                      v-for="(item2, index) in item.PRICE.split(',')"
                      :key="index"
                    >
                      <td>{{ item2.split(']')[0].split(' ')[0].replace('[','') }}-{{ item2.split(']')[0].split(' ')[1] }}件</td>
                      <td>￥{{ item2.split(']')[1] }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>
    <TabBar />
  </div>
</template>

<script>
import qs from "qs";
import { Search, Image, List, Icon, Tag } from "vant";
export default {
  name: "ProductList",

  components: {
    [Search.name]: Search,
    [Image.name]: Image,
    [List.name]: List,
    [Icon.name]: Icon,
    [Tag.name]: Tag
  },
  data() {
    return {
      keyWord: "",
      searchData: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 10,
      offset: 30,
      tableShow: true,
      httpurl:this.httpurl
    };
  },

  computed: {
    keyWords() {
      return this.$store.state.keyWords;
    }
  },

  mounted() {
    this.keyWord = this.$route.params.keyWord || this.$store.state.keyWords;
    this.$store.commit("changeKeyWords", this.keyWord);
    this.onSearch();
  },

  methods: {
    async onSearch() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/searchProduct",
          qs.stringify({
            LIKENAME: this.keyWords,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        this.loading = false;
        this.searchData = [...this.searchData, ...res.data];
        if (this.currentPage >= Math.ceil(res.total / this.showCount)) {
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
    onSearch2() {
      this.$store.commit("changeKeyWords", this.keyWord);
      this.searchData = [];
      this.currentPage = 1;
      this.loading = true;
      this.finished = false;
      this.onSearch();
    },
  }
};
</script>
<style lang='less' scoped>
.productList {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.search {
  position: fixed;
  top: 0.21rem;
  width: 8.61rem;
  left: 0.69rem;
  z-index: 100;
}
.container {
  margin: 2rem 0 1.5rem 0;
  .searchItem {
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    // align-items: center;
    width: 100%;
    // height: 3.87rem;
    padding: 0.27rem;
    border-bottom: 1px solid #f0f0f0;
    .icon {
      margin-right: 5px;
    }
    .productInfo {
      margin-left: 0.65rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;
      p {
        font-size: 0.37rem;
        color: rgba(153, 153, 153, 1);
        margin-top: 0.17rem;
        margin-bottom: 0;
      }
      .title {
        font-weight: 600;
        color: #333;
      }
      .price {
        margin-top: 0.17rem;
        font-size: 0.37rem;
        display: flex;
        align-items: center;
        color: #ff0000;
        .more {
          margin-left: 100px;
        }
      }
    }
  }
  table {
    width: 3.77rem;
    background: #f7f7f7;
    td,
    th {
      text-align: left;
    }
    thead {
      background: rgba(255, 246, 246, 1);
    }
    tr > td:nth-child(1) {
      color: rgba(153, 153, 153, 1);
    }
    tr > td:nth-child(2) {
      color: #ff0000;
    }
  }
}
</style>
