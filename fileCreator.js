import * as fs from 'fs';

const getAddressesFromFile = function(filename,splitString){
    const data = fs.readFileSync(filename,'utf8').split(splitString);
    return data;

}



