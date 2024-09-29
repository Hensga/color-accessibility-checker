# Farbkontrast-Checker

Ein interaktives Werkzeug zur Überprüfung von Farbkontrasten gemäß den WCAG-Richtlinien, mit zusätzlichen Funktionen wie Farbenblindheitssimulationen und Kopierfunktion.

## Inhaltsverzeichnis

- [Überblick](#überblick)
- [Funktionen](#funktionen)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [Technologien](#technologien)

## Überblick

Der **Farbkontrast-Checker** ist ein Werkzeug für Designer und Entwickler, um sicherzustellen, dass ihre Farbkombinationen den Zugänglichkeitsstandards entsprechen. Es ermöglicht die Überprüfung von Farbkontrasten gemäß den [WCAG 2.1 Richtlinien](https://www.w3.org/TR/WCAG21/) und bietet zusätzliche Funktionen wie:

- **Farbenblindheitssimulationen**: Zeigt an, wie Farbkombinationen für Personen mit verschiedenen Formen von Farbenblindheit aussehen.
- **Kopierfunktion**: Einfache Kopiermöglichkeit der Farbwerte per Klick.
- **Interaktive Anzeige**: Zeigt die Konformität der Farbkombinationen mit den WCAG-Konformitätsstufen AA und AAA für normalen und großen Text.

## Funktionen

- **Kontrastberechnung**: Berechnet das Kontrastverhältnis zwischen zwei Farben und zeigt es an.
- **Farbenblindheitssimulationen**: Simuliert, wie die ausgewählten Farben für Menschen mit verschiedenen Formen von Farbenblindheit aussehen, einschließlich Protanopie, Deuteranopie und mehr.
- **Kopierfunktion**: Einfaches Kopieren von Farbwerten durch Klick auf ein Kopier-Icon neben den Eingabefeldern.
- **Responsive Design**: Optimiert für verschiedene Bildschirmgrößen und Geräte.

## Installation

1. **Repository klonen**

   ```bash
   git clone https://github.com/Hensga/color-accessibility-checker.git
   cd farbkontrast-checker

   ```

2. **Abhängigkeiten installieren**

   ```bash
   npm install

   ```

3. **Lokalen Entwicklungsserver starten**

   ```bash
   npm start

   Öffne http://localhost:3000 im Browser, um die Anwendung zu sehen.
   ```

## Verwendung

1. **Farben auswählen**

   Gib die Primär- und Sekundärfarbe als Hex-Farbwerte in die entsprechenden Eingabefelder ein.

2. **Kontrastverhältnis überprüfen**

   Das Tool berechnet automatisch das Kontrastverhältnis und zeigt es an.  
   Die WCAG-Konformitätsstufen werden für normalen und großen Text angezeigt.

3. **Farbenblindheitssimulationen anzeigen**

   Sieh dir an, wie deine Farbkombinationen für Menschen mit verschiedenen Formen von Farbenblindheit aussehen.  
   Nutze die Tooltips, um mehr über die einzelnen Farbenblindheitstypen zu erfahren.

4. **Farbwerte kopieren**

   Klicke auf das Kopier-Icon neben den Eingabefeldern, um die Farbwerte zu kopieren.

## Technologien

- **React**
- **TypeScript**
- **Tailwind CSS**
- **wcag-contrast**
- **color-blind**
- **react-tooltip**
- **Heroicons**

Erstellt mit ❤️ von [Henning Huth](www.henninghuth.dev).
