
<template>
<!-- 目前我在写播放相关的内容，现在的进度是，当我点击播放的时候，当前是要播放，还要添加到列表中 -->
  <div class="box">
    <el-dialog title="" :visible="isShowCardQQ" width="700px" @close='closeDialog' :show-close="false" custom-class="dia-log">
      <section v-if="songinfo">
        <div class="img-box">
          <img v-if="songinfo.track_info.album.mid" :src="getImgSrc(songinfo.track_info.album.mid)" alt="">
        </div>
        <div class="content">
          <h2 v-if="songinfo.track_info.title">{{songinfo.track_info.title}}</h2>
          <P  v-if="songinfo.track_info.singer[0].title" class="author"><i class="el-icon-info"></i>{{songinfo.track_info.singer[0].title}}</P>
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
            <el-button type="primary" @click="nowPlay">立即播放</el-button>
            <el-button @click="toList">加入列表</el-button>
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
      //通过此函数获取到歌曲的歌手名字专辑一大堆玩意儿。
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
        //this.songinfo.track_info.mid 为当前歌曲的id
      })
    },
      //点击立即播放，执行此函数通过this.songinfo.track_info.mid此参数 获取到当前播放歌曲的vkey，最好拼接成url
    nowPlay(){
      let url = this.options()
      //url通过一大推数据参数拼接成的，因为 加入列表 的函数也用到这些函数，所有我单独放到一个函数中，options。
      axios.get(url).then( res =>{
        this.$store.dispatch('setStatusQQ',false)
        //通过此ajax得到了数据中，req_0.data.midurlinfo[0].purl为拼接好的路径
        //前面加上url地址即可 http://36.27.210.13/amobile.music.tc.qq.com/  拼接后为歌曲播放地址
        if(res.data.code === 0){
          let musicUrl = 'http://36.27.210.13/amobile.music.tc.qq.com/'+res.data.req_0.data.midurlinfo[0].purl;
            //当前url是不改变播放状态的 只是用于显示img和name，以及提醒更换歌曲了
          this.$store.dispatch('updataNowMusicPlay',{url:musicUrl,name:this.songinfo.extras.name})
          // 播放列表才是真正控制播放内容的数据
          this.$store.dispatch('pushMusicPlayList',{url:musicUrl,name:this.songinfo.extras.name})
        }else{
          this.$message.error('获取qq音乐的vkey值失败，大概率是改了接口，请提交issue');
        }
      })
    },
    //点击加入列表 执行此函数，请求音乐的播放地址啥的，和播放是一样的，只是不更新 updataNowMusicPlay 函数。
    //这个和上面的函数只有一个不同 就是  是否更新了 updataNowMusicPlay vuex，所有者两个请求可以合并一下
    toList(){
      let url = this.options();
      axios.get(url).then( res =>{
        if(res.data.code === 0){
          let musicUrl = 'http://36.27.210.13/amobile.music.tc.qq.com/'+res.data.req_0.data.midurlinfo[0].purl;
          this.$store.dispatch('setStatusQQ',false)
          this.$store.dispatch('pushMusicPlayList',{url:musicUrl,name:this.songinfo.extras.name})
        }else{
          this.$message.error('获取qq音乐的vkey值失败，大概率是改了接口，请提交issue');
        }
      })
    },
    //通过执行此函数，return 回url get地址
    options(){
      let musicMidId = this.songinfo.track_info.mid;
      let musicName = this.songinfo.extras.name
      let origin = `https://bird.ioliu.cn/v1?url=`
      let data = {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1009711786","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1009711786","songmid":[musicMidId],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}
      let data2 = JSON.stringify(data);
      let url = origin + `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey7365176950545029&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=${data2}`
      return url;
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