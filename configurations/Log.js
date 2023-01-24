import Utilities from "./Utilities";
var utils = new Utilities();
class Log{
    async write(text){
        let time = await utils.generateActualDateTime();
        console.log("[",time , "]: ",text);
    }
}
export default Log;