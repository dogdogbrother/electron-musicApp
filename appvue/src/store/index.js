 
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state={//要设置的全局访问的state对象
    showCardDialogQQ: false,
    cardDialogDataQQ:{},

    showCardDialogWYY: false,
    cardDialogDataWYY:{}
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
     }
};
const mutations = {
    setShowCardQQ(state,bl) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);  
        state.showCardDialogQQ = bl;
    },
    setCardDataQQ(state,data) {
        state.cardDialogDataQQ = data;
    },

    setShowCardWYY(state,bl) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);  
        state.showCardDialogWYY = bl;
    },
    setCardDataWYY(state,data) {
        state.cardDialogDataWYY = data;
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
    }
}
const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});
export default store;
