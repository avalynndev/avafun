type Props = {
  title: string;
  time: Date;
  getPercentage: (time: Date) => number;
  getTimeLeft: (time: Date) => number;
  singularSuffix: string;
  allSingular?: boolean;
  noDelay?: boolean;
};

export function ProgressBar({
  title,
  time,
  getPercentage,
  getTimeLeft,
  singularSuffix,
  allSingular,
  noDelay,
}: Props) {
  const getSuffix = () => {
    if (!!allSingular) {
      return singularSuffix;
    }
    return `${singularSuffix}${getTimeLeft(time) === 1 ? "" : "s"}`;
  };

  return (
    <div className="mb-9 text-2xl font-bold">
      <div className="mb-1.5 flex">
        <div className="flex flex-1 items-end">{title}</div>
        <div className="flex flex-1 items-end justify-end text-xl">
          {`${getTimeLeft(time)} ${getSuffix()}`}
        </div>
      </div>
      <div className="h-12 overflow-hidden rounded-md bg-gray-200">
        <div
          className={`h-full bg-green-500 ${
            !!noDelay ? "" : "transition-width duration-500"
          } `}
          style={{ width: `${getPercentage(time)}%` }}
        ></div>
      </div>
    </div>
  );
}
