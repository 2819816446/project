<template>
	<div class="u_wrap">
		<div class="head">
			<div class="img_wrap">
				<img v-bind:src="data.avatar_url" height="48" width="48" alt="">
			</div>
			<div class="name_wrap">
				<p>{{data.loginname}}</p>
				<p>{{data.githubUsername}}@github.com</p>
			</div>
		</div>


		<!-- v-bind:class 非单个单词的需要'' 单引号 -->
		<div class="weui-tab">
		    <div class="weui-navbar">
		        <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on':flag1}" @click="getOne()">
		           最近回复
		        </div>
		        <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on':flag2}" @click="getTwo()">
		            最近发布话题
		        </div>
		        <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on':flag3}" @click="getThree()">
		            话题收藏
		        </div>
		    </div>
		    <div class="weui-tab__panel">
		        <div v-show="flag1">
					
					<!-- 取四条  最近回复-->
		        	<div class="user_wrap" v-for="(replay,index) of data.recent_replies" v-if='index < 4'>
		        		<router-link :to='{name:"UserDetail",params:{loginname:replay.author.loginname}}'>
						<img v-bind:src="replay.author.avatar_url" height="48" width="48" alt="" >
		        		</router-link>
							
							<router-link :to='{name:"ArticleDetail",params:{id:replay.id}}'>	
								<div class="user_wrap_1">
									<p>{{replay.title}}</p>
								</div>
								<div class="user_wrap_2">
									<!--  -->
									<p>{{replay.author.loginname}}</span></p>
									<!--  -->
									<p>{{lastRplyToNow(replay.last_reply_at)}}</p>
								</div>
							</router-link>
						<div class="clear"></div>
					</div>
					<div v-show="!data.recent_replies.length" class="no_p">主人较懒，还未有最近回复！</div>
		        </div>


				<!-- 取四条  最近发布话题  -->
		        <div v-show="flag2">

		        	<div class="user_wrap" v-for="(topic,index) of data.recent_topics" v-if='index < 4'>
		        		<router-link :to='{name:"UserDetail",params:{loginname:topic.author.loginname}}'>
						<img v-bind:src="topic.author.avatar_url" height="48" width="48" alt="" >
						</router-link>

							<router-link :to='{name:"ArticleDetail",params:{id:topic.id}}'>
								<div class="user_wrap_1">
									<p>{{topic.title}}</p>
								</div>
								<div class="user_wrap_2">
									<!--  -->
									<p>{{topic.author.loginname}}</span></p>
									<!--  -->
									<p>{{lastRplyToNow(topic.last_reply_at)}}</p>
								</div>
							</router-link>
						<div class="clear"></div>
						
					</div>

					<div v-show="!data.recent_topics.length" class="no_p">主人较懒，还未发布过话题！</div>

		        </div>

		        <!-- 全部的收藏话题 -->
		        <div v-show="flag3">
		      
		        	<div class="user_wrap" v-for="(topic_collect,index) of topic_collect_data">
						<router-link :to='{name:"UserDetail",params:{loginname:topic_collect.author.loginname}}'>
						<img v-bind:src="topic_collect.author.avatar_url" height="48" width="48" alt="" >
						</router-link>

							<router-link :to='{name:"ArticleDetail",params:{id:topic_collect.id}}'>	
								<div class="user_wrap_1">
									<p>{{topic_collect.title}}</p>
								</div>
								<div class="user_wrap_2">
									<!--  -->
									<p>{{topic_collect.author.loginname}}</span></p>
									<!--  -->
									<p>{{lastRplyToNow(topic_collect.last_reply_at)}}</p>
								</div>
							</router-link>
						<div class="clear"></div>
						
					</div>

					<div v-show="!topic_collect_data.length" class="no_p">主人还未有收藏话题！</div>

		        </div>
		    </div>
		</div>



		<!-- <i class="iconfont icon-xiangzuo"></i> -->
		<div v-show="this.$store.state.accesstoken" class="ext-btn-reply" @click="ClearAccesstokenlogout()">注销</div>
	</div>
</template>

