import aws from 'aws-sdk';
import dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3';

dotenv.config();

const s3Config = {
	apiVersion: '2006-03-01',
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
	region: 'us-east-1',
};

const s3 = new aws.S3(s3Config);

const upload = multer({
	storage: multerS3({
		s3,
		acl: 'public-read',
		bucket: process.env.BUCKET_NAME,
		metadata: (req, file, cb) => {
			cb(null, {
				fieldName: file.fieldname,
			});
		},
		key: (req, file, cb) => {
			cb(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

// const storage = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'uploads');
// 	},
// 	filename: (req, file, cb) => {
// 		if (file.fieldname === 'photo') {
// 			const imagePath = `${Date.now()}/${file.originalname}`;
// 			req.body.photo = imagePath;
// 		} else {
// 			const attachmentPath = `${Date.now()}/${file.originalname}`;
// 			req.body.attachments = attachmentPath;
// 		}
// 		cb(null, file.originalname);
// 	},
// });

// const upload = multer({
// 	storage,
// });

const fileUpload = upload.fields([
	{
		name: 'photo',
		maxCount: 1,
	},
	{
		name: 'attachments',
		maxCount: 10,
	},

]);

export default fileUpload;
