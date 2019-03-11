<!-- 用于 -->
<template>
  <div>1234</div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {},

  created(){
    //热河
    // 0020WVx30hXO4K
    let origin = `https://bird.ioliu.cn/v1?url=`
    let data = {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"1009711786","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"1009711786","songmid":["0020WVx30hXO4K"],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":20,"cv":0}}
    let data2 = JSON.stringify(data);
    console.log(data2);
    let url = origin + `https://u.y.qq.com/cgi-bin/musicu.fcg?-=getplaysongvkey7365176950545029&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=${data2}`
    //key 是input中的值
    axios.get(url).then( res =>{
    console.log(res);
    })
  }
}

</script>
<style lang='scss' scoped>
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