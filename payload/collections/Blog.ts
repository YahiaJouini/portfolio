import { blogPayloadAccess } from "@/utils/payload-access"
import { CollectionConfig } from "payload"
import { slugField } from "../slug-field"

export const Blog: CollectionConfig = {
   slug: "blog",
   labels: {
      singular: "Blog Post",
      plural: "Blog Posts",
   },
   access: blogPayloadAccess(),
   admin: {
      useAsTitle: "title",
   },
   fields: [
      slugField,
      {
         name: "title",
         localized: true,
         type: "text",
         required: true,
      },
      {
         name: "description",
         localized: true,
         type: "textarea",
         required: true,
      },
      {
         name: "thumbnail",
         type: "upload",
         relationTo: "media",
         required: true,
      },
      {
         name: "timeToRead",
         type: "number",
         required: true,
         admin: {
            description: "Time to read in minutes",
         },
      },
      {
         name: "author",
         type: "group",
         localized: true,
         fields: [
            {
               name: "name",
               type: "text",
               localized: true,
               required: true,
            },
            {
               name: "role",
               type: "text",
               localized: true,
               required: true,
            },
         ],
      },
      {
         name: "pinned",
         type: "checkbox",
         localized: true,
         required: true,
         label: "Pinned Blog",
         admin: {
            description:
               "Mark this blog post as featured to highlight it in your portfolio",
         },
         defaultValue: false,
      },
      {
         name: "tags",
         type: "array",
         required: true,
         fields: [
            {
               name: "tag",
               type: "text",
               required: true,
            },
         ],
      },
      {
         name: "sections",
         type: "array",
         required: true,
         fields: [
            {
               name: "id",
               type: "text",
               required: true,
            },
            {
               name: "title",
               localized: true,
               type: "text",
               admin: {
                  description: "Title will be used for table of content",
               },
               required: true,
            },
            {
               name: "body",
               localized: true,
               type: "richText",
               required: true,
            },
         ],
      },
   ],
}
