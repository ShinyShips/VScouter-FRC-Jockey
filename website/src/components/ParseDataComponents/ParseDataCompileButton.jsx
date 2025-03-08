import React from "react";

/**
 * A component that compiles the selected JSON files into a CSV format required
 * by the analysis software and downloads it to the user's computer.
 *
 * @param {array} selectedFiles - The list of files that have been selected.
 * @param {function} setSelectedFiles - The function to set the list of selected files.
 * @return {ReactElement} The rendered component.
 */
const ParseDataCompileButton = ({ selectedFiles, setSelectedFiles }) => {
  /**
   * Converts the selected JSON files into a CSV format required by the
   * analysis software.
   */
  const convertJSONToCSV = () => {
    console.log(selectedFiles);
    
    const totalFilesData = selectedFiles.map((singleFile) =>
      JSON.parse(singleFile.text)
    );

    const fullCSV = [];
    fullCSV.push(totalFilesData[0][0]);
    for (let fileIndex = 0; fileIndex < totalFilesData.length; fileIndex++) {
      const fileData = totalFilesData[fileIndex];
      for (
        let dataRowIndex = 1;
        dataRowIndex < fileData.length;
        dataRowIndex++
      ) {
        const dataRow = fileData[dataRowIndex];
        fullCSV.push(dataRow);
      }
    }

    downloadCSV(
      fullCSV
        .map((row) =>
          row
            .map((item) =>
              typeof item === "string" ? `"${item.replace(/"/g, '""')}"` : item
            )
            .join(",")
        )
        .join("\n")
    );
  };

  /**
   * Downloads the CSV content to the user's computer.
   * @param {string} csvContent - The CSV content to download.
   * @return {void}
   */
  const downloadCSV = (csvContent) => {
    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent)
    );
    element.setAttribute(
      "download",
      `VScouterData-${new Date().toLocaleTimeString()}-Full.csv`
    );

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  return (
    <>
      {/* The button to compile and download the CSV */}
      <div
className="flex h-fit w-fit max-w-60 border-8 bg-[#242424] border-[#1D1E1E] rounded-xl justify-center items-center whitespace-pre-wrap break-words text-white font-bold ~text-2xl/5xl text-center p-4"
        onClick={convertJSONToCSV}
      >
        Compile And Download
      </div>
    </>
  );
};

export default ParseDataCompileButton;
