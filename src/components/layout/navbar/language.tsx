import Dropdown from "@/components/global/drop-down"

export default function Language() {
   return (
      <Dropdown>
         <Dropdown.Trigger>
            <button className="h-10 w-10 rounded bg-red-200"></button>
         </Dropdown.Trigger>
         <Dropdown.Content className="top-20">
            <div className="rounded border bg-white p-2">
               <p>Item 1</p>
               <p>Item 2</p>
            </div>
         </Dropdown.Content>
      </Dropdown>
   )
}
