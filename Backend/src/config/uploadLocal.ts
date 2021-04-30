import multer from 'multer';
import path from 'path'
import crypto from 'crypto'
import aws from 'aws-sdk'
import multerS3 from 'multer-s3';
import dotenv from 'dotenv';

dotenv.config();

const storageTypes ={
    local:multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'episodes'),
        filename: function(req, file, cb){
            const keyID=crypto.randomBytes(2).toString('hex');//@ts-expect-error
            file.key=`${keyID}-${file.originalname}`//@ts-expect-error
            cb(null, file.key );
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket:process.env.AWS_AUDIO_BUCKET_NAME!!,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl:'public-read',
        key: (req, file, cb)=>{
            crypto.randomBytes(3, (err, hash)=>{
                if (err) cb(err);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, filename);
            })
        }
    })
}

export default {
    storage: storageTypes['local']
}
