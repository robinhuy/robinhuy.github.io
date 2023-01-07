---
title: "Cookies và vấn đề bảo mật"
date: 2018-09-15
draft: false
images: ["/images/how-to-secure-cookies.jpg"]
tags: ["Cookies", "Security"]
---

Chắc hẳn các lập trình viên, đặc biệt là các Backend developer, sẽ không còn xa lạ với Cookie (thường đi kèm với Session). Tuy nhiên nhiều người có thể chưa thực sự hiểu rõ vì nó thường hay được giới thiệu kèm với một ngôn ngữ lập trình phía Backend (ví dụ như PHP, NodeJS, ...) và sử dụng các các thư viện để thao tác. Bài viết này sẽ giới thiệu rõ ràng hơn về Cookie cả phía Backend lẫn Frontend và một số vấn đề bảo mật liên quan đến Cookie để các web developer thận trọng hơn khi sử dụng.

## Cookie là gì?

Cookie (tên đầy đủ HTTP Cookies) là một file text nhỏ được lưu trữ bởi trình duyệt (browser) ở trên máy người dùng (client). Nó thường được sử dụng với 3 mục đích chính:

- Quản lý phiên làm việc (Session management).
- Cá nhân hóa thông tin người dùng (Personalization).
- Theo dõi, phân tích hành vi người dùng (Tracking).

Ví dụ với trường hợp Quản lý phiên làm việc:

- User truy cập một trang trong website (thực hiện 1 request lên server), web server yêu cầu trình duyệt lưu thông tin truy cập của user vào Cookie. Sau đó, mỗi khi user thực hiện một request khác vẫn website đó thì trình duyệt lại gửi thông tin đã lưu trong Cookie lên. Nhờ đó web server có thể biết được các request là đến từ cùng 1 User. _Nếu bạn sử dụng 2 trình duyệt khác nhau trên cùng một máy thì server sẽ hiểu các request là đến từ 2 người vì các trình duyệt khác nhau lưu Cookies khác nhau_.
  ![Cookies for MSN](/images/cookie-for-msn.gif)

- Thông tin lưu trữ trong cookie có thể trong một thời gian dài hoặc chỉ trong một phiên làm việc tùy vào cách cấu hình Cookies. Thông thường ta hay sử dụng Session Cookies để lưu trạng thái của phiên làm việc (SessionID), thông tin sẽ bị xóa khi hết phiên làm việc (khi người dùng tắt trình duyệt).

## Cách tạo ra Cookie

Cookie có thể được tạo ra từ phía Server hoặc Client. 
![How to create cookies](/images/cookie-ch.jpg)

Khi nhận được một HTTP request, nếu muốn tạo Cookie từ server, ta sẽ trả responve về cho trình duyệt một HTTP Header với tên là [Set-Cookie](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie), giá trị là các dữ liệu cần lưu vào Cookie (theo dạng key=value) và các tùy chọn như: Loại Cookies, thời gian sống, ... Ví dụ tạo một Cookies đơn giản:

```
Set-Cookie: sid=techmaster
```

Khi trình duyệt thực hiện các request khác, nó sẽ gửi kèm dữ liệu trong Cookies trở lại server cũng qua HTTP Header với tên là **Cookie**:

```
Cookie: sid=techmaster;
```

Cookies cũng có thể được tạo, chỉnh sửa từ phía Client thông qua Javascript bằng cách sử dụng [document.cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie). Cú pháp tương tự như tạo Cookies từ phía server:

```javascript
document.cookie = "sid=techmaster;";
```

Để lấy ra giá trị của Cookies ta cũng chỉ cần gọi **document.cookie**.

## Bảo mật Cookies

Do Cookies thường được sử dụng để quản lý trạng thái của người dùng (ví dụ trạng thái đăng nhập), do đó có thể có một số vấn đề liên quan đến bảo mật khi sử dụng Cookies. Ví dụ như Cookies lưu trạng thái đăng nhập của người dùng bị đánh cắp, hacker có thể dùng Cookies này để giả mạo làm người dùng và thực hiện tương tác với trang web mà không cần đăng nhập. Một số extension của trình duyệt cho phép share Cookies để những người dùng khác nhau cùng truy cập vào 1 tài khoản mà không cần biết thông tin truy cập như _username_ và _password_.

![Secure cookies](/images/how-to-secure-cookies.jpg)

Để bảo mật Cookies hơn thì khi tạo Cookies ta sẽ cần sử dụng thêm một số options như domain, path, ... dùng để giới hạn việc gửi Cookies chỉ cho phép theo domain và đường dẫn thiết lập trước. Ví dụ:

```
Set-Cookie: sid=techmaster; domain=techmaster.vn; path=/auth
```

Với các website hỗ trợ https thì ta thêm thuộc tính **secure** để đảm bảo việc gửi Cookies sẽ chỉ qua SSL, giao thức https:

```
Set-Cookie: sid=techmaster; domain=techmaster.vn; path=/auth; secure
```

Với các dữ liệu cần bảo mật hơn (ví dụ như SessionID) thì ta sẽ chỉ thiết lập từ phía server và bổ sung thêm options [HttpOnly](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies) để không cho phép truy cập dữ liệu này thông qua Javascript (document.cookie). Ví dụ:

```
Set-Cookie: sid=techmaster; domain=techmaster.vn; path=/auth; secure; HttpOnly
```
