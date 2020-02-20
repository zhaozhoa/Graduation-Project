<template>
  <div class="exhibitorEnroll">
    <van-cell-group>
      <van-field
        v-model="CONTACTS"
        required
        label="联系人姓名"
        placeholder="请输入联系人姓名"
        :error-message="CONTACTSTips"
        @blur="check('0')"
      />
      <van-field
        v-model="POSITION"
        required
        label="职位"
        placeholder="请输入职位"
        :error-message="POSITIONTips"
        @blur="check('1')"
      />
      <van-field v-model="TELEPHONE" label="电话" placeholder="请输入电话" type="number" />
      <van-field
        v-model="MOBILE"
        required
        label="手机"
        placeholder="请输入手机"
        :error-message="MOBILETips"
        @blur="check('2')"
      />
      <van-field v-model="FAX" label="传真" placeholder="请输入传真" error-message />
      <van-field v-model="PERSON_NUM" label="参展人数" placeholder="请输入参展人数" type="number" />
      <van-field
        v-model="BOOTH_NUM"
        required
        label="拟申情展位"
        placeholder="请输入拟申情展位"
        center
        type="number"
        :error-message="BOOTH_NUMTips"
        @blur="check('3')"
      >
        <van-button slot="button" size="small" type="default" class="btnIcon">个</van-button>
      </van-field>
      <van-field v-model="DISPLAY_CONTENT" label="展出内容" placeholder="请输入展出内容" />
      <van-cell title="产品清单：" required clearable value />
      <van-field
        v-model="GOODS_LIST"
        autosize
        type="textarea"
        border
        placeholder="请输入产品清单"
        :error-message="GOODS_LISTTips"
        @blur="check('4')"
      />
      <div class="productCategories">
        <div class="title">
          <!-- <span class="require">*</span> -->
          产品类别：
        </div>

        <div>
          <van-cell :title="GOODS_CATEGORY[0].name" size="large" />
          <van-checkbox-group v-model="GOODS_CATEGORY[0].types" class="checkBoxWapper">
            <van-checkbox name="各类食品" shape="square" class="checkBox">各类食品</van-checkbox>
            <van-checkbox name="饮料" shape="square" class="checkBox">饮料</van-checkbox>
            <van-checkbox name="烟酒" shape="square" class="checkBox">烟酒</van-checkbox>
            <van-checkbox name="电力电工设备" shape="square" class="checkBox">电力电工设备</van-checkbox>
            <van-checkbox name="日化用品" shape="square" class="checkBox">日化用品</van-checkbox>
            <van-checkbox name="日用品" shape="square" class="checkBox">日用品</van-checkbox>
            <van-checkbox name="重型机械" shape="square" class="checkBox">重型机械</van-checkbox>
            <van-checkbox name="床上用品" shape="square" class="checkBox">床上用品</van-checkbox>
            <van-checkbox name="户外运动用品" shape="square" class="checkBox">户外运动用品</van-checkbox>
            <van-checkbox name="服装面料及辅料" shape="square" class="checkBox">服装面料及辅料</van-checkbox>
            <van-checkbox name="工程机械" shape="square" class="checkBox">工程机械</van-checkbox>
            <van-checkbox name="工业自动化仪器仪表" shape="square" class="checkBox">工业自动化仪器仪表</van-checkbox>
            <van-checkbox name="冶金有色产品" shape="square" class="checkBox">冶金有色产品</van-checkbox>
          </van-checkbox-group>
        </div>

        <div>
          <van-cell :title="GOODS_CATEGORY[1].name" size="large" />
          <van-checkbox-group v-model="GOODS_CATEGORY[1].types" class="checkBoxWapper">
            <van-checkbox name="国家馆的形式展示各国特色商品" shape="square" class="checkBox">国家馆的形式展示各国特色商品</van-checkbox>
            <van-checkbox name="特色食品及饮料" shape="square" class="checkBox">特色食品及饮料</van-checkbox>
            <van-checkbox name="生活消费品" shape="square" class="checkBox">生活消费品</van-checkbox>
          </van-checkbox-group>
        </div>

        <div>
          <van-cell :title="GOODS_CATEGORY[2].name" size="large" />
          <van-checkbox-group v-model="GOODS_CATEGORY[2].types" class="checkBoxWapper">
            <van-checkbox name="电子信息" shape="square" class="checkBox">电子信息</van-checkbox>
            <van-checkbox name="实验室设备技术" shape="square" class="checkBox">实验室设备技术</van-checkbox>
            <van-checkbox name="智能生活用品" shape="square" class="checkBox">智能生活用品</van-checkbox>
            <van-checkbox name="VR概念设备" shape="square" class="checkBox">VR概念设备</van-checkbox>
            <van-checkbox name="新材料、新技术产品" shape="square" class="checkBox">新材料、新技术产品</van-checkbox>
            <van-checkbox name="节能环保产品" shape="square" class="checkBox">节能环保产品</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>

      <van-field v-model="QUALIFICATION" label="资质认证" placeholder="请输入资质认证信息" error-message />

      <van-cell title="产品图片:" size="large" />
      <van-uploader
        v-model="fileList"
        :max-count="3"
        :before-read="beforeRead"
        :after-read="afterRead"
        @delete="delete1"
        class="upload"
      />

      <van-cell title="企业宣传图片:" size="large" />
      <van-uploader
        v-model="fileList2"
        :max-count="3"
        :before-read="beforeRead"
        :after-read="afterRead2"
        @delete="delete2"
        class="upload"
      />
    </van-cell-group>

    <div class="pad-all mar-top">
      <van-button block type="primary" @click="submit">提交报名</van-button>
    </div>
  </div>
