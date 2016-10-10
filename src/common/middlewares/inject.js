export default (func) => {
  return () => {
    return (next) => (action) => {
      next(func(action) || action);
    };
  };
};
