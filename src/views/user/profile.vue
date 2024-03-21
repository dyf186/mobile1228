<template>
  <div class="page-user-profile">
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="saveProfile()"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像" center @click="showPhoto = true">
        <van-image
          slot="default"
          width="56"
          height="56"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        ></van-image>
      </van-cell>
      <van-cell
        is-link
        title="名称"
        value="用户名称"
        @click="showName = true"
      ></van-cell>
      <van-cell
        is-link
        title="性别"
        value="男"
        @click="showSex = true"
      ></van-cell>
      <van-cell
        is-link
        title="生日"
        value="2019-8-8"
        @click="showBirthday = true"
      ></van-cell>
    </van-cell-group>
    <van-popup v-model="showPhoto" position="bottom">
      <van-cell
        is-link
        title="本地相册选择图片"
        @click="$refs.mypic.click()"
      ></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <van-popup v-model="showName" position="bottom">
      <van-field
        v-model.trim="userProfile.name"
        type="textarea"
        rows="3"
      ></van-field>
    </van-popup>
    <van-action-sheet
      v-model="showSex"
      @select="onSelect"
      :actions="actions"
      cancel-text="取消"
    ></van-action-sheet>
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        v-model="nowDate"
        type="date"
        :min-date="minDate"
        @concel="showBirthday = false"
        @confirm="confirmDate"
      ></van-datetime-picker>
    </van-popup>
    <input
      type="file"
      ref="mypic"
      @change="startUpload()"
      style="display: none"
    />
  </div>
</template>

<script>
import { apiUserProfile, apiUserPhoto, apiSaveProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "user-profile",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      nowDate: new Date(),
      minDate: new Date("1990-01-01"),
      showBirthday: false,
      actions: [{ name: "男" }, { name: "女" }],
      showSex: false,
      showName: false,
      showPhoto: false,
      userProfile: {
        photo: "",
        name: "huazai",
        gender: 0,
        birthday: "1993-9-1",
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserProfile();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async saveProfile() {
      await apiSaveProfile(this.userProfile);
      this.$toast.success("更新用户资料成功");
    },
    async startUpload() {
      const fd = new FormDataEvent();
      fd.append("photo", this.$refs.mypic.files[0]);
      const result = await apiUserPhoto(fd);
      this.userProfile.photo = result.photo;
      this.showPhoto = false;
    },
    confirmDate(val) {
      this.userProfile.birthday = dayjs(val).format("YYYY-MM-DD");
      this.showBirthday = false;
    },
    onSelect(val) {
      this.userProfile.gender = val.name === "男" ? 0 : 1;
      this.showSex = false;
    },
    async getUserProfile() {
      if (false) {
        this.userProfile = await apiUserProfile();
      }
    },
  },
};
</script>

<style lang="less" scoped></style>
