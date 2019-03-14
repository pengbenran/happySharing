

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

export default {

    //加载提示框
    showToast:(title,icon) => {
        wx.showToast({
            title: title,
            icon: icon,
            duration: 2000
          })
    },

    showModel:(title,url) => {
        wx.showModal({
            title: '提示',
            content: title,
            success(res) {
              if (res.confirm) {
                wx.navigateTo({
                    url: url,
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },

    //定时器
    checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    

}