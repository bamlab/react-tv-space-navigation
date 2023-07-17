import { programs } from './programs';

export const getProgramById = (id: string) => {
  const program = programs.find((program) => program.id === id);
  if (!program) {
    console.warn(`Program with id ${id} not found, please check the id`);
  }
  return program;
};
