import { summaryKeys } from "@/messages/seperate/project-related"
import { projectPayloadAccess } from "@/utils/payload-access"
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
      description: "Manage your projects, including details and media.",
   },
   access: projectPayloadAccess(),
   fields: [
      {
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
      },
      {
         name: "title",
         type: "text",
         required: true,
         label: "Project Title",
         localized: true,
      },
      {
         name: "description",
         type: "textarea",
         localized: true,
         required: true,
         maxLength: 300,
         minLength: 100,
         label: "Short Description",
         admin: {
            description: "A brief description of the project for preview cards",
         },
      },
      {
         name: "richText",
         type: "richText",
         required: true,
         label: "Detailed Content",
         localized: true,
         admin: {
            description: "Full project documentation in rich text format",
         },
      },
      {
         name: "githubUrl",
         type: "text",
         label: "GitHub URL",
         required: true,
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
         name: "roles",
         type: "array",
         label: "Roles",
         required: true,
         admin: {
            description:
               "Roles you played in this project (e.g., developer, designer)",
         },
         fields: [
            {
               name: "role",
               type: "select",
               required: true,
               label: "Summary Category",
               options: [
                  {
                     label: "designed",
                     value: "designed",
                  },
                  {
                     label: "developed",
                     value: "developed",
                  },
                  {
                     label: "maintained",
                     value: "maintained",
                  },
                  {
                     label: "deployed",
                     value: "deployed",
                  },
                  {
                     label: "architected",
                     value: "architected",
                  },
               ],
            },
         ],
      },
      {
         name: "summary",
         type: "array",
         label: "Project Summary",
         required: true,
         admin: {
            description:
               "Key-value pairs summarizing important project details",
         },
         fields: [
            {
               name: "category",
               type: "select",
               required: true,
               label: "Summary Category",
               options: Object.keys(summaryKeys).map((key) => ({
                  label: key,
                  value: key,
               })),
               admin: {
                  description: "Select the category for this summary item",
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
         name: "type",
         type: "select",
         required: true,
         label: "Project Type",
         options: [
            {
               label: "Personal",
               value: "personal",
            },
            {
               label: "Work",
               value: "work",
            },
         ],
      },
      {
         name: "createdAt",
         type: "date",
         label: "Creation Date",
         admin: {
            description:
               "Date when the project was created (used for sorting and display)",
         },
      },
      {
         name: "public",
         type: "checkbox",
         label: "Public Project",
         defaultValue: true,
      },
      {
         name: "open-source",
         type: "checkbox",
         label: "Open Source",
         defaultValue: true,
      },
      {
         name: "pinned",
         type: "checkbox",
         localized: true,
         label: "Pinned Project",
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
         ],
      },
   ],
   timestamps: true,
}
