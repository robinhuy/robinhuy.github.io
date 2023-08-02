---
title: 'Quản lý package trong Go'
date: 2018-03-30
draft: false
tags: ['Go']
---

Để sử dụng 1 package trong Go ta dùng lệnh **import**:

- Với _local package_ (các package nằm trong project) thì ta có thể sử dụng đường dẫn tương đối.

- Với _external package_ (các package bên ngoài project) thì ta sẽ phải cài đặt vào trong {{< link link="https://github.com/golang/go/wiki/GOPATH" text="$GOPATH" >}} (đây là một biến môi trường để thiết lập nơi cài package).

Để cài đặt package thì chúng ta có thể dùng các cách sau:

## **Go Get**

Đây là _package manager_ mặc định của Go, nó giúp chúng ta cài _external package_ vào _$GOPATH_, ví dụ cài package _go-pg_(PostgreSQL ORM cho Go):

```bash
go get github.com/go-pg/pg
```

Lệnh trên sẽ tải thư viện {{< link link="https://github.com/go-pg/pg" text="go-pg/pg" >}} và lưu vào trong đường dẫn **$GOPATH/src**. Ví dụ _$GOPATH="/home/robin"_ thì package sẽ được tải về và lưu vào trong đường dẫn _/home/robin/src_ với cấu trúc thư mục là **[domain]/[organization]/[repository]**(để tránh trùng lặp vì các package có thể trùng tên)

![Gopath structure](/images/gopath-structure.png)

Ưu điểm khi sử dụng **go get**:

- Quản lý package theo kiểu phân tán (decentralized), các package không lưu tập trung trong project mà lưu trong _$GOPATH_. Package chỉ cần cài một lần, sử dụng được cho nhiều project (chỉ cần import không cần cài lại).
- Các package có thể gọi lẫn nhau mà không bị chồng chéo (package lồng vào nhau nhiều cấp).
- Một số package cung cấp file binary đặt trong **$GOPATH/bin**, cho phép chúng ta sử dụng ở mọi chỗ (ví dụ {{< link link="https://github.com/golang/protobuf" text="protoc-gen-go" >}} cho phép tạo ra code Go từ file Proto).

Nhược điểm:

- Khi cài package phải cài từng gói và trong một project lớn sẽ không rõ có những package nào đang được sử dụng.
- Không quản lý được version của package. Go get luôn lấy package từ _HEAD_ của _default branch_ (code mới nhất), do đó package trong Go phải luôn đảm bảo **stable**. Thực ra đây cũng không hẳn là nhược điểm bởi các package của Go sẽ luôn publish theo cách ổn định nhất, nếu package có version mới không tương thích ngược toàn bộ với version cũ thì sẽ đặt ở một repository khác.

## **Dep**

{{< link link="https://github.com/golang/dep" text="Dep" >}} cũng là một _package manager_ cho Go. Nó cung cấp một số chức năng mà **go get** không có:

- Quản lý được các package sử dụng trong project.
- Cài nhiều package một lúc dựa vào phân tích code và thiết lập được version của các package.

Dep cũng có nhược điểm như: Khó sử dụng hơn go get, khó import local package, ... do đó cần cân nhắc trước khi sử dụng.

Chúng ta có thể cài Dep qua **go get**, trên MacOS thì có thể dùng **Homebrew**, còn với các hệ điều hành khác ta chạy lệnh sau:

```bash
curl https://raw.githubusercontent.com/golang/dep/master/install.sh | sh
```

Sau khi cài xong, chúng ta có thể dùng lệnh **dep** trên _terminal_ để cài các package.

```bash
dep init
dep ensure
```

Lệnh **dep init** dùng để khởi tạo ra môi trường làm việc với Dep, nó sẽ sinh ra thư mục **vendor** ngay trong project để chứa các package đã cài thay cho _$GOPATH_ và 2 files:

- **Gopkg.toml**: Định nghĩa một số quy định quản lý của Dep như phiên bản nào của package được sử dụng, source của package, ... (tương tự package.json của npm hay gemfile của Ruby, ...).
- **Gopkg.lock**: Được tự động sinh ra mỗi khi thực hiện lệnh **dep init** hoặc **dep ensure**, nó như một bản snapshot, ghi lại các trạng thái và thao tác khi update hay cài đặt package.

Lệnh **dep ensure** dùng để cài đặt các package dựa vào file **Gopkg.toml** và các file **.go** trong project (Dep sẽ đọc các lệnh _import_ trong các file *.go* để tìm ra các package đang sử dụng). Các package được cài vào trong thư mục **vendor** của project với cấu trúc giống như trong _$GOPATH_.

Một số chú ý khi sử dụng Dep:

- Project phải được đặt trong **$GOPATH** như các package khác.
- Khi lần đầu chạy **dep init** nếu là một project có sẵn chưa sử dụng Dep thì thời gian chạy lệnh có thể lâu do Dep phải đọc toàn bộ source có sẵn để tìm ra các package đang sử dụng.
- Nếu import _local package_ thì không sử dụng đường dẫn tương đối như **go get** mà sử dụng đường dẫn như với các _external package_.

_Tham khảo thêm về Dep: {{< link link="https://golang.github.io/dep/docs/introduction.html" text="https://golang.github.io/dep/docs/introduction.html" >}}_

## **Glide**

Tương tự như Deb, tuy nhiên theo quan điểm cá nhân thì {{< link link="https://github.com/Masterminds/glide" text="Glide" >}} dễ dùng hơn Deb.

Cài đặt: xem hướng dẫn tại đây: {{< link link="https://github.com/Masterminds/glide#install" text="https://github.com/Masterminds/glide#install" >}}.

Cách dùng cũng tương tự Deb, có 2 file là:

- **glide.lock**: lưu thông tin version của các package đã cài đặt
- **glide.yaml**: dùng để cấu hình các package dùng cho dự án.

Một số lệnh dùng trong Glide:

```
$ glide create # Khởi tạo project
$ glide get github.com/Masterminds/cookoo # Lấy package và thêm vào glide.yaml
$ glide install # Cài đặt package
$ glide up # Update version mới của package (theo glide.yaml)
```
