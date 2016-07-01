import {config} from '../config';
let uuid = require('node-uuid');
let fs = require('fs');
let path = require('path');

class PhotoService{
    
    private uploadDir: string;
    private static extFromPathRegExp = /.+\.(\w+)$/;

    constructor (config, private uuid, private fs, private pathUtil){
        this.uploadDir = config.uploadDir;
    }
    
    create(path: string) {
        let ext = path.match(PhotoService.extFromPathRegExp)[1];
        let newName = this.uuid.v4() + '.' + ext;
        let newPath = this.uploadDir + '/' + newName;
        return new Promise((resolve, reject) => {
            this.fs.rename(path, newPath, (err) => {
                if (err) return reject(err);
                return resolve(newName)
            });
        });
    }
    
    remove(name: string) {
        let fileToDelete = this.uploadDir + '/' + name;
        console.log('removing file: ' + fileToDelete);
        return new Promise<void>((resolve, reject) => {
            fs.unlink(fileToDelete, function(err){
                if(err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    removeByUrl(url:string) {
        let name = this.pathUtil.basename(url);
        return this.remove(name);
    }

    path(name: string){
        return this.uploadDir + '/' + name;
    }

}

export let photoService = new PhotoService(config, uuid, fs, path);