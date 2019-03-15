<!-- 用于 -->
<template>
  <div class="box">
    <div class="container">
      <div class="control-btns">
        <!-- player.playPrev() 和 playNext 是qq音乐播放器自身的接口事件 -->
        <div class="handle prev" title="上一首" @click="player.playPrev()"></div>
        <div class="handle" :class="[isPlayStatus ? 'pause' : 'play']" title="暂停播放" @click="isPlay"></div>
        <div class="handle next" title="下一首"  @click="player.playNext()"></div>
      </div>
      <div class="music-mini">
      </div>
      <div class="operation"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapState,mapGetters,mapActions} from 'vuex';
import { setTimeout } from 'timers';
export default {
  name: 'play-list',
  data () {
    return {
      currentPlayUrl:null,
      player:null,
      isPlayStatus:true,
      playIndex:0,
      isUpdataList:true
    };
  },

  components: {},

  computed: {
    ...mapGetters({
      getNowMusicUrl:'getNowMusicUrl',
      getMusicPlayList:'getMusicPlayList'
    })
  },

  methods: {
    isPlay(){
      this.isPlayStatus ? this.player.pause() : this.player.play();
      this.isPlayStatus = !this.isPlayStatus 
    },
    prevMusic(){
      this.player.playPrev();
    }
  },

  created(){
    setTimeout(() => {
      this.player = new QMplayer({ target: "auto" });
    }, 500);
  },

  watch:{
    //当 当前的播放url改变的时候，代表musiclist里面被添加了新的歌曲
    getNowMusicUrl(val){
      this.isUpdataList = false;
      let musicOptionUrl = []; //这参数是用来做播放器列表参数的，遍历mucisList获取到此选项。
      this.getMusicPlayList.forEach(item => {
        musicOptionUrl.push(item.url)
      });
      this.player.play(musicOptionUrl,{index:musicOptionUrl.length-1});
      setTimeout(()=>{
        this.isUpdataList = true;
      },500)
    },
    //当 我们的播放列表改变的时候，只改变list内容，并不改变当前播放
    //暂时停止加入列表的开发，后面我看下别人的项目，再弄
    getMusicPlayList(val){
      if(!this.isUpdataList) return;
      if(val.length === 0) return;
      return 
      let musicOptionUrl = [];
      val.forEach(item => {
        musicOptionUrl.push(item.url)
      });
    }
  }
}

</script>
<style lang='less' scoped>
.box{
  position:fixed;
  left: 0;
  bottom: 0;
  height: 60px;
  background-color:rgba(0, 0, 0, 0.9);
  color: #666;
  width: 100%;
  .container{
    width: 800px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .handle{
      background-image: url('../../assets/icon.png');
      cursor: pointer;
    }
    .control-btns{
      width: 150px;
      display: flex;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 10px 0;
      .prev,.next{
        margin-top: 5px;
        width: 30px;
        height: 30px;
        background-position: -77px -118px;
      }
      .play{
        width: 40px;
        height: 40px;
        background-position: -137px -113px;
      }
      .next{
        background-position: -207px -118px;
      }
      .prev:hover{
        background-position: -77px -157px;
      }
      .play:hover{
        background-position: -137px -153px;
      }
      .next:hover{
        background-position: -207px -158px;
      }
    }
    .operation{
      width: 140px;
      background: #fff;
    }
  }
}
.current-play-tag{
  background: rgba(0, 0, 0, 0);
  margin-top: 4px;
  border: none;
}
// 最下面的写播放状态切换下的css样式
.pause{
  width: 40px;
  height: 40px;
  background-position: -138px -194px;
}
.pause:hover{
  width: 40px;
  height: 40px;
  background-position: -179px -194px;
}
</style>
<!-- 
    我重新處理下歌曲播放的問題，首先我要找到播放鏈接。
    已李志的熱河為例，
    midId為 000NmduW0xvVTS 
    docid: "102409029"
    id: "102409029"
    mid: "0020WVx30hXO4K"

    熱河的歌曲播放的地址為
    http://dl.stream.qqmusic.qq.com/
    C4000020WVx30hXO4K.m4a?
    guid=7485111988&vkey=
    3C03CFC3A733C57371B710E60C10D24953E176BDE2A078F27785ACE27EC36985301ACFEF2E0966828E8B048DBFC1B79CE2F4283385182F4A&
    uin=0&
    fromtag=66

    再舉例陳奕迅的 遙遠的她 mid: "004SDv7c0m2uD7"
    播放地址為

    http://dl.stream.qqmusic.qq.com/
    C400000mu01y4LyZ1Z.m4a?
    guid=7485111988&vkey=
    0F822F83B22F4E445F8FD5C8FFF8338A5F4ECB1552127A204BCA945699183FE4C439D84D9AE15178188F50033F6A3ECE51F2EB4F6322051A&
    uin=0&
    fromtag=66

    對比兩足數據我們看到vkey的值是不同的，是因為在請求歌曲之前，單獨請求了一次數據，獲取到了vkey。那麼這個接口是什麼呢。需要找一找。

-->