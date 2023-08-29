const pick = <T extends object, K extends keyof T>(
  data: T,
  keys: K[],
): Partial<T> => {
  const finalObject: Partial<T> = {};

  for (const key of keys) {
    if (data && Object.hasOwnProperty.call(data, key)) {
      finalObject[key] = data[key];
    }
  }

  return finalObject;
};

export default pick;
