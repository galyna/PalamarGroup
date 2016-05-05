declare module pg {
    module models {
        export interface IContact {
            name:string,
            email:string,
            phone:string,
            photo:string,
            address:string
        }

        export interface  IVideo {
            name: string,
            url: string,
            order: number
        }

        export interface  IPhoto {
            name: string,
            url: string,
            order: number
        }

        export interface ICourse{
            _id: any,
            name: string,
            description: string,
            price: number,
            order: number,
            videos: [IVideo],
            hearFormsPhotos: [IPhoto],
            historyPhotos: [IPhoto],
            author: {
                name: string,
                photoUrl: string
            },
            courseModulesDates: [string],
            isVisible: boolean
        }

        //noinspection ReservedWordAsName
        export interface IOrder {
            name: string,
            phone: string,
            email: string,
            date: Date,
            event_name: string,
            event_dates: [Date],
            event_id: string,
            answered: boolean
        }

        export interface IUser {
            email: string,
            password: string,
            roles: [string]
        }
    }

    
}