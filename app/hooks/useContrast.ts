/*
 * Dieser Hook kapselt die Logik zur Berechnung
 * des Kontrastverhältnisses und der WCAG-Konformität.
 * @param primaryColor - Die Hintergrundfarbe
 * @param secondaryColor - Die Textfarbe
 * @returns Kontrastverhältnis und WCAG-Konformität
 *
 * Rückgabe des Objekts ermöglicht den Zugriff auf alle berechneten Werte.
 */
import { useState, useEffect } from "react";
// @ts-expect-error import has no types
import { hex as getContrastRatio } from "wcag-contrast";

export function useContrast(primaryColor: string, secondaryColor: string) {
  const [contrast, setContrast] = useState(""); // Kontrastwert
  const [aaLarge, setAaLarge] = useState(false);
  const [aaNormal, setAaNormal] = useState(false);
  const [aaaLarge, setAaaLarge] = useState(false);
  const [aaaNormal, setAaaNormal] = useState(false);

  // Funktion zur Überprüfung von gültigen Hex-Werten
  function isValidHex(color: string) {
    return /^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}$/.test(color);
  }

  useEffect(() => {
    if (isValidHex(primaryColor) && isValidHex(secondaryColor)) {
      const contrastValue = getContrastRatio(primaryColor, secondaryColor);
      setContrast(contrastValue.toFixed(2));

      const ratio = contrastValue;

      setAaLarge(ratio >= 3);
      setAaNormal(ratio >= 4.5);
      setAaaLarge(ratio >= 4.5);
      setAaaNormal(ratio >= 7);
    } else {
      setContrast("-");
    }
  }, [primaryColor, secondaryColor]);

  return { contrast, aaLarge, aaNormal, aaaLarge, aaaNormal };
}
