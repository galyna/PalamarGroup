import {currentUser} from '../auth/current_user';
import {Router} from 'express';
import {photoService} from '../services/photo.service';
import {auth} from "../auth/auth";
let photoApi = Router();
let uuid = require('node-uuid');
let fs = require('fs');
let MongoClient = require('mongodb');
import {config} from '../config';



photoApi.route('/')
    .post(function (req, res, next) {
            if (!req.files || !req.files.file) {
                res.status(400).json({error: {message: 'No files attached'}});
            }
            //TODO: wrong extention
            // else if (false) {
            //     res.status(400).json({error: {message: 'unaccepted file extension'}})
            // }
            //TODO: exceed file size
            // else if (false) {
            //     res.status(400).json({error: {message: 'file exceed size limit'}})
            // }
            else {
                next();
            }
        },
        async function (req, res) {
            //TODO: add security handling!!
            let newName = await photoService.create(req.files.file.path);
            //TODO: remove hardcode
            res.json({url: "/api/photo/" + newName});
        });

photoApi.route('/:name')
    .get(function (req, res) {
        let path = photoService.path(req.params.name);
        res.sendFile(path, function (err) {
            if (err) {
                res.status(err.status).end();
            }
        });
    })
    .delete(auth, currentUser.is('admin'),
        async function(req, res){
            try{
                await photoService.remove(req.params.name);
                res.status(200).end();
            }catch (err){
                res.status(404).end();
            }
        }
    );





function arrayDiff(arr1, arr2){
    console.log(arr1[0], arr2[0]);
    let a = new Set(arr1);
    let b = new Set(arr2);
    let difference = new Set(
        [...a].filter(x => !b.has(x)));
    return Array.from(difference);
}

async function getBrandPhotos(db){
    return await _getPhotosCommon(db, 'brends');
}

async function getContactPhotos(db){
    return await _getPhotosCommon(db, 'contacts');
}

async function getProductsPhotos(db){
    return await _getPhotosCommon(db, 'products');
}


async function getMastersPhotos(db){
    const col = db.collection('masters');
    let rows;
    try{
        rows = await col.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.reduce((res, row)=>{
        return [...res, row.photo.url, ...row.works.map(w=>w.url)];
    }, []);
}

async function getModelsPhotos(db){
    const modelsCol = db.collection('models');
    let rows;
    try{
        rows = await modelsCol.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.reduce((res, row)=>{
        res.push(row.fasPhotoUrl);
        res.push(row.profilePhotoUrl);
        res.push(row.backPhotoUrl);
        res.push(row.fullSizePhotoUrl);
        return res;
    }, []);
}

async function getCoursesPhotos(db){
    const coursesCol = db.collection('courses');
    let rows;
    try{
        rows = await coursesCol.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.reduce((res, row)=>{
        res.push(row.avatar);
        res.push(row.author.photoUrl);
        let historyUrls = row.historyPhotos.map(p=>p.url);
        let hearFormsUrls = row.hearFormsPhotos.map(p=>p.url);
        return [...res, ...historyUrls, ...hearFormsUrls];
    }, []);
}

async function getSalonsPhotos(db){
    const col = db.collection('salons');
    let rows;
    try{
        rows = await col.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.reduce((res, row)=>[...res, ...row.photos.map(photo=>photo.url)], []);
}

async function getTransformsPhotos(db){
    const col = db.collection('transforms');
    let rows;
    try{
        rows = await col.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.reduce((res, row)=>[...res, ...row.photos.map(photo=>photo.url)], []);
}

async function getFavoursPhotos(db){
    const col = db.collection('favors');
    let rows;
    try{
        rows = await col.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.reduce((res, row)=>[...res, ...row.photos.map(photo=>photo.url)], []);
}

async function _getPhotosCommon(db, colName){
    const brandsCol = db.collection(colName);
    let rows;
    try{
        rows = await brandsCol.find({}).toArray();
    }catch (err){
        console.log(err);
    }

    return rows.map(row=>row.photo.url);
}


photoApi.route('/clear')
    .delete(auth, currentUser.is('admin'),
        async function(req, res){
            try{

                    MongoClient.connect(config.mongoUrl, async (err, db)=>{
                        const uploadsDir = `${__dirname}/uploads`;
                        let filesOnDisk = fs.readdirSync(`${uploadsDir}`);

                        let filesFromDb = [
                            ...await getBrandPhotos(db),
                            ...await getContactPhotos(db),
                            ...await getFavoursPhotos(db),
                            ...await getMastersPhotos(db),
                            ...await getProductsPhotos(db),
                            ...await getModelsPhotos(db),
                            ...await getCoursesPhotos(db),
                            ...await getSalonsPhotos(db),
                            ...await getTransformsPhotos(db),
                        ].map(url=>url.split('/')[3]);

                        let unusedFiles = arrayDiff(filesOnDisk, filesFromDb);
                        let wrongRecords = arrayDiff(filesFromDb, filesOnDisk);

                        console.log('filesOnDisk length ', filesOnDisk.length);
                        console.log('filesFromDb length ', filesFromDb.length);
                        console.log('unusedFiles length', unusedFiles.length);
                        console.log('wrongRecords', wrongRecords);

                        unusedFiles.forEach((file:string)=>fs.unlink(`${uploadsDir}/${file}`));
                        console.log(`${unusedFiles.length} files deleted`);
                        process.exit();
                    });

                res.status(200).end();
            }catch (err){
                res.status(404).end();
            }
        }
    );

export default photoApi;