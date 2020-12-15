interface IMailConfig {
    driver: 'ethereal' | 'ses';
    defaults: {
        from: {
            name: string;
            email: string;
        };
    };
}
export default {
    driver: process.env.APP_MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            name: process.env.APP_MAIL_SENDER_NAME || 'Equipe GoBarber',
            email: process.env.APP_MAIL_SENDER_EMAIL || 'equipe@gobarber.com',
        },
    },
} as IMailConfig;
