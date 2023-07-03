import { useMemo } from 'react';

const RABBITS = [
  require('./rabbit1.png'),
  require('./rabbit2.png'),
  require('./rabbit3.png'),
  require('./rabbit4.png'),
  require('./rabbit5.png'),
  require('./rabbit6.png'),
  require('./rabbit7.png'),
  require('./rabbit8.png'),
  require('./rabbit9.png'),
];

// Use a global mutated variable to not have duplicate rabbits
let globalRabbitIndex = 0;
const getGlobalRabbitIndex = () => {
  globalRabbitIndex = (globalRabbitIndex + 1) % (RABBITS.length - 1);
  return globalRabbitIndex;
};

export const ProgramLayout = ({ isFocused = false }: { isFocused?: boolean }) => {
  const rabbitIndex = useMemo(() => getGlobalRabbitIndex(), []);

  return (
    <div style={styles.container}>
      <img
        style={{ ...styles.image, ...(isFocused && styles.focused) }}
        src={RABBITS[rabbitIndex].default}
      />
    </div>
  );
};

// TODO fix these ugly inline styles
const styles = {
  container: {
    margin: 20,
  },
  image: {
    width: 200,
    height: 250,
    transition: '300ms all',
    borderRadius: 20,
    borderColor: 'transparent',
    borderWidth: 3,
    borderStyle: 'solid',
  },
  focused: {
    borderColor: 'white',
    transform: `scale(1.1)`,
  },
};
