import {
   CLOUDINARY_API_KEY,
   CLOUDINARY_API_SECRET,
   CLOUDINARY_CLOUD_NAME,
} from "@/utils/env"
import type {
   HandleDelete,
   HandleUpload,
} from "@payloadcms/plugin-cloud-storage/types"
import type { UploadApiResponse } from "cloudinary"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
   cloud_name: CLOUDINARY_CLOUD_NAME,
   api_key: CLOUDINARY_API_KEY,
   api_secret: CLOUDINARY_API_SECRET,
})

export const generateFileURL = ({ filename }: { filename: string }) => {
   return cloudinary.url(`media/${filename}`, {
      secure: true,
   })
}

export const cloudinaryAdapter = () => ({
   name: "cloudinary-adapter",
   async handleUpload({ file }: Parameters<HandleUpload>[0]) {
      try {
         const uploadResult = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
               const uploadStream = cloudinary.uploader.upload_stream(
                  {
                     resource_type: "image",
                     public_id: `media/${file.filename.replace(/\.[^/.]+$/, "")}`,
                     overwrite: false,
                     use_filename: true,
                  },
                  (error, result) => {
                     if (error) return reject(error)
                     if (!result)
                        return reject(
                           new Error("No result returned from Cloudinary"),
                        )
                     resolve(result)
                  },
               )
               uploadStream.end(file.buffer)
            },
         )
         file.filename = uploadResult.public_id
         file.filesize = uploadResult.bytes
      } catch (err) {
         console.error("Upload Error", err)
      }
   },

   async handleDelete({ filename }: Parameters<HandleDelete>[0]) {
      console.log("handleDelete has been called")

      try {
         await cloudinary.uploader.destroy(
            `media/${filename.replace(/\.[^/.]+$/, "")}`,
         )
      } catch (error) {
         console.error("Cloudinary Delete Error:", error)
      }
   },
   staticHandler() {
      return new Response("Not implemented", { status: 501 })
   },
})
