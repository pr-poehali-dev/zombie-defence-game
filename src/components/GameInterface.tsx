import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface GameStats {
  health: number;
  armor: number;
  money: number;
  ammoRifle: number;
  ammoGlock: number;
  zombiesKilled: number;
}

interface GameInterfaceProps {
  onBackToMenu: () => void;
}

const GameInterface = ({ onBackToMenu }: GameInterfaceProps) => {
  const [selectedWeapon, setSelectedWeapon] = useState(1);
  const [isNightMode, setIsNightMode] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    health: 100,
    armor: 200,
    money: 1000,
    ammoRifle: 150,
    ammoGlock: 80,
    zombiesKilled: 0,
  });

  const weapons = [
    {
      id: 1,
      name: "Автомат",
      key: "1",
      icon: "Zap",
      ammo: gameStats.ammoRifle,
    },
    {
      id: 2,
      name: "Глок",
      key: "2",
      icon: "Target",
      ammo: gameStats.ammoGlock,
    },
    { id: 3, name: "Нож", key: "3", icon: "Sword", ammo: "∞" },
    { id: 4, name: "Граната", key: "4", icon: "Bomb", ammo: "5" },
  ];

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = parseInt(event.key);
      if (key >= 1 && key <= 4) {
        setSelectedWeapon(key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const currentWeapon = weapons.find((w) => w.id === selectedWeapon);

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${isNightMode ? "bg-gradient-to-b from-indigo-900 via-purple-900 to-black" : "bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800"}`}
    >
      {/* Game Background City */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute top-20 left-20 w-16 h-16 bg-yellow-400 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-red-500 rounded-full blur-lg animate-pulse delay-500"></div>
      </div>

      {/* Top HUD */}
      <div className="relative z-20 p-4">
        <div className="flex justify-between items-start">
          {/* Player Stats */}
          <Card className="bg-black/60 border-gray-500/30 p-4 min-w-80">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon name="Heart" size={20} className="text-red-500 mr-2" />
                  <span className="text-white font-semibold">Здоровье</span>
                </div>
                <span className="text-red-400 font-bold">
                  {gameStats.health}/100
                </span>
              </div>
              <Progress value={gameStats.health} className="h-3" />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon
                    name="Shield"
                    size={20}
                    className="text-blue-500 mr-2"
                  />
                  <span className="text-white font-semibold">Броня</span>
                </div>
                <span className="text-blue-400 font-bold">
                  {gameStats.armor}/200
                </span>
              </div>
              <Progress value={(gameStats.armor / 200) * 100} className="h-3" />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Icon
                    name="DollarSign"
                    size={20}
                    className="text-green-500 mr-2"
                  />
                  <span className="text-white font-semibold">Деньги</span>
                </div>
                <span className="text-green-400 font-bold">
                  {gameStats.money}
                </span>
              </div>
            </div>
          </Card>

          {/* Day/Night Toggle & Menu */}
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setIsNightMode(!isNightMode)}
              className="bg-black/40 border-gray-400 text-white hover:bg-gray-700"
            >
              <Icon
                name={isNightMode ? "Moon" : "Sun"}
                size={20}
                className="mr-2"
              />
              {isNightMode ? "Ночь" : "День"}
            </Button>
            <Button
              onClick={onBackToMenu}
              className="bg-red-600 hover:bg-red-700"
            >
              <Icon name="Home" size={20} className="mr-2" />
              Меню
            </Button>
          </div>
        </div>
      </div>

      {/* Central Game Area */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <Card className="bg-black/40 border-gray-500/30 p-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">ИГРОВАЯ ЗОНА</h2>
          <p className="text-xl text-gray-300 mb-6">
            Здесь будет происходить сражение с зомби
          </p>
          <div className="text-6xl mb-4">🧟‍♂️</div>
          <p className="text-gray-400">
            Убито зомби:{" "}
            <span className="text-red-400 font-bold">
              {gameStats.zombiesKilled}
            </span>
          </p>
        </Card>
      </div>

      {/* Bottom HUD - Weapon Selection */}
      <div className="relative z-20 p-4">
        <Card className="bg-black/60 border-gray-500/30 p-4 mx-auto max-w-4xl">
          <div className="grid grid-cols-4 gap-4">
            {weapons.map((weapon) => (
              <div
                key={weapon.id}
                className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedWeapon === weapon.id
                    ? "border-yellow-400 bg-yellow-400/20"
                    : "border-gray-600 bg-gray-800/50 hover:border-gray-400"
                }`}
                onClick={() => setSelectedWeapon(weapon.id)}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-xs text-gray-400 mr-2 font-mono">
                      {weapon.key}
                    </span>
                    <Icon
                      name={weapon.icon as any}
                      size={32}
                      className={
                        selectedWeapon === weapon.id
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {weapon.name}
                  </h4>
                  <p className="text-xs text-gray-400">
                    Патроны: {weapon.ammo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-gray-400 text-sm">
              Текущее оружие:{" "}
              <span className="text-yellow-400 font-semibold">
                {currentWeapon?.name}
              </span>
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Нажмите клавиши 1-4 для смены оружия
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GameInterface;
