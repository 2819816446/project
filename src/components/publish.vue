<template>

	<div class="publish_wrap">
		<div class="hd">
			<p class="hd_title">新话题</p>
			<p class="hd_btn" @click="publishPost()">发布</p>
		</div>						
		<div class="weui-cells">
			<div class="weui-cell weui-cell_select">
			    <div class="weui-cell__bd">
			        <select class="weui-select" name="select1" v-model="publish_type">
			            <option selected value="1">分享</option>
			            <option value="2">问答</option>
			            <option value="3">招聘</option>
			            <option value="4">测试</option>
			        </select>
			    </div>
			</div>

		</div>

		<div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" placeholder="标题，字数10字以上" v-model="publish_title">
                </div>
            </div>
        </div>		

		<div class="weui-cells weui-cells_form">
            <div class="weui-cell">
                <div class="weui-cell__bd">
                    <textarea class="weui-textarea" placeholder="说点内容吧.." rows="13" v-model="publish_content"></textarea>
                </div>
            </div>
        </div>   

        <p class="publish_tip"> 由于是测试帖，所以默认固定发布在dev 专区(即测试)，以免污染日常的版面</p>     
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Publish',
  data () {
    return {
      publish_type: '',
      publish_title: '',
      publish_content: ''
    }
  },
  computed:{

  },
  methods:{
  	publishPost(){

  		axios.post("https://cnodejs.org/api/v1/topics",{
  			accesstoken:this.$store.state.accesstoken,
  			title:this.publish_title,
  			tab:"dev",
  			content:this.publish_content
  		}).then(res=>{
  			console.log(res)
  		})
  		.catch(err=>{
  			console.log("publish 发布失败"+err)

  			
  		});
  	}
  }
}
</script>

<style>
	.hd{width: 100%;height: 3rem;box-sizing: border-box;padding: 0 20px;background: #F4F4F4;line-height: 3rem;}
	.hd_title{float: left;}
	.hd_btn{color: white;background: #04BE02;width: 4rem;height: 2rem;border-radius: 5px;float: right;line-height: 2rem;margin-top: 0.5rem;text-align: center;}
	.publish_tip{width: 90%;margin: 0 auto;color: red;}
</style>