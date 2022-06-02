---
title: "Cách tạo một trang blog cá nhân miễn phí dành cho dev"
date: 2022-06-01
draft: false
tags: ["Blog"]
---

Vào một ngày đẹp trời, bỗng dưng mình nảy ra ý định làm một trang blog cá nhân thay vì viết Blog trên các nền tảng có sẵn như [viblo.asia](https://viblo.asia/newest), [techmaster.vn](https://techmaster.vn/posts), [kipalog.vn](https://kipalog.com/), ... Tất nhiên các bài viết mới vẫn sẽ đăng lên các nền tảng này để kiếm người đọc chứ blog này ma nào thèm vào 😅).

Rồi ý tưởng thì có, thực hiện như nào, sử dụng công nghệ nào, chi phí như nào? Khá nhiều câu hỏi đau đầu và khó lựa chọn. Vậy cần đặt ra một số tiêu chí:
- Ưu tiên số một là chi phí, càng rẻ càng tốt, __miễn phí__ thì còn tốt hơn nữa.
- Sử dụng công nghệ nào cũng được miễn là cài đặt nhanh, dễ dùng, dễ tùy biến.
- Blog có thể lượng truy cập ít (thậm chí không có ma nào xem), nhưng tốc độ truy cập vẫn phải nhanh, PageSpeed Insights điểm càng cao càng tốt.

Sau một hồi search Google với 3 tiêu chí trên (chủ yếu là tiêu chí _miễn phí_) thì mình chọn ra được giải pháp như sau:
- Sử dụng Static Site Generator, chơi web tĩnh thì tốc độ sẽ nhanh và điểm PageSpeed Insights sẽ cao. Cụ thể mình dùng tool [Hugo](https://gohugo.io/).
- Hosting ở đâu? Tất nhiên là [Github Page](https://pages.github.com/) rồi, free, không giới hạn dung lượng và tốc độ cao. Các bạn cũng có thể dùng một số hosting free khác như: [Netlify](https://www.netlify.com/), [Firebase](https://firebase.google.com/), [Vercel](https://vercel.com/), ...

OK. Let's get started!

## Cài đặt Hugo

Vào trang chủ của Hugo rồi làm theo hướng dẫn cài đặt tùy theo hệ điều hành mà bạn đang sử dụng thôi: [https://gohugo.io/getting-started/installing](https://gohugo.io/getting-started/installing).

Sau khi cài xong thì bật terminal lên và gõ lệnh sau để tạo một project web tĩnh (ví dụ _huydq.dev_):

```
hugo new site huydq.dev
```



## Cấu hình Github Pages

