---
title: "Tạo 1 REST API phục vụ cho mục đích học tập trong 30 giây"
date: 2019-10-29
draft: false
tags: ["REST API", "NodeJS"]
---

Video demo: {{< link link="https://www.youtube.com/watch?v=O6Agt4cLbfo&feature=youtu.be" text="https://youtu.be/O6Agt4cLbfo" >}}.

## Dựng Server local

Yêu cầu máy tính đã cài và chạy được {{< link link="https://git-scm.com/" text="Git" >}} + {{< link link="https://nodejs.org/en/" text="NodeJS" >}}.

Các bước thực hiện:

1. Clone repository sau (hoặc **fork** về nếu muốn quản lý source code, nhớ **star** để ủng hộ tác giả): _[https://github.com/robinhuy/fake-rest-api-nodejs.git](https://github.com/robinhuy/fake-rest-api-nodejs.git)_

   ```bash
    git clone https://github.com/robinhuy/fake-rest-api-nodejs.git
   ```

2. Cài đặt dependencies

   ```bash
    cd fake-rest-api-nodejs
    npm install
   ```

3. Chạy server

   ```bash
     npm start
   ```

Vậy là chúng ta đã có 1 Server API chạy trên _http://localhost:3000_ với 1 resource có sẵn là **/users** với các API theo chuẩn REST:

```
GET    /users
GET    /users/1
POST   /users
PUT    /users/1
PATCH  /users/1
DELETE /users/1
```

Ngoài ra Server còn cung cấp thêm 1 phương thức Authentication bằng JWT (Bearer token), xác thực user bằng **email** và **password** qua API:

```
POST   /login
```

(dữ liệu truyền lên dạng **{ email: "example@gmail.com", password: "secret" }**, thông tin lấy trong resource **users**).

Những resource và method được khai báo trong **protected_resources** thì cần đăng nhập để thực hiện, ví dụ:

```json
"protected_resources": {
    "users": ["GET", "POST", "PUT", "PATCH", "DELETE"],
    "products": ["POST", "PUT", "PATCH", "DELETE"]
}
```

Nếu bạn muốn tuỳ chỉnh lại hoặc bổ sung cơ chế Authentication thì có thể chỉnh sửa lại ở file **server.js phần** Access control

![Authentication](/images/fake-api-authentication.png)

_Chú ý: Sau khi chỉnh sửa code cần khởi động lại server!_

## Chỉnh sửa API

API mặc định là thông tin về User, toàn bộ được lưu vào trong file **database.json**. Có thể chỉnh sửa hoặc thêm dữ liệu vào file đó miễn khai báo đúng cấu trúc (chú ý users hiện đang được dùng luôn cho cả authentication). Ví dụ thêm 1 resource về **products**:

![database.json](/images/database.json.png)

Server sử dụng thư viện JSON Server, để xem đầy đủ tài liệu hướng dẫn về API hãy xem tại đây: {{< link link="https://github.com/typicode/json-server" text="https://github.com/typicode/json-server" >}}.

Nếu cần mockup dữ liệu lớn và ngẫu nhiên thì có thể dùng thêm dịch vụ sau {{< link link="https://mockaroo.com/" text="https://mockaroo.com" >}}. Mockaroo cho phép mockup dữ liệu rất đa dạng, cấu hình được tỉ lệ, viết thêm các function điều kiện để tạo dữ liệu và cho phép xuất mockup ra dưới nhiều định dạng trong đó có JSON.

![Mockaroo](/images/mockaroo.png)

## Dựng server online

Nếu là đại gia thì có thể sử dụng VPS hoặc nếu không thì có thể sử dụng dịch vụ của {{< link link="https://www.heroku.com/" text="Heroku" >}} (hoặc các dịch vụ tương tự): Đăng ký tài khoản, tạo App và đẩy source code kèm file database.json lên. Khi deploy code có thể chọn Heroku Git và gõ lệnh theo hướng dẫn bên dưới hoặc chọn kết nối với Github repo để deploy code qua 1 nút bấm (hoặc auto deploy khi có commit lên github).

![Heroku](/images/deploy-heroku.png)

Cần chú ý là nếu dùng gói Free thì khi Server không hoạt động (không có truy cập) sau 30 phút thì Server sẽ rơi vào trạng thái Sleep, lần truy cập kế tiếp sẽ hơi chậm 1 chút và mọi dữ liệu sẽ reset về ban đầu (như trong file database.json).

=> Nếu dùng Heroku để host thì có thể chọc phá API thoải mái 😄
