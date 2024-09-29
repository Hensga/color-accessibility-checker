import React, { useEffect } from "react";
import type { MetaFunction } from "@remix-run/node";
import ColorPicker from "~/components/ColorPicker";
import Header from "~/components/Header";
import Divider from "~/components/Divider";
import NavbarTest from "~/components/NavbarTest";
import CopyText from "~/components/CopyText";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

function hexToRgb(hex: string) {
  // Entfernt das "#" falls vorhanden
  hex = hex.replace("#", "");

  // Überprüft, ob der Hex-Wert 3 oder 6 Zeichen lang ist
  if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(hex)) {
    return null; // Gib `null` zurück, wenn der Wert ungültig ist
  }

  // Falls der Hex-Wert 3 Zeichen lang ist, wird er in 6 Zeichen umgewandelt
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  // Umwandlung in RGB
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return { r, g, b };
}

function getLuminance({ r, g, b }: { r: number; g: number; b: number }) {
  // Berechnung der Helligkeit anhand der Standard-Luminanz-Formel
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getTextColorBasedOnBgColor(bgColor: string) {
  const rgb = hexToRgb(bgColor);
  const luminance = getLuminance(rgb);

  // Wenn die Helligkeit hoch ist, setze die Textfarbe auf Schwarz, sonst auf Weiß
  return luminance > 186 ? "black" : "white"; // Schwellenwert 186 ist eine gängige Empfehlung
}

export default function Index() {
  const [primaryColor, setPrimaryColor] = React.useState("#23429c");
  const [secondaryColor, setSecondaryColor] = React.useState("#d8ba60");

  useEffect(() => {
    // Setzt die Bordercolor
    const borderElement = document.querySelector(
      ".border-with-color"
    ) as HTMLElement;
    if (borderElement) borderElement.style.borderColor = secondaryColor;

    // Holt alle Elemente mit der Klasse .failed-container
    const failedContainers = document.querySelectorAll(".failed-container");

    failedContainers.forEach((container) => {
      // Überprüft, ob das Element ein HTMLElement ist
      if (container instanceof HTMLElement) {
        const rgb = hexToRgb(secondaryColor);

        if (rgb) {
          // Setzt die Hintergrundfarbe
          container.style.backgroundColor = secondaryColor;

          // Bestimmt die passende Textfarbe basierend auf der Helligkeit
          const textColor = getTextColorBasedOnBgColor(secondaryColor);
          container.style.color = textColor;
        } else {
          return null; // Gibt `null` zurück, wenn der Wert ungültig ist
        }
      }
    });

    // Setzt Hintergrundfarbe und Textfarbe des `body`, wenn die Farben gültig sind
    const bodyBgColor = hexToRgb(primaryColor);
    const bodyTextColor = hexToRgb(secondaryColor);

    if (bodyBgColor && bodyTextColor) {
      document.body.style.backgroundColor = primaryColor;
      document.body.style.color = secondaryColor;

      document
        .querySelector(".navbar")
        ?.setAttribute(
          "style",
          `background-color: ${primaryColor}; color: ${secondaryColor}`
        );
    }
  }, [primaryColor, secondaryColor]);

  return (
    <div className="flex justify-center">
      <div className="flex flex-col gap-16 w-full">
        <main className="grid">
          <Header
            title="Color Contrast Checker"
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
          />
          <ColorPicker
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onPrimaryColorChange={setPrimaryColor}
            onSecondaryColorChange={setSecondaryColor}
          />
          <Divider />
          <NavbarTest />
          <section className="flex gap-12 flex-col md:flex-row pb-20">
            <CopyText
              titleClassName="text-5xl font-bold pb-4 pt-12"
              paragraphClassName="text-xl"
              title="Example for Large Text"
              paragraph="Veniam fugiat occaecat minim excepteur non sint et nulla consequat nisi officia aliqua id in. Deserunt qui nostrud id consectetur ut esse labore reprehenderit sint nostrud aliquip laboris do. Ad ea velit veniam ex nulla laboris tempor eu esse incididunt sunt consectetur amet culpa."
            />
            <CopyText
              titleClassName="text-3xl font-medium pb-4 md:pt-12"
              paragraphClassName="text-base"
              title="Example for Normal Text"
              paragraph="Veniam fugiat occaecat minim excepteur non sint et nulla consequat nisi officia aliqua id in. Deserunt qui nostrud id consectetur ut esse labore reprehenderit sint nostrud aliquip laboris do. Ad ea velit veniam ex nulla laboris tempor eu esse incididunt sunt consectetur amet culpa."
            />
          </section>
        </main>
      </div>
    </div>
  );
}
