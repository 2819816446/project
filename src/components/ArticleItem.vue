<template>
	<div class="artivle_wrap" ref="artivle_wrap">
		<div class="weui-panel weui-panel_access">
		    <div class="weui-panel__bd">
				

				<div class="weui-loadmore" v-if="loading">
		            <span v-if="!loading" class="weui-loadmore__tips">下拉刷新</span>
		            <i class="weui-loading"></i>
		            <span class="weui-loadmore__tips">正在加载</span>
		        </div>



		        <a v-for='item of articleLists' :key='item.length' href="javascript:void(0);" class="weui-media-box">
					<div class="art_hd_wrap">
						<p class="top" v-show="item.top">置顶</p>
						<p id="no_top" v-show="!item.top">{{transToCN(item.tab)}}</p>
						<p class="title">{{item.title}}</p>
					</div>
					<div class="user_wrap">
						<img v-bind:src="item.author.avatar_url" height="48" width="48" alt="" >
						<div class="user_wrap_1">
							<p>{{item.author.loginname}}</p>
							<p><span>{{item.reply_count}}</span> / <span>{{item.visit_count}}</span></p>
						</div>
						<div class="user_wrap_2">
							<p>创建于：<span>{{formatTime(item.create_at)}}</span></p>
							<p>{{lastRplyToNow(item.last_reply_at)}}</p>
						</div>
						<div class="clear"></div>
					</div>
		        </a>
		        


		        		        		        
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
	console.log('进入Article 组件');
	export default{
		name:'ArticleItem',
		data(){
			return{
				data:[],
				loading:false,
			};
		},
		computed:{
			// 使用 state里同名属性当做计算属性来获取 articleLists
			articleLists(){
				// 复制一份 articleLists 到本地的 data(深度拷贝 data变 state.articleLists也会变)
				this.data = this.$store.state.articleLists;
				console.log("article  data为："+this.data);
				return this.$store.state.articleLists;
				
			},
		},
		methods:{
			getData(){
				this.$store.dispatch('getArticleLists');
				console.log("getdata trigger");
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
			refreshData(){
				axios.get('https://cnodejs.org/api/v1/topics', {
				    params: {
				      page : 1,
				      limit:20,
				      mdrender:false
				    }
				  })
				  .then(function (response) {
				    console.log(response);
				    return response
				    
				  })
				  .catch(function (error) {
				    console.log(error);
				  });

			},			




		},
		mounted(){
	


		},
		created(){
			this.getData(); 
			//需要先拷贝一份 只想data的this 操作data() 里的数据
			let _this = this;
	        this.$nextTick(() => {


				options.pullDownRefresh = {
				  threshold: 50, // 当下拉到超过顶部 50px 时，触发 pullingDown 事件
				  stop: 20 // 刷新数据的过程中，回弹停留在距离顶部还有 20px 的位置
				}	        	
		        this.scroll = new BScroll(this.$refs.artivle_wrap, options)
		  
				this.scroll.on('pullingDown', () => {
				 axios.get('https://cnodejs.org/api/v1/topics', {
				    params: {
				      page : 1,
				      limit:20,
				      mdrender:false
				    }
				  })
				  .then(function (response) { 
				  	if (response.data.success) {
				  		_this.$store.commit('addArticleLists',response.data.data);
				  		//   
				  		this.scroll.finishPullDown(); 
				  		this.scroll.refresh();  
				  		
				  	}
				    console.log("下拉后获取新数据为："+response.data.success);
				    
				    
				  })
				  .catch(function (error) {
				    console.log(error);
				  });
				});

				// scroll  滚动过程中  完成
				this.scroll.on('scroll', (pos) => {
					if(pos.y > 40){
						_this.loading = true;
					}else if(pos.y < 30){
						_this.loading = false;

					}
				})
				// touchEnd  完成   
				this.scroll.on('touchEnd', (pos) => {
					
					
				});
		    })


			

		},

		watch:{

		},


	};
	
</script>

<style>
	/*.weui-media-box{border-top: 1px solid red;}*/    
	.clear{clear: both;}
	.artivle_wrap{height: 36rem;}

	.art_hd_wrap{width: 96%;height: 2rem;margin: 0 auto;}
	.art_hd_wrap p{float: left;text-align: left;}
	.art_hd_wrap p:nth-of-type(1){width: 2.5rem;height: 1.5rem;border-radius: 2px;color: white;background:#80BD01;margin-top: 0.25rem;margin-right: 1rem;text-align: center;}
	.title{line-height: 2rem;width: 15rem;height: 2rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	#no_top{width: 2.5rem;height: 1.5rem;border-radius: 2px;color: black;background:#E3E3E3;margin-top: 0.25rem;margin-right: 1rem;text-align: center;}

	.user_wrap{width: 96%;height: 3rem;margin: 0 auto;position: relative;overflow: hidden;}
	.user_wrap img{display:block;width: 2.7rem;height: 2.7rem;border-radius: 50%;margin-top: 0.2rem;margin-right: 1rem;float: left;}
	/**/
	.user_wrap_1{float: left;width: 80%;}
	.user_wrap_1 p:nth-of-type(1){float: left;}
	.user_wrap_1 p:nth-of-type(2){float: right;}
	.user_wrap_2{float: left;width: 80%;}
	.user_wrap_2 p:nth-of-type(1){float: left;width: 10rem;text-align: left;}
	.user_wrap_2 p:nth-of-type(2){float: right;}

	/**/
	a.weui-media-box:active{background:none;cursor: pointer;}

	.show{opacity: 1;display: block;}
	.hide{opacity: 0;display: none;}
	#loadingToast{opacity: 0;display: none;}
</style>