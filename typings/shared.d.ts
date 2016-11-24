declare module pg {
    module models {

        export  interface ISeoPage {
            _id: any,
            name: string,
            url: string,
            description:string,
            description_ru:string,
            title: string,
            keywords:string,
            keywords_ru:string,
            text:string
        }

        export  interface IAcademyVideos {
            _id: any,
            name: string,
            order: number,
            videos: IVideo[],
        }

        export interface ITransform {
            _id: any,
            name: string,
            order: number,
            videos: IVideo[],
            photos: IPhoto[],
        }

        export interface IFavor {
            _id: any,
            name: string,
            subtitle: string,
            description: string,
            category: { _id: string, name: string},
            defPrice: number,
            photo: IPhoto,
            order: number,
            videos: IVideo[],
            photos: IPhoto[],
            seoJson:any,
            seoJsonProduct:any
        }

        export interface IMasterFavor {
            _id?: any,
            favor: IFavor,
            price: number,
            level: { _id: string, name: string, text: string}
        }

        export interface IMaster {
            _id: any,
            name: string,
            subtitle: string,
            description: string,
            photo: IPhoto,
            order: number,
            videos: IVideo[],
            services: IMasterFavor[],
            works: IPhoto[],
            tasks: ITask[],
            isTop: boolean,
            level: { _id: string, name: string, text: string},
            rate: { _id: string, name: string, text: string},
            seoJson:any
        }

        export interface IAppointment {
            _id?: any;
            name: string,
            phone: string,
            email: string,
            date: any,
            status: number,
            creationDate: any,
            comment: string,
            admin_comment: string,
            master?: IMaster,
            service: IMasterFavor,
            favors?: IMasterFavor[],
            isConsultation: boolean
        }

        export interface ITask {
            _id?: any,
            appointment: {
                isDayOff: boolean,
                isPreOrder: boolean,
                isConsultation: boolean,
                name: string,
                phone: string,
                email: string,
                date: string,
                comment: string,
                admin_comment: string,
                master?: IMaster,
                favors?: [{
                    id: string,
                    name: string,
                    price: number,
                    photo: string
                }]
            } ,
            scheduler: IScheduler,
        }

        export interface IScheduler {
            start: any,
            end: any,
            text: string,
            id: string,
            borderColor: string,
            barColor: string
        }

        export interface IContact {
            _id?: any;
            name: string,
            email: string,
            phone: string,
            photo: IPhoto,
            address: string,
            isAcademy: boolean,
            salon: string
        }

        export interface IDay {
            _id?: any;
            date: any,
            program: string,

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
            order: number,
            seoJson:any
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
            avatar: string,
            author: {
                name: string,
                photoUrl: string
            },
            days: IDay[],
            isVisible: boolean,
            comments: IComment[],
            seoJson:any
        }

        export interface IOrder {
            _id?: any;
            name: string,
            phone: string,
            email: string,
            date: any,
            comment: string,
            admin_comment: string,
            event_id: string,
            event_name: string,
            event_dates: string[],
            status: number
        }

        export interface IUser {
            _id?: any;
            email: string,
            name: string,
            password: string,
            roles: UserRole[]
        }

        export interface IModel {
            _id?: any;
            name: string,
            phone: string,
            email: string,
            address: string,
            fasPhotoUrl: string,
            profilePhotoUrl: string,
            backPhotoUrl: string,
            fullSizePhotoUrl: string,
            comment: string
        }

        export interface ISalonClient {
            _id?: any,
            name: string,
            phone: string,
            email: string,
            address: string,
            group: string
        }

        export interface IComment {
            _id?: any,
            name: string,
            text: string,
            date: any,
            isVisible: boolean,
            isModerated: boolean
        }

        export interface IAdminComment extends IComment {
            isCourseVisible: boolean,
            courseId: string,
            courseDates: any[],
            courseName: string
        }

        export interface IProduct {
            _id: any,
            name: string,
            description: string,
            price: number,
            photo: IPhoto,
            order: number,
            seoJson:any,
        }

        export interface IBrend {
            _id: any,
            name: string,
            url: string,
            photo: IPhoto,
            seoJson:any
        }

        export interface IProductOrder {
            _id?: any;
            name: string,
            phone: string,
            email: string,
            date: string,
            comment: string,
            status: number,
            admin_comment: string,
            product: string

        }

        export interface ISalon {
            _id?: any,
            name: string,
            phone: string,
            description:string,
            photos: IPhoto[],
            videos: IVideo[],
            contacts: IContact[],
            address: string,
            latitude: string,
            longitude: string,
            isMain: boolean,
            isAcademy: boolean,
        }
    }

    type UserRole =
        'admin'
            | 'academyModerator'
            | 'academyUser'
            | 'salonModerator'
            | 'salonUser';

}



