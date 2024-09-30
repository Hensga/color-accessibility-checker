// pages/index.tsx
import { useEffect, useState } from "react";
import Header from "~/components/Header";
import ColorBlindnessSimulation from "~/components/ColorBlindnessSimulation";
import Divider from "~/components/Divider";
import NavbarTest from "~/components/NavbarTest";
import CopyText from "~/components/CopyText";
import ColorPicker from "~/components/ColorPicker";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Color Accessibility Checker" },
    {
      name: "description",
      content: "Check colors for accessibility and contrast.",
    },
  ];
};

export default function Index() {
  const [primaryColor, setPrimaryColor] = useState("#23429c");
  const [secondaryColor, setSecondaryColor] = useState("#d8ba60");

  useEffect(() => {
    // Setze die Farben im DOM oder für andere Effekte
    document.body.style.backgroundColor = primaryColor;
    document.body.style.color = secondaryColor;
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

          {/* Farbenblindheitssimulation */}
          <ColorBlindnessSimulation
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
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
