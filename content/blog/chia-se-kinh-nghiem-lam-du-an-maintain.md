---
title: 'Chia sẻ kinh nghiệm làm dự án maintain'
date: 2024-05-26
draft: false
tags: ['Programming', 'AI']
---

Đã là lập trình viên thì chắc bạn sẽ không thể tránh khỏi phải làm các dự án maintain (bảo trì dự án, fix bug, ...), chỉ là sớm hay muộn 😅

Thực tế thì mình hay làm sản phẩm mới hơn, kinh nghiệm làm dự án maintain cũng không nhiều. Nhưng trong quá trình làm các dự án kiểu này mình cũng có đúc kết được một vài kinh nghiệm, liệt kê ra đây để cho anh chị em nào mới join các dự án dạng này đỡ bỡ ngỡ.

Về đặc điểm chung thì các dự án maintain thường là:

- Các dự án đang hoạt động, có thể đã chạy được 1 thời gian khá lâu (thường là khoảng vài năm). Với tốc độ phát triển công nghệ như hiện nay thì thường các dự án kiểu này sẽ bị _out date_, sử dụng những công nghệ hơi cũ (thậm chí có cả công nghệ đã bị khai tử).
- Đa số công việc của người bảo trì là fix bug hoặc cải thiện hiệu suất, cũng có thêm tính năng mới nhưng ít. Thường là fix bug của người khác, nhưng cũng có khi là fix bug của chính mình 😂
- Nếu là dự án lớn thì các quy trình từ tiếp nhận yêu cầu đến trao đổi, fix bug, release, ... sẽ khá rườm rà.
- Có những dự án không có tài liệu đầy đủ. Nếu người bảo trì không phải người phát triển dự án từ đầu thì sẽ không nắm hết được chức năng, business logic, ...

Dựa vào những đặc điểm trên thì có thể rút ra một số kinh nghiệm:

### 1. Sửa code ít nhất

Code nhiều thì lỗi nhiều, code ít thì lỗi ít. Cho nên cố gắng sửa code ít nhất có thể, vừa dễ review, mà lỡ có sai lầm thì cũng dễ revert.

Tuy nhiên cũng cần chú ý nếu bạn sửa vào 1 function mà được gọi ở nhiều chỗ khác thì phải thật cẩn thận. Nên search trong toàn bộ project xem function đó được gọi ở những đâu, nếu sửa sẽ gây ảnh hưởng gì. Hoặc một cách khác an toàn hơn đó là duplicate function đó ra một function mới để tránh ảnh hưởng đến các chỗ khác.

### 2. Code theo convention có sẵn, structure có sẵn

Để đảm bảo tính nhất quán thì hãy code theo structure, convention có sẵn của project, dù nó có vẻ không được _tối ưu_ theo góc nhìn của bạn. Tính nhất quán sẽ giúp code dễ đọc và dễ bảo trì hơn.

Nếu project có file README thì làm theo file README. Nếu không có file README thì nên dành thời gian xem qua 1 lượt code có sẵn và code theo. Người ta đặt tên file theo PascalCase thì mình cũng đặt PascalCase chứ đừng camelCase theo thói quen (cái này áp dụng cho cả các project mới chứ không chỉ các project maintain).

Trong trường hợp nếu thấy có chỗ bất hợp lý và cần cải tiến thì phải trao đổi và thống nhất với leader và các thành viên khác chứ không tự làm theo ý mình.

### 3. Hạn chế format code, đặc biệt là code HTML

Với những người bị OCD thì nhìn thấy code không format sẽ cực kỳ khó chịu. Tuy nhiên nếu format code thì sẽ vi phạm quy tắc số 1, vì nó sẽ làm code bị sửa đổi nhiều, gây khó khăn cho reviewer và khó revert code. Chưa kể trong 1 số trường hợp (hiếm) format code cũng có thể gây ra lỗi.
Đặc biệt với code HTML, khi format code sẽ dẫn đến code thay đổi rất nhiều, và có thể có 1 số lỗi phát sinh do liên quan đến khoảng trắng (ví dụ như ký tự xuống dòng, hoặc là dùng thẻ pre, character entities, ...).

![HTML pre tag](/images/pre-tag.jpg)

Do đó nếu format code hãy tuân thủ theo rule của project, và chỉ nên format các đoạn code liên quan đến code mình sửa, tránh format toàn bộ file.

**Note**: Nếu là một dự án mới code từ đầu thì nên format toàn bộ file, thậm chí toàn bộ project luôn, để code vừa sạch đẹp vừa dễ đọc và đỡ khổ cho maintainer.

### 4. Tận dụng những thứ có sẵn

Trước khi code một đoạn logic nào mới thì hãy thử tìm 1 lượt trong project xem đã có code sẵn hay chưa. Thường thì project sẽ có các thư mục dạng helpers, ultils, functions, ... chứa các code logic chung được dùng ở nhiều nơi trong project.
Hoặc bạn cũng có thể xem code ở các màn hình có chức năng tương tự với chức năng mình đang làm, vì nó có thể có sẵn các code logic tương tự rồi.

Nếu tìm thấy code có sẵn thì có thể tận dụng luôn, đỡ tốn công viết lại mất thời gian và bị dư thừa code. Và những code này đã dược dùng ở các màn hình khác rồi thì có thể yên tâm mà sử dụng. Nếu chẳng may code đó mà có lỗi thì những chỗ khác đang dùng nó cũng sẽ lỗi, đằng nào cũng phải fix 😂.

