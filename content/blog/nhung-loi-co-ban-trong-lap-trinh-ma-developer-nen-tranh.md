---
title: "Những lỗi cơ bản trong lập trình mà developer nên tránh"
date: 2020-01-10
draft: false
tags: ["Programming"]
---

Không lập trình viên nào code mà không có bug. Tuy nhiên có rất nhiều lỗi cơ bản chúng ta nên tránh để tạo ra ít bug hơn, code sạch và trong sáng hơn, dễ bảo trì hơn, đỡ bị ăn chửi hơn, …

## 1. Xử lý quá nhiều thứ trong một function

Theo nguyên tắc [Single Responsibility](https://en.wikipedia.org/wiki/Single_responsibility_principle), một function chỉ nên thực hiện một và chỉ một nhiệm vụ duy nhất. Nhiều lập trình viên hay viết một function vừa lấy dữ liệu, xử lý dữ liệu và hiển thị dữ liệu. Thay vì như vậy, hãy chia nhỏ function này ra làm 3 function: Function lấy dữ liệu, function xử lý dữ liệu và function hiển thị dữ liệu.

Việc giữ một function chỉ tập trung thực hiện một nhiệm vụ sẽ giúp code dễ đọc và dễ bảo trì hơn. Như ví dụ trên, giả sử API để lấy dữ liệu bị thay đổi thì ta chỉ cần cập nhật lại function lấy dữ liệu, không bị ảnh hưởng đến các thao tác ở sau.

## 2. Code bị comment

Trong một ứng dụng lớn có nhiều lập trình viên tham gia, nhiều khi bạn sẽ thấy có các hàm, các đoạn code lớn bị comment. Bạn sẽ không hiểu đoạn code bị comment này để làm gì, ý đồ của tác giả là gì. Các lập trình viên khác có thể sẽ không dám xoá đoạn code này vì có thể tác giả của đoạn comment còn cần đến nó.

Nếu gặp trường hợp như vậy và project có sử dụng hệ thống quản lý code như git, svn, … thì hãy mạnh dạn xoá đoạn code này đi, code sẽ trở nên sạch đẹp hơn. Còn sau này nếu tác giả của đoạn code đó muốn tìm lại thì họ sẽ phải tự tìm trong các commit cũ.

## 3. Đặt tên biến, tên hàm không rõ ràng

Đặt tên biến là một công việc khó nhưng cũng rất quan trọng. Một tên biến rõ ràng sẽ giúp việc đọc code trở nên dễ dàng, dễ hiểu.

Hãy đặt tên biến mô tả đúng chức năng, ý nghĩa của nó, dài một chút cũng được. Tránh đặt tên biến kiểu viết tắt (trừ trường hợp phổ biến hoặc đã thống nhất từ trước) hoặc tên biến không có ý nghĩa như a, b, c, …

## 4. Magic number và string

Magic number và string là các giá trị duy nhất được sử dụng nhiều lần trong ứng dụng mà không có giải thích ý nghĩa rõ ràng. Những giá trị này hoàn toàn có thể thay thế bằng các biến (với điều kiện biến phải được đặt tên một cách rõ ràng).

Ví dụ với đoạn code sau:

```php
for ($i = 1; $i <= 52; $i++) {
    ...
}
```

Trong ví dụ trên thì 52 là một **magic number**, và người đọc code sẽ không hiểu được 52 có ý nghĩa là gì. Thậm chí kể cả tác giả đoạn code, sau một thời gian quay lại đọc code của mình cũng không hiểu, phải dò lại toàn bộ chương trình.

Đoạn code trên có thể viết lại như sau:

```php
$cardDeckSize = 52;
for ($i = 1; $i <= $cardDeckSize; $i++) {
    ...
}
```

Như vậy đọc đoạn code này sẽ hiểu ngay là đang thực hiện một vòng lặp qua từng quân bài trong bộ bài và 52 có nghĩa là số lá bài trong bộ bài. Ở các phần bên dưới cũng có thể dùng lại biến _$cardDeckSize_ và khi cần thay đổi giá trị số lượng lá bài trong bộ bài ta cũng chỉ cần thay đổi giá trị của biến này một lần duy nhất thay vì phải sửa nhiều chỗ.

Tương tự với number, chúng ta cũng có **magic string**:

```php
if (userPasswordIsValid($user, "6yP4cZ".$password)) {
    ...
}
```

Thay vì viết như trên ta viết lại:

```php
$salt = "6yP4cZ";
if (userPasswordIsValid($user, $salt.$password)) {
    ...
}
```

và code sẽ trở nên dễ hiểu hơn.

## 5. Code format lộn xộn

Với những lập trình viên không có kinh nghiệm và cẩu thả thì họ sẽ viết code lộn xộn, không có format. Code không format sẽ rất khó đọc và dễ dẫn đến code sai cú pháp và rất khó debug. Ví dụ như code HTML có thẻ mở mà không có thẻ đóng dẫn đến sai cấu trúc code làm hỏng cả CSS, lỗi này cũng khó debug vì dù code sai thì cũng sẽ không báo lỗi lên trình duyệt.

Đa số các IDE hoặc code editor hiện đại đều có hỗ trợ chức năng format code theo từng ngôn ngữ, hoặc là người dùng chủ động cài thêm các plugin, extension hỗ trợ cho việc format code. Trong một project nếu các lập trình viên dùng chung một chuẩn format code cũng sẽ giúp code đồng bộ và ít bị xung đột.

## 6. Hard code

Hard code là nhập dữ liệu trực tiếp vào trong source code, dữ liệu này bị fix cứng và không thay đổi, cấu hình được.

Trong một số trường hợp chúng ta vẫn dùng hard code, tuy nhiên nếu code của bạn bị hard code quá nhiều tức là đang có vấn đề. Thay vì hard code dữ liệu trong source code, hãy tách chúng ra bằng cách lấy dữ liệu qua file cấu hình, lấy từ cơ sở dữ liệu hoặc API, hay qua biến môi trường, …

_Bài viết được biên dịch lại từ [medium.com](https://medium.com/better-programming/common-coding-mistakes-you-should-avoid-441f9e51faea)._
