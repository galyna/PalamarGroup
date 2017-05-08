import {IConstants} from "../core/core.config";
export let PhotoServiceName = 'imageInputService';
export class PhotoService {

    static $inject = ["$log", "Upload", "constants"];

    private url;

    constructor(private $log, private Upload:ng.angularFileUpload.IUploadService, private constants: IConstants) {
        this.url = `${this.constants.apiUrl}/photo`
    }

    dataUrltoFile(dataUrl: string, name: string){
        let blob = this.Upload.dataUrltoBlob(dataUrl, name);
        return this.blobToFile(blob, name);
    }
    
    blobToFile(theBlob: Blob, fileName:string): File {
        var b: any = theBlob;
        b.lastModifiedDate = new Date();
        b.name = fileName;
        return <File>theBlob;
    }

    save(file:File) {
        return this.Upload.upload<{url:string}>({
            method: 'POST',
            url: this.url,
            data: {
                file: file
            }
        })
            .then((res) => res.data.url, (err)=> {
                this.$log.debug(err);
                throw err;
            });
    }
}
