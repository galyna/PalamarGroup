declare module pg {
    module models {
        
        export interface IContact {
            _id?: any;
            name:string,
            email:string,
            phone:string,
            photo:string,
            address:string,
            isAcademy:boolean
        }

        export interface IVideo {
            _id?: any;
            name: string,
            url: string,
            order: number
        }

        export interface IPhoto {
            _id?: any;
            name: string,
            url: string,
            order: number
        }

        export interface ICourse {
            _id?: any;
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
            courseModulesDates: any[],
            isVisible: boolean,
            comments: IComment[]
        }

        export interface IOrder{
            _id?: any;
            name: string,
            phone: string,
            email: string,
            date: string,
            comment:string,
            admin_comment:string,
            event_id: string,
            event_name: string,
            event_dates: string[],
            answered: boolean,
            booked: boolean
        }

        export interface IUser {
            _id?: any;
            email: string,
            hash: string,
            salt: string,
            roles: UserRoles[]
        }

        export interface IModel {
            _id?: any;
            name: string,
            phone: string,
            email: string,
            address: string,
            fasPhotoUrl:string,
            profilePhotoUrl:string,
            backPhotoUrl:string,
            fullSizePhotoUrl:string,
        }

        export interface ISalonClient {
            _id?: any;
            name: string;
            phone: string;
            email: string;
            address: string;
            group: string;
        }

        export interface IComment {
            _id?: any;
            name: string;
            text: string;
            date:string;
            isVisible: boolean;
            isModerated: boolean;
        }
    }
    
    type UserRoles = 
        'admin' 
        | 'academyModerator' 
        | 'academyUser'
        | 'salonModerator'
        | 'salonUser';
}