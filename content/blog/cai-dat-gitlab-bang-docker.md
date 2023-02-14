---
title: "Cài đặt Gitlab bằng Docker"
date: 2016-12-09
draft: false
tags: ["Linux", "Gitlab", "Docker"]
---

Ở bài trước mình có [hướng dẫn cài đặt Gitlab trên Private Server](/blog/huong-dan-cai-dat-gitlab-tren-private-server), tuy nhiên cách cài này là cài trực tiếp lên server, có thể sẽ xung đột với các gói phần mềm có sẵn như: Redis, Nginx, ... Do đó bài này chúng ta sẽ thử cài Gitlab qua [Docker](https://www.docker.com/) - một công nghệ đang rất hot trong thời điểm hiện tại.

Việc đầu tiên chúng ta phải làm đó là cài đặt Docker, các bạn tham khảo {{< link link="https://docs.docker.com/engine/installation/" text="tại đây" >}}, hướng dẫn này rất chi tiết rồi mình sẽ không nhắc lại nữa.

Sau khi cài xong Docker, chúng ta chỉ việc bật terminal lên và gõ

```
$ docker run -d --name local-gitlab --restart always -p 80:80 gitlab/gitlab-ce
```

Giải thích 1 chút về câu lệnh trên:

- **docker run -d**: Khởi tạo và chạy 1 Container cho Gitlab dưới dạng *Detached mode* (có thể hình dung như 1 máy ảo, trong máy ảo đó có Gitlab)
- **--name local-gitlab**: Đặt tên cho Container là **local-gitlab**, sau này chúng ta sẽ tương tác với Container qua tên này.
- **--restart always**: Luôn luôn khởi động lại Container khi bị thoát (khi server reboot hay restart docker service)
- **-p 80:80**: Publish port 80 từ trong Container ra ngoài host để chúng ta có thể truy cập vào gitlab qua host, chúng ta cũng có thể publish ra 1 cổng khác ví dụ **-p 8080:80**, nếu là trên localhost thì truy cập vào gitlab như sau *http://localhost:8080*
- **gitlab/gitlab-ce**: Tên của một Image trên {{< link link="https://hub.docker.com" text="https://hub.docker.com" >}} (cái này tương tự như Github nhưng thay vì chứa source code thì nó chứa các Image - các bản đóng gói do người khác upload lên). Chúng ta cũng có thể dùng một Image khác bằng cách search ở trên Docker hub (nên chọn Image có STARS cao và nhiều lượt PULL)

Sau khi câu lệnh chạy xong là việc cài Gitlab cũng đã hoàn tất, tuy nhiên chúng ta sẽ phải chờ thêm một vài phút để Gitlab hoàn thiện việc cấu hình. Nếu nóng lòng truy cập ngay có thể gặp lỗi như sau:

{{< figure src="/images/gitlab-bug.jpg" alt="Gitlab bug" title="Nếu gặp lỗi này chỉ cần chờ 1 lúc rồi Refresh trang là được 😬" >}}

Vậy là với Docker, chúng ta có thể cài Gitlab chỉ trong 1 nốt nhạc. Còn nếu bạn muốn cấu hình cho Gitlab thì có thể dùng lệnh **docker exec**, ví dụ muốn sửa file cấu hình của gitlab thì chúng ta gõ lệnh sau:

```
$ docker exec -it local-gitlab vim /etc/gitlab/gitlab.rb
```

lệnh trên sẽ bật file **/etc/gitlab/gitlab.rb​** trong Container gitlab bằng _vim_ (nếu không thích dùng _vim_ thì thay bằng _nano_ cũng được)

Sau khi cấu hình xong thì phải restart lại Container bằng lệnh:

```
$ docker restart local-gitlab
```

Tham khảo thêm về các câu lệnh của Docker {{< link link="https://docs.docker.com/engine/reference/commandline/" text="tại đây" >}}
