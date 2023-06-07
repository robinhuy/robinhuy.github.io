---
title: "Tái sử dụng code cho nhiều project với Git Submodules"
date: 2021-07-18
draft: false
images: ["/images/reusable-code-copy-paste.png"]
tags: ["Git", "Github"]
---

Trong một project sẽ có những đoạn code có thể tái sử dụng ở nhiều nơi, thường đặt ở trong các thư mục đại loại như: helper, utils, ... Vậy nếu những đoạn code đó lại được tái sử dụng ở nhiều project thì sao?

Có nhiều phương pháp áp dụng như: Git Submodules, Monorepos, Bit, ... hay tạo hẳn thư viện riêng và đẩy lên cloud.

![Reuse code by Copy paste](/images/reusable-code-copy-paste.png)

Trong bài viết này mình sẽ hướng dẫn các bạn cách sử dụng {{< link link="https://git-scm.com/book/en/v2/Git-Tools-Submodules" text="Git Submodules" >}} cho việc tái sử dụng code.

Git Submodules cho phép tạo một (hoặc nhiều) repository bên trong repository hiện tại. Những đoạn code tái sử dụng cho nhiều project thì có thể đặt ra một repository riêng, sau đó nhúng vào trong các project cần sử dụng theo dạng Sub module.

Ví dụ mình có một project **my-project**, có cấu trúc như sau:

![Project structure 1](/images/project-structure-git-submodules-1.png)

Trong đó mình muốn code nằm trong thư mục _src/library_ có thể tái sử dụng được ở nhiều project, vậy mình sẽ tạo 1 repository mới là **my-library**, và nhúng repo này vào trong **my-project**. Ở các project khác muốn dùng chung code thì cũng nhúng **my-library** vào qua submodules.

Để tạo submodule cho repository **my-project** ta dùng lệnh sau:

```bash
git submodule add https://github.com/robinhuy/my-library
```

Lệnh này sẽ tạo ra một thư mục mới là **my-library** và một file mới là **.gitmodules** trong project **my-project**. Thư mục này chính là repository **my-library** luôn, chúng ta có thể cd vào và thực hiện các lệnh fetch, pull, push, ... như bình thường. Còn file **.gitmodules** sẽ chứa thông tin về submodule vừa tạo.

![Project structure 2](/images/project-structure-git-submodules-2.png)

Ngoài ra, để cho cấu trúc thư mục được đẹp, khi tạo submodule chúng ta có thể đổi lại tên thư mục, hay cho vào trong một thư mục con cũng được. Ví dụ mình tạo submodule là folder _src/library_ thay vì _my-library_ thì dùng lệnh sau:

```bash
git submodule add https://github.com/robinhuy/my-library src/library
```

Trường hợp tạo nhầm thì các bạn có thể xóa submodule đi bằng cách chạy lệnh sau:

```bash
git rm -rf my-library
rm -rf .git/modules/my-library
```

với _my-library_ là thư mục chứa submodule (được khai báo trong file _.gitmodules_).

Còn nếu project của bạn đã được cấu hình Git submodule từ trước, thì khi clone project về bạn chạy thêm lệnh sau để nó clone luôn cả submodule:

```bash
git submodule update --init --recursive
```

Chú ý mọi chỉnh sửa trong submodule muốn cập nhật vào repository chính thì cần tạo thêm commit. Như vậy khi có thay đổi từ repository **my-library** và muốn cập nhật vào trong **my-project** thì cần:

- Vào trong thư mục _src/library_ để pull code mới nhất về (hoặc có thể chỉnh sửa trong này rồi push code lên).
- Commit thay đổi ở **my-project**.

![Github git submodules](/images/github-git-submodules.png)

Như vậy dùng Git submodules sẽ giúp chúng ta chia sẻ code giữa các project một cách dễ dàng. Tuy nhiên nhược điểm của nó là việc đồng bộ code giữa các project không diễn ra tự động mà phải chủ động update ở từng project.
