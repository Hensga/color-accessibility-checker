// components/Header.tsx
import { useContrast } from "../hooks/useContrast";
import ColorBlindnessSimulation from "./ColorBlindnessSimulation";

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
  const { contrast, aaLarge, aaNormal, aaaLarge, aaaNormal } = useContrast(
    primaryColor,
    secondaryColor
  );

  return (
    <header className="flex flex-col gap-4 pb-10">
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

      {/* Farbenblindheitssimulation */}
      <ColorBlindnessSimulation
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
    </header>
  );
}
