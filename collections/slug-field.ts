import { Field } from "payload"

export const slugField: Field = {
   name: "slug",
   type: "text",
   required: true,
   unique: true,
   label: "URL Slug",
   minLength: 3,
   admin: {
      description: "This will be used in the URL for this project",
   },
   hooks: {
      beforeValidate: [
         ({ value, operation, data }) => {
            if (operation === "create" && !value && data?.title) {
               return data.title
                  .toLowerCase()
                  .replace(/ /g, "-")
                  .replace(/[^\w-]+/g, "")
            }
            return value
         },
      ],
   },
}
