declare module PG {
    module Models {
        interface IContact {
            name:string,
            email:string,
            phone:string,
            photo:string,
            address:string
        }

        interface  IVideo {
            name: string,
            url: string,
            order: number
        }

        interface  IPhoto {
            name: string,
            url: string,
            order: number
        }

        interface ICourse{
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
            courseModulesDates: [Date],
            isVisible: boolean
        }

        //noinspection ReservedWordAsName
        interface IOrder {
            name: string,
            phone: string,
            email: string,
            date: Date,
            event_name: string,
            event_dates: [Date],
            event_id: string,
            answered: boolean
        }

        interface IUser {
            email: string,
            password: string,
            roles: [string]
        }
    }

    
}