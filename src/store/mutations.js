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
	},

	setLoginname(state,value){
		 localStorage.setItem("loginname",value);
	},
	getLoginname(state){
		state.loginname = localStorage.getItem("loginname");
		return state.loginname;
		 
	},
	// 登入(loginname 存入localStorage {token: "2819816446"})
	login(state,data){
		localStorage.loginname = data; //用户名
        state.loginname = data;
	},

	// 退出 (loginname 清除)
	logout(state){
		localStorage.removeItem('loginname');
         state.loginname = null;
	},

	// addAccessToken
	addAccessToken(state,data){
		localStorage.accesstoken = data;
         state.accesstoken = data;
	},
	// ClearAccessToken
	ClearAccessToken(state,data){
		localStorage.accesstoken = "";
         state.accesstoken = "";
	},

	// 刷新后从localStorage 获取保存的 accesstoken，赋值给state;防止刷新后accesstoken清空
	setAccesstokenWhenRefresh(state){
		state.accesstoken = localStorage.getItem("accesstoken");
		state.loginname = localStorage.getItem("loginname");
	}
}