// @ts-ignore
import { ReactComponent as ButtonSideSvg } from "../assets/btnSide.svg";
import ArrowLeftSvg from "../assets/ArrowLeft.svg";
import ArrowRightSvg from "../assets/ArrowRight.svg";
import AddSvg from "../assets/Add.svg";
import "./MarvelButton.scss";
import { Typography } from "@mui/material";

export default function MarvelButton(props: MarvelButtonProps) {
  const { variant, direction, testId } = props;

  const shouldDisplayLeftArrow =
    variant === "secondary" && direction === "left";
  const shouldDisplayRightArrow =
    variant === "secondary" && direction === "right";

  return (
    <button data-testid={testId} {...props} className={buildButtonClassName()}>
      <ButtonSideSvg className="marvelButton__left" />

      <div className="marvelButton__center">
        {variant === "primary" && <img src={AddSvg} alt="Add icon" />}
        {shouldDisplayLeftArrow && <img src={ArrowLeftSvg} alt="Left arrow" />}

        <Typography variant="h6" sx={{ margin: "0 8px" }}>
          {props.label}
        </Typography>

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

    return classNameArr.join(" ");
  }
}

interface MarvelButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  direction?: "left" | "right";
  label: string;
  testId?: string;
}
