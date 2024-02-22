import Rabbit1 from '../assets/rabbit1.png';
import Rabbit2 from '../assets/rabbit2.png';
import Rabbit3 from '../assets/rabbit3.png';
import Rabbit4 from '../assets/rabbit4.png';
import Rabbit5 from '../assets/rabbit5.png';
import Rabbit6 from '../assets/rabbit6.png';
import Rabbit7 from '../assets/rabbit7.png';
import Rabbit8 from '../assets/rabbit8.png';
import Rabbit9 from '../assets/rabbit9.png';
import Rabbit10 from '../assets/rabbit10.png';
import Rabbit11 from '../assets/rabbit11.png';
import Rabbit12 from '../assets/rabbit12.png';
import Rabbit13 from '../assets/rabbit13.png';
import Rabbit14 from '../assets/rabbit14.png';
import Rabbit15 from '../assets/rabbit15.png';
import Rabbit16 from '../assets/rabbit16.png';
import Rabbit17 from '../assets/rabbit17.png';
import Rabbit18 from '../assets/rabbit18.png';
import Rabbit19 from '../assets/rabbit19.png';
import Rabbit20 from '../assets/rabbit20.png';
import Rabbit21 from '../assets/rabbit21.png';
import Rabbit22 from '../assets/rabbit22.png';
import Rabbit23 from '../assets/rabbit23.png';
import Rabbit24 from '../assets/rabbit24.png';
import Rabbit25 from '../assets/rabbit25.png';
import { ProgramInfo } from '../domain/programInfo';

export const programInfos: ProgramInfo[] = [
  {
    id: '1',
    title: 'Program 1',
    image: Rabbit1,
    description: 'Program 1 description',
  },
  {
    id: '2',
    title: 'Program 2',
    image: Rabbit2,
    description: 'Program 2 description',
  },
  {
    id: '3',
    title: 'Program 3',
    image: Rabbit3,
    description: 'Program 3 description',
  },
  {
    id: '4',
    title: 'Program 4',
    image: Rabbit4,
    description: 'Program 4 description',
  },
  {
    id: '5',
    title: 'Program 5',
    image: Rabbit5,
    description: 'Program 5 description',
  },
  {
    id: '6',
    title: 'Program 6',
    image: Rabbit6,
    description: 'Program 6 description',
  },
  {
    id: '7',
    title: 'Program 7',
    image: Rabbit7,
    description: 'Program 7 description',
  },
  {
    id: '8',
    title: 'Program 8',
    image: Rabbit8,
    description: 'Program 8 description',
  },
  {
    id: '9',
    title: 'Program 9',
    image: Rabbit9,
    description: 'Program 9 description',
  },
  {
    id: '10',
    title: 'Program 10',
    image: Rabbit10,
    description: 'Program 10 description',
  },
  {
    id: '11',
    title: 'Program 11',
    image: Rabbit11,
    description: 'Program 11 description',
  },
  {
    id: '12',
    title: 'Program 12',
    image: Rabbit12,
    description: 'Program 12 description',
  },
  {
    id: '13',
    title: 'Program 13',
    image: Rabbit13,
    description: 'Program 13 description',
  },
  {
    id: '14',
    title: 'Program 14',
    image: Rabbit14,
    description: 'Program 14 description',
  },
  {
    id: '15',
    title: 'Program 15',
    image: Rabbit15,
    description: 'Program 15 description',
  },
  {
    id: '16',
    title: 'Program 16',
    image: Rabbit16,
    description: 'Program 16 description',
  },
  {
    id: '17',
    title: 'Program 17',
    image: Rabbit17,
    description: 'Program 17 description',
  },
  {
    id: '18',
    title: 'Program 18',
    image: Rabbit18,
    description: 'Program 18 description',
  },
  {
    id: '19',
    title: 'Program 19',
    image: Rabbit19,
    description: 'Program 19 description',
  },
  {
    id: '20',
    title: 'Program 20',
    image: Rabbit20,
    description: 'Program 20 description',
  },
  {
    id: '21',
    title: 'Program 21',
    image: Rabbit21,
    description: 'Program 21 description',
  },
  {
    id: '22',
    title: 'Program 22',
    image: Rabbit22,
    description: 'Program 22 description',
  },
  {
    id: '23',
    title: 'Program 23',
    image: Rabbit23,
    description: 'Program 23 description',
  },
  {
    id: '24',
    title: 'Program 24',
    image: Rabbit24,
    description: 'Program 24 description',
  },
  {
    id: '25',
    title: 'Program 25',
    image: Rabbit25,
    description: 'Program 25 description',
  },
];

const shuffleArray = <T>(array: Array<T>) => {
  const arrayCopy = [...array];
  for (let i = arrayCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }

  return arrayCopy;
};

export const getPrograms = (listSize?: number) => {
  if (!listSize) return shuffleArray(programInfos);
  const programInfosWithCustomSize: ProgramInfo[] = [];
  for (let i = 0; i < listSize; i++) {
    programInfosWithCustomSize.push(
      programInfos[Math.floor(Math.random() * (programInfos.length - 1))],
    );
  }
  return programInfosWithCustomSize;
};
