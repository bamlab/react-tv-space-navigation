import {useMemo} from 'react';

const RABBITS = [
  require('../assets/rabbit1.png'),
  require('../assets/rabbit2.png'),
  require('../assets/rabbit3.png'),
  require('../assets/rabbit4.png'),
  require('../assets/rabbit5.png'),
  require('../assets/rabbit6.png'),
  require('../assets/rabbit7.png'),
  require('../assets/rabbit8.png'),
  require('../assets/rabbit9.png'),
  require('../assets/rabbit4.png'),
  require('../assets/rabbit1.png'),
  require('../assets/rabbit5.png'),
  require('../assets/rabbit6.png'),
];

// Use a global mutated variable to not have duplicate rabbits
let globalRabbitIndex = 0;
const getGlobalRabbitIndex = () => {
  globalRabbitIndex = (globalRabbitIndex + 1) % (RABBITS.length - 1);
  return globalRabbitIndex;
};

export const useRabbitImageSource = () => {
  const rabbitIndex = useMemo(() => getGlobalRabbitIndex(), []);
  return RABBITS[rabbitIndex];
};
