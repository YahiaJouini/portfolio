import { summaryKeys } from "@/messages/seperate/project-related"
import { projectPayloadAccess } from "@/utils/payload-access"
import { CollectionConfig } from "payload"
import { populateProjectHook } from "../hooks"
import { slugField } from "../slug-field"

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
   hooks: {
      beforeChange: [populateProjectHook],
   },
   fields: [
      slugField,
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

      // === (Auto-populated using the hook) ===
      {
         name: "primaryLanguage",
         type: "text",
         label: "Primary Language",
         admin: {
            readOnly: true,
            description: "Auto-populated from GitHub repository",
            position: "sidebar",
         },
      },
      {
         name: "primaryLanguageColor",
         type: "text",
         label: "Primary Language Color",
         admin: {
            readOnly: true,
            description: "Auto-populated from GitHub repository",
            position: "sidebar",
         },
      },
      {
         name: "languages",
         type: "array",
         label: "Languages",
         admin: {
            readOnly: true,
            description: "Auto-populated from GitHub repository",
            position: "sidebar",
         },
         fields: [
            {
               name: "name",
               type: "text",
               required: true,
               label: "Language Name",
            },
            {
               name: "color",
               type: "text",
               label: "Language Color",
            },
            {
               name: "size",
               type: "number",
               label: "Size (bytes)",
            },
         ],
      },
      {
         name: "topics",
         type: "array",
         label: "Repository Topics/Tags",
         admin: {
            readOnly: true,
            description: "Auto-populated from GitHub repository",
            position: "sidebar",
         },
         fields: [
            {
               name: "name",
               type: "text",
               required: true,
               label: "Topic Name",
            },
         ],
      },
      {
         name: "public",
         type: "checkbox",
         label: "Public Project",
         admin: {
            readOnly: true,
            description: "Auto-populated from GitHub repository",
         },
      },
      {
         name: "createdAt",
         type: "date",
         label: "Creation Date",
         admin: {
            description: "Auto-populated from GitHub repository (can change)",
         },
      },
      // === (end Auto-populated) ===
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
         name: "pinned",
         type: "checkbox",
         localized: true,
         required: true,
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
         name: "thumbnail",
         type: "upload",
         relationTo: "media",
         required: true,
         label: "Project Thumbnail",
         admin: {
            description:
               "Thumbnail image for the project, used in previews and listings",
         },
      },
      {
         name: "images",
         type: "array",
         label: "Project Images",
         required: true,
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
               name: "title",
               type: "text",
               required: true,
               localized: true,
               label: "Image Title",
            },
            {
               name: "description",
               type: "textarea",
               localized: true,
               label: "Image Description",
               admin: {
                  description:
                     "Optional description for the image, used for accessibility",
               },
            },
         ],
      },
   ],
   timestamps: true,
}
