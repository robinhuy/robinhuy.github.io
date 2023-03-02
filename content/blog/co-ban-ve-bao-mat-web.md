---
title: "Cơ bản về bảo mật Web"
date: 2019-05-09
draft: false
tags: ["Security"]
---

> Có rất nhiều lý do để học về bảo mật web như:
>
> - Bạn lo lắng về việc để lộ thông tin cá nhân trên mạng.
> - Bạn quan tâm đến tính bảo mật cho website hoặc ứng dụng của mình.
> - Bạn là lập trình viên và đang đi xin việc, bạn muốn chuẩn bị sẵn cho trường hợp nhà tuyển dụng hỏi về các vấn đề bảo mật web.
>
> ... và nhiều lý do khác nữa.
>
> Bài viết này sẽ giải thích một vài vấn đề bảo mật web thông dụng kèm theo thuật ngữ chuyên ngành của nó.

## Hai khái niệm cốt lõi trong bảo mật

1. Không một ai có thể an toàn 100%.

2. Một lớp bảo vệ là không đủ.

## Cross-Origin Resource Sharing (CORS)

Bạn đã bao giờ gặp một thông báo lỗi dạng như này chưa?

```html
No 'Access-Control-Allow-Origin' header is present on the requested resource.
Origin 'null' is therefore not allowed access.
```

Nếu đã gặp phải lỗi này, bạn sẽ thử tìm giải pháp trên Google. Và bạn sẽ thấy ai đó hướng dẫn cài 1 extension giúp cho lỗi này biến mất và trang web của bạn lại hoạt động bình thường.

Nhưng liệu đây có phải cách làm tốt?

