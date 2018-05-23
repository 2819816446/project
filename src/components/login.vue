<template>
	<div class="login_wraop" style="min-height: 667px;">
		<img src="https://cnodejs.org/public/images/cnodejs.svg" alt="">
		<p class="login_tip">登录到Cnodejs.org</p>

		<div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">AccessToken</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input"  placeholder="请输入AccessToken" v-model="accesstoken">
            </div>
        </div>
        <div class="btn_wrap">
        	<!-- <a href="javascript:;" class="weui-btn weui-btn_mini weui-btn_plain-default" @click="go('/')">随便逛逛</a> -->
        	<a href="javascript:;" @click="login()" class="weui-btn weui-btn_mini weui-btn_primary">登入</a>
        </div>	


		<div class="weui_loading_toast" v-bind:class="{mask_hide:!loading}">
			<div class="weui_mask_transparent"></div>
			 <div class="weui_toast"><i class="weui-loading weui-icon_toast"></i> <p class="weui_toast_content">Loading
		      </p>
		  </div>
		</div>        
		<!-- toast -->
		<div id="toast" class="" v-bind:class="{show:login_success,hide:!login_success}">
	        <div class="weui-mask_transparent"></div>
	        <div class="weui-toast">
	            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
	            <!-- <p v-if="loginname" class="weui-toast__content">登入成功</p> -->
	            <!-- <p v-if="!loginname" class="weui-toast__content">AccessToken错误</p> -->
	        </div>
	    </div>   



	</div>


</template>

<script>
// 组件里都是用 this.$store 访问数据
	import BScroll from 'better-scroll'
	// import axios from 'axios'
	import axios_my from '../http/http_my.js'

	const options = {
	  scrollY: true, // 因为scrollY默认为true，其实可以省略
	}	
	console.log('进入Login 组件');
	export default{
		name:'Login',
		data(){
			return{
				data:[],
				loginname:'',
				accesstoken:"",
				// 控制toast显示影藏
				login_success:false,
				// 控制mask显示影藏
				loading:false
			};
		},
		computed:{

		},
		methods:{
			go(url){
				this.$router.push(url);
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
			login(){
				console.log(this.$router);
				console.log(this.$route);
				this.loading = true;
				var accessToken = this.accesstoken;
				console.log(accessToken)

				// post 请求，直接加参数，无需params
				var url = 'https://cnodejs.org/api/v1/accesstoken';
				console.log(url);
				axios_my.post(url,{
					accesstoken:accessToken
				}).then(res=>{
					if (res.data.success) {
						this.loginname = res.data.loginname;
						this.loading = false;
						console.log("axios then成功");

						// this.login_success = true;

						// 设置loginname
						this.$store.commit('login',res.data.loginname);
						// 设置accesstoken
						this.$store.commit('addAccessToken',accessToken);

						console.log("login.vue name:"+res.data.loginname);

						//.query.redirect this.$router.push({name:"UserDetail",params:{loginname:res.data.loginname}});
						
						var query_full_path = this.$route.query.redirect;
						if (query_full_path) {

							this.$router.push(query_full_path);
						}else{
							
							this.$router.push({name:"UserDetail",params:{loginname:res.data.loginname}});
						}



					}
					

				})
				.catch( err=>{
					// 取消loading
					this.loading = false;
					// this.login_success = true;
					// 显示错误toast
					console.log("login.vue 获取数据失败");
				});


			},



			getLoginname(){
				// this.loginname = this.$store.commit('getLoginname');

			},
		
		 

		},
		mounted(){
			this.getLoginname();
			


		},
		beforeCreate(){


		},
		created(){
			

		},

		watch:{
			login_success:function () {
				if (this.login_success == true) {
					this.login_success == false
				}
			}

		},
		// 路由守卫

		beforeRouteUpdate (to, from, next) {
    		next();

	    	
    		
		},



	};
	
</script>

<style scoped>
	body{background: #f4f4f4;}
	.login_wraop{width: 100%;height: 15rem;margin: 0 auto;background: #f4f4f4;}
	.login_wraop img{ width: 90%;margin: 0 auto;}
	.login_wraop p{text-align: center;}
	.login_tip{margin: 0 auto;}
	.weui-cell{background: white;margin-top: 1rem;box-sizing: border-box;width: 97%;margin: 0 auto;}

	.btn_wrap{width: 100%;margin-top: 1rem;height: 3rem;} 
	.btn_wrap a{width:95%;height: 2rem;font-size: 1rem;margin: 0 auto;}
	/*.btn_wrap a{width: 8rem;margin-left: 1rem;height: 2rem;font-size: 1rem;}*/


	.show{opacity: 1; display: block;}
	.hide{opacity: 0; display: none;}
	.mask_hide{display: none;}
	.mask_show{display: block;}


	
</style>