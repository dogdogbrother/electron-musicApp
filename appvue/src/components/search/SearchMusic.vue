<template>
  <div class="search-wrapper">
    <el-input 
      placeholder="搜素音乐、歌手"
      v-model="searchContent"
      @blur="handleInputBlur"
      @focus="handleInputFocus"
      class="input-with-select"
    >
      <el-select v-model="select" slot="prepend">
        <el-option label="QQ音乐" value="1"></el-option>
        <el-option label="网易云音乐" value="2"></el-option>
      </el-select>
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <dl
      class="search-hint" 
      :class="{searchIsFocus: isFocus}"
      v-show="this.songs.length || this.singers.length "
    >
      <dt v-show="this.songs.length">
        <i class="el-icon-service"></i>
        <span class="classify">单曲</span>
      </dt>
      <dd>
        <ul class="songs_list">
          <li
            v-for="song in songs"
            :key="song.docid" 
            v-on:click="handlerSongClick(song)"
          >
            <span>{{song.name}}</span>
            <span class="singer">- {{song.singer || song.artists[0].name}}</span>
          </li>
        </ul>
      </dd>
      <dt v-show="this.singers.length">
        <i class="el-icon-info"></i>
        <span class="classify">歌手</span>
      </dt>
      <dd v-show="this.singers.length">
        <ul>
          <li v-for="singer in singers" :key="singer.docid">{{singer.name}}</li>
        </ul>
      </dd>
    </dl>
  </div>
</template>

<script>
import axios from 'axios'
import {mapState,mapGetters,mapActions} from 'vuex';
import {
  Input,
  Select
} from 'element-ui'

export default {
  name: 'SearchMusic',
  data() {
    return {
      isFocus: false,
      searchContent: '',
      select: '1',
      songs: [],
      singers: []
    }
  },
  methods: {
    handleInputBlur () {
      this.isFocus = false
    },
    handleInputFocus () {
      if (this.searchContent.trim() !=='') {
        this.isFocus = true
      }
    },
    handlerSongClick (item) {
      //这里修改一下，不需要触发父级函数，而是直接更新vuex中的数值
      this.$store.dispatch('setStatus',true);
      this.$store.dispatch('updataCard',item);
    },
    getQQMusicData (value) {
      let origin = `https://bird.ioliu.cn/v1?url=`
      let url = origin + `http://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?is_xml=0&key=${value}&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0`
      //key 是input中的值
      if(!value) return
      axios.get(url).then( result =>{
        const res = result.data
        this.songs = res.data.song.itemlist
        this.singers = res.data.singer.itemlist
      })
    },
    getWangYiMusicData (value) {
      let url = `http://localhost:3000/search/suggest?keywords=${value}`
      axios.get(url).then(res =>{
        const data = res.data.result
        this.songs = data.songs || []
        this.singers = data.artists || []
      }) 
    }
  },
  watch: {
    searchContent (value) {
      if (value.trim()!=='') {
        if (this.select==='1') {
          //搜素qq音乐
          this.searchContent.trim() !=='' && this.getQQMusicData(value)
        } else {
          // 搜素网易云音乐
          this.getWangYiMusicData(value)
        }
        this.isFocus = true
      }
      else {
         this.isFocus = false
      }
    },
    select (value) {
      let content = this.searchContent
      if (value==='1') {
        this.getQQMusicData(content)
      } else {
        content.trim() !== '' && this.getWangYiMusicData(content)
      }
      this.$emit('selectType', value)
    }
  }
}
</script>
<style lang='less'>
  .search-wrapper {
    position: relative;
    width: 400px;
    .el-select .el-input {
      width: 130px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }
    .search-hint {
      height: 0;
      opacity: 0;
      position: absolute;
      left: 131px;
      box-sizing: border-box;
      width: 212px;
      border: 1px solid #ccc;
      border-top: none;
      z-index: 99;
      dt {
        padding: 10px 0 10px 20px;
        .classify {
          color: #9b9b9b;
        }
      }
      .songs_list {
        padding-bottom: 10px;
        border-bottom: 1px solid #ccc;
      }
      ul li {
        padding: 6px 10px 6px 40px;
        overflow: hidden; /*自动隐藏文字*/
        text-overflow: ellipsis;/*文字隐藏后添加省略号*/
        white-space: nowrap;/*强制不换行*/
        font-size: 14px;
        cursor: pointer;
        .singer {
          color: #999;
        }
        &:hover {
          background-color: #409EFF;
          color: #fff;
          .singer {
            color: #fff;
          }
        }
      }
    }
    .searchIsFocus {
      height: auto;
      opacity: 1;
    }
  }

</style>