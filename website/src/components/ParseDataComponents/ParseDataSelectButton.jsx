import React from "react";

/**
 * A component that renders a button for selecting files to be parsed.
 * When a file is selected, it is added to the list of selected files, and its contents
 * are loaded into the component's state.
 *
 * @param {array} selectedFiles - The list of files that have been selected.
 * @param {function} setSelectedFiles - The function to set the list of selected files.
 * @return {ReactElement} The rendered component.
 */
const ParseDataSelectButton = ({ selectedFiles, setSelectedFiles }) => {
  /**
   * Handles the file selection and reads the contents of each selected file.
   * @param {Event} event - The file input change event.
   */
  const handleFileSelect = (event) => {
    // Iterate over each selected file
    for (let itemNum = 0; itemNum < event.target.files.length; itemNum++) {
      const file = event.target.files.item(itemNum);

      // Asynchronously read the text content of the file
      const getText = async () => {
        const text = await file.text();
        // Update the list of selected files with the new file and its content
        setSelectedFiles((filesList) => [
          ...filesList,
          { name: file.name, text: text },
        ]);
      };
      getText();
    }
  };

  return (
    <>
      {/* Hidden file input element (we hide it because it looks bad)*/}
      <input
        type="file"
        id="selectFiles"
        multiple
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />
      {/* Visible button to trigger file selection */}
      <button
        className="flex h-fit w-fit max-w-60 border-8 bg-[#242424] border-[#1D1E1E] rounded-xl justify-center items-center whitespace-pre-wrap break-words text-white font-bold ~text-2xl/5xl text-center p-4"
        onClick={() => document.getElementById("selectFiles").click()}
      >
        Select Files
      </button>
    </>
  );
};

export default ParseDataSelectButton;
