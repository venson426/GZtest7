import axios from "axios";
import queryString from "querystring";

const url = "https://www.quntitong.cn/sportinterNew/androidorder/checkOrder.do";

const body = queryString.stringify(
    {
        "userID": "8a42f49292e20335019396a96d213928",
        "cgId": "402881b441a660630141a712b12f0046",
        "cgCode": "0020C061256",
        "cgtype": "3",
        "openDate": "2025-04-12",
        "ordertotal": "70",
        "queryType": "android",
        "storeIds": "8a42f4879601002301960bd92aeb091e",
        "citys": "440100",
        "sign": "CFDDA9C2CD9CBADDE2AAFEF1CDA193EC"
    }
);

const headers = {
    "Host": "www.quntitong.cn",
    "Connection": "keep-alive",
    "Content-Length": "250",
    "xweb_xhr": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275",
    "Content-Type": "application/x-www-form-urlencoded",
    "Accept": "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://servicewechat.com/wxe350a6af6d22b9e8/174/page-frame.html",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9"
};

request();

async function request() {
    const response = await axios.post(url, body, headers);
    console.log(response.data);
}