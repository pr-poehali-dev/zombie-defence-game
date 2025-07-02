import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface GameMenuProps {
  onStartGame: () => void;
  onOpenShop: () => void;
  onOpenInventory: () => void;
  onOpenStats: () => void;
}

const ZombieGameMenu = ({
  onStartGame,
  onOpenShop,
  onOpenInventory,
  onOpenStats,
}: GameMenuProps) => {
  const [isNightMode, setIsNightMode] = useState(false);

  return (
    <div
      className={`min-h-screen transition-all duration-1000 ${isNightMode ? "bg-gradient-to-b from-gray-900 via-gray-800 to-black" : "bg-gradient-to-b from-gray-700 via-gray-600 to-gray-800"}`}
    >
      {/* Atmospheric Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 font-['Montserrat'] tracking-wider drop-shadow-2xl">
            ЗОМБИ
            <span className="text-red-500 ml-4">АПОКАЛИПСИС</span>
          </h1>
          <p className="text-xl text-gray-300 font-['Roboto'] opacity-80">
            Выживи в мире мертвых
          </p>
        </div>

        {/* Day/Night Toggle */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => setIsNightMode(!isNightMode)}
            className="bg-black/20 border-gray-400 text-white hover:bg-gray-700"
          >
            <Icon
              name={isNightMode ? "Moon" : "Sun"}
              size={20}
              className="mr-2"
            />
            {isNightMode ? "Ночной режим" : "Дневной режим"}
          </Button>
        </div>

        {/* Menu Buttons */}
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          <Card
            className="bg-black/40 border-red-500/30 p-6 hover:bg-black/60 transition-all cursor-pointer group"
            onClick={onStartGame}
          >
            <div className="text-center">
              <Icon
                name="Zap"
                size={48}
                className="mx-auto mb-4 text-red-500 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-2xl font-bold text-white mb-2">
                НАЧАТЬ ИГРУ
              </h3>
              <p className="text-gray-400">Войти в зону заражения</p>
            </div>
          </Card>

          <Card
            className="bg-black/40 border-blue-500/30 p-6 hover:bg-black/60 transition-all cursor-pointer group"
            onClick={onOpenShop}
          >
            <div className="text-center">
              <Icon
                name="ShoppingCart"
                size={48}
                className="mx-auto mb-4 text-blue-400 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-2xl font-bold text-white mb-2">МАГАЗИН</h3>
              <p className="text-gray-400">Патроны и снаряжение</p>
            </div>
          </Card>

          <Card
            className="bg-black/40 border-green-500/30 p-6 hover:bg-black/60 transition-all cursor-pointer group"
            onClick={onOpenInventory}
          >
            <div className="text-center">
              <Icon
                name="Package"
                size={48}
                className="mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-2xl font-bold text-white mb-2">ИНВЕНТАРЬ</h3>
              <p className="text-gray-400">Управление снаряжением</p>
            </div>
          </Card>

          <Card
            className="bg-black/40 border-yellow-500/30 p-6 hover:bg-black/60 transition-all cursor-pointer group"
            onClick={onOpenStats}
          >
            <div className="text-center">
              <Icon
                name="BarChart3"
                size={48}
                className="mx-auto mb-4 text-yellow-400 group-hover:scale-110 transition-transform"
              />
              <h3 className="text-2xl font-bold text-white mb-2">СТАТИСТИКА</h3>
              <p className="text-gray-400">Достижения и рекорды</p>
            </div>
          </Card>
        </div>

        {/* Game Info */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-4 gap-8 text-sm text-gray-400 max-w-2xl">
            <div>
              <Icon
                name="Target"
                size={24}
                className="mx-auto mb-2 text-red-400"
              />
              <p>3 ТИПА ЗОМБИ</p>
            </div>
            <div>
              <Icon
                name="Sword"
                size={24}
                className="mx-auto mb-2 text-blue-400"
              />
              <p>4 ВИДА ОРУЖИЯ</p>
            </div>
            <div>
              <Icon
                name="Shield"
                size={24}
                className="mx-auto mb-2 text-green-400"
              />
              <p>СИСТЕМА БРОНИ</p>
            </div>
            <div>
              <Icon
                name="Clock"
                size={24}
                className="mx-auto mb-2 text-yellow-400"
              />
              <p>ДЕНЬ/НОЧЬ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZombieGameMenu;
