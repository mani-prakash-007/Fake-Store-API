export const catchError = (controllerFunction) => {
  return (req, res, next) => {
    controllerFunction(req, res, next).catch(next);
  };
};
