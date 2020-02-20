<template>
  <div class="NegotiateSupply">
    <div class="signUp">
      <div class="title">
        <span class="require">*</span>
        对接洽谈报名：
      </div>
      <van-checkbox-group v-model="data.ACTIVITY_SESSION" class="checkBoxWapper">
        <van-checkbox
          :name="item"
          shape="square"
          class="checkBox"
          v-for="item in ACTIVITY_SESSION"
          :key="item"
        >{{item}}</van-checkbox>
      </van-checkbox-group>
    </div>
    <div class="productList">
      <div class="title">
        <span class="require">*</span>
        产品清单：
      </div>

      <van-field v-model="data.GOODS_LIST" autosize type="textarea" placeholder="请输入内容" />
    </div>
    <div class="productCategories">
      <div class="title">
        <span class="require">*</span>
        产品类别：
      </div>
      <div v-for="(item,index) in goodsTemplate" :key="index">
        <van-cell :title="item.name" size="large" />
        <van-checkbox-group v-model="data.GOODS_CATEGORY[index].types" class="checkBoxWapper">
          <van-checkbox :name="item2" shape="square" class="checkBox" v-for="item2 in item.types" :key="item2">{{item2}}</van-checkbox>
          
        </van-checkbox-group>
      </div>
    </div>

    <div class="pad-all mar-top">
      <van-button block type="primary" @click="submit">提交报名</van-button>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { Checkbox, CheckboxGroup, Field, Cell, CellGroup, Button } from "vant";
export default {
  name: "NegotiateSupply",
  data() {
    return {
      // 备份对接洽谈报名
      ACTIVITY_SESSION: [],
      data: "",
     goodsTemplate: ''
    };
  },

  components: {
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,

    [Field.name]: Field,
    [Button.name]: Button
  },

  computed: {
    tempObject() {
      return this.$store.state.tempObject;
    }
  },

  mounted() {
    this.getData()
    
  },

  methods: {
    // 获取表单模板
    async template() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl + "/template/get",
          qs.stringify({
            TEMPLATE_ID: this.$ls.get('Exhibition').TEMPLATE_ID
          })
        );

        res.data.GOODS_CATEGORY = JSON.parse(res.data.GOODS_CATEGORY);
        this.goodsTemplate = res.data.GOODS_CATEGORY

        this.goodsTemplate.forEach(ele => {
          ele.types = [...ele.types, ...ele.zdTypes].map(e => e.value)
        });
        
        
      } catch (error) {
        console.log(error);
      }
    },
    // 获取用户保存的数据
    async getData() {
      try {
        let { data: res } = await this.axios.post(
          this.httpurl + "/exhibitor/get",
          qs.stringify({
            TRADE_ID: this.tempObject.TRADE_ID,
            TRADE_TYPE: 1,
            TYPE: 0
          })
        );
        res.data.ACTIVITY_SESSION = res.data.ACTIVITY_SESSION.split(",");
        this.ACTIVITY_SESSION = this.$ls.get('Exhibition').ACTIVITY_SESSION.split(',')
        res.data.GOODS_CATEGORY = JSON.parse(res.data.GOODS_CATEGORY);
        this.data = res.data;
        this.template();
      } catch (error) {
        console.log(error);
      }
    },
    
    async submit() {
      // 备份
      let data2 = JSON.parse(JSON.stringify(this.data))

      data2.GOODS_CATEGORY = JSON.stringify(this.data.GOODS_CATEGORY)
      if (data2.ACTIVITY_SESSION.length > 0) {
        data2.ACTIVITY_SESSION = this.data.ACTIVITY_SESSION.join(',')
      } else {
        data2.ACTIVITY_SESSION = ''
      }

      data2.UPDATE_DATE = ''
      data2.CREATE_DATE = ''
      data2.AUDIT_DATE = ''
      // 必填校验
      if (this.data.ACTIVITY_SESSION.length ==0 || this.data.GOODS_LIST === '') {
        this.$toast('*为必填项')
        return
      }


      const isNULL = (obj) => obj.types.length === 0

      if(this.data.GOODS_CATEGORY.every(isNULL)) {
        this.$toast('*为必填项')
        return
      }
      
      let isCheck = this.data.EXHIBITORS_ID === '' ? 'insert' : 'update'
      try {
        let {data: res} = await this.axios.post(this.httpurl + `/exhibitor/${isCheck}`, qs.stringify(data2))
        if (res.code === '0') {
          this.$toast.success('提交成功')
          setTimeout(() => {
            this.$router.push({
              name: 'exhibitionDetails'
            })
          }, 1000);
        }
      } catch (err) {
        console.log(err);
        
      }
      
    }
  }
};
</script>

<style lang='less' scoped>
.NegotiateSupply {
  padding: 0.27rem;
  background: #fff;
  color: #323233;
  font-size: 0.37333rem;
}
.signUp {
  margin-top: 10px;
}
.title {
  .require {
    color: #f25624;
  }
}
.checkBoxWapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  .checkBox {
    margin: 5px 0;
    margin-left: 15px;
    height: 30px;
    // margin-right: 1.5rem;
    // width: 100%;
    min-width: 45%;
    float: left;
  }
}
.btn {
  display: block;
  margin: 10px auto;
  width: 5rem;
}
.van-cell__title {
  font-size: 0.37333rem;
}
</style>
