//遇到的坑和七七八八的bug
// 5.3 的封装 在encryption和decryption里面 多写了async。导致怎末都跑不下去。删除async出球场目录
// 5.2 一定要复制粘贴抓包名字 昨天I，L写错导致3个小时抓bug。
// 5.3 request(); concurrencyRequest 偷跑原因，Server Error：请求不合法。就是有程序偷跑
//mianStore是一个超级大的对象数组！
//把所有加密和body都放在function，这样每一次的dataObj到加密再到body整个流程都是新的，如果只放全局只会执行一次。
// saveOrder把后面全部做完然后在request放个body，现在body里面是全新的程序。此body彼body。
// async function request(body) {

//重点return boday中的“body”不要看，只要这个function叫什么名字。名字是setSaveOrder。！！！！重点！！
//顺序很重要把dataObj放在加密前面，否者根本不能（参数不对）
//queryStoreByType和saveOrder的时间都要在有效时间和同步！
//setSaveOrder这个function已经把场地和时间封装好了，就直接输入正常数字就好。