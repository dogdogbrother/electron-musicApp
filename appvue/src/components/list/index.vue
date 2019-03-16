<!--  -->
<template>
  <div class="box">
    <section class="contain">
      <div class="music-list">
        <div class="header">
        </div>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
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
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.box{
  width: 100%;
  position:fixed;
  bottom: 60px;
  left: 0;
  .contain{
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
        height: 20px;
        background-color: rgba(0, 0, 0, 0.85)
      }
    }
    .lyric{
      width: 40%;
      height: 20px;
      background-color: rgba(0, 0, 0, 0.75)
    }
  }
}
</style>