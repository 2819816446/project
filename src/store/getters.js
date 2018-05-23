export default{
	// 相当于计算属性 如果其他地方需要获取 转变后的数据，可在这里定义方法实时获取
	// 就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算

	// 注意： 在其他地方调用vuex的getters时不需要括号：
//       这样：
//       store.getters.getArticleLists 
//       而不是：
//       store.getters.getArticleLists() 

	getArticleLists: state => state.articleLists,      
	getArticleNum(state){
		return state.articleNum;
	},

	// 获取tokens
	gt_getToken(state){
		return state.token;
	}
}