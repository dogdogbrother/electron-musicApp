<template>
  <div id="app">
    <myHeader></myHeader>
    <!-- <router-view/> -->
    <musicCardDLQQ></musicCardDLQQ>
    <musicCardDLWYY></musicCardDLWYY>
    <List v-show = 'isShowList'></List>
    <Player @openList = 'openList'></Player>
  </div>
</template>
<script>
import MyHeader from '@/views/my-header/index'
import MusicCardDLQQ from '@/components/dialog/music-card-QQ'
import MusicCardDLWYY from '@/components/dialog/music-card-WYY'
import Player from '@/components/play'
import List from '@/components/list'
import {mapState,mapGetters,mapActions} from 'vuex';
import { log } from 'util';
export default {
  name: 'App',
  data(){
    return {
      isShowList:false
    }
  },
  components:{
    MyHeader,
    MusicCardDLQQ,
    MusicCardDLWYY,
    Player,
    List
  },
  methods:{
    openList(status){
      if(status){
        this.isShowList = true;
      }else{
        this.isShowList = false;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
body{
  margin: 0;
}
ul,li,p,h1,h2,h3,h4,section,main,aside,dl,dt,dd{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
</style>
