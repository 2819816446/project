<template>
	<div class="footer">
		<div class="weui-tab">
		    <div class="weui-tab__panel">

		    </div>
		    <div class="weui-tabbar">
		    	
		        <a href="javascript:;" class="weui-tabbar__item " v-bind:class="{'weui-bar__item_on':active1}" @click="go('/')">
		    		<router-link :to='{name:"ArticleItem"}'>
		            <i class="iconfont icon-shouye"></i>
		            <p class="weui-tabbar__label">首页</p>
		            </router-link>
		        </a>
		   		
		        <a href="javascript:;" v-bind:class="{'weui-bar__item_on':active2}" class="weui-tabbar__item"@click="go('/publish')">
		            <i class="iconfont icon-fabu"></i>
		            
		            <p class="weui-tabbar__label">发布</p>
		        </a>
		        <a href="javascript:;" v-bind:class="{'weui-bar__item_on':active3}" class="weui-tabbar__item" @click="go('/message')">
		            <i class="iconfont icon-xiaoxi"></i>
		            
		            <p class="weui-tabbar__label">消息</p>
		        </a>
		        <!-- !this.$store.state.accesstoken 取state里的accesstoken 刷新后，accesstoken就清空了，会出现再次登入的情况   localStorage.accesstoken --> 
		        <a v-if="!this.$store.state.accesstoken" href="javascript:;" v-bind:class="{'weui-bar__item_on':active4}" class="weui-tabbar__item" @click="go('/login')">
		            <i class="iconfont icon-04"></i>
		           
		            <p class="weui-tabbar__label">我的</p>
		        </a>

		        <a v-if="this.$store.state.accesstoken" href="javascript:;" v-bind:class="{'weui-bar__item_on':active4}" class="weui-tabbar__item" @click="go('/me')">
		            <i class="iconfont icon-04"></i>
		           
		            <p class="weui-tabbar__label">我的</p>
		        </a>		        
		    </div>
		</div>


	</div>
</template>

<!-- 需在main.js首页引入weui.css等模块 -->
<script>
	
	export default{
		data(){
			return{
				active1:true,
				active2:false,
				active3:false,
				active4:false,
				router_name:"",
				loginname:"",
				accesstoken:""

			}
		},
		computed:{
			loginname(){
				this.loginname = this.$store.state.loginname;
				cconsole.log("foter-loginname:"+loginname);
				
			},

		},
		methods:{
			go(url){


				if (url == "/") {
					this.active1 = true;
					this.active2 = false;
					this.active3 = false;
					this.active4 = false;
				}else if(url == "/publish"){
					this.active1 = false;
					this.active2 = true;
					this.active3 = false;
					this.active4 = false;
				}else if(url == "/message"){
					this.active1 = false;
					this.active2 = false;
					this.active3 = true;
					this.active4 = false;
				}else if(url == "/login" || url == "/me"){
					this.active1 = false;
					this.active2 = false;
					this.active3 = false;
					this.active4 = true;
				}



				if(url == "/me"){
					// token 里存loginnane
					this.$router.push({name:"UserDetail",params:{loginname:this.$store.state.loginname}});
				}else{
					this.$router.push(url);

				}
				// var accesstoken = router.app.$options.store.state.accesstoken;
				console.log(this.$store.state);


				// var accesstoken = this.$router.state.accesstoken;
				// console.log("Foter-bar accesstoken"+accesstoken);
	    		// if(accesstoken){
	    		// 	next({name:'UserDetail',});
	    		// }else{
	    		// 	{name:"UserDetail",params:{loginname:topic_collect.author.loginname}}
		    	// 	next();
	    		// }

			},




		},

		created(){
			console.log("aaaaaaaa");
			


		},
		beforeMount(){
			this.accesstoken = localStorage.getItem('accesstoken');
		},
		mounted(){
			// console.log("footerBar-router:"+ this.$router);
			
		},

		beforeRouteEnter (to, from, next) {
    		// this.getUserData();
			// this.getUserTopicClection();
			// console.log("aaaaaaaa"+this.loginname);
    		// this.loginname = localStorage.getItem('loginname');

	    	next();

	    	
    		
		},

	}
</script>

<style>
	@import url('../../static/font/iconfont.css')
	.footer{position:fixed;bottom:0;width: 100%;height: 3rem;}
	.weui-tabbar{position: fixed;}
	.weui-bar__item_on i{color: #09BB07;}



</style>