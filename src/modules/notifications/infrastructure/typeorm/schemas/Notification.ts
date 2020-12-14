import {
    Column,
    CreateDateColumn,
    Entity,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

import { ObjectID } from 'mongodb';

@Entity('notifications')
export default class Notification {
    @ObjectIdColumn()
    id: ObjectID;

    @Column('uuid')
    recipient_id: string;

    @Column()
    content: string;

    @Column({ default: false })
    read: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