</template>

<script>
import {
  Tag,
  Image,
  Icon,
  List,
  Field,
  CellGroup,
  Cell,
  Button,
  Toast,
  Checkbox,
  CheckboxGroup,
  Uploader
} from "vant";
import qs from "qs";
export default {
  name: "exhibitorEnroll",
  data() {
    return {
      // 姓名
      CONTACTS: "",
      CONTACTSTips: "",
      // 职位
      POSITION: "",
      POSITIONTips: "",
      // 传真
      FAX: "",
      // 手机
      MOBILE: "",
      MOBILETips: "",
      // 电话
      TELEPHONE: "",
      // 参展人数
      PERSON_NUM: "",
      // 展位
      BOOTH_NUM: "",
      BOOTH_NUMTips: "",
      // 展出内容
      DISPLAY_CONTENT: "",
      // 清单列表
      GOODS_LIST: "",
      GOODS_LISTTips: "",
      // 资质认证
      QUALIFICATION: "",
      // 返回的产品类别
      categoriesData: [],
      GOODS_CATEGORY: [
        {
          name: "陕西名优产品展区",
          types: []
        },
        {
          name: "进出口消费品展区",
          types: []
        },
        {
          name: "电子信息产业展区",
          types: []
        }
      ],
      // 最终上传产品图片
      GOODS_PICTURE: [],
      // 企业宣传图
      PUBLICITY_PICTURE: [],
      // 参展企业id
      EXHIBITORS_ID: '',

      // 预览图片的数组
      fileList: [],
      fileList2: [],
      copyfileList: [],
      copyfileList2: []
    };
  },

  components: {
    [Tag.name]: Tag,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [List.name]: List,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: Cell,
    [Checkbox.name]: Checkbox,
    [CheckboxGroup.name]: CheckboxGroup,
    [Uploader.name]: Uploader
  },

  computed: {
    tempObject() {
      return this.$store.state.tempObject;
    }
  },

  async mounted() {
    let { data: res } = await this.axios.post(
      this.httpurl + "exhibitor/get",
      qs.stringify({
        TRADE_ID: this.tempObject.TRADE_ID,
        TRADE_TYPE: 0
      })
    );
    this.CONTACTS = res.data.CONTACTS;
    this.TELEPHONE = res.data.TELEPHONE;
    this.GOODS_LIST = res.data.GOODS_LIST;
    this.PERSON_NUM = res.data.PERSON_NUM;
    this.POSITION = res.data.POSITION;
    this.DISPLAY_CONTENT = res.data.DISPLAY_CONTENT;
    this.DISPLAY_CONTENT = res.data.DISPLAY_CONTENT;
    this.BOOTH_NUM = res.data.BOOTH_NUM;
    this.FAX = res.data.FAX;
    this.MOBILE = res.data.MOBILE;
    this.PERSON_NUM = res.data.PERSON_NUM;
    this.QUALIFICATION = res.data.QUALIFICATION;
    this.EXHIBITORS_ID = res.data.EXHIBITORS_ID

    this.categoriesData = JSON.parse(res.data.GOODS_CATEGORY);
    this.GOODS_CATEGORY[0].types = this.categoriesData[0].types;
    this.GOODS_CATEGORY[1].types = this.categoriesData[1].types;
    this.GOODS_CATEGORY[2].types = this.categoriesData[2].types;

    if (res.data.GOODS_PICTURE) {
      this.GOODS_PICTURE =  res.data.GOODS_PICTURE.split('@;@')
      this.fileList = res.data.GOODS_PICTURE.split('@;@').map(ele => {
        let obj = {}
        obj.url = this.httpurl + ele
        return obj
      })
    }

    if (res.data.PUBLICITY_PICTURE) {
      this.PUBLICITY_PICTURE = res.data.PUBLICITY_PICTURE.split('@;@')
      this.fileList2 = res.data.PUBLICITY_PICTURE.split('@;@').map(ele => {
        let obj = {}
        obj.url = this.httpurl + ele
        return obj
      })
    }

    
  },

  methods: {
    check(index) {
      let index2 = parseInt(index);
      let typeArr = [
        "CONTACTS",
        "POSITION",
        "MOBILE",
        "BOOTH_NUM",
        "GOODS_LIST"
      ];
      let tipsArr = [
        "CONTACTSTips",
        "POSITIONTips",
        "MOBILETips",
        "BOOTH_NUMTips",
        "GOODS_LISTTips"
      ];
      if (!this[typeArr[index2]]) {
        this[tipsArr[index2]] = "此项不能为空";
        return;
      } else {
        this[tipsArr[index2]] = "";
      }

      if (index === "2") {
        if (!/^1[3456789]\d{9}$/.test(this.MOBILE)) {
          this[tipsArr[index2]] = "输入的手机号码格式有误";
          return;
        } else {
          this[tipsArr[index2]] = "";
        }
      }
    },
    beforeRead(file) {
      if (!file.type.includes("image")) {
        Toast("只能上传图片");
        return false;
      }
      if (file.size > 1048576) {
        Toast("上传内容不能超过1M");
        return false;
      }

      return true;
    },

    upLoaderImg(file) {
      //file为 你读取成功的回调文件信息
      //new 一个FormData格式的参数
      let params = new FormData();
      params.append("file", file);
      let config = {
        headers: {
          //添加请求头
          "Content-Type": "multipart/form-data"
        }
      };

      return new Promise((resolve, reject) => {
        //把 uploadUrl 换成自己的 上传路径
        this.axios
          .post(this.httpurl + "file/upload", params, config)
          .then(res => {
            if (res && res.data) {
              resolve(res.data);
            } else {
              Toast.fail(res.data && res.data.msg);
              reject(res.data);
            }
          })
          .catch(err => {
            Toast.fail("系统异常");
            reject(err);
          });
      });
    },

    async afterRead(file) {
      try {
        let { data: res } = await this.upLoaderImg(file.file);
        this.GOODS_PICTURE.push(res);
        // 克隆数组
        this.copyfileList = JSON.parse(JSON.stringify(this.fileList));
      } catch (e) {
        console.log(e);

        this.$toast("上传失败，请稍后重新上传");
      }
    },

    async afterRead2(file) {
      try {
        let { data: res } = await this.upLoaderImg(file.file);
        this.PUBLICITY_PICTURE.push(res);
        this.copyfileList2 = JSON.parse(JSON.stringify(this.fileList2));
      } catch (e) {
        this.$toast("上传失败，请稍后重新上传");
      }
    },

    delete1(file) {
      for (let i = 0; i < this.copyfileList.length; i++) {
        const ele = this.copyfileList[i];
        if (file.name === this.copyfileList[i].name ) {
          this.GOODS_PICTURE.splice(i, 1);
          this.copyfileList = JSON.parse(JSON.stringify(this.fileList));
        }
      }
      for (let i = 0; i < this.GOODS_PICTURE.length; i++) {
        const ele = this.GOODS_PICTURE[i];
        if (file.hasOwnProperty('url')) {
          if (file.url.includes(ele)) {
            this.GOODS_PICTURE.splice(i, 1);
          }
        }
      }
    },
    delete2(file) {
      for (let i = 0; i < this.copyfileList2.length; i++) {
        const ele = this.copyfileList2[i];
        if (file.name === this.copyfileList2[i].name) {
          this.PUBLICITY_PICTURE.splice(i, 1);
          this.copyfileList2 = JSON.parse(JSON.stringify(this.fileList2));
        }
      }
      for (let i = 0; i < this.PUBLICITY_PICTURE.length; i++) {
        if (file.hasOwnProperty('url')) {
          if (file.url.includes(this.PUBLICITY_PICTURE[i])) {
            this.PUBLICITY_PICTURE.splice(i, 1);
          }
        }
      }
    },

    async submit() {
      let typeArr = [
        "CONTACTS",
        "POSITION",
        "MOBILE",
        "BOOTH_NUM",
        "GOODS_LIST"
      ];
      let tipsArr = [
        "CONTACTSTips",
        "POSITIONTips",
        "MOBILETips",
        "BOOTH_NUMTips",
        "GOODS_LISTTips"
      ];
      for (let index = 0; index < typeArr.length; index++) {
        const ele = typeArr[index];
        const ele2 = tipsArr[index];
        if (this[ele] === "") {
          this.$toast("*为必填项");
          return;
        }
        if (this[ele2] !== "") {
          return;
        }
      }

      if (this.GOODS_PICTURE.length !== 0) {
        if (Array.isArray(this.GOODS_PICTURE)) {
          this.GOODS_PICTURE = this.GOODS_PICTURE.join('@;@')
        }
      } else {
        this.GOODS_PICTURE = ''
      }

      if (this.PUBLICITY_PICTURE.length !== 0) {
        if (Array.isArray(this.PUBLICITY_PICTURE)) {
          this.PUBLICITY_PICTURE = this.PUBLICITY_PICTURE.join('@;@')
        }
      } else {
        this.PUBLICITY_PICTURE = ''
      }

      let params = {
        CONTACTS: this.CONTACTS,
        POSITION: this.POSITION,
        FAX: this.FAX,
        MOBILE: this.MOBILE,
        TELEPHONE: this.TELEPHONE,
        PERSON_NUM: this.PERSON_NUM,
        BOOTH_NUM: this.BOOTH_NUM,
        DISPLAY_CONTENT: this.DISPLAY_CONTENT,
        GOODS_LIST: this.GOODS_LIST,
        QUALIFICATION: this.QUALIFICATION,
        GOODS_CATEGORY: JSON.stringify(this.GOODS_CATEGORY),

        GOODS_PICTURE: this.GOODS_PICTURE,
        // 企业宣传图
        PUBLICITY_PICTURE: this.PUBLICITY_PICTURE,
        EXHIBITORS_ID : this.EXHIBITORS_ID,
        TRADE_ID: this.tempObject.TRADE_ID

      };
      try {
        let isChange = this.EXHIBITORS_ID == '' ? 'insert' : 'update'
        let {data: res} = await this.axios.post(this.httpurl + `exhibitor/${isChange}`, qs.stringify(params))
        if (res.code === '0') {
          this.$toast.success('提交成功')
          setTimeout(() => {
            this.$router.push({
              name: 'exhibitionDetails'
            })
          }, 1000);
        }
      } catch (e) {
        console.log(e);
        
      }
    }
  }
};
</script>
<style lang='less' scoped>
.exhibitorEnroll {
  background: #fff;
  color: #323233;
  font-size: 0.37333rem;
}
.title {
  .require {
    color: #f25624;
  }
}
.checkBoxWapper {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
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
.upload {
  margin-top: 5px;
  margin-left: 15px;
}
.van-cell__title {
  font-size: 0.37333rem;
}
</style>
