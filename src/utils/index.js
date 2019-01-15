function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}
export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}
// export function cutTimes(i,discount) {
//         //获取当前时间
//         // console.log(discount)
//         let that=this
//         var date = new Date();
//         var now = date.valueOf();
//         //设置截止时间
//         var endDate = new Date(that.discount.endtime).valueOf();
//         //时间差
//         var leftTime = endDate - now;
//         //定义变量 d,h,m,s保存倒计时的时间 
//         if(leftTime >= 0) {
//           var interval = setInterval(function () {
//            that.discount[i].d = parseInt(leftTime / 1000 / 60 / 60 / 24,10);
//            that.discount[i].h = parseInt(leftTime / 1000 / 60 / 60 % 24,10);
//            that.discount[i].m = parseInt(leftTime / 1000 / 60 % 60,10);
//            that.discount[i].s = parseInt(leftTime / 1000 % 60,10);
//             leftTime = leftTime - 1000;
//           const t1 = [d, h, m,s].map(formatNumber).join('/')
          
//            // console.log(t1)
//           },1000) 
//         }
//         else{
//           clearinterval(interval)
//         }     

// }
export default {
  formatNumber,
  formatTime,
}
