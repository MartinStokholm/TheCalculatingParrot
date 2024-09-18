export enum TitleSizes {
  Large = "Large",
  Medium = "Medium",
  Small = "Small",
}

type TitleProps = {
  text: string;
  size: TitleSizes;
  color?: string;
  className?: string;
};

export function Title({ text, size, className, color }: TitleProps) {
  let localClassName = "";
  switch (size) {
    case TitleSizes.Large:
      localClassName = "text-3xl";
      break;
    case TitleSizes.Medium:
      localClassName = "text-xl";
      break;
    case TitleSizes.Small:
      localClassName = "text-md";
      break;
  }

  if (color) {
    localClassName += ` text-${color}`;
  } else {
    localClassName += " text-zinc-800";
  }

  return (
    <h1
      className={
        "border-b-4  border-blue-200 pb-1 m-4 font-light   " +
        localClassName +
        " " +
        className
      }
    >
      {text}
    </h1>
  );
}
