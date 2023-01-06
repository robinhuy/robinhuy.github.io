---
title: "Thêm mới và bảo mật API trong Kong API Gateway"
date: 2018-03-05
draft: false
images: ["/images/kong-create-credentials.png"]
tags: ["API Gateway"]
---

Kong cung cấp một *RESTful Admin API* cho phép chúng ta thực hiện việc cấu hình và quản lý các API. Mặc định Admin API sẽ lắng nghe ở cổng **8001** và cổng **8444** cho giao thức _https_. Chú ý API này chỉ dùng trong nội bộ, không public ra ngoài, vì nó cho phép quản lý toàn bộ hệ thống API gateway của Kong.

Để dễ hình dung, bài viết này sẽ hướng dẫn tạo mới các API và bảo mật cơ bản bằng plugins sử dụng [Konga](https://github.com/pantsel/konga) (GUI cho Admin API). Tuy nhiên các bạn có thể dùng **curl** hay **Postman** để test. Tài liệu tham khảo: Danh sách các endpoint và tham số của [Kong Admin API](https://getkong.org/docs/0.12.x/admin-api/).

Sau khi cài đặt và đăng nhập vào Konga, chúng ta sẽ kết nối Konga với Kong Admin API (chú ý Active connection):

![Add connections](/images/kong-active-connection.png)

## Thêm mới API

_Endpoint: [Add API](https://getkong.org/docs/0.12.x/admin-api/#add-api)_

![Add API](/images/kong-api.png)

Các tham số cần thiết:

- **name**: Tên của API (sử dụng để quản lý API). Ngoài name ra cũng thể dùng id để quản lý API (do hệ thống tự tạo).
- **hosts**, **uris**, **methods**: Dùng để phân biệt giữa các API, luôn phải có ít nhất 1 trong 3 thuộc tính này. Hosts là phân biệt qua Headers của request, uris là phân biệt qua đường dẫn và methods là phân biệt qua phương thức của request.
- **upstream_url**: Đường dẫn gốc của API.

{{< figure src="/images/kong-add-api.png" alt="Add API" title="Ví dụ thêm API trỏ đến techmaster.vn qua đường dẫn /techmaster" >}}

Các API sẽ chạy qua cổng **8000**, trong ví dụ này chúng ta chạy trên localhost nên sẽ truy cập vào _localhost:8000_. Với cấu hình như ví dụ trên thì khi chúng ta truy cập vào *localhost:8000/techmaster*, Kong sẽ forward sang trang *techmaster.vn.* Tuy nhiên đường dẫn một số file như _css_ sẽ bị sai do đường dẫn không bắt đầu từ tên domain (đường dẫn gốc). Do đó nếu sử dụng đường dẫn để phân biệt API thì với ứng dụng web frontend nên dùng cho đường dẫn gốc là **/**.

## Cấu hình plugins

Để bảo mật API, chúng ta sẽ cấu hình thêm một số [plugins](https://konghq.com/plugins/) của Kong. Ví dụ để Authentication chúng ta có thể dùng một số plugins như: Basic Authentication, Key Authentication, JWT, ... (một số plugins có nhãn Enterprise sẽ phải trả phí để sử dụng).

Plugins có thể áp dụng cho toàn bộ API hoặc cho cụ thể từng API qua name hoặc id của chúng. Endpoint [Add Plugin](https://getkong.org/docs/0.12.x/admin-api/#add-plugin).

Ví dụ cấu hình plugin [Basic Authentication](https://getkong.org/plugins/basic-authentication/?_ga=2.66688302.125727870.1520222260-2127029264.1519895628):

![Add plugin](/images/kong-add-plugin.png)

Sau khi kích hoạt Plugin, để truy cập được vào API chúng ta sẽ phải qua một bước Authentication của browser: 
![Basic authentication](/images/basic-authentication.png)

Nếu user nhập đúng Username và Password thì mới truy cập được vào API. Nếu là gửi request thì trong Headers của request phải có thuộc tính Proxy-Authorization hoặc Authorization có chứa Username và Password được mã hóa base64 theo cú pháp Username:Password.

## Tạo Consumer

Bước thiếp theo chúng ta phải tạo Consumer để truy cập API. Endpoint [Create Consumer](https://getkong.org/docs/0.12.x/admin-api/#create-consumer).

![Add consumer](/images/kong-add-consumer.png)

Trong Consumer, chúng ta tạo thêm các Credentials tương ứng với các tài khoản truy cập cho Authentication:

![Create Credentials](/images/kong-create-credentials.png)

Vậy là chúng ta đã cấu hình xong Basic Authentication cho API. Với các Plugins khác thì cũng làm tương tự.