![Reinvent the wheel](/images/reinvent-the-wheel.png)

Trong trường hợp bạn tìm thấy 1 function có sẵn, nhưng nó chỉ đáp ứng được 80-90% yêu cầu của bạn, cần phải custom lại. Thì có thể có 2 phương án:

- Nếu code đơn giản, thì chỉ cần bổ sung thêm tham số, xử lý trường hợp nếu gọi hàm mà không truyền tham số này (default value). Sau đó search trong toàn bộ project những chỗ đang dùng để test lại cho chắc.
- Nếu code phức tạp thì clone ra một function mới cho an toàn, để ngay bên cạnh function cũ, chấp nhận duplicate code, miễn là giải quyết được vấn đề.

### 5. Không optimize code nếu không cần thiết

Trừ khi bug của bạn là bug yêu cầu optimize, nếu không thì không nên optimize lại những đoạn code đang chạy mà không bị lỗi. Có thể nó hơi chậm 1 tí, nhưng không ảnh hưởng mấy và người dùng không phàn nàn thì tốt nhất nên để nguyên. Kẻo lại vừa tốn công, lại vừa _"chữa lợn lành thành lợn què"_.

### 6. Kiểm thử kỹ trước khi tạo pull request để merge code

Dĩ nhiên là trước khi tạo pull request phải test lại xem còn bug không. Nhưng đừng chỉ test các _happy case_ (trường hợp được mô tả trong bug), mà hãy test thêm các trường hợp mà bạn có thể nghĩ ra. Những dev có kinh nghiệm sẽ có cái nhìn rộng hơn và phát hiện được nhiều trường hợp gây bug hơn, nhiều _edge case_ hơn. Mà sớm muộn đằng nào cũng phải fix, mình tìm ra và fix được thì sẽ tốt hơn là đợi tester hoặc client phát hiện ra rồi bắt mình fix 😎

### 7. Tránh tiện tay fix bug liên quan

Bug liên quan ở đây không phải là _edge case_ của bug mình đang fix, mà có thể là bug trong cùng một màn hình, hoặc trong cùng một chuỗi thao tác của user. Ví dụ như mình fix bug ở màn hình Create và phát hiện thấy bug ở màn hình Edit.

Trường hợp này nên báo lại với Project Manager hoặc Leader chứ không tiện tay fix luôn vào bug đang fix. Vì nó có thể làm tăng phạm vi của bug, gây khó khăn trong việc quản lý, và giống như mình đang "mua thêm việc".

### 8. Cần đọc hiểu code logic, business logic trước khi sửa

Cái này thì chắc chắn rồi. Tuy nhiên mình vẫn gặp một số trường hợp có dev chỉ `fix cho nó chạy được` (đúng với test case), chứ không hiểu hết toàn bộ code logic liên quan, dẫn đến phát sinh thêm bug khác.

### 9. Chỗ nào không hiểu thì phải hỏi

Muốn biết phải hỏi, muốn giỏi phải học. Hỏi tất cả những bên liên quan nếu có thể (BA, QA, design, dev cũ, dev mới, ...).
Có nhiều dự án sẽ không đủ tài liệu (thậm chí có dự án không có luôn), nên nhiều chỗ mình sẽ không hiểu (thường là về nghiệp vụ). Mà đã không hiểu thì không nên sửa, vì có thể sửa xong chỗ này nó lại tạo ra bug chỗ khác.

Ngoài ra, trong quá trình fix bug sẽ có thể gặp bug khó, hoặc code logic khó hiểu. Lúc này hãy mạnh dạn nhờ sự trợ giúp của đồng nghiệp (cùng hoặc kể cả khác dự án). Có thể họ đã từng fix bug tương tự, hoặc họ giỏi hơn mình, đưa ra được hướng giải quyết tốt, như vậy sẽ tiết kiệm được nhiều thời gian. Tuy nhiên không phải cái gì cũng hỏi, phải tự bỏ công ra nghiên cứu trước, để tránh làm mất thời gian của người khác.

### 10. Sử dụng AI

Hiện nay có rất nhiều AI hỗ trợ cho việc lập trình. Hãy tận dụng chúng để giúp công việc trở nên dễ dàng hơn. Từ việc search tài liệu, hỏi giải pháp cho đến thực hiện những thao tác lặp đi lặp lại, ... thì AI đều có thể làm rất tốt, giúp tiết kiệm rất nhiều công sức.
Bạn cũng có thể sử dụng AI để verify code xem có bug tiềm tàng không, hoặc thậm chí là tối ưu code. Tất nhiên AI không phải lúc nào cũng đúng nên cần tự kiểm tra lại thật kỹ, nhiều khi AI cũng bịa code như thật 😂

Một số AI bạn có thể dùng free (và nâng cấp lên bản trả phí xịn hơn) như:

- {{< link link="https://chat.openai.com/" text="ChatGPT" >}}, {{< link link="https://claude.ai/" text="Claude" >}}, {{< link link="https://gemini.google.com/" text="Gemini" >}}: Hỏi đáp, tra cứu trên web.
- Codeium, Cody AI: VS Code extension, hỗ trợ gợi ý code hoặc hỏi đáp ngay trên VS Code.

{{< video src="https://exafunction.github.io/public/videos/demos/copilot_sentiment.mp4" >}}

---

Hy vọng những kinh nghiệm ở trên sẽ giúp bạn phần nào trong công việc.

Happy coding 😎
