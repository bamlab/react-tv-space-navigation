import { getPrograms } from './programInfos';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const mockedRemotePrograms = getPrograms(1000);

const PAGE_SIZE = 20;

export const getRemoteProgram = async (page: number) => {
  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  await delay(1000);

  return mockedRemotePrograms.slice(start, end);
};
