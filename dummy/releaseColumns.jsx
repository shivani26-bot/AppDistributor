import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReleaseDetails from "@/components/ReleaseDetails";
import { useState } from "react";

// defines an array of column configurations for a table, with each column representing a specific property of a data item.
export const columns = [
  {
    accessorKey: "release", //This is the key used to fetch the data for this column. It looks for the release field in each row of data.
    header: "Release", //Release" – This sets the title for the column header.
    cell: ({ row }) => {
      //This function is responsible for rendering the content of each cell in the "Release" column. It gets the value of release from the current row and displays it inside a <div>.
      // The capitalize class is applied to make the text capitalize the first letter of each word.
      const release = row.getValue("release");
      return <div className="capitalize">{release}</div>;
    },
  },
  {
    accessorKey: "version", //The key used to fetch the version value from each row.
    header: "Version",
    cell: ({ row }) => {
      const version = row.getValue("version");
      return <div>{version}</div>;
    },
  },
  {
    accessorKey: "fileExtension",
    // header: () => <div className="text-right">File Extension</div>,
    header: "File Extension",
    cell: ({ row }) => {
      const fileExtension = row.getValue("fileExtension");
      // return <div className="text-right font-medium">{fileExtension}</div>;
      return <div>{fileExtension}</div>;
    },
  },
  {
    //This column doesn’t have an accessorKey because it represents actions for each row rather than data to display.
    id: "actions",
    cell: ({ row }) => {
      //The cell renders a dropdown menu with various actions. The DropdownMenu component wraps the menu, and when triggered, it shows options
      const releaseData = row.original; //row.original: This is a property of the row object, and  contains the original data for that row. This could be an object or an array representing the actual data for that particular row in your table.
      // {id: 'i9j0k1l2', release: '2.0.0', version: '2.0.0', fileExtension: '.exe'}
      console.log("rd", releaseData);
      const [isReleaseDetailsVisible, setReleaseDetailsVisible] =
        useState(false);
      const [key, setKey] = useState(0); // A key that increments to force re-render
      //To force the component to re-render every time, you need to ensure that the key for the ReleaseDetails component changes on each click. React uses the key prop to differentiate components. By changing the key each time, you will trigger a fresh render of the component every time you click "View Details."
      // Function to show and force re-render ReleaseDetails

      // React only re-renders when state or props change
      const handleViewDetails = () => {
        setReleaseDetailsVisible(true); // Show the component
        setKey((prevKey) => prevKey + 1); // Increment the key to force re-render
      };
      //   className="ml-20"
      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 ">
                <span className="sr-only ">Open menu</span>
                <MoreHorizontal className="h-4 w-4 " />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(releaseData.id)}
            > it copies the id of the release (from releaseData.id) to the
              clipboard. This could be used for further operations, like
              allowing the user to manually delete the release by pasting the id
              elsewhere, or as part of a larger operation where the clipboard
              content (the id) will be used later (e.g., to identify the release
              to delete).*/}
              <DropdownMenuItem>Delete Release</DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem>Download Release</DropdownMenuItem> */}
              {/* <DropdownMenuSeparator /> */}
              {/* you cannot directly call a component inside an onClick handler  */}
              {/* <DropdownMenuItem onClick={() => <ReleaseDetails />}> */}
              <DropdownMenuItem onClick={handleViewDetails}>
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {isReleaseDetailsVisible && (
            <ReleaseDetails
              key={key}
              isReleaseDetailsVisible={isReleaseDetailsVisible}
              releaseData={releaseData}
            />
          )}
        </div>
      );
    },
  },
];
{
  /* isReleaseDetailsVisible */
}
{
  /* <DropdownMenuContent
            side="bottom"
            align="start"
            style={{ transform: "translateX(10px)" }}
          > */
}

// clipboard is a temporary storage area in a computer's memory where data can be stored temporarily for transfer between different applications or parts of an application. It's typically used for actions like copying and pasting text, images, files, or other types of data.

// When you copy something (like text or an image) in a program (e.g., pressing Ctrl+C), the content is placed into the clipboard, and you can later paste it (e.g., using Ctrl+V) into another location.

// Clipboard in the Context of Web Development:
// In web development, the clipboard can be accessed and manipulated using the Clipboard API, which allows web applications to read from and write to the system clipboard.

// In your example:

// jsx
// Copy
// navigator.clipboard.writeText(releaseData.id)
// navigator.clipboard: This is a built-in object provided by modern web browsers that gives access to the clipboard.
// .writeText(text): This method writes the specified text to the clipboard. In this case, it writes the releaseData.id to the clipboard when the user clicks the "Delete Release" option.
// So, when the onClick event is triggered by the user, the release ID (releaseData.id) is copied to the clipboard. The user can then paste that ID elsewhere, such as into another form or application, where it could be used, for example, to identify which release to delete.

// Why use the clipboard?
// Convenience: Copying data like an ID or URL to the clipboard allows the user to easily use that data elsewhere without manually typing it.
// Interactivity: It improves user experience by allowing seamless data transfer between the application and the user's environment.

// When you use const releaseData = row.original;, you're getting the complete data for the row
// that was clicked or interacted with, and you can use this data to perform further actions,
//  such as passing it to a modal, making an API call, or in your case, perhaps showing release
//  details in another component.

// For instance, if you need to pass the full release information to the ReleaseDetails component,
//  you'd use row.original to retrieve that data.
