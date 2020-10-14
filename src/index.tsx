import React, { ReactElement, useState } from "react";
import type { SyntheticEvent, CSSProperties } from "react";
import "./index.css";

type Tuple = [number, number];

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

interface PatchProps {
    image: HTMLImageElement;
    flex: {
        vertical: boolean;
        horizon: boolean;
    };
    x: number;
    y: number;
    w: number;
    h: number;
    showRuler: boolean;
}

function Patch({ image, flex, x, y, w, h, showRuler }: PatchProps) {
    let sizeX = flex.horizon ? 100 / w + "%" : image.width + "px",
        sizeY = flex.vertical ? 100 / h + "%" : image.height + "px",
        backgroundSize = `${sizeX} ${sizeY}`;

    let left = (x / (1 - w)) * 100 + "%",
        top = (y / (1 - h)) * 100 + "%";

    let style: CSSProperties = {
        backgroundImage: `url(${image.src})`,
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${left} ${top}`,
        backgroundSize,
        boxShadow: showRuler ? "0 0 1px black" : null,
    };

    let getStyle = (bg: string): CSSProperties => ({
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        opacity: "0.5",
        background: bg,
    });

    let yellow =
        showRuler && flex.horizon ? (
            <div style={getStyle("#ffff00")}></div>
        ) : null;

    let blue =
        showRuler && flex.vertical ? (
            <div style={getStyle("#0000ff")}></div>
        ) : null;

    return (
        <div style={style} className="">
            {yellow}
            {blue}
        </div>
    );
}

function Patches({
    image,
    columns,
    rows,
    showRuler,
}: {
    image: HTMLImageElement;
    columns: Rule;
    rows: Rule;
    showRuler: boolean;
}) {
    let patches: Array<Omit<PatchProps, "image">> = [];

    let i = 0;
    for (let r of rows) {
        for (let c of columns) {
            patches.push({
                showRuler,
                flex: {
                    vertical: r.flexable,
                    horizon: c.flexable,
                },
                x: c.start,
                w: c.end - c.start, // * width,
                y: r.start,
                h: r.end - r.start, // * height,
            });
        }
    }

    return (
        <>
            {patches.map((i, index) => (
                <Patch image={image} key={index} {...i} />
            ))}
        </>
    );
}

type Rule = Array<{ start: number; end: number; flexable: boolean }>;

function toRule(arr: Tuple | Array<Tuple>): Rule {
    let rule: Rule = [];
    let arrX = (Array.isArray(arr[0]) ? arr : [arr]) as Array<Tuple>;
    for (let i of arrX) {
        if (rule.length == 0) {
            if (i[0] != 0) rule.push({ start: 0, end: i[0], flexable: false });
        } else {
            if (i[1] <= rule[rule.length - 1].end)
                throw Error(
                    `NinePatch parameter Error, later range must bigger than prev`
                );
            rule.push({
                start: rule[rule.length - 1].end,
                end: i[0],
                flexable: false,
            });
        }

        rule.push({
            start: i[0],
            end: i[1],
            flexable: true,
        });
    }

    if (rule[rule.length - 1].end != 1)
        rule.push({
            start: rule[rule.length - 1].end,
            end: 1,
            flexable: false,
        });

    return rule;
}

function NinePatch({
    img,
    x,
    y,
    override = false,
    showRuler = false,
    contentX,
    contentY,
    className,
    children,
    width,
    height,
}: NinePatchProps) {
    let [bgStyle, setBgStyle] = useState<CSSProperties>({
        visibility: "hidden",
    });
    let [contentStyle, setContentStyle] = useState<CSSProperties>({});
    let [image, setImage] = useState<null | HTMLImageElement>();

    let columns = toRule(x),
        rows = toRule(y);

    function load(e: SyntheticEvent) {
        let image = e.target as HTMLImageElement;
        let gridTemplateColumns = columns
                .map((i) => {
                    if (i.flexable) return (i.end - i.start) * 100 + "fr";
                    return image.width * (i.end - i.start) + "px";
                })
                .join(" "),
            gridTemplateRows = rows
                .map((i) => {
                    if (i.flexable) return (i.end - i.start) * 100 + "fr";
                    return image.height * (i.end - i.start) + "px";
                })
                .join(" ");

        setImage(image);
        setBgStyle({
            display: "grid",
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            zIndex: override ? 1 : -1,
            // pointerEvents: "none",
            gridTemplateColumns,
            gridTemplateRows,
        });

        let [cL, cR] = contentX,
            [cT, cB] = contentY;

        setContentStyle({
            backgroundColor: showRuler ? "rgba(0, 0, 0, 0.3)" : null,
            marginTop: cT * image.height + "px",
            marginLeft: cL * image.width + "px",
            marginRight: (1 - cR) * image.width + "px",
            marginBottom: (1 - cB) * image.height + "px",
        });
    }

    let outterStyle: CSSProperties = {
        position: "relative",
        display: "table",
        width: typeof width == "number" ? width + "px" : width,
        height: typeof height == "number" ? height + "px" : height,
    };

    return (
        <div className={className} style={outterStyle}>
            <div style={contentStyle}>{children}</div>
            <div style={bgStyle}>
                <img hidden src={img} onLoad={load} />
                {image && (
                    <Patches
                        image={image}
                        columns={columns}
                        rows={rows}
                        showRuler={showRuler}
                    />
                )}
            </div>
        </div>
    );
}
export default NinePatch;
