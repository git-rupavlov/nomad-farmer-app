import { MapScreen } from "./screens/MapScreen";
import { FarmCityScreen } from "./screens/FarmCityScreen";
import { useGameStore } from "./store/useGameStore";

export function App() {
  const selectedFarmId = useGameStore((state) => state.selectedFarmId);

  return selectedFarmId ? <FarmCityScreen /> : <MapScreen />;
}
