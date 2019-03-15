 
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
    showCardDialogQQ: false,
    cardDialogDataQQ:{},

    showCardDialogWYY: false,
    cardDialogDataWYY:{},

    //当前正在播放的url地址，每当卡片点击播放的时候，就改变此值。
    nowMusicPlay:{
        url:null,
        name:null
    }, 
    
    musicPlayList:[] //这个数组是干啥的呢，当我们搜索到歌曲内容的时候，把歌曲的url放到这个数组里面，最好是用对象形式保存，这样还能记录是qq的还是网易云的音乐
};
const getters = {   //实时监听state值的变化(最新状态)
    isShowCardQQ(state) {  //方法名随意,主要是来承载变化的showFooter的值
       return state.showCardDialogQQ
    },
    getCardDataQQ(state) {
        return state.cardDialogDataQQ
    },

    isShowCardWYY(state) {  //方法名随意,主要是来承载变化的showFooter的值
        return state.showCardDialogWYY
    },

    getCardDataWYY(state) {
        return state.cardDialogDataWYY
    },

    getNowMusicUrl(state) {
        return state.nowMusicPlay
    },

    getMusicPlayList(state) {
        return state.musicPlayList
    }
};
const mutations = {
    setShowCardQQ(state,bl) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);  
        state.showCardDialogQQ = bl;
    },
    setCardDataQQ(state,data) {
        state.cardDialogDataQQ = data;
    },
    setShowCardWYY(state,bl) {  
        state.showCardDialogWYY = bl;
    },
    setCardDataWYY(state,data) {
        state.cardDialogDataWYY = data;
    },
    setNowMusicPlay(state,data){    //当前播放的曲目，data是对象，值有url和name 应该还有个img，不过暂时不写
        state.nowMusicPlay = data
    },
    setMusicPlayList(state,data){   //当前播放列表,musicPlayList是个数组，值应该是个对象，有img，name，url
        state.musicPlayList.push(data);
    }
    
}
const actions = {
    setStatusQQ(context,bl) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性 
        context.commit('setShowCardQQ',bl);
    },
    updataCardQQ(context,data) {
        context.commit('setCardDataQQ',data);
    },
    setStatusWYY(context,bl) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性 
        context.commit('setShowCardWYY',bl);
    },
    updataCardWYY(context,data) {
        context.commit('setCardDataWYY',data);
    },
    updataNowMusicPlay(context,data) {
        context.commit('setNowMusicPlay',data)
    },
    pushMusicPlayList(context,data) {
        context.commit('setMusicPlayList',data)
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;
