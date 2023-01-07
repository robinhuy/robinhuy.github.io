---
title: "Tối ưu static website với Webpack"
date: 2021-06-19
draft: false
images: ["/images/webpack-demo-3.png"]
tags: ["Webpack"]
---

Nếu bạn là một Web Frontend Developer thì chắc sẽ không xa lạ gì với [Webpack](https://webpack.js.org/), một công cụ bundle code mạnh mẽ. Webpack thường được tích hợp sẵn trong các thư viện như React, Angular, Vue, … và có nhiều người thậm chí còn không biết đến sự tồn tại cũng như tác dụng của nó 😅

Bài viết này mình sẽ hướng dẫn các bạn cách tối ưu một static website (web tĩnh chỉ gồm HTML CSS JS) bằng Webpack. Chú ý static web này thuộc dạng multiple pages chứ không phải single page, và có thể áp dụng cho các website động có kiến trúc dạng Monolithic (dùng view template engine để render).

Ví dụ cấu trúc thư mục một static website thường có dạng như sau:

![Cấu trúc thư mục static website](/images/static-web-structure.png)

Sau khi cắt HTML CSS từ bản thiết kế xong, trước khi đẩy code lên production, chúng ta cần thêm một bước tối ưu như: Minify (obfuscate) code, nén ảnh, đánh version file CSS, JS để revalidate cache, …

Chúng ta có thể dùng các tool như [Grunt](https://gruntjs.com/), [Gulp](https://gulpjs.com/), … Còn trong bài này mình sẽ dùng Webpack với những tính năng ưu việt hơn, giúp lập trình viên có thể _lười hơn_.

Code tham khảo sau khi cấu hình xong các bạn có thể xem luôn tại đây (xem xong nhớ Star để ủng hộ tác giả): [https://github.com/robinhuy/webpack-static-pages-template.](https://github.com/robinhuy/webpack-static-pages-template)

Giờ chúng ta sẽ thử cấu hình từ đầu để hiểu được cơ bản cách Webpack hoạt động và có thể tùy biến theo từng trường hợp cụ thể.

## 1. Khởi tạo project

Khởi tạo project với lệnh **npm init** và nhập vào các thông số như: Tên project, author, …

Cài **webpack** và **webpack-cli** với môi trường dev:

```bash
npm install webpack webpack-cli --save-dev
```

hoặc dùng [yarn](https://yarnpkg.com/):

```bash
yarn add webpack webpack-cli --dev
```

Sau khi cài xong chúng ta sẽ thấy có file **package.json** chứa các thông tin về project vừa tạo.

Sửa lại file **package.json**, bỏ phần **main** đi và thêm option **private** với giá trị là **true**. Cái này để tránh lỗi về sau khi build production.

![Sửa file package.json](/images/package-json.png)

## 2. Bundle Code

Thử nghiệm chức năng đầu tiên của Webpack đó là Bundle code, cho phép chúng ta gộp các file js lại thành 1 file (bundle) và inject vào trong một file HTML.

Đầu tiên tạo thư mục **src** để chứa source code, trong thư mục src tạo 1 file là **index.js** với nội dung tùy ý. Ví dụ mình tạo file **index.js** chỉ với 1 dòng _console.log('index.js'):_

![File index.js](/images/webpack-demo-1.png)

Rồi giờ chạy lệnh sau để bundle code (sử dụng webpack cài trong project):

```bash
npx webpack
```

Sau khi chạy xong lệnh trên thành công, sẽ có 1 thư mục tự động tạo ra là **dist** và bên trong có 1 file là **main.js**. Xem thử nội dung thì thấy giống hệt file index.js mà chúng ta vừa tạo.

Như vậy là chúng ta vừa bundle file `index.js` thành `main.js`. Nhưng file `index.js` đơn giản quá chưa thấy có gì. Mình sẽ sửa lại cho nó phức tạp hơn một chút bằng cách nhúng jQuery vào để sửa DOM. Với các static website thì mình thấy dùng jQuery vẫn ổn, không cần thiết phải chạy theo các trending framework làm gì.

![jQuery](/images/jquery.jpg)

Để sử dụng jQuery chúng ta có thể chèn link CDN hoặc vào trang chủ để down file js về rồi nhúng vào file HTML. Tuy nhiên khi dùng webpack chúng ta có thể cài jQuery qua npm và import vào file js khác để sử dụng.

Cài jQuery:

```bash
npm install jquery
```

hoặc

```bash
yarn add jquery
```

Sau khi cài xong, jQuery sẽ được tải vào trong thư mục **node_modules** và được khai báo trong mục _dependencies_ của file **package.json**.

Sửa lại file **index.js** như sau:

```javascript
import $ from "jquery";

$("body").html("<h1>Hello Webpack</h2>");
```

Giờ để cho dễ test, các bạn tạo thêm cho mình 1 file **index.html** ở trong thư mục **dist**, sau đó nhúng file **main.js** vào trong file **index.html**

![File main.js](/images/webpack-demo-2.png)

Rồi chạy lại lệnh build: **npx webpack.**

Sau khi build thành công thì bật file HTML lên các bạn sẽ thấy nó hiển thị ra màn hình dòng chữ “Hello Webpack”. Như vậy là chúng ta đã bundle **jQuery** + **index.js** thành file **main.js** và nhúng vào file **index.html**. Và nếu bạn bật file **main.js** lên xem thì sẽ thấy là nó đã được minify + obfuscated.

Các bạn có thể thử viết thêm function, import code từ nhiều file khác nhau và bundle lại thành một file như trên.

## 3. Sử dụng file cấu hình

Ở ví dụ trên chúng ta chạy webpack với cấu hình mặc định. Để có thể cấu hình được nhiều hơn, tùy chỉnh dễ hơn thì chúng ta tạo thêm 1 file cấu hình và chạy webpack theo cấu hình của file đó.

Ở thư mục gốc tạo 1 file là **webpack.config.js** với nội dung như sau:

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

Đây chính là cấu hình mặc định, chạy thử với lệnh:

```bash
npx webpack --config webpack.config.js
```

bạn sẽ thấy kết quả y hệt như cũ.

Bây giờ thử sửa file config, ví dụ sửa phần _output_ > _filename_ thành **bundle.js**,xóa hết file _.js_ trong thư mục **dist** đi và build lại, bạn sẽ thấy sau khi build thì file bundle của chúng ta đã đổi thành **bundle.js** như trong file cấu hình.

File cấu hình của webpack chỉ đơn giản là export ra một object có chứa các options mà webpack cung cấp và giá trị do chúng ta thiết lập, options nào không khai báo thì webpack sẽ sử dụng giá trị mặc định. Ví dụ một file cấu hình:

![Webpack configuration file](/images/webpack-demo-3.png)

## 4. Sử dụng Plugin

Sử dụng plugin để bổ sung thêm tính năng mong muốn, có thể dùng những plugin có sẵn hoặc tự viết. Ví dụ một số Plugin hay dùng: [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/), [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/), [ImageMinimizerWebpackPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/), [ProvidePlugin](https://webpack.js.org/plugins/provide-plugin/).

Với những plugin có sẵn trên npm thì đầu tiên chúng ta cần cài thư viện trước:

```bash
npm install html-webpack-plugin --save-dev
```

hoặc

```bash
yarn add html-webpack-plugin --dev
```

Sau khi cài xong thì khai báo plugin sử dụng ở file config với options **plugins**, giá trị của nó là 1 mảng các plugin. Ví dụ cài plugin [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) để cho phép tạo file html mẫu và tùy chỉnh inject script theo cách mình muốn.

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "index.js",

  output: {
    path: `${__dirname}/dist`,
    clean: true,
  },

  plugins: [new HtmlWebpackPlugin()],
};
```

Bây giờ thay vì tạo sẵn file html ở trong thư mục **dist**, thì chúng ta chỉ cần chạy lệnh build, webpack sẽ tự tạo ra 1 file html và nhúng file bundle vào luôn. Chú ý option output **clean: true** là để tự động xóa hết các file cũ trong thư mục dist trước khi build.

## 5. Cache Busting

Thông thường trình duyệt sẽ tự động cache các file tĩnh như CSS, JS để tăng performance (trừ trường hợp phía server cấu hình không cho phép cache file). Thỉnh thoảng bạn sẽ gặp trường hợp sửa file CSS nhưng người dùng không thấy có gì thay đổi. Muốn áp dụng style mới thì phải tự clear cache trên trình duyệt (ít người dùng biết và tự làm việc này).

Vậy để tối ưu performance, vẫn cho phép cache file với thời gian dài, thì chúng ta áp dụng cache busting. Có thể là dùng query strings hoặc đổi tên file để browser nhận biết là có thay đổi và tải file mới về. Để đảm bảo chính xác thì mình chọn cách đổi tên file, mỗi lần thay đổi code thì chúng ta lại đổi tên file đi để trình duyệt tự tải lại.

Thay vì làm thủ công thì chúng ta sẽ cấu hình trong webpack để webpack tự động build file với tên mới và tự động nhúng vào file html. Kết hợp option **entry** + **module** và plugin **HtmlWebpackPlugin** + **MiniCssExtractPlugin**, chúng ta có thể bundle ra các file JS, CSS với tên theo dạng **hash** hoặc **contenthash** rồi tự động nhúng vào file html.

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: {
      import: "./src/index.js",
      filename: "index.[contenthash].js",
    },
  },

  output: {
    path: `${__dirname}/dist`,
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
```

Chú ý ở trên mình có sử dụng thêm thư viện [css-loader](https://webpack.js.org/loaders/css-loader/) để cho phép import file CSS.

Test thử bằng cách tạo thêm 1 file css trong thư mục **src**, ví dụ **style.css**:

```css
h1 {
  color: red;
}
```

Tiếp đó import vào file **index.js**:

```javascript
import "./style.css";

import $ from "jquery";

$("body").prepend("<h1>Hello Webpack</h2>");
```

Chạy lại lệnh build và kết quả sẽ như này:

![CSS JS Cache Busting](/images/webpack-demo-4.png)

## 6. Multiple pages

Tương tự, thêm 1 chút cấu hình ở **entry** và **HtmlWebpackPlugin**, chúng ta sẽ có thể code nhiều file HTML (multiple pages), và cho phép inject các script khác nhau vào từng file. Ví dụ:

Cấu hình multiple entry cho 2 trang là **index** và **about**:

```javascript
entry: {
    index: {
      import: "./src/js/index.js",
      filename: "js/index.[contenthash].js",
    },
    about: {
      import: "./src/js/about.js",
      filename: "js/about.[contenthash].js",
    },
},
```

Cấu hình plugin HtmlWebpackPlugin để cho phép sử dụng file html sẵn làm template thay vì tự sinh ra file html:

```javascript
plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      inject: "body",
      filename: "about.html",
    }),

    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css",
    }),
],
```

Tự build lại để xem kết quả!

## 7. Cấu hình theo môi trường

Ở trên chúng ta đã cấu hình được tương đối đầy đủ các chức năng. Nhưng nếu mỗi lần code lại phải build lại code để xem kết quả thì rất mất công, và khi debug cũng khó vì code đã được minify + obfuscate. Vì vậy chúng ta sẽ bổ sung thêm cấu hình cho môi trường dev, và bổ sung lệnh chạy cho 2 môi trường riêng biệt.

Thay vì dùng chung 1 file config thì bây giờ mình sẽ tạo ra 3 file:

- **webpack.common.js**: Chứa cấu hình chung cho cả 2 môi trường.
- **webpack.dev.js**: Chứa cấu hình cho môi trường development.
- **webpack.prod.js**: Chứa cấu hình cho môi trường production.

File **webpack.common.js** giữ nguyên, file **webpack.dev.js** và **webpack.prod.js** thì sử dụng thư viện [webpack-merge](https://www.npmjs.com/package/webpack-merge) để copy cấu hình từ file common sang và bổ sung thêm 1 số cấu hình riêng.

Ví dụ file **webpack.prod.js**:

```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "production",
});
```

File **webpack.dev.js**:

```javascript
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    contentBase: "./dist",
    hot: true,
  },
});
```

Khi chạy ở môi trường dev thì dùng lệnh:

```bash
npx webpack serve --open --config webpack.dev.js
```

Khi chạy ở môi trường production thì dùng lệnh:

```bash
npx webpack --config webpack.prod.js
```

Để cho nhanh thì chúng ta có thể dùng npm scripts bằng cách sửa file **package.json** mục _scripts_:

```javascript
"scripts": {
    "start": "webpack serve --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
},
```

Sau đó khi cần dev thì chạy lệnh: **npm start** hoặc **yarn start**, còn khi build production thì chạy lệnh: **npm run build** hoặc **yarn build**.

Vậy là xong, chúng ta đã setup xong một project static web sử dụng Webpack để bundle và tối ưu cho production. Các bạn có thể tự tìm hiểu thêm trên trang chủ của webpack để cấu hình chi tiết hơn cho từng project.

Tham khảo cấu hình và cấu trúc thư mục demo đầy đủ hơn tại đây: [https://github.com/robinhuy/webpack-static-pages-template](https://github.com/robinhuy/webpack-static-pages-template).
