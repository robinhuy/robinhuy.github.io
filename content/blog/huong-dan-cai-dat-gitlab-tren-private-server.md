---
title: "Hướng dẫn cài đặt Gitlab trên Private Server"
date: 2016-10-18
draft: false
tags: ["Linux", "Gitlab"]
---

Gitlab là một công cụ để quản lý source code rất nổi tiếng hiện nay. Nó cho phép chúng ta tạo và quản lý các Git source repository tương tự nhu trên {{< link link="https://github.com/" text="Github" >}}, tuy nhiên nó cho phép chúng ta tạo không giới hạn các **private repository** và nhiều chức năng thú vị khác như: code reviews, issue tracking, activity feeds, wikis, ...

Chúng ta có thể sử dụng gitlab bằng cách truy cập trang {{< link link="https://gitlab.com/" text="https://gitlab.com" >}} hoặc cài gitlab lên 1 server riêng. Có 2 cách để cài gitlab lên private server đó là: **Cài từ source git** và cài theo **Omnibus package**. Cài theo cách thứ 2 thì sẽ đơn giản hơn rất nhiều, chúng ta chỉ cần vào mục {{< link link="https://about.gitlab.com/downloads/" text="download" >}}, sau đó chọn server cần cài đặt và làm theo các bước hướng dẫn bên dưới.

{{< figure src="/images/install-gitlab-debian-8.jpg" alt="Install Gitlab debian 8" title="Ví dụ cài Gitlab lên server Debian 8" >}}

Tóm tắt các lệnh cài đặt trên server Debian 8

```
$ sudo apt-get install curl openssh-server ca-certificates postfix
$ curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | sudo bash
$ sudo apt-get install gitlab-ce
$ sudo gitlab-ctl reconfigure
```

Sau khi cài đặt xong chúng ta có thể dùng {{< link link="https://docs.gitlab.com/omnibus/maintenance/README.html" text="gitlab-ctl" >}} để quản lý service:

```
# Kiểm tra trạng thái
$ sudo gitlab-ctl status

# Bật gitlab
$ sudo gitlab-ctl start

# Tắt gitlab
$ sudo gitlab-ctl stop

# Khởi động lại gitlab
$ sudo gitlab-ctl restart
```

**Chú ý**

- Gitlab Omnibus bao gồm nhiều gói package bên trong như: Nginx, Postgresql, Redis, Sidekiq, Unicorn, .. nên dung lượng khá nặng

- Nếu trên server đang sử dụng Nginx làm web server thì có thể bị trùng cổng. Chúng ta có thể disable gói Nginx trong Gitlab Omnibus đi để dùng Nginx có sẵn:

- Bật file **/etc/gitlab/gitlab.rb** và sửa các cấu hình sau:

  ````
  nginx['enable'] = false
  web_server['external_users'] = ['www-data']```

  ````

- Cập nhật lại cấu hình của Gitlab

  ```
  $ gitlab-ctl reconfigure
  ```

- Cấu hình lại Nginx cho Gitlab, có thể tham khảo file cấu hình mẫu {{< link link="https://gitlab.com/gitlab-org/gitlab-recipes/blob/master/web-server/nginx/gitlab-omnibus-nginx.conf" text="tại đây" >}}.
- Cấu hình gửi email SMTP, có thể tham khảo {{< link link="https://docs.gitlab.com/omnibus/settings/smtp.html" text="tại đây" >}}.

_Tham khảo document của Gitlab Omnibus: [https://docs.gitlab.com/omnibus/​](https://docs.gitlab.com/omnibus/)_
