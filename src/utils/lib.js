

export default {

    //加载提示框
    showToast:(title,icon) => {
        wx.showToast({
            title: title,
            icon: icon,
            duration: 2000
          })
    },
    

}