import React, { useState } from "react";

import { render } from "react-dom";
import image from "./uk.jpg";
import NinePatch from "../lib/index";
import { Resizable } from "re-resizable";

function App() {
    let [size, setSize] = useState("");

    let load = (e) => {
        let img = e.target;
        setSize({
            width: img.width,
            height: img.height,
        });
    };

    return (
        <div className="container">
            <div>
                <p>
                    原图片尺寸：{size.width} x {size.height}
                </p>
                <img src={image} onLoad={load} />
            </div>

            <div>
                <p>1:1 比例尺寸</p>

                <NinePatch
                    img={image}
                    x={[0.2, 0.8]}
                    y={[0.2, 0.8]}
                    contentX={[0.1, 0.9]}
                    contentY={[0.1, 0.9]}
                    width={size.width + "px"}
                    height={size.height + "px"}
                    showRuler={true}
                ></NinePatch>
            </div>

            <div className="any-size">
                <p>任意 比例尺寸</p>

                <Resizable
                    defaultSize={{
                        width: 320,
                        height: 200,
                    }}
                >
                    <NinePatch
                        img={image}
                        x={[0.2, 0.8]}
                        y={[0.2, 0.8]}
                        contentX={[0.1, 0.9]}
                        contentY={[0.1, 0.9]}
                        width={"100%"}
                        height={"100%"}
                        showRuler={true}
                    ></NinePatch>
                </Resizable>
            </div>
        </div>
    );
}

render(<App />, document.getElementById("root"));
