import { getPrograms } from './programInfos';

const mockedRemotePrograms = getPrograms(1000);

const PAGE_SIZE = 50;

export const getRemoteProgram = (page: number) => {
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  return mockedRemotePrograms.slice(start, end);
};
