import fs from 'fs'
import path from 'path';
import YAML from 'yaml'

class FileUtils {
    constructor() {}

    parseYamlFile(filePath) {
        const file = fs.readFileSync(path.resolve(__dirname, filePath), 'utf8');
        return YAML.parse(file);
    }

    parseYamlFileToMap(filePath) {
        return new Map(Object.entries(this.parseYamlFile(filePath)));
    }

    parseJsonFileToMap(fileName) {
        return new Map(Object.entries(JSON.parse(fileName)));
    }

    convertMapToJson(mapObject) {
        return JSON.stringify(Object.fromEntries(mapObject));
    }

    convertObjectToMap(object) {
        if (object == undefined || object == null) {
            console.log("The object is " + object);
        } else {
            console.log(new Map(Object.entries(object)));
            return new Map(Object.entries(object));
        }
    }
}

export default FileUtils;