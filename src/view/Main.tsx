import { ReactNode, useState } from "react";
import Card from "../components/Card";
import { Launch } from "../gql/__generated__/graphql";
import {
  calculateConsumedEnergy,
  calculateTotalEnergy,
} from "../utils/calculateEnergy";
import BarChart from "../components/BarChart";

const Main = ({
  launches,
  loadMoreButton,
}: {
  launches: Launch[];
  loadMoreButton?: ReactNode | undefined;
}) => {
  const [selectedLaunches, setSelectedLaunches] = useState<Launch[]>([]);
  const [displayChart, setDisplayChart] = useState(false);
  const [totalEnergy, setTotalEnergy] = useState<number>();

  const isSelected = (launch: Launch) => {
    return selectedLaunches.find(
      (selectedLaunch) => selectedLaunch.id === launch.id
    )
      ? true
      : false;
  };

  const onSelectToggle = (launch: Launch) => {
    resetSelection();
    if (isSelected(launch)) {
      const newtSelectedLaunches = selectedLaunches.filter(
        (selectedLaunch) => selectedLaunch.id !== launch.id
      );
      setSelectedLaunches(newtSelectedLaunches);
    } else {
      setSelectedLaunches([...selectedLaunches, launch]);
    }
  };

  const calculateTotalEnergyCost = () => {
    const totalEnergy = calculateTotalEnergy(
      selectedLaunches.map(
        (launch) => launch.rocket?.rocket?.mass?.kg
      ) as number[]
    );
    setTotalEnergy(totalEnergy);
  };

  const resetSelection = () => {
    setDisplayChart(false);
    setSelectedLaunches([]);
    setTotalEnergy(undefined);
  };

  const selectAll = () => {
    setSelectedLaunches(launches);
  };

  const barChartData = selectedLaunches.map((launch) => {
    return {
      name: launch.mission_name as string,
      energyCost: calculateConsumedEnergy(
        launch.rocket?.rocket?.mass?.kg as number
      ),
    };
  });

  return (
    <>
      <button
        className="mb-2 inline-block rounded bg-gray-200 text-gray-800 p-1 text-xs font-medium leading-normal hover:opacity-70"
        onClick={selectAll}
      >
        Select All
      </button>
      <div className="grid grid-cols-1 p-2 max-h-96 gap-4 justify-center overflow-scroll md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {launches.map((launch) => {
          return (
            <Card
              onClick={() => onSelectToggle(launch)}
              selected={isSelected(launch)}
              key={launch.id}
              launch={launch}
            />
          );
        })}
      </div>
      {loadMoreButton}
      <div className="mt-4 grid gap-1 grid-cols-1 md:grid-cols-3">
        <button
          onClick={calculateTotalEnergyCost}
          className="inline-block rounded bg-red-900 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border-solid border-2 border-textPrimary hover:opacity-70"
        >
          Calculate
        </button>
        <button
          onClick={() => selectedLaunches.length !== 0 && setDisplayChart(true)}
          className="inline-block rounded bg-lime-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border-solid border-2 border-textPrimary hover:opacity-70"
        >
          Compare
        </button>
        <button
          className="inline-block rounded bg-gray-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal border-solid border-2 border-textPrimary hover:opacity-70"
          onClick={resetSelection}
        >
          Reset
        </button>
      </div>
      <div className="h-12 mt-4">
        {totalEnergy && (
          <div className="text-lg">
            Total Energy Consumption:
            <p className="text-xl font-bold text-red-900">
              {totalEnergy.toExponential()} Joules
            </p>
          </div>
        )}
        {displayChart && (
          <div className="overflow-y-scroll">
            <BarChart data={barChartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Main;
