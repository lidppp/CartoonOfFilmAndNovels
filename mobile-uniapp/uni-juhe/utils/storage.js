	
	/**
	 * data
	 {
		coverImg // 预览图片地址
		lastNum  // 最后观看章节名
		name     // 名字
		url1     // url1
		index    // 最后观看的章节下标
	 }
	 * 
	 * */
	 //  设置本地缓存
function SetStorage(key,data){
	let history = uni.getStorageSync(key)
	if (typeof history !== 'object') {
		history = []
	}
	
	let have = false
	history.forEach((value) => {
		if (value.url1 === data.url1) {
			have = true
			value.index = data.index
			value.lastNum = data.lastNum
			value.coverImg = data.coverImg
			value.name = data.name
			value.url1 = data.url1
		}
	})
	if (!have) {
		history.push({
			coverImg:data.coverImg,
			lastNum:data.lastNum,
			name:data.name,
			url1:data.url1,
			index:data.index
		})
	}
	
	uni.setStorageSync(key,history)
}

function GetStorage(key){
	return uni.getStorageSync(key) || []
}

function RemoveStorage(key,data){
	let history = uni.getStorageSync(key)
	if (typeof history !== 'object') {
		history = []
	}
	
	let have = false
	let index = -1
	history.forEach((value,i) => {
		if (value.url1 === data.url1) {
			
			index = i
		}
	})
	if(index !== -1){
		history.splice(index,1)
		uni.setStorageSync(key,history)
		return true
	}
	return false
	
}

export default{
	SetStorage,
	GetStorage,
	RemoveStorage
}