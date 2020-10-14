import { ReactElement } from "react";
import "./index.css";
declare type Tuple = [number, number];
interface NinePatchProps {
    img: string;
    x: Tuple | Array<Tuple>;
    y: Tuple | Array<Tuple>;
    contentX?: Tuple;
    contentY?: Tuple;
    override?: boolean;
    showRuler?: boolean;
    className?: string;
    width?: string | number;
    height?: string | number;
    children?: ReactElement;
}
declare function NinePatch({ img, x, y, override, showRuler, contentX, contentY, className, children, width, height, }: NinePatchProps): JSX.Element;
export default NinePatch;
