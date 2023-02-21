---
title: "Quản lý Dependencies trong Go bằng Govendor"
date: 2018-10-22
draft: false
tags: ["Go"]
---

Để quản lý Dependencies (packages) trong Go chúng ta có thể dùng nhiều tool hỗ trợ. Về bản chất thì chúng tương tự nhau nhưng cũng có nhưng ưu nhược điểm riêng, ví dụ một số tool mình đã từng sử dụng như Dep hoặc Glide (tham khảo bài viết [Quản lý package trong Go](/blog/quan-ly-package-trong-go)).

Hiện mình đang sử dụng một tool khác là {{< link link="https://github.com/kardianos/govendor" text="Govendor" >}}, và theo ý kiến cá nhân thì mình thấy tool này dễ sử dụng hơn, và cách cấu hình cũng như hoạt động của nó khá giống với **npm** trên NodeJS. Do đó sẽ dễ tiếp cận hơn đối với các lập trình viên NodeJS hoặc Javascript nói chung.

Dưới đây là một số hướng dẫn cơ bản để sử dụng Govendor.

## Cài đặt

Dùng Go get để cài như các package khác:

```bash
go get -u github.com/kardianos/govendor
```

Chú ý project vẫn phải nằm trong $GOPATH/src.

## Sử dụng

Khởi tạo Govendor (trong thư mục chứa source code của project):

```
govendor init
```

_Lệnh này sẽ tạo thêm thư mục **vendor** trong project, và trong thư mục này có 1 file để cấu hình dependencies là **vendor.json**._

Cài đặt dependencies (ví dụ _github.com/jinzhu/gorm_):

```bash
govendor fetch github.com/jinzhu/gorm
```

_Lệnh trên sẽ tạo mới (hoặc update) gói _github.com/jinzhu/gorm_ (lưu vào trong thư mục vendor).\_

Trong trường hợp cần chỉ định rõ version của dependency thì ta dùng lệnh sau:

```bash
// Lấy version mới nhất bắt đầu với tên v1
govendor fetch github.com/jinzhu/gorm@v1

// Lấy chính xác version v1.9
govendor fetch github.com/jinzhu/gorm@=v1.9
```

Hoặc chúng ta có thể sửa file vendor.json, bổ sung thêm trường "version" và "versionExact":

```
{
  "checksumSHA1": "qUfWkFlJqc24xFWAsWxKkyyO+zw=",
  "path": "github.com/jinzhu/gorm",
  "revision": "742154be9a26e849f02d296073c077e0a7c23828",
  "revisionTime": "2018-10-07T00:49:37Z",
  "version": "v1",
  "versionExact": "v1.9.1"
},
```

Để xóa dependency ta dùng lệnh remove:

```bash
govendor remove github.com/jinzhu/gorm
```

Kiểm tra lại các dependencies trong project:

```bash
govendor list
```

{{< figure src="/images/govendor.png" alt="Govendor list" title="Ví dụ hiển thị trên terminal" >}}

Chú ý ký tự **v** ở trước là trạng thái của package. Trạng thái của package có thể là vendor (v), external (e), ... tham khảo chi tiết trên {{< link link="https://github.com/kardianos/govendor#status" text="github" >}}.

## Tip

Khi quản lý source code (ví dụ dùng Git), chúng ta sẽ commit cả thư mục **vendor** lên. Như vậy khi người khác pull source code về sẽ không cần cài lại dependencies nữa. Đặc biệt khi deploy code dùng Docker thì ở bước build chúng ta cũng không cần lấy dependencies qua mạng.

Một cách khác đó là không lưu thư mục **vendor** vào trong source code (để giảm bớt dung lượng), thì chúng ta chỉ cần lưu file **vendor.json**(tương tự _package.json_ khi sử dụng _npm_). Sau đó khi pull code về thì cài lại dependencies bằng lệnh **govendor sync**.
