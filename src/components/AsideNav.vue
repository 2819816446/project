
<template>
	<div class="aside_wrap">
		<el-row class="tac">
			<el-col>
				<el-menu
					default-active="1-1"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					background-color="#3879D9"
					text-color="#ffffff"
					active-text-color="#000000">
					<el-submenu index="1">
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>导航一</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="1-1">即将上映</el-menu-item>
							<el-menu-item index="1-2">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item index="1-3">选项3</el-menu-item>
						</el-menu-item-group>
	
					</el-submenu>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<span slot="title">导航二</span>
					</el-menu-item>
					<el-menu-item index="3" disabled>
						<i class="el-icon-document"></i>
						<span slot="title">导航三</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">导航四</span>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
	.aside_wrap{float: left;}
	/*.aside_wrap{width: 230px;height: 650px;background:#3879D9;}*/

	/*width: 200px*/
	.el-menu-vertical-demo {width:200px;min-height: 600px;overflow: hidden;}
	/*头部一级导航*/
	.el-submenu__title{text-align: left;font-size:17px;}
	/*头部一级导航 i标签*/
	.el-submenu__title i{color: white;font-size: 18px;}
	/*二级导航item项*/
	.aside_wrap .el-menu-item{width: 180px;margin-left: 20px;font-size:16px;overflow: hidden;}
	/*二级导航item项  选中*/
	.aside_wrap .el-menu-item.is-active{border-left:2px solid black;background-color:#336DC4; }
</style>