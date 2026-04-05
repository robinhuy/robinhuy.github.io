---
title: "Validate dữ liệu trong Go sử dụng Govalidator"
date: 2018-05-18
draft: false
tags: ["Go"]
---

Trong các ứng dụng cho phép người dùng nhập dữ liệu thì đều cần phải có validate để bảo mật và đảm bảo ứng dụng chạy đúng.

Golang có một số thư viện open source hỗ trợ chúng ta làm việc này một cách nhanh chóng, ví dụ như {{< link link="https://github.com/asaskevich/govalidator" text="govalidator" >}}.

## Cài đặt

Cài govalidator qua [package manager](/blog/quan-ly-package-trong-go) hoặc đơn giản là dùng **go get**:

```go
go get github.com/asaskevich/govalidator
```

Import vào trong project:

```go
import validator "github.com/asaskevich/govalidator"
```

## Sử dụng

Govalidator cung cấp rất nhiều function hỗ trợ chúng ta validate dữ liệu theo các dạng thông dụng như: URL, Email, Alpha, Numeric Alphanumeric, Regex, ... Danh sách các hàm hỗ trợ: {{< link link="https://github.com/asaskevich/govalidator#list-of-functions" text="https://github.com/asaskevich/govalidator#list-of-functions" >}}.

Ngoài ra Govalidator còn hỗ trợ chúng ta **validate struct** (kiểm tra tính hợp lệ của các field trong struct) bằng cách sử dụng tag **valid**. Ví dụ:

```go
type User struct {
	Id       int    `valid:"required"`
	Name     string `valid:"required"`
	Email    string `valid:"email"`
	Password string `valid:"required"`
}
```

Sau khi khai báo Struct xong, để kiểm tra toàn bộ struct ta gọi hàm **ValidateStruct()**:

```go
user := User{
    Id:       1,
	Name:     "",
	Phone:    "1080",
	Email:    "fake_email",
	Password: "secret",
}

if ok, err := govalidator.ValidateStruct(user); err != nil {
	fmt.Print(err)   // In ra các thông báo lỗi
} else {
	fmt.Print("Struct hợp lệ")
}
```

## Tiptrick

Nếu trong Struct có nhiều trường cần **require** thì ta có thể cấu hình mặc định các field là require:

```go
func init() {
  govalidator.SetFieldsRequiredByDefault(true)
}
```

Sau đó trường nào không cần require thì thêm tag **valid:"-"**.

Để thay đổi message báo lỗi mặc định ta dùng ký tự **~** vào sau kiểu validate (chú ý không có khoảng trắng):

```go
Email    string `valid:"email~Email không hợp lệ"
```

Nếu một field validate nhiều kiểu dữ liệu thì ngăn cách bằng dấu phẩy, và nếu có custom message thì cần thiết lập riêng message cho từng kiểu dữ liệu:

```go
Name     string `valid:"required~Tên không được để trống,runelength(1|50)~Tên không hợp lệ (từ 1 - 50 ký tự)"
```
