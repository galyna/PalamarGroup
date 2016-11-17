let path = require('path');
var htmlSnapshots = require('html-snapshots');
export class SnapshotsService {


    constructor() {

    }

    handleBots(req, res, next) {
        var bots = ['googlebot', 'yahoo', 'bingbot', 'baiduspider', 'yandex', 'yeti',
            'yodaobot', 'gigabot', 'ia_archiver', 'facebookexternalhit', 'twitterbot',
            'developers\.google\.com'];//, 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36']
        if (bots.find((bot)=>req.headers['user-agent'] == bot)) {

            res.sendFile(path.resolve('./snapshots',req.url.replace(/^\/|\/$/g, ''),'index.html'));
        } else {
            next();
        }
    }



    saveSnapshots() {
        var result = htmlSnapshots.run({
            input: "sitemap",
            port: "8080",
            source: "sitemap.xml",
            snapshotScript: {script: "removeScripts"},
            phantomjsOptions: ["--load-images=false", "--ignore-ssl-errors=true"],
            outputDir: './snapshots',
            outputDirClean: true,
            selector: "#dynamic-content",
             processLimit: 1,
            // timeout:2000
        });
    }


}
export let botHandler = new SnapshotsService();
