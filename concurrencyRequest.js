import { request as queryStoreByType} from "./queryStoreByType.js";
import { setSaveOrder } from "./saveOrder.js";
import { request as sliderVerify } from "./sliderVerify.js";



run();

async function run() {
    const catpchaData = await sliderVerify();
    console.log(catpchaData);
    
    const mainStore = await queryStoreByType();
    // console.log(mainStore);

    setSaveOrder(catpchaData, mainStore);
    
}
