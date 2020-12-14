import INotificationRepository from '@modules/notifications/interfaces/classes/INotificationRepository';
import Notification from '@modules/notifications/infrastructure/typeorm/schemas/Notification';
import INotificationObject from '@modules/notifications/interfaces/objects/INotificationObject';
import { ObjectID } from 'mongodb';

export default class FakeNotificationsRepository
    implements INotificationRepository {
    private notifications: Notification[] = [];

    public async create(data: INotificationObject): Promise<Notification> {
        const notification = new Notification();
        notification.id = new ObjectID();
        notification.recipient_id = data.recipient_id;
        notification.content = data.content;
        this.notifications.push(notification);
        return notification;
    }
}
