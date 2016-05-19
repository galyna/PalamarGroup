import {Schema} from "mongoose";
import {photoService} from "../services/photo.service";
import {Document} from "mongoose";

export interface IPhotoModel extends pg.models.IPhoto, Document{
    _id: any;
}

export let PhotoSchema = new Schema({
    name: String,
    url: {
        type: String,
        set: function(url) {
            this.__url = this.url;
            return url;
        }
    },
    order: Number
});

//cleanup unneeded photos
PhotoSchema.post('save', async (photo) => {
    if(photo.__url && (photo.__url != photo.url)){
        let oldUrl = photo.__url;
        await photoService.removeByUrl(oldUrl);
        delete photo.__url;
    }
});

PhotoSchema.post('remove', (photo) => {
    photoService.removeByUrl(photo.url);
});
//cleanup unneeded photos end