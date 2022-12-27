---
title: "29 câu lệnh Linux bạn nên biết - Phần 2"
date: 2015-08-15
draft: false
tags: ["Linux"]
---

... tiếp theo [29 câu lệnh Linux bạn nên biết phần 1](/blog/29-cau-lenh-linux-ban-nen-biet-phan-1)

## 17. help

**--help** xem thông tin trợ giúp và các tùy chỉnh của câu lệnh.

Có thể viết tắt là **-h**

![Command help](/images/linux-17-help.jpg)

## 18. whatis – What is this command

**whatis** hiển thị mô tả về câu lệnh.

![Command whatis](/images/linux-18-whatis.jpg)

## 19. man – Manual

**man** ​ hiển thị trang hướng dẫn cho câu lệnh.

![Command man](/images/linux-19-man.jpg)

## 20. exit

**exit** ​ thoát khỏi phiên làm việc. Tương tự như việc thoát khỏi một ứng dụng trên giao diện người dùng.

![Command exit](/images/linux-20-exit.jpg)

## 21. ping

**ping <địa chỉ host>** ​ ping một host từ xa (server) bằng cách gửi các gói tin đến host đó. Nó thường dùng để kiểm tra kết nối mạng đến server.

![Command ping](/images/linux-21-ping.jpg)

## 22. who – Who Is logged in

**who** ​ hiển thị danh sách các tài khoản đang đăng nhập vào hệ thống.

![Command who](/images/linux-22-who.jpg)

## 23. su – Switch User

**su** ​ chuyển sang đăng nhập bằng một tài khoản khác. Tài khoản **root** có thể chuyển sang đăng nhập bằng các tài khoản khác mà không cần nhập mật khẩu.

![Command su](/images/linux-23-su.jpg)

## 24. uname

**uname** ​ hiển thị ra một số thông tin hệ thống như tên kernel, tên host, bộ xử lý, ...

Bạn có thể dùng lệnh **uname -a** ​ để hiển thị tất cả thông tin.

![Command uname](/images/linux-24-uname.jpg)

## 25. free – Free memory

**free** ​ xem thông tin về bộ nhớ: bộ nhớ đã sử dụng, bộ nhớ còn trống trên hệ thống

Bạn có thể dùng lệnh **free -m** ​ để xem bộ nhớ với đơn vị **KBs** hoặc **free -g** ​ để xem với đơn vị **GBs**

![Command free](/images/linux-25-free.jpg)

## 26. df – Disk space Free

**df** ​ xem thông tin về dung lượng đĩa cứng (đã sử dụng, còn trống, ...) và các thiết bị lưu trữ khác.

Bạn có thể dùng lệnh **df -h** ​ để xem thông tin dưới dạng _human readable_ (hiển thị với đơn vị **KBs**, **GBs** cho dễ đọc).

![Command df](/images/linux-26-df.jpg)

## 27. ps – Processes

**ps** ​ hiển thị thông tin về các tiến trình đang chạy.

![Command ps](/images/linux-27-ps.jpg)

## 28. top – Top processes

**top** ​ hiển thị thông tin về các tiến trình đang chạy, sắp xếp theo hiệu suất CPU.

Bạn cũng có thể dùng lệnh **top -u** ​ để xem thông tin các tiến trình đang chạy của tài khoản đó.

![Command top](/images/linux-28-top.jpg)

## 29. shutdown

**shutdown** ​ lệnh tắt máy tính. Có thể dùng **shutdown -r** để khởi động lại máy tính.

_Nguồn: http://www.hongkiat.com/blog/basic-linux-commands/_
