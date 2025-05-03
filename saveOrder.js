import axios from "axios";
import { encrypt, generatekey, getRSAData } from "./utils/encryption.js";
import { decrypt, getRSAData_de } from "./utils/decryption.js";


const dataObj = {
    
    cgId: "402881b441a660630141a712b12f0046",
    cgCode: "0020C061256",
    cgtype: "3",
    terminal: "10",
    
    ordertotal: "70",
    os: "wx",
    queryType: "android",
    lon: "",
    lat: "",
    subAdress: "",
    sportsNum: "",
    citys: "440100",
    

    userID: "8a42f49292e20335019396a96d213928",
    openDate: "2025-05-04",
    timestamp: Date.parse(new Date()) / 1e3,
    captchaId: "",
    captchaPoint: "",
    storeId: ""
};



const data = JSON.stringify(dataObj);

const ASEKey = generatekey();
const ASEData = encrypt(data, ASEKey);
const RSAData = getRSAData(ASEKey);

const url = "https://www.quntitong.cn/sportinterNew/androidsign/saveOrder.do";

const body = {
    "type": "minip",
    "secretKey": "P82ZRAxRG70wY138xHiYClx7DFKaAlcZhntkq7PUEv6C83erPiWQuWR7zaI7p6AL9s7KlAK1N2ndn+poITAQcgpBjRctcRsh9h8CugchMHjtUPuzKwSIuFEX7ISNzTsFIQIj0E62kqcgfB1C7E1J47Vic8EMy/lhNuh9NQLeSig=",
    "encryptData": "x5/+EFKZ11nD7HKA7dYud8j5rmAjxolIuQU3ZtEFlzWQR58D1ylnTXFgw8G8nMTkhZ7uzUL1z1rmlVO+07sph3AH70GmAytKltNUI1s+8g0AsGhtdk25vW6YC9NvaSYEuDPCqpgbUPQU6J+NujfZjjr8lkUNoXQ8YwQv8jXtYzQ7WXsNsYd9czFwlw4MBU7+kqRZIuIZKAEfHiofHv3oyKqVrTro4uji5D3q4ZqPK4e8j9nehhl1qu991z9A1nw41RAj2jCRAXvXsp/GpCzpLW3Kt3QGtjPGJJ269tc7pIDWIhpynhyRiQ7G6ki6QKJaxOYQKWZGTsZFFpaEpH2s0cedNHrkaEuEf35VZt4Ev8XLZrElzQhYs1dBFc+RoRlyeiIjxIgnQqv1776ux3g+wkJxoJesAs6z7zCd+hgtC2C/emaM+XCB7HezYG3ne99E2etIiB6AByOo2sryen+hajqGjewVNUfEebACDCoNydJJMWs4GHns6fUqCwYtwr/wcdPTRbssgYFUgY+c1WVTMv2DUqbkNx+IT7MjzyusLNDBEuFJrP0LI9rxW/nvUpgC"
};

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

async function request() {
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
    dataObj.captchaId = captchaData.imageId;
    dataObj.captchaPoint = captchaData.leftDistance;
    dataObj.storeId = mainStore[0].storeList[0].resourceid;
    console.log(dataObj);
}

//mianStore是一个超级大的对象数组！