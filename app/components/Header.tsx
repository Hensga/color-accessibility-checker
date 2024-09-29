import { useState, useEffect } from "react";
// @ts-expect-error import has no types
import { hex as getContrastRatio } from "wcag-contrast";
// @ts-expect-error import has no types
import colorBlind from "color-blind";
import { Tooltip } from "react-tooltip";

interface HeaderProps {
  title: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function Header({
  title,
  primaryColor,
  secondaryColor,
}: HeaderProps) {
  const [contrast, setContrast] = useState(""); // Zustand für Kontrastwert
  const [aaLarge, setAaLarge] = useState(false);
  const [aaNormal, setAaNormal] = useState(false);
  const [aaaLarge, setAaaLarge] = useState(false);
  const [aaaNormal, setAaaNormal] = useState(false);

  // Neue Zustände für die Simulationen
  const [simulations, setSimulations] = useState<{ [key: string]: any }>({});

  // Funktion zur Überprüfung von gültigen Hex-Werten
  function isValidHex(color: string) {
    const isValid = /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(color);
    console.log(`Validating Color: ${color}, Is Valid: ${isValid}`);
    return isValid;
  }

  useEffect(() => {
    if (isValidHex(primaryColor) && isValidHex(secondaryColor)) {
      // Berechne das Kontrastverhältnis
      const contrastValue = getContrastRatio(primaryColor, secondaryColor);
      setContrast(contrastValue.toFixed(2)); // Setze Kontrastwert (2 Dezimalstellen)

      // Überprüfe die Konformität mit WCAG (boolean zurückgeben)
      const ratio = contrastValue;

      // WCAG 2.0 Konformitätsstufen
      setAaLarge(ratio >= 3); // AA Large Text: mindestens 3:1
      setAaNormal(ratio >= 4.5); // AA Normal Text: mindestens 4.5:1
      setAaaLarge(ratio >= 4.5); // AAA Large Text: mindestens 4.5:1
      setAaaNormal(ratio >= 7); // AAA Normal Text: mindestens 7:1

      console.log(`Contrast: ${contrastValue}`);

      // Simuliere Farbenblindheit
      const types = [
        "protanopia",
        "deuteranopia",
        "tritanopia",
        "protanomaly",
        "deuteranomaly",
        "tritanomaly",
        "achromatopsia",
        "achromatomaly",
      ];

      const newSimulations: { [key: string]: any } = {};

      types.forEach((type) => {
        // Simuliere die Primärfarbe
        const simulatedPrimary = colorBlind[type](primaryColor);
        // Simuliere die Sekundärfarbe
        const simulatedSecondary = colorBlind[type](secondaryColor);

        // Berechne das Kontrastverhältnis der simulierten Farben
        const simulatedContrast = getContrastRatio(
          simulatedPrimary,
          simulatedSecondary
        );

        // Speichere die simulierten Farben und das Kontrastverhältnis
        newSimulations[type] = {
          primary: simulatedPrimary,
          secondary: simulatedSecondary,
          contrast: simulatedContrast.toFixed(2),
        };
      });

      setSimulations(newSimulations);
    } else {
      setContrast("-");
    }
  }, [primaryColor, secondaryColor]);

  // Debugging in der Header-Komponente
  useEffect(() => {
    console.log(
      `Header Props -> Primary: ${primaryColor}, Secondary: ${secondaryColor}`
    );
  }, [primaryColor, secondaryColor]);

  return (
    <header className="flex flex-col gap-4 pb-10">
      {/* Bestehendes Design */}
      <h1 className="text-4xl sm:text-6xl font-bold">{title}</h1>
      <div className="flex flex-wrap items-end justify-between w-full gap-4 md:gap-0">
        <div className="flex items-end gap-10 md:gap-6">
          <div
            className="flex gap-2 shadow-customShadow p-9 rounded-md"
            style={{
              backgroundColor: primaryColor,
              color: secondaryColor,
            }}
          >
            <span className="text-9xl font-bold w-['fit-content']">Aa</span>
          </div>
          <div className="flex gap-2 font-medium text-7xl">
            <span>{contrast}</span>
          </div>
        </div>
        <div className="flex gap-8">
          {/* AA Large */}
          <div className="flex flex-col">
            <div
              className={`shadow-customShadow p-2 rounded-md self-center ${
                aaLarge ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {aaLarge ? "Fit" : "Failed"}
            </div>
            <span className="w-['fit-content']">AA Large</span>
          </div>

          {/* AA Normal */}
          <div className="flex flex-col">
            <div
              className={`shadow-customShadow p-2 rounded-md self-center ${
                aaNormal ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {aaNormal ? "Fit" : "Failed"}
            </div>
            <span className="w-['fit-content']">AA Normal</span>
          </div>

          {/* AAA Large */}
          <div className="flex flex-col">
            <div
              className={`shadow-customShadow p-2 rounded-md self-center ${
                aaaLarge ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {aaaLarge ? "Fit" : "Failed"}
            </div>
            <span className="w-['fit-content']">AAA Large</span>
          </div>

          {/* AAA Normal */}
          <div className="flex flex-col">
            <div
              className={`shadow-customShadow p-2 rounded-md self-center ${
                aaaNormal ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {aaaNormal ? "Fit" : "Failed"}
            </div>
            <span className="w-['fit-content']">AAA Normal</span>
          </div>
        </div>
      </div>

      {/* Abschnitt zur Anzeige der Simulationen */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Simulation von Farbenblindheit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {Object.keys(simulations).map((type) => (
            <div key={type} className="p-4 border rounded-md">
              <h3 className="text-xl font-semibold capitalize">
                <span
                  data-tooltip-id={`tooltip-${type}`}
                  data-tooltip-content={getColorBlindnessDescription(type)}
                  className="underline cursor-help"
                >
                  {type}
                </span>
                <Tooltip id={`tooltip-${type}`} />
              </h3>
              <div className="flex gap-4 mt-2">
                {/* Originalfarben */}
                <div className="flex-1">
                  <p className="font-semibold">Original</p>
                  <div
                    className="mt-2 p-4 rounded-md shadow-customShadow"
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  >
                    Beispieltext
                  </div>
                </div>
                {/* Simulierte Farben */}
                <div className="flex-1">
                  <p className="font-semibold">Simulation</p>
                  <div
                    className="mt-2 p-4 rounded-md"
                    style={{
                      backgroundColor: simulations[type].secondary,
                      color: simulations[type].primary,
                    }}
                  >
                    Beispieltext
                  </div>
                </div>
              </div>
              <p className="mt-2">
                Kontrastverhältnis: {simulations[type].contrast}:1
              </p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

// Hilfsfunktion für Tooltips
function getColorBlindnessDescription(type: string) {
  const descriptions: { [key: string]: string } = {
    protanopia:
      "Protanopie (Rotblindheit): Keine Wahrnehmung von Rot. Die L-Zapfen fehlen.",
    deuteranopia:
      "Deuteranopie (Grünblindheit): Keine Wahrnehmung von Grün. Die M-Zapfen fehlen.",
    tritanopia:
      "Tritanopie (Blaublindheit): Keine Wahrnehmung von Blau. Die S-Zapfen fehlen.",
    protanomaly:
      "Protanomalie (Rot-Schwäche): Eingeschränkte Wahrnehmung von Rot.",
    deuteranomaly:
      "Deuteranomalie (Grün-Schwäche): Eingeschränkte Wahrnehmung von Grün.",
    tritanomaly:
      "Tritanomalie (Blau-Schwäche): Eingeschränkte Wahrnehmung von Blau.",
    achromatopsia:
      "Achromatopsie (Monochromasie): Vollständige Farbenblindheit. Keine Farbwahrnehmung.",
    achromatomaly:
      "Achromatomalie: Eingeschränkte Farbwahrnehmung. Sehr geringe Farberkennung.",
  };

  return descriptions[type] || "Keine Beschreibung verfügbar.";
}
