export function convertObjectToFormData(object) {
  const formData = new FormData();

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key];

      if (value !== null && value !== undefined && value !== "") {
        if (Array.isArray(value)) {
          for (const item of value) {
            formData.append(`${key}[]`, item);
          }
        } else if (typeof value === "object" && value !== null) {
          // Nested object
          const nestedFormData = convertObjectToFormData(value);
          for (const [nestedKey, nestedValue] of nestedFormData.entries()) {
            formData.append(`${key}[${nestedKey}]`, nestedValue);
          }
        } else {
          formData.append(key, String(value));
        }
      }
    }
  }
  if (object.hasOwnProperty("image")) {
    if (typeof object["image"] === "object") {
      formData.append("image", object["image"] || "");
    }
  }

  return formData;
}

export const getSession = () => {
  if (typeof localStorage !== "undefined") {
    return JSON.parse(localStorage.getItem("authUser"));
  } else {
    return null;
  }
};
export function isEmpty(value) {
  return (
    value == null ||
    value == undefined ||
    value == 0 ||
    (typeof value === "string" && !value.trim()) ||
    (Array.isArray(value) && !value.length)
  );
}

import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}
