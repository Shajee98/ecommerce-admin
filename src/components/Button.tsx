import { HTMLProps, ReactNode } from "react";

interface Props {
    text: string,
    onClick?: (e: any) => void,
    type?: string,
    className: HTMLProps<HTMLElement>["className"],
    icon?: ReactNode
}
const Button = (props: Props) => {
  return (
    <button className={`${props.className}`} onClick={props.onClick}>
        {props.icon ? props.icon : null}{props.text}
    </button>
  )
}

export default Button