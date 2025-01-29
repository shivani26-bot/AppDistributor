import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ReleaseDetails from "./ReleaseDetails";
import DeleteModal from "./DeleteModal";

// const releases = [
//   {
//     id: 1,
//     releaseId: "R001",
//     version: "1.0.0",
//     fileExtension: ".apk",
//   },
//   {
//     id: 2,
//     releaseId: "R002",
//     version: "1.0.1",
//     fileExtension: ".apk",
//   },
//   {
//     id: 3,
//     releaseId: "R003",
//     version: "1.1.0",
//     fileExtension: ".aab",
//   },
//   {
//     id: 4,
//     releaseId: "R004",
//     version: "1.1.1",
//     fileExtension: ".aab",
//   },
//   {
//     id: 5,
//     releaseId: "R005",
//     version: "1.2.0",
//     fileExtension: ".apk",
//   },
//   {
//     id: 6,
//     releaseId: "R006",
//     version: "2.0.0",
//     fileExtension: ".dmg",
//   },
//   {
//     id: 7,
//     releaseId: "R007",
//     version: "2.0.1",
//     fileExtension: ".dmg",
//   },
//   {
//     id: 8,
//     releaseId: "R008",
//     version: "2.1.0",
//     fileExtension: ".apk",
//   },
//   {
//     id: 9,
//     releaseId: "R009",
//     version: "3.0.0",
//     fileExtension: ".aab",
//   },
//   {
//     id: 10,
//     releaseId: "R010",
//     version: "3.0.1",
//     fileExtension: ".aab",
//   },
// ];

const ReleaseTable = ({ releases, appId }) => {
  console.log("releases", releases);

  const pageSize = 4; // Set a fixed page size of 5
  const [pageIndex, setPageIndex] = useState(0); // Track current page index
  // const [showDetails, setShowDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRelease, setSelectedRelease] = useState(null);
  const startIndex = pageIndex * pageSize;
  const currentReleases = releases.slice(startIndex, startIndex + pageSize);

  const handleNextPage = () => {
    if (startIndex + pageSize < releases.length) {
      setPageIndex((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prev) => prev - 1);
    }
  };
  // const handleViewDetails = () => {
  //   setShowDetails(true); // Show the component
  // };
  // const handleCloseDrawer = () => {
  //   setShowDetails(false); // Close the drawer
  // };
  const handleDelete = () => {
    setShowDeleteModal(true); // Show the delete modal
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false); // Close the delete modal
  };

  const handleRowClick = (release) => {
    setSelectedRelease(release);
    console.log("current row release data:", release);
  };

  const handleDownload = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = url.split("/").pop();
    link.click();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Release ↓</TableHead>
            <TableHead>Version</TableHead>
            {/* <TableHead>File Extension</TableHead> */}
            {/* <TableHead className="text-right">Amount</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentReleases.map((release) => (
            <TableRow key={release._id} onClick={() => handleRowClick(release)}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <img className="w-8 h-8 mr-2" src="/public/release.png" />{" "}
                  {release.buildNumber}
                </div>
              </TableCell>
              <TableCell>{release.version}</TableCell>
              {/* <TableCell>{release.fileExtension}</TableCell> */}
              <div className="flex justify-center items-center mt-2">
                <button
                  className="w-8 h-8 mr-2  cursor-pointer bg-transparent border-none"
                  title="Download"
                >
                  <img
                    className="w-full h-full"
                    src="/public/download.png"
                    alt="Download"
                    onClick={() => handleDownload(release.build)}
                  />
                </button>
                <button
                  className="w-8 h-8 mr-2  cursor-pointer bg-transparent border-none"
                  title="Delete"
                >
                  <img
                    className="w-full h-full"
                    src="/public/trash.png"
                    alt="Delete"
                    onClick={handleDelete}
                  />
                </button>
                {/* <button
                  className="w-8 h-8 mr-2 cursor-pointer bg-transparent border-none"
                  title="View Details"
                  onClick={handleViewDetails}
                >
                  <img
                    className="w-full h-full"
                    src="/public/search.png"
                    alt="View Details"
                  />
                </button> */}
                {/* {showDetails && <ReleaseDetails onClose={handleCloseDrawer} />} */}

                {showDeleteModal && (
                  <DeleteModal
                    onClose={closeDeleteModal}
                    releaseId={release._id}
                    appId={appId}
                  />
                )}
              </div>

              {/* <TableCell className="text-right">
                {release.totalAmount}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <ReleaseDetails /> */}
      <div className="flex items-center justify-end space-x-2 py-4 mr-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePreviousPage}
          disabled={pageIndex === 0} // Disable if on the first page
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={startIndex + pageSize >= releases.length} // Disable if on the last page
        >
          Next
        </Button>
      </div>

      {/* Optional: Display current page information */}
      <div className="flex justify-center py-2">
        <span>
          Page {pageIndex + 1} of {Math.ceil(releases.length / pageSize)}
        </span>
      </div>
    </>
  );
};

export default ReleaseTable;
{
  /* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */
}
