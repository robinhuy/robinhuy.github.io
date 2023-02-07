---
title: "Hướng dẫn tạo tài khoản và sử dụng ChatGPT chỉ với 1 cốc trà đá"
date: 2023-02-01
draft: false
images: ["/images/chat-gpt.jpg"]
tags: ["AI", "OpenAI", "ChatGPT"]
---

Dạo này ChatGPT đang rất hot, được thần thành hóa lên quá khiến nhiều người lo sợ nó sẽ "cướp" mất công việc của mình. Vậy ChatGPT cụ thể là gì, dùng như nào?

![ChatGPT là gì?](/images/chat-gpt-la-gi.png)

Bài viết này mình sẽ hướng dẫn các bạn tự tạo tài khoản cho riêng mình và trải nghiệm thử ChatGPT, một công cụ khá hữu ích nếu bạn sử dụng đúng cách. Còn nếu muốn trải nghiệm nhanh thì các bạn có thể kéo xuống cuối bài viết để lấy một số tài khoản free được chia sẻ trên mạng (dùng chung cho nhiều người).

## Tạo tài khoản ChatGPT

**Tóm tắt các bước**:
1. *Đăng ký tài khoản ChatGPT (dùng VPN).*
2. *Thuê 1 số điện thoại nước ngoài để nhận SMS OTP.*
3. *Nhập OTP để xác thực số điện thoại.*
4. *Đăng nhập và sử dụng: {{< link link="https://chat.openai.com/" text="https://chat.openai.com" >}}.*

Hiện tại ChatGPT không cho phép tạo tài khoản ở Việt Nam, do đó để tạo được tài khoản thì chúng ta sẽ cần đổi địa chỉ IP (chỉ cần đổi khi tạo tài khoản). Các bạn có thể dùng các extension VPN free, ví dụ trên Chrome thì mình dùng {{< link link="https://chrome.google.com/webstore/detail/free-vpn-for-chrome-vpn-p/majdfhpaihoncoakbjgbdhglocklcgno" text="Extension VeePN" >}}. Đơn giản chỉ việc cài extension lên và chọn location, sau đó bật lên để đổi địa chỉ IP sang location vừa chọn.

{{< figure src="/images/su-dung-veepn.png" alt="Sử dụng Veepn" title="Ví dụ đổi location sang Netherlands" >}}

Sau khi bật VPN thì chúng ta sẽ truy cập vào {{< link link="https://platform.openai.com/signup" text="https://platform.openai.com" >}} để tạo tài khoản (dùng email của bạn để tạo tài khoản chứ không dùng chức năng login với Google nhé).

Tạo tài khoản xong, bạn vào email để lấy link kích hoạt. Bấm vào link kích hoạt ở email sẽ hiện ra trang nhập tên, nhập tên xong thì cần xác thực số điện thoại. Đến bước này chúng ta sẽ cần một số điện thoại nước ngoài để nhận OTP. Có nhiều dịch vụ cho thuê số điện thoại hoặc nhận SMS online. Ở đây mình dùng dịch vụ của {{< link link="https://sms-activate.org/" text="https://sms-activate.org" >}} vì giá rẻ (chỉ khoảng 3k VNĐ 1 số điện thoại) và dễ sử dụng (nếu đọc bài viết này 😂).

Các bạn đăng ký tài khoản trên {{< link link="https://sms-activate.org/" text="https://sms-activate.org" >}}, sau đó vào nạp tiền (nạp mức tối thiểu là được). Trang này hỗ trợ khá nhiều phương thức thanh toán (có cả crypto), mình thì sử dụng thẻ Visa và thanh toán qua cổng Stripe.

{{< figure src="/images/sms-activate-nap-tien-vao-tai-khoan.png" alt="Nạp tiền vào tài khoản sms-activate.org" title="Chọn Top up balance để nạp tiền vào tài khoản" >}}

{{< figure src="/images/sms-activate-chon-phuong-thuc-thanh-toan.png" alt="Chọn phương thức thanh toán trên sms-activate.org" title="Chọn phương thức thanh toán phù hợp để nạp tiền" >}}

