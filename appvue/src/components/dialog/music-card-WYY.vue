<template>
  <div class="box">
    <el-dialog title="" :visible="isShowCardWYY" width="700px" @close='closeDialog' :show-close="false" custom-class="dia-log">
      <section v-if="songinfo">
        <div class="img-box">
          <img :src="songinfo.al.picUrl" alt="">
        </div>
        <div class="content">
          <h3>{{songinfo.name}}</h3>
          <div class="detail">
            <span>歌手: </span>
            <span> {{songinfo.al.name}}</span>
          </div>
          <div class="detail">
            <span>所属专辑: </span>
            <span> {{songinfo.ar[0].name}}</span>
          </div>
          <div class="btns">
            <el-button type="primary" @click="nowPlay">立即播放</el-button>
            <el-button>加入列表</el-button>
          </div>
        </div>
      </section>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  name: 'card-WYY',
  data() {
    return {
      songinfo:null //songinfo.id 是当前歌曲的信息
    }
  },
  computed:{
    ...mapGetters({
      getCardDataWYY:'getCardDataWYY',
      isShowCardWYY:'isShowCardWYY'
    })
  },
  methods: {
    changeVuex(){
      this.$store.dispatch('setStatusWYY',true)
    },
    closeDialog(){
      this.$store.dispatch('setStatusWYY',false)
    },
      // 传入歌曲的mid，拼接成图片路径  图片url拼接规则:https://y.gtimg.cn/music/photo_new/ + 业务id + R图片尺寸x图片尺寸 + 业务类型 + mid + 图片类型
    getImgSrc(midId){
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${midId}.jpg?max_age=2592000`
    },
    getData(id){
      //id = 29724295;
      let url = `http://148.70.108.11:3000/song/detail?ids=${id}`
      axios.get(url).then(res =>{
        this.songinfo = res.data.songs[0];
      })
    },
    //点击立即播放，执行此函数
    nowPlay(){
      this.$store.dispatch('setStatusWYY',false)
      let id = this.songinfo.id;
      let url = `http://148.70.108.11:3000/song/url?id=${id}`
      
      axios.get(url).then(res =>{
        // time 参数是歌曲时间长度，和QQ的不同，QQ是三位，网易是6位数，所以单独处理下
        let time = parseInt(this.songinfo.dt/1000)
        let listParameter = { //这个参数是用来存世list歌曲的名字歌手，时长的
          singer : this.songinfo.ar[0].name,
          url : res.data.data[0].url,
          name : this.songinfo.name,
          time 
        }
        //当前url是不改变播放状态的 只是用于显示img和name，以及提醒更换歌曲了
        this.$store.dispatch('updataNowMusicPlay',{url:res.data.data[0].url,name:this.songinfo.name})
        // 播放列表才是真正控制播放内容的数据
        this.$store.dispatch('pushMusicPlayList',listParameter)
      })
    }
  },
  watch:{
    getCardDataWYY(value){
      this.getData(value.id)
    }
  }
}
</script>
<style lang='less' scoped>
section{
  display: flex;
}

.dia-log{
  .el-dialog__header{
    padding: 0;
  }
}
.img-box{
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  padding: 42px;
  background-image: url('../../assets/img/coverall.png');
  background-size: 250px 250px;
  margin-right: 20px;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.content{
  color: #333;
  h3{
    font-size: 30px;
    line-height: 50px;
    color: #222;
    padding-top: 10px;
  }
  .detail{
    line-height: 20px;
    span:first-child{
      color: #777;
    }
  }
  .btns{
    margin-top: 86px;
  }
}
</style>