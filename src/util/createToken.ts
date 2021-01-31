export const createToken = () => {
  return Math.random().toString(36).slice(-12);
};
