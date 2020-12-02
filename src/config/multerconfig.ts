import multer from 'multer';
import path from 'path';

const tempFolder = path.resolve(__dirname, '../../temp');
const uploadsFolder = path.resolve(tempFolder, 'uploads');
export default {
    tempFolder,
    uploadsFolder,
    directory: tempFolder,
    storage: multer.diskStorage({
        destination: tempFolder,
        filename(request, file, callback) {
            const filename = `${Date.now()}-${file.originalname.replace(
                / /gi,
                '_',
            )}`;
            return callback(null, filename);
        },
    }),
};
