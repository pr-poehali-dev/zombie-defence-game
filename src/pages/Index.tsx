import { useState } from "react";
import ZombieGameMenu from "@/components/ZombieGameMenu";
import GameInterface from "@/components/GameInterface";

type GameState = "menu" | "playing" | "shop" | "inventory" | "stats";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>("menu");

  const handleStartGame = () => {
    setGameState("playing");
  };

  const handleOpenShop = () => {
    // Placeholder for shop functionality
    alert("Магазин будет доступен в следующей версии!");
  };

  const handleOpenInventory = () => {
    // Placeholder for inventory functionality
    alert("Инвентарь будет доступен в следующей версии!");
  };

  const handleOpenStats = () => {
    // Placeholder for stats functionality
    alert("Статистика будет доступна в следующей версии!");
  };

  const handleBackToMenu = () => {
    setGameState("menu");
  };

  if (gameState === "playing") {
    return <GameInterface onBackToMenu={handleBackToMenu} />;
  }

  return (
    <ZombieGameMenu
      onStartGame={handleStartGame}
      onOpenShop={handleOpenShop}
      onOpenInventory={handleOpenInventory}
      onOpenStats={handleOpenStats}
    />
  );
};

export default Index;
