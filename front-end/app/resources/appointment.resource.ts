/**
 * Created by Galyna on 02.10.2016.
 */
import {IConstants} from "../core/core.config";

export interface IAppointment extends ng.resource.IResource<IAppointment>, pg.models.IAppointment{}

export interface IAppointmentResource extends ng.resource.IResourceClass<IAppointment>{}

export let AppointmentResourceName = 'AppointmentResource';

AppointmentResource.$inject = ['$resource', 'constants'];
export function AppointmentResource($resource: ng.resource.IResourceService, constants: IConstants){
    return <IAppointmentResource>$resource(`${constants.apiUrl}/appointment/:id`, {id: '@_id'});
}