![No](https://media.giphy.com/media/6gLyE15StAs3C/giphy.gif)

### CORS được sinh ra là để bảo vệ bạn chứ không phải để gây khó khăn cho bạn

Trước khi giải thích về **CORS**, chúng ta hãy cùng tìm hiểu lại về Cookies, đặc biệt là Authentication Cookies. Authentication Cookies được sử dụng để thông báo cho server biết rằng bạn đã đăng nhập vào hệ thống, và chúng được tự động gửi kèm mỗi request lên server.

Giả sử bạn đã đăng nhập vào Facebook, và họ sử dụng Authentication Cookies.

Sau đó bạn click vào 1 link bất kỳ trên mạng, ví dụ {{< link link="https://huydq.dev/" text="link video full 9 phút" >}} và nó sẽ redirect bạn về 1 website nào đó của hacker. Website này sẽ tự động chạy 1 đoạn code Javascript để thực hiện request lên {{< link link="https://facebook.com" text="facebook.com" >}} có kèm theo authentication cookie của bạn!

Trong một thế giới không có CORS, hacker có thể thực hiện các thao tác trên Facebook với tài khoản của bạn mà bạn không hề hay biết. Ví dụ như đăng tin lên trên dòng thời gian của bạn kèm theo [link video full 9 phút](https://huydq.dev/), sau đó bạn bè của bạn click vào link trên và cũng thực hiện hành vi tương tự, ... Vòng lặp này cứ tiếp diễn cho đến khi toàn bộ mạng xã hội facebook đều thấy xuất hiện {{< link link="https://huydq.dev/" text="link video full 9 phút" >}} 😆

Thực tế, với sự bảo vệ của CORS, Facebook sẽ chỉ cho phép những request với Origin (đính kèm trong request header) là facebook.com lên server của họ. Tức là chỉ có request thực hiện từ website facebook.com mới được chấp nhận. Hay nói cách khác, họ đã giới hạn việc chia sẻ tài nguyên giữa các tên miền khác nhau (cross-origin resource sharing).

**Bạn cũng có thể tự hỏi:**

_- "Vậy nếu website của hacker cố tình thay đổi header origin khi gửi request thì sao?"_. Đúng, họ có thể làm như vậy. Nhưng trình duyệt sẽ tự động bỏ qua và chỉ gửi lên origin thực sự (là tên miền của website thực hiện request).

_- "Vậy nếu request được thực hiện từ phía server chứ không phải client?"_. Trong trường hợp này hacker có thể vượt qua được CORS nhưng họ lại không thể gửi kèm được authentication cookie bởi vì nó nằm ở phía client.

## Content Security Policy (CSP)

Để hiểu về **CSP** (chính sách bảo mật nội dung), trước tiên chúng ta cần tìm hiểu về một lỗ hổng rất thông dụng trên web, đó là **XSS** ( **cross**- **s** ite **s** cripting, ký hiệu X thay cho C để tránh nhầm lẫn với CSS [😀](https://emojipedia.org/grinning-face/)). XSS là khi kẻ xấu nhúng code Javascript vào trong code phía client của bạn.

Bạn có thể nghĩ rằng: _"Nhúng code Javascript vào thì làm được gì? Thay đổi màu chữ từ đỏ sang xanh? ..."_

Giả sử một ai đó nhúng được code Javascript vào website mà bạn đang truy cập. Khi đó họ có thể:

- Giả dạng bạn để thực hiện một HTTP request.
- Nhúng 1 iframe trông như 1 phần website và yêu cầu bạn nhập mật khẩu rồi gửi request đến server của hacker.
- Chèn hoặc sửa một đường dẫn trên website gốc, dẫn đến một website giả mạo với giao diện giống hệt website gốc để thực hiện hành vi lừa đảo (ví dụ yêu cầu đăng nhập, yêu cầu nhập thông tin tài khoản, ...)

... và muôn vàn khả năng khác.

![hacker](https://media.giphy.com/media/3rgXBOmTlzyFCURutG/giphy.gif)

**CSP** sẽ cố gắng ngăn chặn điều này ngay từ đầu bằng cách giới hạn:

- Cái gì có thể được phép mở trong một iframe.
- Style nào có thể được tải.
- Request có thể được thực hiện ở đâu.
- ...

### Vậy nó hoạt động như nào?

Khi bạn bấm vào một đường link hoặc gõ địa chỉ website trên trình duyệt thì trình duyệt sẽ thực hiện một GET request. Và server sẽ trả về HTML kèm theo một vài HTTP headers. Nếu bạn muốn biết mình nhận được header như nào thì hãy bật tab Network trong DevTools và truy cập thử một website. Bạn có thể sẽ thấy một response header như sau:

```html
content-security-policy: default-src * data: blob:; script-src *.facebook.com
*.fbcdn.net *.facebook.net *.google-analytics.com *.virtualearth.net
*.google.com 127.0.0.1:* *.spotilocal.com:* 'unsafe-inline' 'unsafe-eval'
*.atlassolutions.com blob: data: 'self'; style-src data: blob: 'unsafe-inline'
*; connect-src *.facebook.com facebook.com *.fbcdn.net *.facebook.net
*.spotilocal.com:* wss://*.facebook.com:* https://fb.scanandcleanlocal.com:*
*.atlassolutions.com attachment.fbsbx.com ws://localhost:* blob:
*.cdninstagram.com 'self' chrome-extension://boadgeojelhgndaghljhdicfkmllpafd
chrome-extension://dliochdbjfkdbacpmhlcpmleaejidimm;
```

Đó là chính sách bảo mật nội dung của Facebook. Tìm hiểu chi tiết hơn các directives (chỉ thị):

- **default-src**: Hạn chế tất cả các CSP directive mà không được liệt kê rõ ràng.

- **script-src**: Giới hạn những script có thể được load.

- **style-src**: Giới hạn những style có thể được load.

- **connect-src**: Giới hạn những URL nào có thể được load sử dụng script như fetch, XHR, ajax, ...

Có nhiều CSP directive khác nữa ngoài 4 cái ở trên. Trình duyệt sẽ đọc CSP header và áp dụng toàn bộ những directive đó cho mọi thứ trên trang HTML.

## HTTPS hay HTTP Secure

Chắc chắn bạn đã từng nghe nói đến HTTPS. Có thể bạn nghe nói rằng Chrome sẽ đánh dấu trang web của bạn là không an toàn (insecure) nếu nó không có HTTPS.

Về bản chất thì HTTPS khá đơn giản. HTTPS thì được mã hóa còn HTTP thì không.

Vậy cái này thì có liên quan gì nếu như bạn không gửi những dữ liệu nhạy cảm? Hãy cùng tìm hiểu thêm về một thuật ngữ khác: **MITM** ( **M** an **i** n **t** he **M** iddle).

Nếu bạn đang sử dụng Wi-Fi công cộng (không đặt mật khẩu) ở một quán cà phê, một ai đó có thể dễ dàng bắt được request của bạn. Nếu dữ liệu của bạn không được mã hóa, họ có thể đọc được làm bất cứ thứ gì họ muốn. Họ có thể chỉnh sửa HTML, CSS hoặc Javascript trước khi trình duyệt của bạn nhận được dữ liệu. Tương tự như XSS ở trên, bạn có thể hình dung được hacker có thể làm được những gì.

Sử dụng HTTPS thì mọi dữ liệu truyền và nhận giữa máy tính của bạn và server đều được mã hóa khiến cho hacker không thể đọc hay chỉnh sửa tùy ý được.

## HTTP Strict-Transport-Security (HSTS)

Tiếp tục sử dụng Facebook header làm ví dụ:

```html
strict-transport-security: max-age=15552000; preload
```

Header trên chỉ áp dụng nếu bạn truy cập trang sử dụng HTTPS:

- max-age: Chỉ định thời gian trình duyệt ghi nhớ để bắt buộc người dùng truy cập website bằng HTTPS.
- preload: Không quan trọng lắm với mục đích của chúng ta, nó là một dịch vụ được host bởi Google.

Giả sử bạn truy cập trang Facebook lần đầu tiên và bạn biết HTTPS an toàn hơn HTTP nên bạn truy cập qua HTTPS. Khi trình duyệt nhận được header trên nó sẽ ghi nhớ chuyển hướng những request sau này của bạn về HTTPS. Một tháng sau có ai đó gửi cho bạn một link đến Facebook sử dụng HTTP và bạn bấm vào nó. Do 1 tháng thì nhỏ hơn 15552000 giây (giá trị của max-age) nên trình duyệt sẽ gửi request dưới dạng HTTPS để tránh tấn công MITM.

## Tổng kết

Bảo mật web rất quan trọng bất kể bạn làm ở vị trí nào trong mảng phát triển web. Bạn càng tiếp xúc, càng tìm hiểu nó kỹ hơn thì bạn càng có lợi.

Bảo mật nên là thứ quan trọng với tất cả mọi người chứ không chỉ riêng những chuyên gia bảo mật 👮.

![security](https://media.giphy.com/media/81xwEHX23zhvy/giphy.gif)

_Nguồn: [https://medium.freecodecamp.org/a-quick-introduction-to-web-security-f90beaf4dd41](https://medium.freecodecamp.org/a-quick-introduction-to-web-security-f90beaf4dd41)_
