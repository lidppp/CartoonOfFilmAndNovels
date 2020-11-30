<script>
	export default {
		onLaunch: function() {
			console.log('App Launch');
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		}
	};
</script>

<style>
	/* 解决头条小程序组件内引入字体不生效的问题 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	

	/* #endif */

	@font-face {
		font-family: 'iconfont';
		/* project id 1997429 */
		src: url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.eot');
		src: url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.eot?#iefix') format('embedded-opentype'),
			url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.woff2') format('woff2'),
			url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.woff') format('woff'),
			url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.ttf') format('truetype'),
			url('https://at.alicdn.com/t/font_1997429_8xzvctxta3u.svg#iconfont') format('svg');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-webkit-text-stroke-width: 0.2px;
		-moz-osx-font-smoothing: grayscale;
	}

	*,
	view {
		box-sizing: border-box;
	}
	
	.sd{
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
	}
	
	.container {
		padding: 0 30rpx;
	}
	
	/**
	 * 文本的溢出显示省略号  
	 * 添加`class="hidden1"`  1行溢出出现省略号
	 * 添加`class="hidden2"`  2行溢出出现省略号
	 * ...
	 * 添加`class="hidden5"`  5行溢出出现省略号
	 */
	.hidden2,
	.hidden3,
	.hidden4,
	.hidden5 {
	  display: -webkit-box;
	  /* autoprefixer:off */
	  -webkit-box-orient: vertical;
	  overflow: hidden;
	}
	.hidden1 {
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	.hidden2 {
	  -webkit-line-clamp: 2;
	}
	.hidden3 {
	  -webkit-line-clamp: 3;
	}
	.hidden4 {
	  -webkit-line-clamp: 4;
	}
	.hidden5 {
	  -webkit-line-clamp: 5;
	}
</style>
