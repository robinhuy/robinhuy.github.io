---
title: 'Eventual Consistency và Strong Consistency trong hệ thống Cơ sở dữ liệu phân tán'
date: 2018-10-12
draft: false
tags: ['Database']
---

Một Database Transaction, theo như định nghĩa sẽ phải thỏa mãn các tính chất sau: {{< link link="https://en.wikipedia.org/wiki/Atomicity_(database_systems)" text="Atomic" >}}, {{< link link="https://en.wikipedia.org/wiki/Consistency_(database_systems)" text="Consistency" >}}, {{< link link="https://en.wikipedia.org/wiki/Isolation_(database_systems)" text="Isolation" >}} và {{< link link="https://en.wikipedia.org/wiki/Durability_(database_systems)" text="Durable" >}} (hay thường được gọi là {{< link link="https://en.wikipedia.org/wiki/ACID_(computer_science)" text="ACID" >}}). Bài viết này sẽ tập trung vào tính chất Consistency (tính nhất quán), và so sánh giữa **Eventual Consistency** với **Strong Consistency** trong hệ thống **Distributed Databases** qua các ví dụ đời thường.

## Lý thuyết

**Distributed Database** (hệ thống cơ sở dữ liệu phân tán): Là hệ thống Cơ sở dữ liệu (CSDL) mà có thể được phân tải, lưu trữ ở nhiều nơi. Ví dụ như ứng dụng sử dụng nhiều CSDL và các CSDL có thể nằm ở các máy chủ vật lý khác nhau.

**Strong Consistency** (tính nhất quán mạnh): Sau khi một cập nhật được diễn ra thì tất cả các lần đọc dữ liệu sau đó đều trả về giá trị mới được cập nhật.

**Eventual Consistency** (tính nhất quán cuối cùng, là một dạng của tính nhất quán yếu - Weak Consistency): Sau khi một cập nhật được diễn ra, các lần đọc sau đó không đảm bảo sẽ luôn trả về giá trị mới được cập nhật (có thể có lần đọc vẫn trả về dữ liệu cũ). Tuy nhiên sau một khoảng thời gian (đồng bộ giữa các CSDL) thì cuối cùng các lần đọc đều trả về giá trị mới nhất.

## Ví dụ đời thường

Một anh chàng tên Duy, có sở thích sưu tập phim và toàn bộ những bộ phim anh ta tải được trên mạng đều được lưu vào laptop. Laptop ở đây đóng vai trò như một CSDL.

Do sợ vào một ngày đẹp trời laptop bị ăn trộm hoặc bị hỏng sẽ làm mất hết toàn bộ phim trong máy nên Duy mua thêm một ổ cứng di động 8TB và một tài khoản Dropbox để sao lưu lại toàn bộ dữ liệu cho an toàn. Lúc này Laptop, ổ cứng di động và tài khoản Dropbox được coi như một hệ CSDL phân tán (theo mô hình Master - Slave).

![Master slave data model](/images/master-slave-model.png)

### 1. Eventual Consistency

Khi sử dụng nhiều replica (bản sao) cho một CSDL, giả sử có một write request đến một replica (insert, update, delete dữ liệu) thì chúng ta phải làm sao cho các replica còn lại cũng nhận được request tương ứng để đồng bộ dữ liệu.

Việc đồng bộ dữ liệu này sẽ tốn thời gian (có thể rất nhỏ), nhưng trong khoảng thời gian đó, nếu có một read request đến một replica chưa đồng bộ xong thì request đó sẽ nhận được kết quả cũ hơn (stale data).

![Eventual consistency](/images/eventual-consistency.png)

Quay lại ví dụ của Duy:

- Cứ mỗi tuần vào tối Thứ Sáu, Duy sẽ đồng bộ dữ liệu trong laptop với ổ cứng di động.

- Tối Chủ Nhật, Long là bạn của Duy mượn ổ cứng di động của Duy để xem phim. Lúc này Long có thể lấy luôn ổ cứng mang về và có toàn bộ dữ liệu cho đến lần sao lưu gần nhất (tức là nếu Thứ Bảy hoặc sáng Chủ Nhật Duy download thêm phim thì trong ổ cứng sẽ không có).

- Sáng Thứ Hai tuần sau, Long trả lại ổ cứng cho Duy và đến tối Chủ Nhật lại mượn tiếp. Thời điểm đó Long sẽ lại có được toàn bộ phim (bao gồm cả những phim chưa kịp đồng bộ trong tuần này).

### 2. Strong Consistency

Tương tự như Eventual Consistency, tuy nhiên để đảm bảo tính nhất quán thì trong trường hợp Strong Consistency toàn bộ các replica sẽ bị delay (trạng thái bận) cho đến khi quá trình đồng bộ hoàn tất.

Chỉ đến khi dữ liệu giữa các replica đã nhất quán thì chúng ta mới trả về kết quả cho client, do đó nó sẽ đảm bảo mọi read request đến sau luôn lấy được dữ liệu mới nhất (nhưng thời gian trả về kết quả lâu hơn).

![Strong consistency](/images/strong-consistency.png)

Quay lại ví dụ của Duy:

- Cứ mỗi tuần vào tối Thứ Bảy, Duy sẽ đồng bộ dữ liệu trong laptop Dropbox.

- Tối Chủ Nhật, Dương cũng là bạn của Duy xin link Dropbox để tải phim. Lúc này Duy bảo: "Tôi đã share cho ông link qua Slack rồi nhé, nhưng để mai hãy down thì sẽ có phim mới nhất tôi vừa down sáng nay".

- Như vậy để có phim mới nhất xem thì Dương sẽ phải chờ một thời gian khá dài để Duy đồng bộ phim lên Dropbox. Thời gian nhanh hay chậm còn tùy thuộc vào dung lượng phim, tốc độ internet, ...

### 3. Kết luận

**Strong Consistency** cho phép dữ liệu luôn nhất quán và được cập nhật mới nhất, nhưng nó có độ trễ cao.

**Eventual Consistency** thì có độ trễ thấp, kết quả trả về nhanh nhưng dữ liệu nhận được có thể không phải mới nhất.

=> Do đó việc thiết kế CSDL hay sử dụng thuộc tính nhất quán nào sẽ tùy vào yêu cầu của từng project cụ thể.

_Tham khảo bài viết gốc {{< link link="https://hackernoon.com/eventual-vs-strong-consistency-in-distributed-databases-282fdad37cf7" text="Eventual vs Strong Consistency in Distributed Databases" >}}._
