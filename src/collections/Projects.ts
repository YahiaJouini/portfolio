import { CollectionConfig } from "payload"

export const Projects: CollectionConfig = {
   slug: "projects",
   labels: {
      singular: "Project",
      plural: "Projects",
   },
   admin: {
      defaultColumns: ["title", "slug", "createdAt"],
      useAsTitle: "title",
   },
   access: {
      read: () => true,
      create: ({ req: { user } }) => Boolean(user),
      update: ({ req: { user } }) => Boolean(user),
      delete: ({ req: { user } }) => Boolean(user),
   },
   fields: [
      {
         name: "title",
         type: "text",
         required: true,
         label: "Project Title",
         localized: true,
      },
      {
         name: "slug",
         type: "text",
         required: true,
         unique: true,
         label: "URL Slug",
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
      },
      {
         name: "description",
         type: "textarea",
         localized: true,
         required: true,
         label: "Short Description",
         admin: {
            description: "A brief description of the project for preview cards",
         },
      },
      {
         name: "markdown",
         type: "richText",
         required: true,
         label: "Detailed Content",
         localized: true,
         admin: {
            description: "Full project documentation in markdown format",
         },
      },
      {
         name: "githubUrl",
         type: "text",
         label: "GitHub URL",
         admin: {
            description: "Link to the project repository (optional)",
         },
         validate: (value: any) => {
            if (value && !value.match(/^https?:\/\/(www\.)?github\.com\/.+/)) {
               return "Please enter a valid GitHub URL"
            }
            return true
         },
      },
      {
         name: "demoUrl",
         type: "text",
         label: "Demo URL",
         admin: {
            description: "Link to live demo or deployed project (optional)",
         },
         validate: (value: any) => {
            if (value && !value.match(/^https?:\/\/.+/)) {
               return "Please enter a valid URL"
            }
            return true
         },
      },
      {
         name: "summary",
         type: "array",
         label: "Project Summary",
         localized: true,
         admin: {
            description:
               "Key-value pairs summarizing important project details",
         },
         fields: [
            {
               name: "key",
               type: "text",
               required: true,
               label: "Key",
               admin: {
                  placeholder: "e.g., Technologies, Duration, Team Size",
               },
            },
            {
               name: "values",
               type: "array",
               required: true,
               label: "Values",
               minRows: 1,
               fields: [
                  {
                     name: "value",
                     type: "text",
                     required: true,
                     label: "Value",
                  },
               ],
            },
         ],
      },
      {
         name: "featured",
         type: "checkbox",
         localized: true,
         label: "Featured Project",
         admin: {
            description:
               "Mark this project as featured to highlight it in your portfolio",
         },
         defaultValue: false,
      },
      {
         name: "status",
         type: "select",
         label: "Project Status",
         required: true,
         defaultValue: "published",
         options: [
            {
               label: "Draft",
               value: "draft",
            },
            {
               label: "Published",
               value: "published",
            },
            {
               label: "Archived",
               value: "archived",
            },
         ],
      },
      {
         name: "images",
         type: "array",
         label: "Project Images",
         admin: {
            description: "Screenshots or images showcasing the project",
         },
         fields: [
            {
               name: "image",
               type: "upload",
               relationTo: "media",
               required: true,
            },
            {
               name: "alt",
               type: "text",
               required: true,
               label: "Alt Text",
            },
         ],
      },
   ],
   timestamps: true,
}
