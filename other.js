//遇到的坑和七七八八的bug
// 5.3 的封装 在encryption和decryption里面 多写了async。导致怎末都跑不下去。删除async出球场目录
// 5.2 一定要复制粘贴抓包名字 昨天I，L写错导致3个小时抓bug。
// 5.3 request(); concurrencyRequest 偷跑原因，Server Error：请求不合法。就是有程序偷跑
//mianStore是一个超级大的对象数组！