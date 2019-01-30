

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

    //定时器
    checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
    

}