Sau khi nạp tiền xong, chúng ta sẽ thuê một số điện thoại để nhận OTP. Các bạn chỉ cần nạp một số tiền bằng mức tối thiểu của phương thức thanh toán mà mình chọn là đủ, hoặc nạp hẳn **1$** đăng ký tài khoản cho bạn bè luôn. Chọn dịch vụ `OpenAI` bên trái và chọn một quốc gia để thuê số điện thoại. Chú ý quốc gia nào có `0 pcs` tức là hết số điện thoại, còn số bên cạnh là giá tiền, trung bình vào khoảng 10 Rub 1 số điện thoại (khoảng 3000 VNĐ, bằng giá tiền 1 cốc trà đá 😁).

{{< figure src="/images/sms-activate-chon-dich-vu-open-ai.png" alt="Chọn dịch vụ OpenAI trên sms-activate.org" title="Chọn dịch vụ OpenAI" >}}

{{< figure src="/images/sms-activate-thue-so-dien-thoai.png" alt="Thuê số điện thoại trên sms-activate.org" title="Thuê số điện thoại bằng cách bấm vào giỏ hàng bên cạnh quốc gia đó" >}}

Sau khi thuê xong 1 số điện thoại, chúng ta sẽ có 20 phút để nhận OTP. Nếu trong thời gian này chờ lâu mà không nhận được OTP thì có thể **cancel** (chữ X ở góc phải) để thuê số khác (không mất tiền).

{{< figure src="/images/sms-activate-nhan-sms-otp.png" alt="Nhận SMS từ số điện thoại trên sms-activate.org" title="Copy số điện thoại vừa thuê để xác thực tài khoản ChatGPT" >}}

Quay lại trang đăng ký tài khoản ChatGPT và nhập số điện thoại đã thuê để lấy OTP. 

{{< figure src="/images/chat-gpt-verify-phone-number.png" alt="ChatGPT verify phone number" title="Nhập số điện thoại đã thuê để nhận OTP (chú ý bỏ mã quốc gia ở đầu)" >}}

Chờ OTP gửi về thì copy và paste vào phần `Enter code` là hoàn tất việc đăng ký.

{{< figure src="/images/chat-gpt-enter-otp-code.png" alt="ChatGPT enter OTP code" title="Nhập mã OTP nhận được qua số điện thoại để xác thực" >}}

Đăng ký xong, phần mục đích sử dụng các bạn chọn `I'm exploring personal use` hoặc truy cập link này để sử dụng {{< link link="https://chat.openai.com/" text="https://chat.openai.com" >}} (lúc này có thể tắt VPN đi cho mạng đỡ chậm).

## Sử dụng ChatGPT

Sử dụng ChatGPT rất đơn giản, bạn chỉ cần nhập câu hỏi hoặc yêu cầu vào khung chat và chờ bot phản hồi. Có thể sử dụng Tiếng Anh hoặc Tiếng Việt đều được, nhưng Tiếng Anh sẽ ra kết quả chính xác hơn.

Ngoài ra bạn có thể lưu lại các đoạn chat này theo chủ đề, đặt tên cho nó để sau này xem lại (giống như lưu tài liệu vậy).

![Sử dụng ChatGPT](/images/su-dung-chat-gpt.png)

ChatGPT cũng có thể sử dụng như Google Search, khi search trên Google thì kết quả trả về sẽ mới hơn nhưng cũng nhiều hơn, dùng ChatGPT sẽ ra kết quả sau khi được chọn lọc nên trong một số trường hợp sẽ nhanh hơn search Google.

### Một số extension giúp bạn sử dụng ChatGPT tiện hơn

- {{< link link="https://chrome.google.com/webstore/detail/chatgpt-for-google/jgjaeacdkonaoafenlfkkkmbaopkbilf" text="ChatGPT for Google" >}}: Tích hợp ChatGPT vào Google search, khi search ngoài hiển thị kết quả từ Google còn hiển thị cả kết quả từ ChatGPT ở bên cạnh.
- {{< link link="https://chrome.google.com/webstore/detail/promptheus-converse-with/eipjdkbchadnamipponehljdnflolfki" text="Promptheus - Converse with ChatGPT" >}}: Thêm tính năng sử dụng giọng nói để chat thay vì gõ text.
- {{< link link="https://github.com/liady/ChatGPT-pdf" text="ChatGPT PDF" >}}: Export lịch sử ChatGPT thành file PNG, PDF hoặc tạo link chia sẻ (extension này cài bằng source code vì chưa có trên store).

### Chia sẻ tài khoản ChatGPT miễn phí

{{< link link="https://cutt.ly/chandat-chatGPT" text="https://cutt.ly/chandat-chatGPT" >}}
