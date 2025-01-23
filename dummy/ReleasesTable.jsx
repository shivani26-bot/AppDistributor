import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const releases = [
  {
    id: "a1b2c3d4",
    release: "1.0.0",
    version: "1.0.0",
    fileExtension: ".zip",
  },
  {
    id: "e5f6g7h8",
    release: "1.1.0",
    version: "1.1.0",
    fileExtension: ".tar.gz",
  },
  {
    id: "i9j0k1l2",
    release: "2.0.0",
    version: "2.0.0",
    fileExtension: ".exe",
  },
  {
    id: "m3n4o5p6",
    release: "2.1.0",
    version: "2.1.0",
    fileExtension: ".dmg",
  },
  {
    id: "q7r8s9t0",
    release: "3.0.0",
    version: "3.0.0",
    fileExtension: ".apk",
  },
  {
    id: "u1v2w3x4",
    release: "3.1.0",
    version: "3.1.0",
    fileExtension: ".iso",
  },
  {
    id: "y5z6a7b8",
    release: "4.0.0",
    version: "4.0.0",
    fileExtension: ".bin",
  },
  {
    id: "c9d0e1f2",
    release: "4.1.0",
    version: "4.1.0",
    fileExtension: ".pkg",
  },
  {
    id: "g3h4i5j6",
    release: "5.0.0",
    version: "5.0.0",
    fileExtension: ".deb",
  },
  {
    id: "k7l8m9n0",
    release: "5.1.0",
    version: "5.1.0",
    fileExtension: ".rpm",
  },
];

const ReleasesTable = () => {
  return (
    <Table>
      <TableCaption>A list of your recent releases.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Release</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>File Extension</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {releases.map((release) => (
          <TableRow key={release.id}>
            {/* <TableCell className="font-medium">{invoice.id}</TableCell> */}
            <TableCell>{release.release}</TableCell>
            <TableCell>{release.version}</TableCell>
            <TableCell>{release.fileExtension}</TableCell>
            {/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
};

export default ReleasesTable;
