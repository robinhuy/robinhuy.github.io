---
title: 'Chia sẻ kinh nghiệm làm dự án startup'
date: 2024-05-28
draft: true
tags: ['Programming', 'AI']
---

Bài viết chia sẻ một số kinh nghiệm về làm dự án start up công nghệ với vai trò là một lập trình viên (Dev). Còn nếu bạn muốn xem chia sẻ kinh nghiệm về làm các dự án maintain cho lập trình viên thì [xem ở đây](/blog/chia-se-kinh-nghiem-lam-du-an-maintain/) nhé.

Về đặc điểm chung thì các dự án startup thường là:
- Các dự án mới, nhiều khi ý tưởng chưa rõ ràng, requirement chưa đầy đủ.
- Có thể được lựa chọn công nghệ. Cũng có thể phải áp dụng nhiều công nghệ mới mà mình không biết, không quen thuộc.
- Bạn là lập trình viên nhưng có thể sẽ phải kiêm nhiệm thêm nhiều nhiệm vụ khác như BA, Design, Tester, ... 😂
- Thời gian là vàng, cần tung ra sản phẩm càng nhanh càng tốt. 

Dựa vào những đặc điểm trên thì có thể rút ra một số kinh nghiệm dành cho các lập trình viên:

### 1. Cần hiểu rõ sản phẩm

Nhiều khi chính PO/PM (Product Owner/Project Manager) hay BA (Business Analyst) cũng chưa rõ hết được chi tiết các chức năng của sản phẩm, mình cần chức năng gì, người dùng cần chức năng gì, ... Do đó, với vai trò của người trực tiếp làm ra sản phẩm (lập trình viên), chúng ta càng phải cố gắng tìm hiểu kỹ về sản phẩm. Nếu không thì khi làm sẽ như kiểu làm mò và không vừa ý của khách hàng, dẫn đến sẽ phải sửa đi sửa lại tốn nhiều thời gian. 

Giai đoạn đầu của startup hãy chủ động hỏi càng nhiều càng tốt, không ngại bị chê và không sợ bị mắng.
Ngoài ra trong quá trình làm sản phẩm chúng ta cũng có thể đưa ra những góp ý hữu ích cho sản phẩm để sản phẩm đi đúng hướng.

### 2. Cần có một code base tốt

Code base tốt sẽ giúp phát triển dự án nhanh hơn và dễ mở rộng hơn. Nếu bạn không có kinh nghiệm dựng code base hoặc không có kinh nghiệm làm nhiều dự án thì hãy để các Leader/Senior Dev dựng code base trước, rồi sau đó mới tham gia phát triển tính năng dựa trên code base đó.

Nếu không có code base tốt mà vừa làm vừa sửa, vừa bổ sung, thì sẽ tốn rất nhiều thời gian. Nhưng cũng đừng quá sa đà vào việc dựng code base, chỉ cần đủ dùng và có khả năng mở rộng, customize tốt là được.

### 3. Tìm Kiếm và Tận Dụng Tài Nguyên

Vì là startup nên thời gian là vàng. Hãy cố gắng tận dụng tất cả các công cụ, công nghệ giúp tăng năng suất và hiệu quả công việc.
Nếu một chức năng mà có thư viện sẵn thì hãy dùng thư viện luôn, đừng tự viết cho tốn thời gian. Cũng đừng ngại áp dụng các kỹ thuật mới, miễn là nó giúp bạn giải quyết được vấn đề. 

Khi làm startup sẽ có một điểm lợi là bạn thường sẽ được chủ động trong việc lựa chọn công nghệ. Cứ cái nào mới, phổ biến, cộng đồng sử dụng lớn thì mình chọn.

### 4. Linh hoạt và thích ứng nhanh

Để làm các dự án startup thì bạn phải linh hoạt, vì mọi thứ có thể thay đổi rất nhanh. Requirement có thể thay đổi liên tục từng ngày, hoặc là requirement không rõ ràng chi tiết mà cần bạn phải tự _"sáng tạo"_ dựa trên kinh nghiệm.

Nhiều khi mình vừa code xong 1 tính năng, hôm sau khách hàng lại muốn sửa sang kiểu khác, rồi hôm sau nữa lại sửa về như cũ ...
Do đó tất cả các thay đổi trong code nên được quản lý chặt chẽ bằng git, có tạo branch và commit message cẩn thận rõ ràng để có thể sẵn sàng rollback bất cứ lúc nào.

### 5. Chủ động trao đổi, làm việc nhóm

