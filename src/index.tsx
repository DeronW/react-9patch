import React, { useState } from "react";
import type { SyntheticEvent, CSSProperties } from "react";

type Tuple = [number, number];

interface NinePatchProps {
    img: string;
    x: Tuple | Array<Tuple>;
    y: Tuple | Array<Tuple>;
    contentX: Tuple;
    contentY: Tuple;
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
    no: number;
}

function Patch({ no, image, flex, x, y, w, h }: PatchProps) {
    let sizeX = flex.horizon ? 100 / w + "%" : image.width + "px",
        sizeY = flex.vertical ? 100 / h + "%" : image.height + "px",
        backgroundSize = `${sizeX} ${sizeY}`;

    let left = (x / (1 - w)) * 100 + "%",
        top = (y / (1 - h)) * 100 + "%";

    let style: CSSProperties = {
        backgroundImage: `url(${image.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: `${left} ${top}`,
        backgroundSize,
        boxShadow: "0 0 1px black",
    };
    return <div style={style}>{no}</div>;
}

function Patches({
    image,
    columns,
    rows,
}: {
    image: HTMLImageElement;
    columns: Rule;
    rows: Rule;
}) {
    let patches: Array<Omit<PatchProps, "image">> = [];

    let i = 0;
    for (let r of rows) {
        for (let c of columns) {
            patches.push({
                no: i++,
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

function NinePatch({ img, x, y, contentX, contentY }: NinePatchProps) {
    let [bgStyle, setBgStyle] = useState<CSSProperties>({
        visibility: "hidden",
    });
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

        setBgStyle({
            visibility: "visible",
            gridTemplateColumns,
            gridTemplateRows,
        });
        setImage(image);
    }

    return (
        <div
            style={Object.assign(
                {
                    display: "grid",
                    position: "relative",
                },
                bgStyle
            )}
        >
            <img hidden src={img} onLoad={load} />
            {image && <Patches image={image} columns={columns} rows={rows} />}
            <div
                style={{
                    position: "absolute",
                }}
            >
                {/* {img}
                {x}
                {y}
                {contentX}
                {contentY} */}
            </div>
        </div>
    );
}
export default NinePatch;
