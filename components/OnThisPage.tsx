"use client";
import React, { useEffect, useState } from "react";

const OnThisPage = ({ htmlContent }: { htmlContent: string }) => {
  const [headings, setHeadings] = useState<{ text: string; id: string }[]>([]);

  useEffect(() => {
    if (!htmlContent) return;

    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlContent;

    const h2Elements = tempDiv.querySelectorAll("h2");
    const h2Data = Array.from(h2Elements).map((h2) => ({
      text: h2.textContent || "",
      id: h2.id || "",
    }));

    setHeadings(h2Data);
  }, [htmlContent]);

  if (headings.length === 0) return null;

  return (
    <div className="w-full max-w-xs sticky top-24 self-start bg-gray-50 dark:bg-gray-900 p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-3">On This Page</h2>
      <ul className="text-sm space-y-2 border-l-2 border-gray-300 pl-3">
        {headings.map((heading, index) => (
          <li key={index}>
            <a href={`#${heading.id}`} className="text-gray-600 hover:text-blue-600">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnThisPage;
