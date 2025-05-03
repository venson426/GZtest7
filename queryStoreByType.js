import axios from "axios";
import { encrypt, generatekey, getRSAData } from "./utils/encryption.js";
import { decrypt, getRSAData_de } from "./utils/decryption.js";
import fs from "fs";

const dataObj = {
    cgCode: "0020C061256",
    sportCode: "003",
    openDate: "2025-05-06",
    booking: "Y",
    timestamp: Date.parse(new Date()) / 1e3
};
const data = JSON.stringify(dataObj);

const AESKey = generatekey();
const AESData = encrypt(data, AESKey);

const RSAData = getRSAData(AESKey);
// console.log(RSAData);

const url = "https://www.quntitong.cn/sportinterNew/androidsign/queryStoreByType.do";

const body = {
    "type": "minip",
    "secretKey": RSAData,
    "encryptData": AESData
};

// console.log(body);

const headers = {
    "Host": "www.quntitong.cn",
    "Connection": "keep-alive",
    "Content-Length": "372",
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
        const response = await axios.post(url, body, headers);
        // console.log(response.data);

        const RSAData_de = getRSAData_de(response);
        const ASEData_de = decrypt(response.data.encryptData, RSAData_de);
        // console.log(ASEData_de);

        const ASEData_de_2 = JSON.parse(ASEData_de);
        // const ASEData_de_JSON = JSON.stringify(ASEData_de_2, null, 2);
        // fs.writeFileSync("./output/mainStore.json", ASEData_de_JSON);

        return ASEData_de_2;


    } catch(error) {
        if(error.response) {
            console.error("Server Error:", error.response.data);
        } else {
            console.error("Error", error.message);
        }
    }
}