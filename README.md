# React-9Patch

Inspired by Android 9patch.

I was writing a show case played in a 4k television screen, some familiar component has almost same background image except different size. So I want to write a general component to hold these image, and auto scale with precise part.

### Usage

https://www.npmjs.com/package/react-9patch

```shell
npm install react-9patch
```

### Example

```javascript
import NinePatch from "react-9patch";
import image from "./uk.jpg";

function Frame() {
    return (
        <NinePatch
            img={image}
            x={[0.2, 0.8]}
            y={[0.2, 0.8]}
            contentX={[0.1, 0.9]}
            contentY={[0.1, 0.9]}
            width={300}
            height={200}
        ></NinePatch>
    );
}
```

[!demo](https://raw.githubusercontent.com/DeronW/react-9patch/master/images/1.png)

A grid layout container filled by cell, and each of it contain a part of background image (not real cut off a part, just show an part as background image), and these cells compose a complete image background. When resize the container, all cells will auto adjust themselves, some fixed, some sacle vertical, some scale horizon, and then, one generic background container (a border frame or something) is at your service.

### Parameters

-   img : background image
-   x: a list to mark the horizon ranges can be scaled, like [0.2, 0.8]
-   y: a list to mark the vertical ranges can be scaled
-   contentX [optional]: the horizon range of content
-   contentY [optional]: the vertical range of content
-   className [optional]: extra style name
-   width [optional]: container width
-   height [optional]: container height
-   children [optional]: children in this container

### Run Dev Demo

clone this repo, then

```shell
cd _this_clone_repo_
cd demo
npm i
npm run dev
```

### TODO

-   [x] add demo
-   [ ] add test
-   [ ] parent props tranfer
-   [ ] use StyleSheet instead of inline-style

### References

https://developer.android.com/studio/write/draw9patch

https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet

https://webpack.js.org/guides/author-libraries/

https://webpack.js.org/guides/typescript/

https://www.typescriptlang.org/tsconfig
