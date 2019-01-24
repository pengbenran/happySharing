export default {
    showToast:(title,icon) => {
        wx.showToast({
            title: title,
            icon: icon,
            duration: 2000
          })
    },
    

}