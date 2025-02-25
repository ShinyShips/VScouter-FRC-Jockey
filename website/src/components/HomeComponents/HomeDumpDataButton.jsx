import React from "react";
import { toast } from "react-toastify";

const HomeDumpDataButton = () => {
  const isOneDimensional = (value) => {
    if (
      typeof value == "string" ||
      typeof value == "boolean" ||
      typeof value == "number"
    ) {
      return true;
    }
    return false;
  };

  const convertToCamelCase = (word1, word2) => {
    if (word1 == "") {
      return word2;
    }
    return word1 + (word2.charAt(0).toUpperCase() + word2.slice(1));
  };

  const addHeaders = (data, previousKey = "") => {
    let headers = [];
    for (const [key, value] of Object.entries(data)) {
      if (isOneDimensional(value)) {
        headers.push(convertToCamelCase(previousKey, key));
      } else if (Array.isArray(value)) {
        for (let arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
          if (isOneDimensional(value[arrayIndex])) {
            headers.push(convertToCamelCase(previousKey, key) + arrayIndex);
          } else {
            headers = [
              ...headers,
              ...addHeaders(value[arrayIndex], convertToCamelCase(key, subKey)),
            ];
          }
        }
      } else {
        // Dict
        for (const [subKey, subValue] of Object.entries(value)) {
          if (isOneDimensional(subValue)) {
            headers.push(convertToCamelCase(key, subKey)); // key + subKey = keySubKey
          } else {
            headers = [
              ...headers,
              ...addHeaders(subValue, convertToCamelCase(key, subKey)),
            ];
          }
        }
      }
    }
    return headers;
  };

  const addRow = (data) => {
    let row = [];
    for (const [key, value] of Object.entries(data)) {
      if (isOneDimensional(value)) {
        row.push(value);
      } else if (Array.isArray(value)) {
        for (let arrayIndex = 0; arrayIndex < value.length; arrayIndex++) {
          if (isOneDimensional(value[arrayIndex])) {
            row.push(value[arrayIndex]);
          } else {
            row = [
              ...row,
              ...addRow(value[arrayIndex]),
            ];
          }
        }
      } else {
        // Dict
        for (const [subKey, subValue] of Object.entries(value)) {
          if (isOneDimensional(subValue)) {
            row.push(subValue); // key + subKey = keySubKey
          } else {
            row = [
              ...row,
              ...addRow(subValue),
            ];
          }
        }
      }
    }
    return row;
  };
  return (
    <button
      className="flex h-full w-full border-8 bg-[#242424] border-[#1D1E1E] rounded-xl justify-center items-center whitespace-pre-wrap break-words text-white font-bold ~text-2xl/5xl text-center p-2"
      onClick={() => {
        const data = localStorage.getItem("scoutingData");
        if (data == '{"data":[]}') {
          toast.error("No Data To Dump");
          return;
        }

        const jsonData = JSON.parse(data).data;
        console.log(jsonData);
        const csvConvertedData = [];
        csvConvertedData.push(addHeaders(jsonData[0]))
        for (const value of Object.values(jsonData)) {
          csvConvertedData.push(addRow(value))
        }

        var element = document.createElement("a");
        element.setAttribute(
          "href",
          "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(csvConvertedData))
        );
        element.setAttribute(
          "download",
          `VScouterData-${new Date().toLocaleTimeString()}.json`
        );

        element.style.display = "none";
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
      }}
    >
      Dump Data
    </button>
  );
};

export default HomeDumpDataButton;
