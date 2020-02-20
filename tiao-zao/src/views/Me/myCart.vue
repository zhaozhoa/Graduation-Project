<template>
  <div class="MyCart">
    <div class="itemWapper">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :offset="offset"
        @load="getData"
      >
        <van-checkbox-group v-model="result" ref="checkboxGroup">
          <div class="item" v-for="item in Data" :key="item.GOODS_ID">
            <van-checkbox :name="item.GOODS_ID"></van-checkbox>
            <div class="itemInfo" @click="Datail(item.GOODS_ID)">
              <van-image
                :src="item.IMAGE_PATH"
                width="2.85rem"
                height="2.85rem"
                fit="cover"
                class="avatarImg"
              >
                <template v-slot:error>暂无图片</template>
              </van-image>
              <div class="priceWapper">
                <p class="title">{{item.GOODS_NAME}}</p>
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
              </div>
            </div>
          </div>
        </van-checkbox-group>
      </van-list>
    </div>
    <div class="allchecked">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
      <van-button type="danger" @click="dele">删除</van-button>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from "qs";
import { Checkbox, CheckboxGroup, Image, Button, Icon, List } from "vant";
export default {
  name: "MyCart",
  data() {
    return {
      result: [],
      checked: false,
      data: [],
      loading: true,
      finished: false,
      currentPage: 1,
      showCount: 10,
      offset: 30
    };
  },

  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox,
    [Button.name]: Button,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [List.name]: List
  },

  computed: {
    isAllCheck() {
      return this.checked;
    },
    Data() {
      return this.data;
    },
    // resultChange () {
    //   if (this.result.length === this.data.length) {
    //      this.checked = true
    //      return this.checked
    //   }
    // }
  },

  mounted() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl+"/miniProIndex/listShoppingCar",
          qs.stringify({
            // this.$ls.get('user').USER_ID
            // "b5013c29ea594a03a7c89a9187b0906a"
            ENTERPRISE_ID: this.$ls.get('user').USER_ID,
            currentPage: this.currentPage,
            showCount: this.showCount
          })
        );
        res.data.forEach(ele => {
        if (ele.hasOwnProperty("IMAGE_PATH")) {
          if (ele.IMAGE_PATH.includes("@;@")) {
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
      } catch (error) {}
    },
    async dele() {
      let { data: res } = await this.axios.post(
        this.httpurl+"//miniProIndex/delProductFromShoppingCar",
        qs.stringify({
          GOODS_IDS: this.result.join(),
          ENTERPRISE_ID: this.$ls.get('user').USER_ID
        })
      );
      if (res.code === "0") {
        for (let i = 0; i < this.data.length; ++i) {
          const ele = this.data[i];
          for (let j = 0; j < this.result.length; ++j) {
            const ele2 = this.result[j];
            if (ele.GOODS_ID === ele2) {
              this.data.splice(i,1)
              i--
              break
            }
          }
        }
        this.$toast.success("删除成功");

      } else {
        this.$toast.fail("删除失败");
      }
    },
    checkAll() {
      this.$refs.checkboxGroup.toggleAll(!this.isAllCheck);
    },
    Datail(GoodsId) {
     this.$router.push({ name: "productDetail", params: {GoodsId} });
    }
  },
  // watch: {

  // }
};
</script>
<style lang='less' scoped>
.MyCart {
  padding: 0.27rem;
  font-size: 0.35rem;
  box-sizing: border-box;
}
.itemWapper {
  border-bottom: 3px solid #f2f2f2;
  margin-bottom: 3rem;
}
.item {
  height: 3.64rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  .van-checkbox {
    width: .60rem;  
  }
  .itemInfo {
    height: 2.85rem;
    width: 9rem;
    margin-left: 10px;
    display: flex;
    div.priceWapper {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
    }
    p {
      margin: 0;
      padding-left: 0.3rem;
    }
    p:nth-child(2) {
      color: red;
    }
  }
}
.allchecked {
  box-sizing: border-box;
  display: flex;
  bottom: 1.3rem;
  position: fixed;
  background: #fff;
  width: 95%;
  justify-content: space-between;
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
    padding-left: .3rem;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
