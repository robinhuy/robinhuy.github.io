---
title: "Các cách đẩy code lên Github"
date: 2021-05-29
draft: false
tags: ["Github"]
---

[Github](https://github.com) là một dịch vụ cung cấp kho lưu trữ (repository) mã nguồn Git trên nền tảng Web.

Chúng ta đẩy code lên trên Github để quản lý và chia sẻ code dễ dàng hơn, giúp làm việc nhóm một cách hiệu quả.

> Ngoài ra đẩy code lên Github còn giúp chúng ta tạo ra các static page một cách nhanh chóng và miễn phí, tham khảo bài viết này [Các cách tạo web tĩnh với Github](/blog/cac-cach-tao-web-tinh-voi-github).

Đầu tiên các bạn cần đăng ký tài khoản trên Github trước, sau đó tạo một repository mới (là nơi để chứa source code của project). Chú ý đặt username hay một chút vì Github sẽ tặng mỗi tài khoản một tên miền miễn phí dạng _[username.github.io](http://username.github.io)_.

![Tạo mới repository bước 1](/images/github-new-repository-1.png)

Khi tạo repository các bạn có thể để chế độ _public_ hoặc _private_, và có tạo sẵn một số file hay có như _README_ và _.gitignore_ hay không.

![Tạo mới repository bước 2](/images/github-new-repository-2.png)

Nếu như tạo một repository rỗng (không chọn thêm sẵn file) thì chúng ta có thể đẩy một Git project có sẵn từ trên máy lên. Còn nếu tạo sẵn file thì chúng ta cần _clone project_ đó về máy rồi sau đó mới chỉnh sửa source code và đẩy lên.

## Các bước đẩy code lên Git repository bao gồm:

- Add files: Lên danh sách các file chỉnh sửa trong project để chuẩn bị commit.
- Commit: Xác nhận thay đổi và lưu lại trong lịch sử chỉnh sửa của project.
- Push: Đẩy code từ trên máy (local repository) lên kho lưu trữ online (remote).

Dưới đây là 1 số cách đẩy code lên Github dành cho người mới, chưa biết sử dụng Git.

### Cách 1: Upload trực tiếp

Cách này dễ nhất, nhưng nhược điểm là chỉ có thể upload từng file một, và không cho phép upload thư mục.

![Upload file to github](/images/github-upload-code.png)

Nếu muốn upload thư mục thì cần tạo ra thư mục trước bằng cách chọn **Create new file** để tạo file mới, và tạo file đó nằm trong thư mục luôn. Ví dụ gõ tên file là _css/style.css_ thì sẽ tạo ra thư mục _css_ và file _style.css_ nằm trong thư mục _css_.

### Cách 2: Sử dụng phần mềm có giao diện

Có nhiều phần mềm hỗ trợ việc sử dụng Git dễ dàng, ví dụ [Github Desktop](https://desktop.github.com/). Tải phần mềm về và đăng nhập vào tài khoản Github để sử dụng.

![Github Desktop](/images/github-desktop-clone-repository-1.png)

Bạn có thể tạo repository mới, hoặc clone 1 repository có sẵn về máy. Chú ý khi clone repository về máy thì cần chọn đường dẫn lưu code trên máy và nhớ vị trí để cho dễ truy cập và quản lý.

![Github Desktop - Clone repository](/images/github-desktop-clone-repository-2.png)

Sau khi đã clone project về máy thì mở thư mục source code vừa clone về và chỉnh sửa tùy ý. Sau khi code xong thì lại bật Github Desktop lên để đẩy code mới chỉnh sửa lên Github.

![Github Desktop - Push code](/images/github-desktop-push-code.png)

Ngoài ra nếu bạn lập trình bằng Visual Studio Code thì có thể dùng luôn trình quản lý Git có sẵn.

![Git VS Code](/images/vs-code-git.png)

## Cách 3: Sử dụng Terminal

Terminal là phần mềm thao tác với máy tính qua các mã lệnh. Trên các hệ điều hành Mac, Linux thì đều có sẵn. Còn trên Windows thì các bạn phải cài thêm [Git](https://git-scm.com/).

Sau khi cài xong thì chúng ta có thể thao tác với Git qua câu lệnh. Và đi kèm với Git sẽ có 1 phần mềm là Git Bash tương tự như Terminal trên Linux. Các bạn có thể bấm chuột phải vào màn hình và chọn **Git Bash Here** để bật Git Bash lên ở ngay tại thư mục hiện hành.

Khi sử dụng Terminal thì chúng ta sẽ thao tác với Git qua các câu lệnh, mới đầu sẽ chưa quen nhưng dùng nhiều thì sẽ nhớ. Tra cứu các câu lệnh của Git [ở đây](https://git-scm.com/docs/git).

### Một số lệnh hay dùng:

Clone 1 repository về máy:

`git clone [địa chỉ repository]`

![Clone repository Github](/images/github-clone-repository.png)

Các lệnh sau cần vào trong thư mục chứa source code (local git repository) thì mới gõ được:

`cd [thư mục chứa source code]`

- Add files để chuẩn bị Commit:

  `git add --all` (add toàn bộ các file trong project)

  hoặc

  `git add .` (add các file ở thư mục hiện tại)

- Commit:

  `git commit -m "Chú thích cho lần commit này"`

- Push code:

  `git push origin main`

  Chú ý _main_ là tên branch (nhánh) mặc định khi tạo repository, với các repository cũ thì tên nhánh mặc định là _master_.
