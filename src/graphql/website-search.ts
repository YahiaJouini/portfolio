import { WebsiteSearch } from "@/types"

const query = `
  query {
    blogs: Blogs {
      docs {
        title
        slug
        author{name}
      }
    }
    projects: Projects {
      docs {
        title
        slug
      }
    }
  }
`

// fetch all because it's a small dataset
export const fetchWebsiteSearch = async (): Promise<WebsiteSearch | null> => {
   const response = await fetch("/api/graphql", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
   })
   if (!response.ok) {
      throw new Error("Failed to fetch website search data")
   }

   const { data } = await response.json()
   return data ?? null
}
