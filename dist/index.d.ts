/// <reference types="react" />
declare type Tuple = [number, number];
interface NinePatchProps {
    img: string;
    x: Tuple | Array<Tuple>;
    y: Tuple | Array<Tuple>;
    contentX: Tuple;
    contentY: Tuple;
}
declare function NinePatch({ img, x, y, contentX, contentY }: NinePatchProps): JSX.Element;
export default NinePatch;
