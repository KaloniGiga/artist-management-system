import { Button } from "@web/components/ui/button";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import * as Papa from "papaparse";
import { ArtistData } from "@web/types/types";
import { Input } from "@web/components/ui/input";

interface ICSV {
  setData: Dispatch<SetStateAction<ArtistData[]>>;
  setCsvImport: Dispatch<SetStateAction<boolean>>;
}
export default function ImportCSV({ setData, setCsvImport }: ICSV) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
    handleUpload();
  };

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(results);
          setData(results.data as ArtistData[]);
          setCsvImport(true);
        },
      });
    }
  };

  const handleFileClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        ref={inputRef}
        type="file"
        id="file"
        accept=".csv"
        onChange={handleFileChange}
        className="flex-1 hidden"
      />
      <Button onClick={handleFileClick}>Import</Button>
    </div>
  );
}
