---
title: "Cài đặt chứng chỉ SSL của Namecheap với Nginx"
date: 2017-04-28
draft: false
tags: ["SSL", "Nginx", "Linux"]
---

Bài trước mình đã hướng dẫn cách [tạo chứng chỉ SSL miễn phí với Let's Encrypt](/blog/chung-chi-ssl-mien-phi-voi-lets-encrypt). Tiếp theo mình sẽ hướng dẫn các bạn cách tạo chứng chỉ SSL qua dịch vụ của Namecheap (mất phí nhé 😂)

**Đăng ký dịch vụ của Namecheap**

Đầu tiên chúng ta sẽ cần đăng ký tài khoản tại Namecheap và chọn 1 loại chứng chỉ phù hợp {{< link link="https://www.namecheap.com/security/ssl-certificates.aspx" text="https://www.namecheap.com/security/ssl-certificates.aspx" >}}.

Sau khi đã thanh toán, truy cập vào Dashboard để active dịch vụ

{{< figure src="/images/namecheap-dashboard.png" alt="Namecheap dashboard" title="Di chuột đến phần tên user góc trên bên phải để truy cập Dashboard" >}}

{{< figure src="/images/namecheap-ssl.png" alt="Product list" title="Trên menu chọn phần Product List / SSL Certificates" >}}

{{< figure src="/images/namecheap-activate.png" alt="Activate certificate" title="Chọn ACTIVATE để kích hoạt dịch vụ" >}}

Tiếp theo để kích hoạt dịch vụ chúng ta sẽ cần điền một CSR (Certificate Signing Request), đó là 1 đoạn code mã hóa thông tin về công ty và tên miền. Để tạo mã CSR, chúng ta cần truy cập vào server và gõ lệnh sau:

```
$ openssl req -new -newkey rsa:2048 -nodes -keyout server.key -out server.csr
```

_Khi trên server có nhiều website thì chúng ta nên thay **server.key** và **server.csr** bằng tên miền để tránh nhầm lẫn, ví dụ nctest.info.key và nctest.info.csr hoặc lưu vào 1 thư mục riêng ví dụ **/etc/ssl/nctest.info**_

Khi thực hiện lệnh, chúng ta sẽ phải điền 1 số thông tin của công ty và domain ví dụ như sau:

```
Country Name (2 letter code) [AU]: VN
State or Province Name (full name) [Some-State]: Hanoi
Locality Name (eg, city) []: Hanoi
Organization Name (eg, company) [Internet Widgits Pty Ltd]: NCTEST Ltd
Organizational Unit Name (eg, section) []: Training
Common Name (e.g. server FQDN or YOUR name) []: nctest.info
Email Address []: administrator@nctest.info
```

Kết quả chúng ta sẽ có 2 file là **server.key** (Private Key) và **server.csr** (mã CSR). File **server.key** sẽ dùng để chứng thực nên cần lưu lại cẩn thận để dùng đến sau này. File server.csr sẽ dùng để gửi dữ liệu lên namecheap, chúng ta dùng lệnh sau để đọc nội dung file và copy để điền vào form đăng ký  cat server.csr

{{< figure src="/images/namecheap-csr.png" alt="CSR" title="Copy mã CSR và điền vào form, chọn Web-Server Nginx sau đó Submit" >}}

_Phần nào không điền được thì có thể để 'NA' và chú ý chỉ sử dụng ký tự alphabet, tiếng Anh không dấu._

**Chọn phương thức xác thực**

Có 3 loại phương thức xác thực là Email, HTTP-based và DNS-based. Ở đây mình sẽ hướng dẫn theo cách đầu tiên là xác thực qua Email, 2 cách còn lại các bạn xem hướng dẫn tiếng Anh tại website.

{{< figure src="/images/namecheap-dcv.png" alt="DCV" title="Ví dụ xác thực qua Email" >}}

{{< figure src="/images/namecheap-company.png" alt="Điền thông tin liên hệ" >}}

{{< figure src="/images/namecheap-confirm.png" alt="Confirm send email" title="Xác nhận gửi email" >}}

Xong, tiếp theo chúng ta chờ Namecheap gửi email xác thực và chứng chỉ SSL qua email đăng ký (ví dụ admin@nctest.info).

Chứng chỉ SSL sẽ được đính kèm theo email, tải về và upload lên server và giải nén chúng ta sẽ được 2 file dạng như sau **nctest.info.crt** và **nctest.info.ca-bundle**, nối 2 file lại bằng lệnh cat (nếu có nhiều file hơn thì cũng nối lại thành 1 file tương tự):

```
$ cat nctest.info.crt nctest.info.ca-bundle >> cert_chain.crt
```

Chúng ta sẽ sử dụng file đã nối là **cert_chain.crt** và file Private key tạo lúc ban đầu là **server.key** để cài đặt SSL.

**Cấu hình Nginx**

Sửa file cấu hình cho domain, nếu chưa lắng nghe ở cổng 443 thì bổ sung thêm, và trỏ đường dẫn vào 2 file **cert_chain.crt** và **server.key**:

```
server {
    listen 443;

    ssl on;
    ssl_certificate /etc/ssl/nctest.info/cert_chain.crt;
    ssl_certificate_key /etc/ssl/nctest.info/server.key;

    server_name  nctest.info;
    access_log /var/log/nginx/nginx.vhost.access.log;
    error_log /var/log/nginx/nginx.vhost.error.log;

    location / {
        root /var/www/;
        index index.html;
    }

}
```

Hoặc tham khảo file cấu hình ở bài hướng dẫn trước. Sau khi sửa xong nhớ khởi động lại Nginx và hưởng thụ thành quả 😊
