---
title: 'Starbucks không sử dụng Two-Phase Commit'
date: 2018-10-20
draft: false
tags: ['Design Pattern', 'English Translated']
---

Tôi vừa trở về sau một chuyến du lịch 2 tuần đến Nhật Bản.

Một trong những hình ảnh quen thuộc ở đây đó là số lượng lớn các cửa hàng cà phê Starbucks, đặc biệt là quanh khu vực Shinjuku và Roppongi. Trong khi chờ đợi một tách ca cao nóng, tôi đã nghĩ về cách thức mà Starbucks phục vụ khách hàng.

![Starbucks](/images/starbuck.jpg)

Starbucks cũng như hầu hết các công ty khác thì đều muốn tối đa số lượng khách hàng có thể phục vụ. Càng đông khách thì lợi nhuận càng cao. Do đó họ đã sử dụng _quy trình bất đồng bộ_ (asynchronous processing).

Khi bạn yêu cầu đồ uống, nhân viên thu ngân sẽ đánh dấu một chiếc cốc với đơn hàng của bạn và đưa nó vào một hàng đợi (queue). Hàng đợi chỉ đơn giản là một dãy những chiếc cốc xếp hàng và chuyển sang cho thợ pha cà phê. Bằng cách này, nhân viên thu ngân sẽ có thể tiếp tục nhận thêm đơn hàng kể cả khi đơn hàng cũ chưa xử lý xong. Trong trường hợp cửa hàng quá đông khách, họ có thể áp dụng kịch bản {{< link link="https://www.enterpriseintegrationpatterns.com/patterns/messaging/CompetingConsumers.html" text="Competing Consumer" >}} để phục vụ khách tốt hơn: Vẫn chỉ một nhân viên thu ngân nhưng thuê nhiều nhân viên pha cà phê.

![Competing consumer](/images/competing-consumers.gif)

## Correlation problem

Giải quyết vấn đề theo cách bất đồng bộ mang lại cho Starbucks nhiều lợi ích, tuy nhiên đi kèm với nó cũng có khá nhiều vấn đề cần giải quyết.

Ví dụ về vấn đề liên hệ (correlation problem) như đồ uống không hoàn thành theo đúng thứ tự như khi khách hàng yêu cầu. Điều này có thể xảy ra khi:

- Các nhân viên pha cà phê khi pha chế sử dụng các công cụ khác nhau. Pha chế đồ uống hỗn hợp có thể lâu hơn là cà phê.
- Nhân viên pha cà phê cũng có thể thực hiện cùng một lúc các công việc giống nhau trước để tối ưu thời gian pha chế.

Kết quả là đồ uống khi pha chế xong sẽ được mang ra cho khách không theo thứ tự và **cần phải mang đến đúng vị khách** đã yêu cầu đồ uống.

Starbucks giải quyết vấn đề này theo một _pattern_ được sử dụng trong kiến trúc _messaging_: {{< link link="https://www.enterpriseintegrationpatterns.com/patterns/messaging/CorrelationIdentifier.html" text="Correlation Identifier" >}}. Ở Mỹ, hầu hết các cửa hàng Starbucks sẽ xử lý vấn đề này bằng cách viết tên bạn lên cốc và gọi lên khi đồ uống hoàn thành. Ở những quốc gia khác, bạn sẽ phải liên hệ bằng loại đồ uống (ví dụ như nâu đá, americano, ...).

![CorrelationIdentifier Solution](/images/correlationIdentifier-solution.gif)

## Exception Handling

Xử lý ngoại lệ (exception handling) trong môi trường *asynchronous messaging* có thể khá là khó. Hãy cùng xem Starbucks giải quyết các trường hợp ngoại lệ như nào.

- Khi khách hàng không thể trả tiền, họ sẽ vứt bỏ đồ uống nếu nó đã được pha chế hoặc nếu không thì họ sẽ loại bỏ nó ra khỏi _hàng đợi_.
- Nếu họ mang cho khách hàng một đồ uống không phù hợp hay có vấn đề thì họ sẽ làm lại nó.
- Nếu như máy pha cà phê bị hỏng và họ không thể pha chế được đồ uống thì họ sẽ trả lại tiền cho khách hàng..

Mỗi một ví dụ trên miêu tả cho một cách xử lý ngoại lệ phổ biến:

