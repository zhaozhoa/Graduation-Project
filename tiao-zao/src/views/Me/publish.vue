<template>
  <div class="publish">
    <div class="title">
      发布消息
    </div>

    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="发布类型"
        placeholder="点击选择发布类型"
        :rules="[{required: true, message: '请选择发布类型'}]"
        @click="showPicker = true"
      />

      <van-popup
        v-model="showPicker"
        position="bottom"
      >
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-field
        v-model="username"
        name="用户名"
        label="标题"
        placeholder="请输入标题"
        :rules="[{ required: true, message: '请输入标题' }]"
      />

      <van-field
        v-model="message"
        rows="1"
        autosize
        name="description"
        label="详情描述"
        type="textarea"
        placeholder="请输入详情描述"
      />
      

      <van-field
        name="uploader"
        label="图片上传"
      >
        <template #input>
          <van-uploader
            v-model="uploader"
            :max-count="5"
            multiple
          />
        </template>
      </van-field>



      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="submit"
        >
          提交
        </van-button>
      </div>
    </van-form>
    <TabBar />
  </div>
</template>

<script>
import { Form, Field, Button, Picker, Popup, Uploader  } from "vant";

export default {
  name: 'Publish',

  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [Button.name]: Button,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Uploader.name]: Uploader,
  },
  data () {
    return {
      username: '',
      value: '',
      columns:  ['发布出售信息', '发布采购信息', '发布活动信息', '发布吐槽信息'],
      showPicker: false,
      uploader: [],
      message: '',
    }
  },

  computed: {},

  mounted () {
    this.value = this.columns[0]
  },

  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
  }

}

</script>
<style lang='less' scoped>
  .publish {
    box-sizing: border-box;
    padding: 0.27rem;
    .title {
      color:#19b5fe;
      text-align: center;
      margin-bottom: 10px;
    }
  }
</style>
