import { request as queryStoreByType} from "./queryStoreByType.js";
import { request as saveOrder, setSaveOrder } from "./saveOrder.js";
import { request as sliderVerify } from "./sliderVerify.js";



run();

async function run() {
    const catpchaData = await sliderVerify();
    console.log(catpchaData);
    
    const mainStore = await queryStoreByType();
    // console.log(mainStore);

    const body = setSaveOrder(catpchaData, mainStore, 5, 22);

    saveOrder(body);
    

}
