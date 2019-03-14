<template>
  <div class="box">
    <section>
      <h1 :class="{isWangy:isWY}" @click="switchover">音乐</h1>
      <ul>
        <li 
          v-for="(item) in navList" 
          :class="{ select:selectNav===item.type }" 
          :key="item.type"  
          @click="changeNav(item.type)"
        >
        {{item.name}}
      </li>
      </ul>
      <search-music 
        @clickItemSong = "showSongDetail"
        @selectType =  "selectMusicChange"
        @enterOptionSong = 'showSongsList'
        :platform="platform"
      >
      </search-music>
    </section>
  </div>
</template>
<script>
import { navListData } from './unit/unit.js'
import SearchMusic from '@/components/search/SearchMusic'
import axios from 'axios'
export default {
  name: 'myheader',
  data () {
    return {
      navList:navListData,
      selectNav:0,
      isWY:false,
      platform:'1'
    } 
  },
  methods:{
    changeNav (index) {
      this.selectNav = index;
    },
    //选中音乐执行此函数
    showSongDetail (data) {
      this.$store.dispatch('setStatusQQ',true);
    },
    selectMusicChange (type) {
      //type为1 是QQ 2为 网易
      if(type === '1'){
        this.isWY = false;
        this.platform = '1'
      }else{
        this.isWY = true;
        this.platform = '2'
      }
    },
    //
    switchover(){
      if(this.platform === '1'){
        this.platform = '2'
      }else{
        this.platform = '1'
      }
    },
    showSongsList (data) {

    }
  },
  created(){
   // https://u.y.qq.com/cgi-bin/musicu.fcg?
  //热河
// 0020WVx30hXO4K



let origin = `https://bird.ioliu.cn/v1?url=`
let data = {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1009711786","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1009711786","songmid":["0020WVx30hXO4K"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}
let data2 = JSON.stringify(data);

let url = origin + `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey7365176950545029&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=${data2}`
      //key 是input中的值
      axios.get(url).then( res =>{

      })
  },
  components:{
    SearchMusic
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box{
  background: #fff;
}
section{
  margin: 0 auto;
  max-width: 1100px;
  height: 90px;
  display: flex;
  align-items: center;
  h1{
    font-size: 0px;
    width: 170px;
    height: 46px;
    background-image: url('../../assets/logo/QQlogo.png');
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 20px;
  }
  .isWangy{
    background-image: url('../../assets/logo/WYYlogo.png');
  }
  ul{
    display: inline-flex;
    margin-right: 20px;
    li{
      line-height: 90px;
      padding: 0 15px;
      font-size: 18px;
      cursor: pointer;
      &:hover{
        color: #409EFF;
      }
    }
    .select{
      color: #fff;
      background-color: #409EFF;
      &:hover{
        color: #fff;
      }
    }
  }
}
</style>
