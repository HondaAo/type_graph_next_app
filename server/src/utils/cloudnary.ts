import * as cloudinary from 'cloudinary'
import * as uuid from 'uuid'
const cloudinaryUpload = cloudinary.v2

export const UploadImage = async(images: string[]) => {
    cloudinaryUpload.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
    })
    let results: string[] = []
    try {
        for (let i = 0; i < images.length; i++) {
            const res = await cloudinary.v2.uploader.upload(images[i], {
              allowed_formats: ["jpg", "png"],
              public_id: uuid.v4(),
              folder: "samples",
            })
            results.push(res.url)
        }
    } catch (err) {
        console.error(err)
        return `Error: ${err.message}`
    }
    return results
}