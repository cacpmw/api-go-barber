import Notification from '@modules/notifications/infrastructure/typeorm/schemas/Notification';
import INotificationRepository from '@modules/notifications/interfaces/classes/INotificationRepository';
import INotificationObject from '@modules/notifications/interfaces/objects/INotificationObject';
import { getMongoRepository, MongoRepository } from 'typeorm';

export default class NotificationsRepository
    implements INotificationRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create(data: INotificationObject): Promise<Notification> {
        const notification = this.ormRepository.create({
            recipient_id: data.recipient_id,
            content: data.content,
        });
        await this.ormRepository.save(notification);
        return notification;
    }
}
