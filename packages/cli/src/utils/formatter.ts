export const reviver = (key: string, value: any) => {
  if (key) {
    const lowercaseKey = key.charAt(0).toLowerCase() + key.slice(1);
    return { [lowercaseKey]: value };
  }
  return value;
}