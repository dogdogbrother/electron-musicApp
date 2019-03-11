<template>
  <div class="box">
    <el-dialog title="" :visible="isShowCardQQ" width="700px" @close='closeDialog' :show-close="false" custom-class="dia-log">
      <section v-if="songinfo">
        <div class="img-box">
          <img v-if="songinfo.track_info.album.mid" :src="getImgSrc(songinfo.track_info.album.mid)" alt="">
        </div>
        <div class="content">
          <h2 v-if="songinfo.track_info.title">{{songinfo.track_info.title}}</h2>
          <P  v-if="songinfo.track_info.singer[0].title"class="author"><i class="el-icon-info"></i>{{songinfo.track_info.singer[0].title}}</P>
          <div class="detail">
            <p v-if="songinfo.track_info.album.title">专辑: {{songinfo.track_info.album.title}}</p>
            <p v-if="songinfo.info.lan">语种: {{songinfo.info.lan.content[0].value}}</p>
          </div>
          <div class="detail">
            <p v-if="songinfo.info.genre">流派: {{songinfo.info.genre.content[0].value}}</p>
            <p v-if="songinfo.info.company">唱片公司: {{songinfo.info.company.content[0].value}}</p>
          </div>
          <div class="detail">
            <p v-if="songinfo.info.pub_time.content[0].value">发行时间: {{songinfo.info.pub_time.content[0].value}}</p>
          </div>
          <div class="btns">
            <el-button type="primary">立即播放</el-button>
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
  name: 'card-QQ',
  data() {
    return {
      songinfo:null
    }
  },
  computed:{
    ...mapGetters({
      getCardDataQQ:'getCardDataQQ',
      isShowCardQQ:'isShowCardQQ'
    })
  },
  methods: {
    changeVuex(){
      this.$store.dispatch('setStatusQQ',true)
    },
    closeDialog(){
      this.$store.dispatch('setStatusQQ',false)
    },
      // 传入歌曲的mid，拼接成图片路径  图片url拼接规则:https://y.gtimg.cn/music/photo_new/ + 业务id + R图片尺寸x图片尺寸 + 业务类型 + mid + 图片类型
    getImgSrc(midId){
      return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${midId}.jpg?max_age=2592000`
    },
    getQQData(util){
      let origin = `https://bird.ioliu.cn/v1?url=`
      let parameter = JSON.stringify({
        "songinfo": {
          "method": "get_song_detail_yqq",
          "param": {
            "song_type": 0,
            "song_mid": util.mid,
            "song_id": util.id
          },
          "module": "music.pf_song_detail_svr"
	      }
      })
      let url = 
      origin + 
      `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI9266429582507116&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=`
      + parameter
      axios.get(url).then( res =>{
        this.songinfo = res.data.songinfo.data;
      })
    }
  },
  watch:{
    getCardDataQQ(value){
      this.getQQData(value);
    }
  }
}
</script>
<style lang='less' scoped>
section{
  display: flex;
}
.img-box{
  width: 250px;
  height: 250px;
  margin-right: 20px;
  img{
    width: 100%;
    height: 100%;
  }
}
.dia-log{
  .el-dialog__header{
    padding: 0;
  }
}
.content{
  h2{
    font-size: 30px;
    line-height: 50px;
    font-weight: 500;
    color: #222;
  }
  .author{
    color: #999;
    font-size: 16px;
    margin-bottom: 20px;
    i{
      margin-right: 4px;
    }
  }
}
.detail{
  line-height: 27px;
  font-size: 13px;
  display: flex;
  justify-content: start;
  p{
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #333;
  }
  p:first-child{
    width: 200px;
    margin-right: 20px;
  }
}
.btns{
  margin-top: 20px;
  display: flex;
  justify-content: start;
}
</style>