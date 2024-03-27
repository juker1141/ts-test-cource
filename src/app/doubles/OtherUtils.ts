export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallBack = (arg: string) => void;

export function calculateComplexity(stringInfo: stringInfo) {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
}

export function toUpperCaseWithCb(
  arg: string,
  callback: LoggerServiceCallBack
) {
  if (!arg) {
    callback("Invalid argument!");
    return;
  }
  callback(`called function with ${arg}`);
  return arg.toUpperCase();
}
