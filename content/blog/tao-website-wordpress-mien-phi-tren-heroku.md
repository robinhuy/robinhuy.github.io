---
title: "Tạo website WordPress miễn phí trên Heroku"
date: 2019-08-12
draft: false
tags: ["WordPress"]
---

Thông thường 1 trang web viết bằng WordPress có thể đẩy lên Internet qua Free Hosting, Share Hosting, VPS, ... Với những ai mới học mà muốn tiết kiệm chi phí thì thường dùng Free Hosting, nhưng Free Hosting thường là host nước ngoài, có rất nhiều hạn chế và hay bị lỗi. Trong bài viết này mình sẽ hướng dẫn các bạn tạo một website WordPress miễn phí trên Heroku và chức năng có thể sử dụng gần như thuê 1 con VPS vậy 😎.

## Bước 1

Tạo tài khoản trên {{< link link="https://heroku.com/" text="https://heroku.com" >}}.

Xác nhận tài khoản bằng cách thêm hình thức thanh toán (credit card). Chỉ là thêm hình thức thanh toán chứ không mất phí. Sau khi thêm xong thì sẽ được hưởng thêm rất nhiều {{< link link="https://www.heroku.com/free" text="quyền lợi" >}} và được sử dụng thêm các add-on như database (cần khi cài WordPress). Nếu ai không có Credit Card thì ra ngân hàng đăng ký rất nhanh, nhiều ngân hàng cho phép lấy luôn ngay sau khi đăng ký.

## Bước 2

Tạo 1 app mới trong Heroku:

![Tạo app trong Heroku](/images/heroku-create-app.png)

Tải source code {{< link link="https://wordpress.org/download/" text="WordPress" >}} về và giải nén, ta được thư mục **wordpress**.

Đẩy source code WordPress lên app vừa tạo bằng Heroku CLI:

![Deploy Heroku App](/images/heroku-deploy-app.png)

## Bước 3

Tạo CSDL cho website bằng cách vào tab **Resource**, phần **add-ons** và thêm add-on **JawsDB Maria** (có thể dùng CSDL khác như JawsDB MySQL, ...). Chú ý chỉ có tài khoản đã xác thực (đã thêm Credit Card) thì mới thêm add-ons được:

![Search add-on trên Heroku](/images/heroku-search-addon.png)

Sau khi thêm add-on JawsDB Maria thì bấm vào biểu tượng của add-on để chuyển qua trang cấu hình của add-on. Tại đây sẽ có hiển thị thông số để kết nối với CSDL:

![Heroku config addon](/images/heroku-config-addon.png)

Bật website WordPress đã deploy từ trước lên và cài đặt với các thông số kết nối CSDL của add-on JawsDB Maria. Sau đó chúng ta đã có thể tận hưởng thành quả của mình.

_Chú ý: Trên Heroku không cho lưu static files nên các themes, plugins hoặc file upload muốn được lưu trữ lại phải nằm trong source code_ 😅
