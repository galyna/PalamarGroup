export let PhotoServiceName = 'imageInputService';
export class PhotoService {

    static $inject = ["$log", "Upload"];
    private static URL = '/api/photo';

    constructor(private $log, private Upload:ng.angularFileUpload.IUploadService) {

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
            url: PhotoService.URL,
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