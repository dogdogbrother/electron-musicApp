<!--  -->
<template>
  <div class="box">
    <section class="contain">
      <div class="music-list">
        <div class="header">
          <div class="listCount">播放列表 {{getMusicPlayList.length||''}}</div>
          <div class="clear">清除</div>
        </div>
        <ul class="list-ul">
            <li v-for="(item,index) in getMusicPlayList" @click="playItemMusic(item,index)">
              <!-- 这个地方图标的class为 is-play 因为暂时有bug 所以先不写了 -->
              <div class="icon"><i :class="(getNowMusicUrl.name === item.name) ? '' : ''"></i></div>
              <p class="name">{{item.name}}</p>
              <p class="singer">{{item.singer}}</p>
              <p class="duration">{{item.time | timeFormat}}</p>
            </li>
          </ul>
      </div> 
      <div class="lyric">
        <div class="header">
          
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex';
export default {
  data () {
    return {
      listIcon:0
    };
  },
  components: {},

  computed: {
    ...mapGetters({
      getNowMusicUrl:'getNowMusicUrl',
      getMusicPlayList:'getMusicPlayList',
      getPlayIndex:'getPlayIndex'
    })
  },

  methods: {
    //点击歌曲列表中的歌曲，执行此歌曲，传入index，我预计想把这个idnex当做全局变量来使用，因为QMpaly需要index作为参数
    //然后play组件监听index全局变量，只要变了就重新执行player
    playItemMusic(item,index){
      console.log(item);
      //this.$store.dispatch('updataNowMusicPlay',{url:item.url,name:item.name})
      if(this.getPlayIndex === index) return;
      this.$store.dispatch('updataPlayIndex',index)
    }
  },

  filters:{
    timeFormat(val){
      function addFormat(time){
        if(time<10){
          return '0'+time
        }
        return time
      }
      let minute = addFormat(parseInt(val/60));
      let second = addFormat(val%60);
      return `${minute}:${second}`
    }
  },
  watch:{
    getNowMusicUrl(val){
      console.log('当前歌曲换了？',val);
    }
  }
  
}

</script>
<style lang='less' scoped>
.box{
  width: 100%;
  position:fixed;
  bottom: 60px;
  left: 0;
  .contain{
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px 10px 0 0;
    width: 680px;
    height: 280px;
    margin: 0 auto;
    display: flex;
    border: 1px #222 solid;
    border-bottom: none;
    overflow: hidden;
    .music-list{
      width: 60%;
      .header{
        height: 24px;
        background-color: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        color: #fff;
        font-size: 15px;
        line-height: 24px;
        .clear{
          cursor: pointer;
        }
      }
    }
    .lyric{
      width: 40%;
      height: 24px;
      background-color: rgba(0, 0, 0, 0.75)
    }
  }
}
.list-ul{

  li{
    color: #eee;
    display: flex;
    line-height: 24px;
    font-size: 14px;
    cursor: pointer;
    .icon{
      width: 12%;
      i{
        display: block;
        
        width: 15px;
        height: 15px;
        background-position: -104px 0;
        margin: 4px auto 0;
      }
      .is-play{
        background-image: url('../../assets/icon.png');
      }
    }
    .name{
      width: 55%;
    }
    .singer{
      width: 17%;
      text-align: center;
      text-overflow:ellipsis;
      overflow:hidden;
      white-space:nowrap;
    }
    .duration{
      width: 15%;
      text-align: center;
    }
  }
  li:hover{
    background-color: rgba(0, 0, 0, 0.3);
  }
}
</style>