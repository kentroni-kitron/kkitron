export const trimLineBreaks = (input: string): string => {
  return input.replace(/\n{3,}/g, '\n\n');
};
