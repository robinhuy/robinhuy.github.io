---
title: "Chứng chỉ SSL miễn phí với Let's Encrypt"
date: 2017-04-14
draft: false
tags: ["SSL", "Nginx", "Linux"]
---

Hiện nay hầu hết các trang web đều đã hỗ trợ SSL (Secure Socket Layer). Nó mã hóa dữ liệu truyền đi giữa máy chủ web và trình duyệt và làm tăng tính bảo mật cho website. Ngoài ra, việc sử dụng SSL certificate (chứng chỉ SSL) là cần thiết bởi hiện tại Google đã ưu tiên xếp hạng website dựa theo giao thức https (HTTP + SSL), những website mà chỉ sử dụng giao thức http sẽ bị coi là "unsafe" (không an toàn).

![techmaster.vn](/images/https-techmaster.jpg)

Có nhiều loại chứng chỉ SSL cung cấp các mức độ bảo mật khác nhau. Ví dụ chúng ta có thể mua một [Chứng chỉ SSL tại Namecheap](/blog/cai-dat-chung-chi-ssl-cua-namecheap-voi-nginx) với các mức giá khác nhau tùy từng loại. Tuy nhiên trong bài viết này chúng ta sẽ chỉ nói đến loại cơ bản nhất và làm thế nào để có được nó một cách miễn phí 😁

**Một số cách để có chứng chỉ SSL miễn phí**

- Sử dụng {{< link link="https://www.cloudflare.com/" text="Cloudflare" >}}: Đây là một website cung cấp dịch vụ tăng tốc và bảo mật website, họ có cung cấp chứng chỉ SSL ở gói Free. Việc đăng ký rất dễ dàng nên mình sẽ không hướng dẫn ở đây. Chú ý là với website chỉ phục vụ người dùng tại Việt Nam thì chạy qua Cloudflare có thể sẽ chậm hơn 1 chút do sử dụng CDN server ngoài Việt Nam.

- Sử dụng {{< link link="https://letsencrypt.org/" text="Let's Encrypt" >}}: Sử dụng dịch vụ này chúng ta sẽ tự tạo SSL certificate cho riêng mình và hoàn toàn miễn phí.

**Cách tạo SSL certificate với Let's Encrypt**

![SSL certificate](/images/free-ssl-certificates.jpg)

Giả sử chúng ta đang sử dụng 1 server Ubuntu với tài khoản truy cập có quyền sudo và sử dụng web server là Nginx.

**Bước 1**: Cài đặt gói **letsencrypt** (với bản mới sẽ đổi tên là **certbot** và dùng lệnh **certbot** thay cho **letsencrypt**)

```
$ sudo apt-get update
$ sudo apt-get install letsencrypt
```

hoặc làm theo hướng dẫn tại trang chủ {{< link link="https://certbot.eff.org/" text="https://certbot.eff.org" >}}

**Bước 2**: Tạo SSL certificate

- Thêm đoạn cấu hình sau vào block server của file cấu hình cho website (thường nằm trong _/etc/nginx/sites-enabled_ hoặc _/etc/nginx/conf.d_) để cho phép truy cập vào thư mục ẩn (.well-known) phục vụ cho việc xác thực:

```
...
location ~ /.well-known {
    allow all;
}
...

```

- Kiểm tra lại cấu hình xem có sai cú pháp chỗ nào không bằng lệnh:

```bash
$ nginx -t
```

- Nếu có báo lỗi thì sửa theo hướng dẫn, sau đó khởi động lại Nginx:

```
$ sudo systemctl restart nginx
```

- Tạo SSL certificate (thay **example.com** bằng tên miền của bạn và **/var/www/example.com** là đường dẫn đến thư mục gốc của website):

```
$ sudo letsencrypt certonly -a webroot --webroot-path=/var/www/example.com -d example.com -d www.example.com
```

- Nếu thành công output sẽ trông như sau:

```
IMPORTANT NOTES:

- If you lose your account credentials, you can recover through
  e-mails sent to sammy@digitalocean.com
- Congratulations! Your certificate and chain have been saved at
  /etc/letsencrypt/live/example.com/fullchain.pem. Your
  cert will expire on 2016-03-15. To obtain a new version of the
  certificate in the future, simply run Let's Encrypt again.
  ...
```

**Bước 3**: Cấu hình SSL cho website

- Để tăng tính bảo mật, tạo Strong Diffie-Hellman Group:

```
$ sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

- Tạo 1 snippet cho Nginx để có thể tái sử dụng được khi muốn cấu hình cho nhiều website:

```
$ sudo nano /etc/nginx/snippets/ssl-params.conf
```

Nội dung file như sau:

```
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
ssl_ecdh_curve secp384r1;
ssl_session_cache shared:SSL:10m;
ssl_stapling on;
ssl_stapling_verify on;
ssl_dhparam /etc/ssl/certs/dhparam.pem;

resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;

add_header Strict-Transport-Security "max-age=63072000; includeSubdomains";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
```

_Tham khảo cấu hình SSL bảo mật tại {{< link link="https://cipherli.st/" text="https://cipherli.st" >}} và {{< link link="https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html" text="https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html" >}}_

- Sửa file cấu hình cho website:

Tạo redirect 301 cho block server listen 80 (http) nếu bạn chỉ muốn support https (khi người dùng truy cập với giao thức http sẽ tự động chuyển thành https)

```
server {
    listen 80;
    server_name example.com www.example.com;
    return 301 https://$server_name$request_uri;
}
```

Tạo thêm 1 block server listen 443 (https)

```
server {
    listen      443 ssl http2;
    server_name example.com www.example.com;

    ssl_certificate     /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    include snippets/ssl-params.conf;

    root /var/www/example.com;

    location ~ /.well-known {
         allow all;
    }
}
```

Chú ý thay toàn bộ _example.com_ bằng domain của mình và đường dẫn root _/var/www/example.com_ giống bước tạo SSL certificate.

- Sau khi cấu hình xong thì khởi động lại Nginx:

```
$ sudo systemctl restart nginx
```

- Truy cập thử website để xem thành quả hoặc kiểm tra bằng trang sau {{< link link="https://www.ssllabs.com/ssltest/analyze.html" text="https://www.ssllabs.com/ssltest/analyze.html" >}}.

**Gia hạn SSL certificate**

- SSL tạo theo cách này sẽ hết hạn sau 90 ngày và chúng ta sẽ phải gia hạn bằng lệnh sau:

```
$ sudo letsencrypt renew
```

Để tự động hóa việc này chúng ta có thể cấu hình cronjob để tự động gia hạn chứng chỉ.

- Ví dụ cấu hình cronjob để tự động gia hạn mỗi 60 ngày:

```
$ sudo crontab -e
```

Thêm vào dòng sau (đặt lịch cứ mỗi 2 tháng tự động chạy lệnh renew vào lúc 0h30):

```
30 0 1 */2 * /usr/bin/letsencrypt renew && /bin/systemctl reload nginx
```

Xong, vậy là website của chúng ta đã có thể truy cập qua giao thức https và không lo bị hết hạn 👍.
