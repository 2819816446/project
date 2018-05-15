
import axios from '../../node_modules/axios/dist/axios.min.js'
export default{

	// 类似method 定义方法（一般为异步的）
	getArticleLists(context){
		context.commit("addArticleNum");
		let num = context.getters.getArticleNum;
		console.log(num);

		axios.get('https://cnodejs.org/api/v1/topics', {
		    params: {
		      page : 1,
		      limit:num,
		      mdrender:false
		    }
		  })
		  .then(function (response) {
		    console.log(response);
		    context.commit('addArticleLists',response.data.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });


	},

	// 更新最新的20条数据 上拉刷新
	refreshData(context){
		axios.get('https://cnodejs.org/api/v1/topics', {
		    params: {
		      page : 1,
		      limit:20,
		      mdrender:false
		    }
		  })
		  .then(function (response) {
		    console.log(response);
		    context.commit('addArticleLists',response.data.data);
		  })
		  .catch(function (error) {
		    console.log(error);
		  });

	},

}