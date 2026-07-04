---
title: "29 câu lệnh Linux bạn nên biết - Phần 1"
date: 2015-08-13
draft: false
tags: ["Linux"]
---

Các bản phân phối Linux đều có hỗ trợ giao diện người dùng để tương tác với máy tính. Tuy nhiên trong một số trường hợp sử dụng giao diện command line để điều khiển máy tính sẽ nhanh hơn và đơn giản hơn.

Trong giao diện command line, các câu lệnh (command) dùng để ra chỉ thị cho máy tính thực hiện một tác vụ nào đó. Bạn có thể sử dụng câu lệnh để tắt máy tính, xem danh sách các file trong thư mục, sao chép file, di chuyển và xóa file, ...

Dưới đây tôi sẽ liệt kê các câu lệnh Linux cơ bản thường gặp để các bạn mới làm quen với Linux hoặc các quản trị viên Linux có thể dễ dàng học tập, tra cứu.

## 1. ls - List

**ls** liệt kê nội dung (file và thư mục) trong thư mục hiện hành. Nó cũng tương tự với việc bạn mở một thư mục và xem nội dung trong đó trên giao diện người dùng.

![Command ls](/images/linux-1-ls.jpg)

## 2. mkdir - Make Directory

**mkdir** tạo một thư mục mới. Nó cũng tương tự với việc bạn chọn new/create directory để tạo một thư mục mới trên giao diện người dùng.

![Command mkdir](/images/linux-2-mkdir.jpg)

## 3. pwd - Print Working Directory

**pwd** in ra đường dẫn đầy đủ đến thư mục hiện hành.

![Command pwd](/images/linux-3-pwd.jpg)

## 4. cd - Change Directory

**cd** chuyển một thư mục thành thư mục hiện hành cho phiên làm việc hiện tại. Nó cũng tương tự với việc bạn mở một thư mục và thao tác với các file và thư mục bên trong đó trên giao diện người dùng.

![Command cd](/images/linux-4-cd.jpg)

## 5. rmdir - Remove Directory

**rmdir** xóa một thư mục.

![Command rmdir](/images/linux-5-rmdir.jpg)

## 6. rm - Remove

**rm** xóa file. Bạn cũng có thể sử dụng **rm -r** để xóa thư mục và toàn bộ dữ liệu trong thư mục đó.

![Command rm](/images/linux-6-rm.jpg)

## 7. cp - Copy

**cp** sao chép file từ vị trí nguồn đến vị trí đích.

Bạn cũng có thể sử dụng **cp -r** để sao chép thư mục và toàn bộ dữ liệu bên trong.

![Command cp](/images/linux-7-cp.jpg)

## 8. mv - Move

**mv  <đích>** di chuyển một file hoặc thư mục từ vị trí này sang vị trí khác. Lệnh này cũng dùng để đổi tên file hoặc thư mục nếu như và **<đích>** là cùng một thư mục.

![Command mv](/images/linux-8-mv.jpg)

## 9. cat – concatenate and print files

**cat** đọc và in ra nội dung của file ra màn hình.

![Command cat](/images/linux-9-cat.jpg)

## 10. tail – print TAIL

**tail** đọc và in ra nội dung 10 dòng cuối cùng của file (mặc định).

Bạn có thể sử dụng **tail -n N** để chỉ định in **N** dòng ra màn hình.

![Command tail](/images/linux-10-tail.jpg)

## 11. less – print LESS

**less** in ra nội dung của một file theo từng trang trong trường hợp nội dung của file quá lớn và phải đọc theo trang. Bạn có thể dùng **Ctrl+F** để chuyển trang tiếp theo và **Ctrl+B** để chuyển về trang trước.

![Command less](/images/linux-11-less.jpg)

## 12. grep

**grep** tìm kiếm nội dung của file theo chuỗi cung cấp.

Bạn có thể dùng **grep -i** để tìm kiếm không phân biệt hoa thường hoặc **grep -r** để tìm kiếm trong toàn thư mục

![Command grep](/images/linux-12-grep.jpg)

## 13. find

**find -name** tìm kiếm file trong  theo .

Bạn cũng có thể dùng **find -iname** để tìm kiếm không phân biệt hoa thường.

![Command find](/images/linux-13-find.jpg)

## 14. tar

**tar -cvf** tạo file nén (.tar) từ các file có sẵn.

**tar -tvf** xem nội dung file nén (.tar).

**tar -xvf** giải nén (file .tar).

![Command tar](/images/linux-14-tar.jpg)

## 15. gzip

**gzip** tạo file nén (.gz). Sử dụng **gzip -d** để giải nén (file .gz).

![Command gzip](/images/linux-15-gzip.jpg)

## 16. unzip

**unzip** giải nén một file nén (.zip). Sử dụng **unzip -l** để xem nội dung file zip mà không cần giải nén.

![Command unzip](/images/linux-16-unzip.jpg)

**_Phần tiếp theo:_** [29 câu lệnh Linux bạn nên biết - Phần 2](/blog/29-cau-lenh-linux-ban-nen-biet-phan-2)
