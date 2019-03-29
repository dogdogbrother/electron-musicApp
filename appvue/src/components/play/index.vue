<template>
  <div class="box" @mouseenter="mouseenter" 
    :class="[isHide ? '' : 'hide']"
    @mouseleave="mouseleave">
    <div class="container">
      <div class="control-btns">
        <!-- player.playPrev() 和 playNext 是qq音乐播放器自身的接口事件 -->
        <div class="handle prev" title="上一首" @click="player.playPrev()"></div>
        <div class="handle" :class="[isPlayStatus ? 'pause' : 'play']" title="暂停播放" @click="isPlay"></div>
        <div class="handle next" title="下一首"  @click="player.playNext()"></div>
      </div>
      <div class="music-mini">
        <img :src="getNowMusicUrl.imgUrl"/>
        <div class="progress">
          <p>{{getNowMusicUrl.name}}</p>
          <div class="bar"></div>
        </div>
      </div>
      <div class="operation">
        <div class="play-way" :class="setWayClass(playWay)" @click="changePlayerWay"></div>
        <div class="list-btn" @click="openList">
          <i></i>
          <p>{{getMusicPlayList.length}}</p>
          <div></div>
        </div>
      </div>
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
      isUpdataList:true,
      isHide:true,
      timeout:null,
      toggle:true,
      playWay:0,  //这个是记录播放方式的，0是循环，点击为1随机播放，再点击为2单曲播放，再点击回归0
    };
  },
  
  computed: {
    ...mapGetters({
      getNowMusicUrl:'getNowMusicUrl',
      getMusicPlayList:'getMusicPlayList',
      getPlayIndex:'getPlayIndex'
    })
  },

  methods: {
    isPlay(){
      if(!this.getMusicPlayList.length) return;
      this.isPlayStatus ? this.player.pause() : this.player.play();
      this.isPlayStatus = !this.isPlayStatus 
    },
    prevMusic(){
      this.player.playPrev();
    },
    //鼠标移入时执行此代码，功能为高度增加。想了想，处理方法为给赋值class吧，单独拎一个变量出来
    //定时器的判断是为了鼠标移出时的冲突
    mouseenter(){
      if(this.timeout){
        clearTimeout(this.timeout._id);
      }
      this.isHide = false;
    },
    mouseleave(){
      this.timeout = setTimeout(()=>{
        //this.isHide = true;
      },1000)
    },
    //点击裂变计数的那个btn,打开兄弟组件 歌曲列表，通过触发父级函数改变状态
    openList(){
      this.$emit('openList',this.toggle);
      this.toggle = !this.toggle;
    },
    //点击改变播放循环方式
    changePlayerWay(){
      if(this.playWay === 2){
        this.playWay = 0;
        return;
      }
      this.playWay += 1;
    },
    //处理循环播放还是顺序播放的class判断
    setWayClass(status){
      if(status === 2) return 'single'
      if(!status){
        return 'cycle'
      }else{
        return 'random'
      }
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
      if(val.length === 0){
        this.player.play();
        return;
      }
      if(!this.isUpdataList) return;
      if(val.length === 0) return;
      return 
      let musicOptionUrl = [];
      val.forEach(item => {
        musicOptionUrl.push(item.url)
      });
    },
    //当有人点击列表中歌曲的时候，改变index，触发次函数
    getPlayIndex(val){
      let musicOptionUrl = []; //这参数是用来做播放器列表参数的，遍历mucisList获取到此选项。 
      this.getMusicPlayList.forEach(item => {
        musicOptionUrl.push(item.url)
      });
      this.player.play(musicOptionUrl,{index:val});
    }
  }
}

</script>
<style lang='less' scoped>
.box{
  transition: 0.4s;
  position:fixed;
  left: 0;
  bottom: -50px;
  height: 60px;
  background-color:rgba(0, 0, 0, 0.86);
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
    .music-mini{
      flex: 1;
      padding: 10px;
      display: flex;
      img{
        width: 40px;
        height: 40px;
        border:none;
      }
      .progress{
        flex: 1;
        padding: 0 15px;
        p{
          color: #fff;
          font-size: 13px;
          font-weight: 500;
          line-height: 15px;
        }
      }
    }
    .operation{
      width: 140px;
      padding: 19px 0;
      display: flex;
      justify-content: flex-start;
      .list-btn{
        width: 62px;
        cursor: pointer;
        display: flex;
        justify-content: flex-start;
        &:hover i{
          background-position: -70px -62px;
        }
        i{
          display: block;
          width: 22px;
          height: 20px;
          background-image: url('../../assets/icon.png');
          background-position: -70px -37px;
        }
        p{
          width: 20px;
          height: 20px;
          position: relative;
          z-index: 100;
          background-color: rgba(0, 0, 0, 0.4); 
          text-align: right;
          color: #fff;
          font-size: 12px;
          line-height: 20px;
        }
        div{
         width: 20px;
         height: 20px;
         background-color: rgba(0, 0, 0, 0.4); 
         border-radius: 0 50% 50% 0;
         position: relative;
         left: -10px;
         z-index: 99;
        }
      }
    }
  }
}
.hide{
  transition: 0.4s;
  position:fixed;
  left: 0;
  bottom: 0px;
}
.current-play-tag{
  background: rgba(0, 0, 0, 0);
  margin-top: 4px;
  border: none;
}
// 播放状态切换下的css样式
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
//循环播放的样式，根据状态的不同，class对应的icon也不同，hover也不同。。
.play-way{
  width: 24px;
  background-image: url('../../assets/icon.png');
  margin-right: 12px;
  cursor: pointer;
  &.cycle{
    background-position: -18px -172px;
    &:hover{
      background-position: -47px -172px;
    }
  }
  &.random{
    background-position: -18px -202px;
    &:hover{
      background-position: -47px -202px;
    }
  }
  &.single{
    background-position: -18px -142px;
    &:hover{
      background-position: -47px -142px;
    }
  }
}
</style>