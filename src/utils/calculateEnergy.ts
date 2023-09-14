export const calculateConsumedEnergy = (rocketMass: number): number => {
  const fuelMass = 15 * rocketMass;
  const fuelEnergyConsumedPerKg = 1.35e7;
  const totalMass = rocketMass + fuelMass;
  const consumedEnergy = totalMass * fuelEnergyConsumedPerKg;

  return consumedEnergy;
};

export const calculateTotalEnergy = (rocketMasses: number[]) => {
  return rocketMasses
    .map((rocketMass) => {
      const energy = calculateConsumedEnergy(rocketMass);
      return energy;
    })
    .reduce((acc, curr) => acc + curr, 0);
};