- **Write-off**: Cách đơn giản nhất đó là không làm gì hoặc loại bỏ hết những cái vừa làm. Nghe có vẻ không phải là một cách hay, tuy nhiên trong thực tế thì lựa chọn này có thể chấp nhận được. Nếu như mất mát là nhỏ thì việc xây dựng một giải pháp xử lý ngoại lệ còn tốn kém hơn là bỏ qua nó. Ví dụ như tôi đã từng làm việc cho một số nhà cung cấp dịch vụ Internet mà áp dụng cách giải quyết này cho các lỗi xảy ra ở chu trình thanh toán và cung cấp dịch vụ. Một số khách hàng có thể sử dụng dịch vụ khi chưa thực hiện xong thanh toán. Doanh thu mất đi đủ nhỏ để cho phép nghiệp vụ vận hành bình thường và cứ sau một khoảng thời gian định kỳ họ sẽ thống kê lại những tài khoản chưa thực hiện thanh toán để ngắt dịch vụ.
- **Retry**: Khi có một số hành động trong một nhóm các hành động (ví dụ transaction) bị thất bại, chúng ta sẽ có 2 lựa chọn là *undo* những cái thành công hoặc _retry_ những cái thất bại. Retry (thực hiện lại hành động) là một lựa chọn tốt nếu như có khả năng retry thành công. Ví dụ như xung đột nghiệp vụ thì retry có thể sẽ không thành công nhưng nếu là do một hệ thống bên ngoài tạm thời không đáp ứng thì retry có thể thành công. Một ví dụ điển hình là {{< link link="https://www.enterpriseintegrationpatterns.com/patterns/messaging/IdempotentReceiver.html" text="Idempotent Receiver" >}}, trong trường hợp này chúng ta có thể đơn giản retry lại tất cả hành động vì receivers thành công sẽ bỏ qua các message trùng lặp.
- **Compensating Action**: Lựa chọn cuối cùng đó là _undo_ lại những hành động đã hoàn thành để đưa hệ thống trở lại trạng thái trước đó. Cách này sẽ hoạt động tốt trong các hệ thống tài chính, chúng ta có thể cộng bù lại những khoản tiền đã bị trừ đi trước đó.

![Compensating action](/images/compensating-action.png)

Tất cả các cách giải quyết trên đều khác với phương pháp {{< link link="https://en.wikipedia.org/wiki/Two-phase_commit_protocol" text="Two-phase commit" >}} mà dựa trên các bước riêng biệt là prepare và execute. Trong ví dụ của Starbucks, Two-phase commit tương đương với việc khách hàng chờ ở quầy thanh toán cho đến khi đồ uống được pha chế xong, sau đó khách hàng trả tiền và nhận đồ uống + biên lai thanh toán. Cả nhân viên thu ngân lẫn khách hàng đều không thể rời đi cho đến khi giao dịch hoàn tất. Sử dụng Two-phase commit có thể khiến Starbucks phá sản bởi vì số lượng khách hàng mà họ có thể phục vụ trong một khoảng thời gian là quá thấp.

Cần chú ý rằng Two-phase commit có thể làm ảnh hưởng đến cách hoạt động tự do của message (và cả khả năng mở rộng) bởi vì nó phải duy trì trạng thái của các tài nguyên trong giao dịch qua các hành động bất đồng bộ.

## Conversations

Sự tương tác trong quán cà phê là một ví dụ tốt của một pattern đơn giản nhưng phổ biến: {{< link link="https://www.enterpriseintegrationpatterns.com/ramblings/09_correlation.html" text="Conversation pattern" >}}.

![Conversations messaging](/images/conversations-messaging.png)

Sự tương tác giữa hai bên (quán cà phê và khách hàng) có chứa một tương tác ngắn đồng bộ (gọi nước và trả tiền) và một tương tác dài bất đồng bộ (pha chế và nhận đồ uống). Loại tương tác này khá bổ biến trong các kịch bản mua bán.

Ví dụ khi đặt một đơn hàng trên Amazon, tương tác ngắn đồng bộ gán một mã đơn hàng và tất cả các bước tiếp theo (trừ tiền trong thẻ, đóng gói hàng, vận chuyển, ...) thì được thực hiện bất đồng bộ. Bạn được thông báo qua email khi các bước bổ sung hoàn thành. Nếu có bất kỳ vấn đề sai nào xảy ra, Amazon thường sẽ bồi thường (qua credit card) hoặc thử lại (gửi lại các sản phẩm bị mất).

Tóm lại chúng ta có thể thấy rằng thế giới thực thường là bất đồng bộ. Cuộc sống hàng ngày của chúng ta có nhiều tương tác bất đồng bộ. Nó có nghĩa là kiến trúc truyền tin bất đồng bộ có thể là một cách tự nhiên để thực thể hóa những tương tác này. Nó cũng có nghĩa là chúng ta nhìn vào các ví dụ trong cuộc sống hàng ngày để thiết kế ra những giải pháp hợp lý.

Domo arigato gozaimasu! (xin cảm ơn rất nhiều)

_Bài viết được dịch từ một chương trong sách {{< link link="https://www.enterpriseintegrationpatterns.com/ramblings/18_starbucks.html" text="The best software writting I" >}}, tác giả {{< link link="https://www.enterpriseintegrationpatterns.com/gregor.html" text="Gregor&nbsp;Hohpe" >}}._
