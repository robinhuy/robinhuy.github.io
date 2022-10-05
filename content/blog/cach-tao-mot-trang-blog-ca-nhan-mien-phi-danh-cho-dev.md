---
title: "Cách tạo một trang blog cá nhân miễn phí dành cho dev"
date: 2022-06-01
draft: false
tags: ["Blog", "Github"]
---

Vào một ngày đẹp trời, bỗng dưng mình nảy ra ý định làm một trang blog cá nhân thay vì viết Blog trên các nền tảng có sẵn như [viblo.asia](https://viblo.asia/newest), [techmaster.vn](https://techmaster.vn/posts), [kipalog.vn](https://kipalog.com/), ... Tất nhiên các bài viết mới vẫn sẽ đăng lên các nền tảng này để kiếm người đọc chứ blog này ma nó đọc 😅).

Ý tưởng có rồi, nhưng thực hiện như nào, sử dụng công nghệ nào, chi phí như nào? Khá nhiều câu hỏi đau đầu và khó lựa chọn. Vậy cần đặt ra một số tiêu chí:

- Ưu tiên số một là chi phí, càng rẻ càng tốt, **miễn phí** thì còn tốt hơn nữa.
- Sử dụng công nghệ nào cũng được miễn là cài đặt nhanh, dễ dùng, dễ tùy biến.
- Blog có thể lượng truy cập ít (thậm chí không có ma nào xem), nhưng tốc độ truy cập vẫn phải nhanh, PageSpeed Insights điểm càng cao càng tốt.

Sau một hồi search Google với 3 tiêu chí trên (chủ yếu là tiêu chí _miễn phí_) thì mình chọn ra được giải pháp như sau:

- Sử dụng Static Site Generator, chơi web tĩnh thì tốc độ sẽ nhanh và điểm PageSpeed Insights sẽ cao. Cụ thể mình dùng tool [Hugo](https://gohugo.io/).
- Hosting ở đâu? Tất nhiên là [Github Page](https://pages.github.com/) rồi, free, không giới hạn dung lượng và tốc độ cao. Các bạn cũng có thể dùng một số hosting free khác như: [Netlify](https://www.netlify.com/), [Firebase](https://firebase.google.com/), [Vercel](https://vercel.com/), ...

**OK. Let's get started!**

## Cài đặt và sử dụng Hugo

Vào trang chủ của Hugo rồi làm theo hướng dẫn cài đặt tùy theo hệ điều hành mà bạn đang sử dụng thôi: [https://gohugo.io/getting-started/installing](https://gohugo.io/getting-started/installing).

Sau khi cài xong thì bật terminal lên và gõ lệnh sau để tạo một project web tĩnh (ví dụ _huydq.dev_):

```
hugo new site huydq.dev
```

Cấu trúc project tạo bởi Hugo như sau:

![gitlab bug](/images/hugo-project.jpg)

Trong đó chúng ta chỉ cần chú ý đến mấy thư mục và file chính:

- **content**: Nơi viết nội dung cho website, là các file markdown, mỗi file tương ứng 1 trang trong website.
- **theme**: Chứa các theme có sẵn tải trên mạng về để làm giao diện cho website.
- **config.toml**: File cấu hình cho website như tên website, sử dụng theme gì, ... Có thể đổi sang định dạng _yml_ hoặc _yaml_ nếu không quen với _toml_.

Tiếp đến chúng ta vào [trang này](https://themes.gohugo.io/) và chọn 1 cái theme ưng ý để cài.
Có thể cài bằng cách download file về và ném vào trong thư mục **themes** hoặc là dùng git submodule để clone qua Github, ví dụ cài theme _ananke_ qua Github:

```
cd huydq.dev
git init
git submodule add https://github.com/theNewDynamic/gohugo-theme-ananke.git themes/ananke

```

Cài xong theme thì cần khai báo sử dụng ở trong file config, ví dụ:

```
baseURL = "https://huydq.dev/"
title = "HuyDQ's Blog"
theme = "ananke"
```

Trong này cũng cho phép khai báo cấu hình cho theme, cái này là tùy từng theme nên dùng theme nào thì xem ở hướng dẫn của theme đó.

Cấu hình xong theme thì chúng ta có thể bắt đầu viết blog bằng cách gõ lệnh sau để tạo ra một file markdown trong thư mục **content** (my-first-post.md):

```
hugo new posts/my-first-post.md
```

File mới tạo sẽ trông dạng như sau:

```
---
title: "My First Post"
date: 2019-03-26T08:47:11+01:00
draft: true
---
```

Trong đó có cấu hình tên bài viết (title), ngày xuất bản (date), bản nháp hay đã sẵn sàng xuất bản (draft). Nội dung bài viết thì viết bằng cú pháp markdown, viết sau phần dấu gạch ngang `---`. Bài viết nào có đánh dấu `draft: true` thì sẽ không được build.

Chạy thử website trên local bằng lệnh `hugo server`, truy cập `http://localhost:1313` để xem kết quả.
Đường dẫn của trang sẽ tương ứng với đường dẫn file `http://localhost:1313/posts/my-first-post`.
Khi đã thấy ưng ý thì build ra static files (HTML CSS JS) bằng lệnh `hugo`. Website sẽ được build vào trong thư mục `public` và chỉ cần đẩy file trong thư mục này lên 1 hosting hỗ trợ static web là xong.

## Cấu hình Github Pages

Để sử dụng Github Pages hosting static web thì chúng ta tạo 1 repository trùng với tên miền free của Github Pages theo dạng `[username].github.io`, ví dụ username github của mình là `robinhuy` vậy mình sẽ tạo 1 repository là `robinhuy.github.io` (đây cũng chính là tên miền free của Github Pages).

Chúng ta có thể build website bằng Hugo, sau đó copy code web tĩnh ở trong thư mục `public` vào trong repository này và push code lên là xong.

Tuy nhiên để quản lý cả source code thì chúng ta sẽ đẩy toàn bộ lên Github. Nếu sử dụng [Github Actions](https://github.com/features/actions) để build và deploy project (sang branch **gh-pages**) thì có thể ignore thư mục build đi (cấu hình trong *.gitignore*).

Tham khảo file cấu hình `Github Actions` của mình:

```
name: Deploy Hugo site to Pages

on:
  push:
    branches: ["main"]

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

defaults:
  run:
    shell: bash

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      HUGO_VERSION: 0.99.0
    steps:
      - name: Install Hugo CLI
        run: |
          wget -O ${{ runner.temp }}/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_Linux-64bit.deb \
          && sudo dpkg -i ${{ runner.temp }}/hugo.deb
      - name: Checkout
        uses: actions/checkout@v3
        with:
          submodules: recursive
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v1
      - name: Build with Hugo
        run: |
          hugo \
            --minify \
            --baseURL ${{ steps.pages.outputs.base_url }}
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./public

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
```

Chỉ đơn giản vậy thôi, mỗi lần chúng ta push code lên branch **main** thì nó sẽ tự động build và đẩy code trong thư mục **public** sang branch **gh-pages** và website của chúng ta sẽ được cập nhật theo.

Chốt lại các thao tác khi cần viết bài mới sẽ là:

1. Tạo 1 file mới trong thư mục **content**, cấu hình nội dung trang và viết bài theo cú pháp markdown. Dùng lệnh `hugo server` để chạy website local (có sẵn live reload để tiện preview). Hoặc nếu muốn trải nghiệm viết bài như một CMS thì các bạn có thể cài thêm một số phần mềm theo hướng dẫn sau: [https://gohugo.io/tools/frontends/](https://gohugo.io/tools/frontends/).
2. Commit code và push lên branch **main**.

Phần cấu hình website, cấu hình theme, ... thì các bạn tự tìm hiểu nốt trên trang chủ của Hugo và tài liệu hướng dẫn của theme mà bạn chọn nhé. Chúc các bạn viết Blog vui vẻ 😬
