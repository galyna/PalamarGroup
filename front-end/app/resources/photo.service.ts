export let PhotoServiceName = 'imageInputService';
export class PhotoService {

    static $inject = ["$log", "Upload"];
    private static URL = '/api/photo';

    constructor(private $log, private Upload:ng.angularFileUpload.IUploadService) {

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