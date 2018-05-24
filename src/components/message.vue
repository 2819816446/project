<template>
	<div class="u_wrap">

		<!-- v-bind:class 非单个单词的需要'' 单引号 -->
		<div class="weui-tab">
		    <div class="weui-navbar">
		        <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on':flag1}" @click="getOne()">
		           未读消息
		        </div>
		        <div class="weui-navbar__item" v-bind:class="{'weui-bar__item_on':flag2}" @click="getTwo()">
		            已读消息
		        </div>
		    </div>
		    <div class="weui-tab__panel">
		        <div v-show="flag1">
					
					 <!-- 取四条  未读消息 -->

		        	<div class="user_wrap" v-for="(weidu,index) of weidu_data" v-if='index < 4'>
		        		<router-link :to='{name:"UserDetail",params:{loginname:weidu.author.loginname}}'>
						<img v-bind:src="weidu.author.avatar_url" height="48" width="48" alt="" >
		        		</router-link>
							
							<router-link :to='{name:"ArticleDetail",params:{id:weidu.id}}'>	
								<div class="user_wrap_1">
									<p>{{weidu.topic.title}}</p>
								</div>
								<div class="user_wrap_2">
									<!--  -->
									<p>{{weidu.author.loginname}}</span></p>
									<!--  -->
									<p>{{lastRplyToNow(weidu.topic.last_reply_at)}}</p>
								</div>
							</router-link>
						<div class="clear"></div>
					</div>
					<div v-show="!weidu_data.length" class="no_p">暂无消息</div>

		        </div>


				<!-- 取四条  已读消息  -->
		        <div v-show="flag2">
						
					<div class="no_p">暂无消息</div>
				
		        </div>

		    </div>
		</div>


	</div>
</template>

<script>
// 组件里都是用 this.$store 访问数据
	import BScroll from 'better-scroll'
	import axios from 'axios'
	const options = {
	  scrollY: true, // 因为scrollY默认为true，其实可以省略
	}	
	console.log('进入Message 组件');
	export default{
		name:'Message',
		data(){
			return{
				weidu_data:[],
				yidu_data:[],
				loading:false,
				flag1:true,
				flag2:false
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
			getMessage(){
				// 刷新后vuex清空，直接取会出现问题。
				// var at = this.$store.state.accesstoken;
				  var at = localStorage.getItem("accesstoken");

				var url = 'https://cnodejs.org/api/v1/messages';
				console.log(url);
				axios.get(url,{
					params:{
						accesstoken:at
					}
				}).then(res=>{
					if (res.data.success) {

						this.weidu_data = res.data.data.hasnot_read_messages;
						this.yidu_data = res.data.data.has_read_messages;

					}
				})
				.catch( err=>{
					console.log("Message.vue 获取数据失败");
				});
			},


			// tab 第一个
			getOne(){

				this.getMessage();
				this.flag1 = true;
				this.flag2 = false;
				console.log("未读消息");
			},
			// tab 第一个
			getTwo(){
				this.getMessage();
				this.flag1 = false;
				this.flag2 = true;
				console.log("已读消息");
			},			


		

		},
		mounted(){
	


		},
		beforeCreate(){


		},
		created(){
			this.getMessage();
			// this.getData(); 
			//需要先拷贝一份 只想data的this 操作data() 里的数据
			// let _this = this;
			

		},

		watch:{

		},
		// 路由守卫

		beforeRouteUpdate (to, from, next) {
    		next();
    		// this.getMessage();
	    	
    		
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

	

</style>