import axios from "axios";
import { findWhiteGapEdge } from "./utils/imageOperation.js";

const url = "https://www.quntitong.cn/sportinterNew/captcha/sliderVerify.do";

const headers = {
    "Host": "www.quntitong.cn",
    "Connection": "keep-alive",
    "xweb_xhr": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MicroMessenger/7.0.20.1781(0x6700143B) NetType/WIFI MiniProgramEnv/Windows WindowsWechat/WMPF WindowsWechat(0x63090c11)XWEB/11275",
    "Content-Type": "application/json",
    "Accept": "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Dest": "empty",
    "Referer": "https://servicewechat.com/wxe350a6af6d22b9e8/174/page-frame.html",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.9"
};

export async function request() {
    try {
        const response = await axios.get(url, headers);
        // console.log(response.data);

        const leftDistance = await findWhiteGapEdge(response.data.bgImg);
        // console.log(leftDistance);

        const captchaData = {
            imageId: response.data.imageId,
            leftDistance: leftDistance
        }

        return captchaData;

    } catch(error) {
        if(error.response) {
            console.log("Server Error:", error.response.data);
        } else {
            console.log("Error", error.message);
        }
    }
}