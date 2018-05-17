export default{
	// mutation 类似method 定义方法（一般为同步的）
	addArticleLists(state,data){
		state.articleLists = data;

	},

	addArticleNum(state){
		state.articleNum+=20;
	},

	addArticle(state,res){
		// res.data = res.data.data;
		state.article = res.data;
	}
}