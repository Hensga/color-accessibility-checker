/*
 * Komponente zur Simulation von Farbenblindheit
 * @param primaryColor - Die Hintergrundfarbe
 * @param secondaryColor - Die Textfarbe
 * @returns Simulationen von Farbenblindheit
 * Tooltip-Beschreibungen für die verschiedenen Arten von Farbenblindheit
 */

// @ts-expect-error import has no types
import colorBlind from "color-blind";
// @ts-expect-error import has no types
import { hex as getContrastRatio } from "wcag-contrast";
import { Tooltip } from "react-tooltip";

interface SimulationProps {
  primaryColor: string;
  secondaryColor: string;
}

const colorBlindnessTypes = [
  "protanopia",
  "deuteranopia",
  "tritanopia",
  "protanomaly",
  "deuteranomaly",
  "tritanomaly",
  "achromatopsia",
  "achromatomaly",
];

export default function ColorBlindnessSimulation({
  primaryColor,
  secondaryColor,
}: SimulationProps) {
  // Funktion zur Generierung der Simulationen
  const simulations = colorBlindnessTypes.map((type) => {
    const simulatedPrimary = colorBlind[type](secondaryColor);
    const simulatedSecondary = colorBlind[type](primaryColor);
    const simulatedContrast = getContrastRatio(
      simulatedPrimary,
      simulatedSecondary
    ).toFixed(2);

    return {
      type,
      simulatedPrimary,
      simulatedSecondary,
      simulatedContrast,
    };
  });

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold">Simulation von Farbenblindheit</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {simulations.map((simulation) => (
          <div key={simulation.type} className="p-4 border rounded-md">
            <h3 className="text-xl font-semibold capitalize">
              <span
                data-tooltip-id={`tooltip-${simulation.type}`}
                data-tooltip-content={getColorBlindnessDescription(
                  simulation.type
                )}
                className="underline cursor-help"
              >
                {simulation.type}
              </span>
              <Tooltip id={`tooltip-${simulation.type}`} />
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
                  className="mt-2 p-4 rounded-md shadow-customShadow"
                  style={{
                    backgroundColor: simulation.simulatedSecondary,
                    color: simulation.simulatedPrimary,
                  }}
                >
                  Beispieltext
                </div>
              </div>
            </div>
            <p className="mt-2">
              Kontrastverhältnis: {simulation.simulatedContrast}:1
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hilfsfunktion für Tooltip-Beschreibungen
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
