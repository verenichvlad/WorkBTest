// @ts-ignore
import { ReactComponent as ButtonSideSvg } from "../assets/btnSide.svg";
import ArrowLeftSvg from "../assets/ArrowLeft.svg";
import ArrowRightSvg from "../assets/ArrowRight.svg";
import AddSvg from "../assets/Add.svg";
import "./MarvelButton.scss";

export default function MarvelButton(props: MarvelButtonProps) {
  const { variant, direction, size } = props;

  const shouldDisplayLeftArrow =
    variant === "secondary" && direction === "left";
  const shouldDisplayRightArrow =
    variant === "secondary" && direction === "right";

  return (
    <button {...props} className={buildButtonClassName()}>
      <ButtonSideSvg className="marvelButton__left" />

      <div className="marvelButton__center">
        {variant === "primary" && <img src={AddSvg} />}
        {shouldDisplayLeftArrow && <img src={ArrowLeftSvg} alt="Left arrow" />}
        <span className="marvelButton__label">{props.label}</span>
        {shouldDisplayRightArrow && (
          <img src={ArrowRightSvg} alt="Right arrow" />
        )}
      </div>

      <ButtonSideSvg className="marvelButton__right" />
    </button>
  );

  function buildButtonClassName() {
    const classNameArr = ["marvelButton"];

    if (props.className) {
      classNameArr.push(props.className);
    }

    if (props.disabled) {
      classNameArr.push("marvelButton--disabled");
    }

    if (variant === "secondary") {
      classNameArr.push("marvelButton--secondary");
    }

    switch (size) {
      case "xs-lg":
        classNameArr.push("marvelButton--xs");
        break;
      case "lg+":
        classNameArr.push("marvelButton--lg");
        break;

      default:
        classNameArr.push("marvelButton--xs");
    }

    return classNameArr.join(" ");
  }
}

interface MarvelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  direction?: "left" | "right";
  size: "xs-lg" | "lg+";
  label: string;
  // disabled?: boolean;
}
