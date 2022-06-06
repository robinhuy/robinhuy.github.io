---
title: "Code web tĩnh dễ hơn với Pug"
date: 2019-09-04
draft: false
tags: ["View Template Engine"]
---

_Note: [Pug](https://pugjs.org/api/getting-started.html) ở đây là 1 View Template Engine (chứ không phải tên 1 loại chó), có thể dùng ở cả phía Server lẫn Client. Trong bài viết này sẽ hướng dẫn sử dụng Pug phía client cho Frontend Dev._

## Tạo khung project

Sau khi đã thiết kế xong giao diện website, chúng ta sẽ bắt đầu xây dựng khung project. Ví dụ cấu trúc thông thường của 1 project web tĩnh:

![Static web structure 1](/images/project-structure-1.png)

Với cấu trúc trên chúng ta có mỗi file HTML tương ứng với 1 trang tĩnh. Trong cùng 1 website thì các trang tĩnh có thể dùng chung các thành phần giống nhau (header, footer, sidebar, ...), dẫn đến việc code bị trùng lặp khó bảo trì. Trong 1 trang tĩnh cũng có thể có số lượng code rất lớn (ví dụ trang chủ, landing page) thì cũng sẽ khó đọc và bảo trì. Do đó chúng ta nên chia nhỏ các file html ra tương tự như khi chia nhỏ các file CSS và Javascript. Ví dụ:

![Static web structure 2](/images/project-structure-2.png)

Mặc định trong HTML không cho phép nhúng 1 file HTML khác, trừ khi dùng Javascript thao tác với DOM. Và Pug sẽ giúp chúng ta làm việc này bằng cách code HTML theo cú pháp của Pug (ngắn gọn hơn HTML thuần và cho phép include file) sau đó dùng pug-cli để chuyển từ Pug template sang code HTML. Lúc này cấu trúc project sẽ có dạng như sau:

![Static web structure 3](/images/project-structure-3.png)

## Cài đặt

Để sử dụng Pug chúng ta sẽ cần cài đặt lên máy qua 2 bước sau:

- **Bước 1**: Cài đặt NodeJS trên trang [https://nodejs.org](https://nodejs.org/), nên chọn bản LTS (Long Term Support - Recommended for most users). Sau khi cài xong chúng ta sẽ có luôn [npm](https://www.npmjs.com/) dùng để cài các thư viện rất hữu ích trong việc phát triển web, trong đó có Pug.

- **Bước 2**: Cài đặt Pug qua NPM (chú ý ở đây mình cài [pug-cli](https://github.com/pugjs/pug-cli) để chạy các lệnh của pug qua command line):

```bash
npm install -g pug-cli
```

## Sử dụng pug-cli

Tạo khung project như bình thường, nhưng không có file HTML, chúng ta sẽ code bằng template engine Pug rồi dùng pug-cli để tạo ra các file HTML.

Tạo thêm 1 thư mục là template (hoặc đặt tên khác cũng được, không bắt buộc). Thư mục này sẽ chứa các file template Pug, còn file HTML được tạo ra thì sẽ nằm ở bên ngoài như bình thường. Trong thư mục template cũng có thể chia nhỏ ra thành nhiều thư mục con để gom nhóm các file nếu như số lượng file lớn (ví dụ ở đây mình tạo thêm thư mục template-part để chứa các template nhỏ là các thành phần nhỏ trong 1 trang).

Sau khi tạo xong các file **.pug** thì chúng ta bật terminal tại thư mục gốc của project và chạy lệnh sau để bật **pug-cli**:

```bash
pug -w ./template -o ./ -P
```

Khi chạy lệnh thành công thì chương trình sẽ theo dõi thay đổi ở file **.pug** và tự động render ra file **.html** ở bên ngoài. Chú ý các options trong lệnh trên:

- **-w** (watch - những file cần theo dõi thay đổi để render ra HTML), trong trường hợp này là tất cả các file trong thư mục template.
- **-o** (output - nơi xuất ra những file HTML được render từ file pug), trong trường hợp này là thư mục hiện tại (thư mục gốc của project, nơi chạy lệnh trên).
- **-P** (pretty - xuất ra HTML có format code). Option này có thể bỏ đi nếu không cần format đẹp, code xuất ra sẽ dồn hết lại thành 1 dòng.

## Ví dụ code

Tạo 1 file là **layout.pug** đặt trong thư mục **template/template-part**, file này sẽ là khung giao diện chung cho toàn bộ website (nếu website có nhiều kiểu layout thì tạo nhiều file layout):

![Demo code 1](/images/demo-pug-1.png)

Cú pháp của template tương tự code HTML nhưng tối giản đi, chỉ cần tên thẻ, không cần thẻ đóng, nhưng cần chú ý thụt dòng đúng. Ngoài ra có thể dùng **include** để nhúng nội dung 1 file này vào file khác (ví dụ nhúng nội dung _menu.pug_ và _footer.pug_ vào _layout.pug_).

Tạo 1 file là **index.pug** nằm trong thư mục **template** (trang chủ, sẽ render ra trang index.html). Trang này "kế thừa" (extends) layout trên và chỉ thay đổi nội dung các block:

![Demo code 2](/images/demo-pug-2.png)

Các trang khác thì làm tương tự trang chủ.

Sau khi tạo xong các trang thì chạy lại lệnh pug như hướng dẫn phần cài đặt. Nếu đã chạy rồi thì phải tắt đi chạy lại khi có thêm file template mới bằng cách bấm **Ctrl + C**

Xong phần cài đặt và thiết lập project, phần tiếp theo là học qua 1 số cú pháp cơ bản của [Pug](https://pugjs.org/api/getting-started.html) (không cần phải biết hết) và "cắt HTML CSS từ giao diện có sẵn" các bạn hãy tự làm nốt nhé, bài viết đến đây là quá dài rồi.

Happy coding!!!
