<template>
	<div class="article_detail content-box markdown-body" ref="article_detail">
		<div class="detail_title">
			{{article.title}}
		</div>
	   <div class="weui-media-box">
			<div class="user_wrap">
				<!-- ../assets/img/advater.jpg  v-bind:src 不需要{{}}-->

				<img v-bind:src="article.author.avatar_url" height="48" width="48" alt="" >
				<div class="art_hd_wrap">
					<p class="top">置顶</p>
					<p class="title">{{article.author.loginname}}</p>
				</div>
				<div class="user_wrap_2">
					<p>创建于：<span>{{formatTime(article.create_at)}}</span></p>
					<p>{{article.visit_count}}次预览</p>
				</div>
				<div class="clear"></div>
			</div>
	    </div>	
		
		<!-- v-html 解决markdown字符串直接显示的格式问题 -->
	    <div class="content_wrap" id="content" v-html="article.content">
	     	<!-- {{}} -->
	    </div>	


	    <div class="replay">
	    	<p class="replay_title">{{article.replies.length}}条回复</p>


	
			<div v-for="(reply,index) of article.replies" class="user_wrap_new">
				<router-link :to='{name:"UserDetail",params:{loginname:reply.author.loginname}}'>
				<img v-bind:src="reply.author.avatar_url" height="48" width="48" alt="" >
				</router-link>
				<div class="user_wrap_2">
					<p>{{reply.author.loginname}}</p>
				</div>
				<div class="art_hd_wrap">
					<p class="">{{index+1}}楼</p>
					<p class="">{{lastRplyToNow(reply.create_at)}}</p>
				</div>		
		
				<div class="clear"></div>
				<div v-html="reply.content">
					<!-- <p>{{}}</p> -->
				</div>
			</div>				
	    </div>

	    <div class="ext-btn-reply" @click="goback()"><i class="iconfont icon-xiangzuo"></i></div>

		
	</div>
</template>

<script>
// 组件里都是用 this.$store 访问数据
	import BScroll from 'better-scroll'
	import axios from 'axios'
	const options = {
	  scrollY: true, // 因为scrollY默认为true，其实可以省略
	}	
	console.log('进入Article 组件');
	export default{
		name:'ArticleDetail',
		data(){
			return{
				data:[],
				loading:false,
			};
		},
		computed:{
			// 与state里的article变量，同名方法获取 article数据
	        article() {
	            return this.$store.state.article;

	        }	
		},
		methods:{
			goback(){
				this.$router.go(-1);	
			},
			getData(){
				// 获取参数
				var id = this.$route.params.id;
				console.log("id:"+id);
				// 获取路由的path 路由文件里可以看到
				var path = this.$route.path;
				var url = 'https://cnodejs.org/api/v1/'+path;
				this.$store.dispatch('setArticle',url);
			},
			formatTime(time){
				return String(time).substr(0,10);
			},

			transToCN(tab){
				switch(tab)
				{
				    case "share":
				        return "分享";
				        break;
				    case "ask":
				        return "问答";
				        break;
				    case "job":
				        return "工作";
				        break;
				       
				    default:
				        // 与 case 1 和 case 2 不同时执行的代码
				      return "未知";
				}
			},

			// 最后回复到现在距离的时间
			lastRplyToNow(last_reply_time){
				// var old = Date.parse(String(last_reply_time).substr(0,10));//转换为时间格式
				var old = (new Date(last_reply_time)).getTime(); //毫秒数
				var curren = new Date();
				var left = curren - old;
				var days=Math.floor(left/(24*3600*1000)); //天数

				//计算出小时数
				var left1=left%(24*3600*1000);    //计算天数后剩余的毫秒数
				var hours=Math.floor(left1/(3600*1000));
				
				//计算相差分钟数
				var left2=left1%(3600*1000);        //计算小时数后剩余的毫秒数
				var minutes=Math.floor(left2/(60*1000));

				if (days > 0) {
					var s = days + "天前";
					return s;
				} 
				else if(hours > 0){
					return hours + "小时前";
				}
				else if(minutes > 0){
					return minutes + "分钟前";
				}else{
					return "1分钟前";
				}
			},
		
		

		},
		mounted(){
	


		},
		beforeCreate(){


		},
		created(){
			this.getData(); 
			//需要先拷贝一份 只想data的this 操作data() 里的数据
			// let _this = this;
			

		},

		watch:{

		},


	};
	
</script>


<style>
	/*import css 需要 url() 而不是直接''*/
	@import url('../assets/css/article_detail.css')

	@import url('../../static/font/iconfont1.css')
	/*.weui-media-box{border-top: 1px solid red;}*/    
	.clear{clear: both;}
	p{text-align: left;}
	.article_detail{height: 36rem;padding-bottom:6rem;}
	.detail_title{width: 100%;;padding: 10px;box-sizing: border-box;}

	.art_hd_wrap{width: 96%;height: 2rem;margin: 0 auto;}
	.art_hd_wrap p{float: left;text-align: left;}
	.art_hd_wrap p:nth-of-type(1){width: 2.5rem;height: 1.5rem;border-radius: 2px;color: white;background:#80BD01;margin-top: 0.25rem;margin-right: 1rem;text-align: center;}
	.article_detail .user_wrap{width: 96%;height: 4rem;margin: 0 auto;position: relative;overflow: hidden;}
	.user_wrap img{display:block;width: 2.7rem;height: 2.7rem;border-radius: 50%;margin-top: 0.2rem;margin-right: 1rem;float: left;}

	.user_wrap_new{width: 96%;margin: 0 auto;position: relative;overflow: hidden;border-bottom:2px solid gray;}
	.user_wrap_new img{display:block;width: 2.7rem;height: 2.7rem;border-radius: 50%;margin-top: 0.2rem;margin-right: 1rem;float: left;}
	/**/
	.weui-media-box{padding: 0 1rem; }
	.user_wrap_1{float: left;width: 80%;}
	.user_wrap_1 p:nth-of-type(1){float: left;}
	.user_wrap_1 p:nth-of-type(2){float: right;}
	.user_wrap_2{float: left;width: 80%;}
	.user_wrap_2 p:nth-of-type(1){float: left;width: 10rem;text-align: left;}
	.user_wrap_2 p:nth-of-type(2){float: right;}

	/*content*/
	#content{width: 100%;border-bottom: 10px solid gray;padding: 14px;box-sizing: border-box;text-align: left;}
	#content img{width: 100%;}

	/**/
	.replay{padding-bottom: 4rem;}
	.replay_title{margin: 0.5rem 10px;}

	.ext-btn-reply {
	    position: fixed;
	    right: 16px;
	    bottom: 90px;
	    background: #80bd01;
	    /*color: #fff;*/
	    color: white;
	    display: -webkit-box;
	    display: flex;
	    border-radius: 50%;
	    width: 42px;
	    height: 42px;
	    -webkit-box-pack: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    align-items: center;
	    box-shadow: 2px 6px 12px #c7c7c7;
	    transition: all .33s linear;
	    
	}
	.ext-btn-reply i{font-size: 1.5rem;}
</style>