Hiếm có dự án startup nào mà bạn phải làm một mình cả. Thường thì khi làm startup bạn sẽ làm việc với một nhóm nhỏ. Vậy hãy tận dụng lợi thế nhóm nhỏ để phối hợp với nhau làm việc hiệu quả hơn.

Hãy chủ động trong việc trao đổi với team về task, requirement, review code, ... Nếu bạn là dev thì không chỉ trao đổi với dev mà với cả Design, BA, PM, PO, ... Thỏa thuận với họ để đưa ra được phương án tốt thay vì chỉ làm theo kiểu _"hoàn thành tốt việc được giao"_.
Ví dụ bạn gặp một task mà theo bạn là chưa cần thiết ở thời điểm hiện tại thì hãy trao đổi với Leader/PM để ưu tiên làm task khác cần thiết hơn thay vì được giao task nào thì cắm đầu vào làm task đó.

### 6. Biết quản lý thời gian và chủ động trong công việc

Khi làm việc trong môi trường startup, áp lực và khối lượng công việc có thể rất lớn. Bạn phải chạy đua với thời gian nên có thể OT sẽ xảy ra thường xuyên. Hãy biết cách quản lý thời gian và duy trì cân bằng giữa công việc và cuộc sống cá nhân. Cố gắng estimate task càng chính xác càng tốt, và thỏa thuận với Leader/PM để hạn chế OT.Sẵn sàng OT khi dự án cần nhưng không sẵn sàng OT đến chết 😂.

Bạn cũng cần chủ động tối đa trong công việc, đừng chỉ trông chờ làm đúng những task được giao. Khi hết task bạn có thể chủ động đề xuất task mới hoặc thời gian trống có thể tranh thủ review lại code cũ, optimize code, ... Dù sao thì nếu sau có phát sinh bug thì chính bạn là người phải fix.

### 7. Phát triển sản phẩm theo từng giai đoạn nhỏ

Thường thì các dự án startup hay sử dụng phương pháp phát triển Agile để chia dự án thành các giai đoạn nhỏ và có thể điều chỉnh dễ dàng. Nếu bạn chưa biết phương pháp này thì nên tìm hiểu trước khi tham gia các dự án startup.

Có một số dự án startup mình thấy PO/PM bị sa đà vào làm các tính năng mà quên mất tinh thần **Minimum Viable Product**. Rồi sau đó một thời gian lại cuống cuồng chuyển qua tập trung làm phần demo, có thể bỏ dở các tính năng đang phát triển. Lúc này nếu bạn là một dev có kinh nghiệm hãy trao đổi trực tiếp với PO/PM để họ đưa ra quyết định hợp lý hơn.

![What is a minimum viable product](/images/what-is-a-minimum-viable-product.jpg)

Với các dự án startup mà mình tham gia thì thời gian đầu nên tập trung vào việc phát triển các tính năng cốt lõi trước, bỏ bớt các tính năng phụ và tập trung vào mục đích demo sản phẩm cho khách hàng. Ví dụ như data có thể mockup, hoặc các API có thể tạm thời bỏ qua phân trang, tìm kiếm, ... Hãy tập trung làm giao diện trông đẹp đẹp 1 chút, dữ liệu mockup càng giống thật càng tốt để cho khách hàng dùng thử và phản hồi, rồi sau đó mình lại điều chỉnh dần dần thay vì cố gắng làm thật chỉn chu ngay từ đầu.

### 8. Sử dụng AI

Tất nhiên rồi, dùng AI sẽ giúp bạn tiết kiệm được rất nhiều thời gian, đặc biệt là công đoạn mockup dữ liệu. Dùng AI sẽ giúp bạn tạo dữ liệu mockup như thật mà đỡ tốn công, chỉ cần cung cấp dữ liệu mẫu và đặt yêu cầu chuẩn là được.

Các AI mà mình đang dùng thì cũng giống như bài viết trước, liệt kê lại:

- {{< link link="https://chat.openai.com/" text="ChatGPT" >}}, {{< link link="https://claude.ai/" text="Claude" >}}, {{< link link="https://gemini.google.com/" text="Gemini" >}}: Hỏi đáp, tra cứu trên web.
- Codeium, Cody AI: VS Code extension, hỗ trợ gợi ý code hoặc hỏi đáp ngay trên VS Code.

{{< video src="https://exafunction.github.io/public/videos/demos/copilot_sentiment.mp4" >}}

---

Để một dự án startup thành công thì cần rất nhiều yếu tố, vai trò khác nhau. Lập trình viên chỉ là 1 trong các yếu tố đó, nhưng hy vọng những kinh nghiệm trên sẽ giúp bạn đóng góp hiệu quả trong vai trò này.

Happy coding 😎
