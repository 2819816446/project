<template>
	<div class="footer">
		<div class="weui-tab">
		    <div class="weui-tab__panel">

		    </div>
		    <div class="weui-tabbar">
		        <a href="javascript:;" class="weui-tabbar__item weui-bar__item_on">
		            
		            <i class="iconfont icon-shouye"></i>
		            <p class="weui-tabbar__label">首页</p>
		        </a>
		        <a href="javascript:;" class="weui-tabbar__item">
		            <i class="iconfont icon-fabu"></i>
		            
		            <p class="weui-tabbar__label">发布</p>
		        </a>
		        <a href="javascript:;" class="weui-tabbar__item">
		            <i class="iconfont icon-xiaoxi"></i>
		            
		            <p class="weui-tabbar__label">消息</p>
		        </a>
		        <a href="javascript:;" class="weui-tabbar__item">
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

	}
</script>

<style>
	@import '../static/font/iconfont.css'
	.footer{position:fixed;bottom:0;width: 100%;height: 3rem;}
	.weui-tabbar{position: fixed;}
	.weui-bar__item_on i{color: #09BB07;}
</style>