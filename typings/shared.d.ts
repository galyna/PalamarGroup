declare module pg {
    module models {
        export interface IContactBase {
            name:string,
            email:string,
            phone:string,
            photo:string,
            address:string,
            isAcademy:boolean
        }


        //noinspection JSUnusedGlobalSymbols
        export interface IContact extends IContactBase {
            _id?: any;
        }
        
        export interface  IVideoBase {
            name: string,
            url: string,
            order: number
        }

        export interface IVideo extends IVideoBase {
            _id?: any;
        }
        
        export interface  IPhotoBase {
            name: string,
            url: string,
            order: number
        }

        export interface IPhoto extends IPhotoBase {
            _id?: any;
        }
        
        export interface ICourseBase {
            name: string,
            description: string,
            price: number,
            order: number,
            videos: IVideo[],
            hearFormsPhotos: IPhoto[],
            historyPhotos: IPhoto[],
            author: {
                name: string,
                photoUrl: string
            },
            courseModulesDates: string[],
            isVisible: boolean
        }

        export interface ICourse extends ICourseBase {
            _id?: any;
        }
        
        //noinspection ReservedWordAsName
        export interface IOrderBase {
            name: string,
            phone: string,
            email: string,
            date: string,
            event_name: string,
            event_dates: string[],
            event_id: string,
            answered: boolean
        }

        export interface IOrder extends IOrderBase {
            _id?: any;
        }
        
        export interface IUserBase {
            email: string,
            password: string,
            roles: string[]
        }
        
        //noinspection JSUnusedGlobalSymbols
        export interface IUser extends IUserBase {
            _id?: any;
        }
        
        export interface IModelBase {
            name: String,
            phone: String,
            email: String,
            address: String,
            hearFormsPhotos: IPhoto[],
        }

        export interface IModel extends IModelBase {
            _id?: any;
        }

        export interface ISalonClientBase {
            name: String,
            phone: String,
            email: String,
            address: String,
        }

        export interface ISalonClient extends ISalonClientBase {
            _id?: any;
        }

        export interface ICommentBase {
            name: String,
            text: String,
            isVisible: boolean,
            answered: boolean
        }

        export interface IComment extends ICommentBase {
            _id?: any;
        }
    }
}