<script>
// 组件里都是用 this.$store 访问数据
	import BScroll from 'better-scroll'
	import axios from 'axios'
	const options = {
	  scrollY: true, // 因为scrollY默认为true，其实可以省略
	}	
	console.log('进入UserDetail 组件');
	export default{
		name:'UserDetail',
		data(){
			return{
				data:[],
				topic_collect_data:[],
				loading:false,
				flag1:true,
				flag2:false,
				flag3:false
			};
		},
		computed:{

		},
		methods:{

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
				var year = Math.floor(left/(365*24*3600*1000)); //年数

				var left_m = left % (365*24*3600*1000);
				var mouth = Math.floor(left_m / (30*24*3600*1000));	//月份

				var left_day = left_m % (30*24*3600*1000);
				var days=Math.floor(left_day/(24*3600*1000)); //天数

				//计算出小时数
				var left1=left_day%(24*3600*1000);    //计算天数后剩余的毫秒数
				var hours=Math.floor(left1/(3600*1000));
				
				//计算相差分钟数
				var left2=left1%(3600*1000);        //计算小时数后剩余的毫秒数
				var minutes=Math.floor(left2/(60*1000));
				if (year > 0) {
					return year + "年前";
				}
				else if (mouth > 0) {
					return mouth + "个月前";
				}
				else if (days > 0) {
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

			// 用户最近回复+最近发布数据
			getUserData(){
				var userName = this.$route.params.loginname;
				var url = 'https://cnodejs.org/api/v1/user/' + userName;
				console.log(url);
				axios.get(url).then(res=>{
					if (res.data.success) {
						this.data = res.data.data;

					}
				})
				.catch( err=>{
					console.log("UserDetail.vue 获取数据失败");
				});
			},
			// 用户收藏话题
			getUserTopicClection(){
				var loginname = this.$route.params.loginname;
				var url = "https://cnodejs.org/api/v1/topic_collect/" + loginname;
				axios.get(url).then(res=>{
					console.log("用户收藏话题状态"+res.data.success);
					if (res.data.success) {

						this.topic_collect_data = res.data.data;

					}
				})
				.catch( err=>{
					console.log("UserDetail.vue 获取用户收藏话题数据失败");
				});
			},

			// tab 第一个
			getOne(){
				this.getUserData();
				this.flag1 = true;
				this.flag2 = false;
				this.flag3 = false;
				console.log("最近回复");
			},
			// tab 第一个
			getTwo(){
				this.getUserData();
				this.flag1 = false;
				this.flag2 = true;
				this.flag3 = false;
				console.log("最近发布话题");
			},			
			// tab 第一个
			getThree(){
				this.getUserData();
				this.flag1 = false;
				this.flag2 = false;
				this.flag3 = true;
				console.log("话题收藏");
			},
			// 退出登入
			ClearAccesstokenlogout(){
				this.$store.commit("ClearAccessToken");
				this.$router.push('/login');
			},
			
		

		},
		mounted(){
	


		},
		beforeCreate(){


		},
		created(){
			this.getUserData();
			this.getUserTopicClection();
			// this.getData(); 
			//需要先拷贝一份 只想data的this 操作data() 里的数据
			// let _this = this;
			

		},

		watch:{

		},
		// 路由守卫

		beforeRouteUpdate (to, from, next) {
    		next();
    		this.getUserData();
			this.getUserTopicClection();
	    	
    		
		},



	};
	
</script>

<style>
	/*.weui-media-box{border-top: 1px solid red;}*/    
	.clear{clear: both;}
	.head{width: 100%;height: 12rem;border-bottom: 1px solid red;box-sizing: border-box;background: url('../assets/img/head_bg.jpg') center center no-repeat;}
	.img_wrap{height: 6rem;width: 100%;text-align: center;position: relative;}
	.img_wrap img{width: 5rem;height: 5rem;border-radius: 50%;margin-top: 1rem;}
	.head .name_wrap{color:white;font-size: 20px;text-align: center;}
	.head .name_wrap p{text-align: center;}

	.weui-bar__item_on{color: #04be02;border-bottom: 1px solid #04be02; }

	.weui-tab__panel .user_wrap{height: 4rem;border-bottom: 1px solid gray;}
	.user_wrap{width: 96%;height: 4rem;margin: 0 auto;position: relative;overflow: hidden;box-sizing: border-box;padding: 0.5rem;}
	.user_wrap img{display:block;width: 2.7rem;height: 2.7rem;border-radius: 50%;margin-top: 0.2rem;margin-right: 1rem;float: left;}
	/**/
	.user_wrap_1{float: left;width: 80%;text-align: left;}
	.user_wrap_1 p:nth-of-type(1){float: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;width: 100%;}
	.user_wrap_1 p:nth-of-type(2){float: right;}
	.user_wrap_2{float: left;width: 80%;}
	.user_wrap_2 p:nth-of-type(1){float: left;width: 10rem;text-align: left;}
	.user_wrap_2 p:nth-of-type(2){float: right;}
	.no_p{color: #023926;font-size: 2rem;margin:5rem auto 0 auto;text-align: center;width: 80%;}


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