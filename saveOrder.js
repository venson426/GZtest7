import axios from "axios";
import { encrypt, generatekey, getRSAData } from "./utils/encryption.js";
import { decrypt, getRSAData_de } from "./utils/decryption.js";



const url = "https://www.quntitong.cn/sportinterNew/androidsign/saveOrder.do";

const headers = {
    "Host": "www.quntitong.cn",
    "Connection": "keep-alive",
    "Content-Length": "796",
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

// request(); concurrencyRequest 偷跑原因，Server Error：请求不合法。就是有程序偷跑

// saveOrder把后面全部做完然后在request放个body，现在body里面是全新的程序。此body彼body。
//在export出去concurrencyRequest
export async function request(body) {
    try {
        const response = await axios.post(url, body, headers);
        console.log(response.data);

        const RSAData_de = getRSAData_de(response);
        const ASEData_de = decrypt(response.data.encryptData, RSAData_de);
        console.log(ASEData_de);

    } catch(error) {
        if(error.response) {
            console.error("Server Error:", error.response.data);
        } else {
            console.error("Error", error.message);
        }
    }       
}

export function setSaveOrder(captchaData, mainStore, flidNum, flidTime) {
    
    const dataObj = {
    
        cgId: "402881b441a660630141a712b12f0046",
        cgCode: "0020C061256",
        cgtype: "3",
        terminal: "10",
        
        // ordertotal: "",
        // os: "wx",
        // queryType: "android",
        // lon: "",
        // lat: "",
        // subAdress: "",
        // sportsNum: "",
        // citys: "440100",
        
    
        userID: "8a42f4917765e50a0178111dff593b09",
        openDate: "2025-05-06",
        timestamp: Date.parse(new Date()) / 1e3,
        captchaId: "",
        captchaPoint: "",
        storeIds: ""
    };
    
    dataObj.captchaId = captchaData.imageId;
    dataObj.captchaPoint = captchaData.leftDistance;
    dataObj.storeIds = mainStore[flidNum - 1].storeList[flidTime - 6].resourceid;
    dataObj["num".concat(dataObj.storeIds)] = 1;
//e 就是代替dataObj

    console.log(dataObj);

    const data = JSON.stringify(dataObj);
    
    const ASEKey = generatekey();
    const ASEData = encrypt(data, ASEKey);
    const RSAData = getRSAData(ASEKey);
    

    const body = {
        "type": "minip",
        "secretKey": RSAData,
        "encryptData": ASEData
    };

    return body;
}

//mianStore是一个超级大的对象数组！
//把所有加密和body都放在function，这样每一次的dataObj到加密再到body整个流程都是新的，如果只放全局只会执行一次。
//重点return boday中的“body”不要看，只要这个function叫什么名字。名字是setSaveOrder。！！！！重点！！
//顺序很重要把dataObj放在加密前面，否者根本不能（参数不对）
//queryStoreByType和saveOrder的时间都要在有效时间和同步！
//setSaveOrder已经把场地和时间用function封装好了，就直接输入正常数字就好。
//一个storeIds逼死无数人！！！！最后不能下单就是storeIds！！！