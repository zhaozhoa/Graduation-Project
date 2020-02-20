<template>
  <div class="productDetail">
    <van-swipe :autoplay="3000" indicator-color="white" class="swiper" v-if="picIsArr">
      <van-swipe-item v-for="(item,index) in picBox" :key="index">
        <van-image :src="item" width="100%" height="10rem" fit="cover" class="swiperImg">
          <template v-slot:error>暂无图片</template>
        </van-image>
      </van-swipe-item>
    </van-swipe>
    <van-image
      :src="picBox"
      width="100%"
      height="10rem"
      fit="cover"
      class="swiperImg"
      v-else-if="!picIsArr"
    >
      <template v-slot:error>暂无图片</template>
    </van-image>
    <div class="name">
      <div class="titleWapper">
        <div class="title">{{this.goods.GOODS_NAME}}</div>
        <div class="num">
          <van-icon name="goods-collect" size="15" class="icon" />
          <span>供货总量：{{this.goods.SUPPLY_QUANTITY}}</span>
        </div>
      </div>
      <div class="local">
        <van-icon name="map-marked" size="15" class="icon" />
        产地：{{this.goods.ORIGIN_PLACE}}
      </div>
      <div class="deliveryTime">
        <van-icon name="underway" size="15" class="icon" />
        {{this.goods.DELIVERY_DATE == 0 ? '发货期：自买家付款之日起7天内发货' : '发货期：自买家付款之日起30天内发货'}}
      </div>
    </div>

    <div class="price" v-if="this.goods.PRICE_TYPE == 2 ? true : false">
      <div class="priceTitle">
        <van-icon name="gold-coin" class="icon" size="15" />
        <span>价格</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>订货量（件）</th>
            <th>价格（元/件）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in (this.price1)" :key="item.GOODS_PARAM_ID">
            <td>{{item.START_NUM}}-{{item.END_NUM}}</td>
            <td>{{item.PRICE}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="price" v-if="this.goods.PRICE_TYPE == 1 ? true : false">
      <div class="priceTitle">
        <van-icon name="gold-coin" class="icon" size="15" />
        <span>价格 {{this.goods.FIXED_PRICE}}</span>
      </div>
    </div>
    <div class="price" v-if="this.goods.PRICE_TYPE == 0 ? true : false">
      <div class="priceTitle">
        <van-icon name="gold-coin" class="icon" size="15" />
        <span>价格面议</span>
      </div>
    </div>

    <div class="banner" v-if="company">
      <van-image
        :src="httpurls + company.COMPANY_LOGO"
        width="1rem"
        height="1rem"
        fit="cover"
        class="swiperImg companyLogi"
      >
        <template v-slot:error>暂无图片</template>
      </van-image>
      <div class="companyName">{{this.company.COMPANY_NAME_ZH}}</div>
    </div>
    <div class="info">
      <p class="infoName">
        <span>参数说明</span>
      </p>
      <div class="desc">
        <div class="descItem" v-for="item in productDesc" :key="item.GOODS_PARAM_ID">
          <div class="descTitle">{{item.PARAM}}：</div>
          <div class="descInfo">{{item.VALUE}}</div>
        </div>
      </div>
    </div>
    <div class="details">
      <p class="detailTitle">详细介绍</p>
      <div v-html="this.goods.DETAILS"></div>

      <van-button type="primary" size="large" class="btn" @click="joinMyCart">加入购物车</van-button>
    </div>
    <TabBar></TabBar>
  </div>
</template>

<script>
import qs from "qs";
import { Swipe, SwipeItem, Image, Icon, Button, Dialog } from "vant";
export default {
  name: "productDetail",
  data() {
    return {
      GoodsId: "",
      // 存储商品信息
      goods: "",
      company: "",
      picBox: "",
      picIsArr: "",

      // 存放区间价格是商品
      price1: [],
      httpurls: this.httpurl,
      productDesc: []
    };
  },

  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Dialog.name]: Dialog
  },

  computed: {},

  mounted() {
    this.GoodsId = this.$route.params.GoodsId;
    this.getProduct();
  },

  methods: {
    async getProduct() {
      let { data: res } = await this.axios.post(
        this.httpurl + "/miniProIndex/getProductDetail",
        qs.stringify({
          GOODS_ID: this.GoodsId
        })
      );
      this.goods = res.goods;
      if (res.enterprise.length !== 0) {
        
        this.company = res.enterprise[0];
        if (!this.company.COMPANY_LOGO) {
          this.company.COMPANY_LOGO = ''
        }
      }
      let price = res.goodsParam;
      this.PriceClassification(price);

      if (res.goods.hasOwnProperty("IMAGE_PATH")) {
        if (res.goods.IMAGE_PATH.includes("@;@")) {
          this.picBox = res.goods.IMAGE_PATH.split("@;@");
          this.picBox = this.picBox.map(ele2 => this.httpurl + ele2);
          this.picIsArr = true;
        } else {
          this.picBox = this.httpurl + res.goods.IMAGE_PATH.split("@;@")[0];
          this.picIsArr = false;
        }
      }
    },
    PriceClassification(price) {
      for (let i = 0; i < price.length; i++) {
        const ele = price[i];
        if (ele.hasOwnProperty("START_NUM")) {
          this.price1.push(ele);
        } else {
          this.productDesc.push(ele);
        }
      }
    },
    async joinMyCart() {
      // 判断用户是否登录
      if (!this.$ls.get("user")) {
        Dialog.confirm({
          title: "温馨提示",
          message: "登录后才能加入购物车"
        })
          .then(() => {
            this.$router.push({
              name: "login"
            });
          })
          .catch(() => {
            return;
          });
      }else {

        try {
          let { data: res } = await this.axios.post(
            this.httpurl + "/miniProIndex/addShopingCart",
            qs.stringify({
              GOODS_ID: this.GoodsId,
              ENTERPRISE_ID: this.$ls.get("user").USER_ID
            })
          );
          if (res.code === "0") {
            this.$toast("加入成功");
          } else if (res.code === "2") {
            this.$toast.fail("购物车已存在该产品，请勿重复添加");
          }
        } catch (e) {
          this.$toast.fail("加入失败");
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
@import "./productDetail.less";
</style>
