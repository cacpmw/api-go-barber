import Notification from '@modules/notifications/infrastructure/typeorm/schemas/Notification';
import INotificationObject from '../objects/INotificationObject';

export default interface INotificationRepository {
    create(data: INotificationObject): Promise<Notification>;
}
