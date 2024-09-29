import React, { useState } from "react";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/24/outline"; // Falls du Heroicons verwendest

interface ColorPickerProps {
  primaryColor?: string;
  secondaryColor?: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}

export default function ColorPicker({
  primaryColor = "#23429c",
  secondaryColor = "#d8ba60",
  onPrimaryColorChange,
  onSecondaryColorChange,
}: ColorPickerProps) {
  // Zustände für das Kopieren
  const [copiedPrimary, setCopiedPrimary] = useState(false);
  const [copiedSecondary, setCopiedSecondary] = useState(false);

  const copyToClipboard = (
    text: string,
    setCopied: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    // Nach 2 Sekunden zurücksetzen
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-6 sm:gap-12">
      {/* Hintergrundfarbe */}
      <div className="flex-1 min-w-0 flex-shrink">
        <label htmlFor="backgroundColor" className="w-full">
          Background Color:
        </label>
        <div className="py-4 px-8 flex-1 rounded-md flex justify-center items-center shadow-customShadow min-w-0 flex-shrink">
          <input
            id="backgroundColor"
            value={primaryColor}
            type="text"
            onChange={(e) => onPrimaryColorChange(e.target.value)}
            className="w-full"
          />
          <button
            onClick={() => copyToClipboard(primaryColor, setCopiedPrimary)}
            className="ml-2"
            aria-label="Farbwert kopieren"
          >
            {copiedPrimary ? (
              <CheckIcon className="h-12 w-12" />
            ) : (
              <ClipboardIcon className={`h-12 w-12 text-[${primaryColor}]`} />
            )}
          </button>
        </div>
      </div>
      {/* Textfarbe */}
      <div className="flex-1 min-w-0 flex-shrink">
        <label htmlFor="textColor" className="w-full">
          Text Color:
        </label>
        <div className="py-4 px-8 flex-1 flex rounded-md justify-center items-center shadow-customShadow min-w-0 flex-shrink">
          <input
            id="textColor"
            value={secondaryColor}
            type="text"
            onChange={(e) => onSecondaryColorChange(e.target.value)}
            className="w-full"
          />
          <button
            onClick={() => copyToClipboard(secondaryColor, setCopiedSecondary)}
            className="ml-2"
            aria-label="Farbwert kopieren"
          >
            {copiedSecondary ? (
              <CheckIcon className="h-12 w-12" />
            ) : (
              <ClipboardIcon className={`h-12 w-12 text-[${primaryColor}]`} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
