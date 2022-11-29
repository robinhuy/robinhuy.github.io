---
title: "Những quan niệm sai lầm về CQRS"
date: 2018-10-11
draft: false
tags: ["CQRS", "Design Pattern", "English Translated"]
---

Bài viết được dịch (có chỉnh sửa) từ cuốn [Patterns Principles and Practices of Domain Driven Design](https://www.amazon.com/Patterns-Principles-Practices-Domain-Driven-Design/dp/1118714709) của Scott Millett và Nick Tune, dành cho những ai đã và đang cần tìm hiểu về [CQRS](https://martinfowler.com/bliki/CQRS.html) (Command Query Responsibility Segregation). Trong bài viết có sử dụng nhiều thuật ngữ chuyên ngành, mình sẽ dẫn link đến các tài liệu Tiếng Anh tương ứng chứ không dịch (không biết dịch như nào hoặc dịch ra nghe rất củ chuối 😬).

## 1. CQRS rất khó

Xét về mức cơ bản thì CQRS chỉ là một pattern đơn giản triển khai nguyên tắc [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) (SRP) ở lớp [Domain Model](https://en.wikipedia.org/wiki/Domain_model).

CQRS không phải là một _framework_ hay là một hệ thống _multiple database_, nó là pattern được áp dụng vào [bounded context](https://martinfowler.com/bliki/BoundedContext.html), dùng để chia Domain Model thành 2 model: Write Model (Command side) và Read Model (Query side), chúng được xử lý riêng rẽ để đạt hiệu quả tốt hơn.

![CQRS Architecture](/images/cqrs-architecture.png)

CQRS thiên về khái niệm, tư tưởng hơn là một tập hợp các nguyên tắc và pattern phức tạp mà bạn phải tuân theo.

## 2. CQRS là Eventually Consistent

[Eventually Consistency](https://en.wikipedia.org/wiki/Eventual_consistency) được áp dụng để Read Model được cập nhật bất đồng bộ (asynchronous) với Write Model (sẽ có một bài viết khác giải thích chi tiết hơn về Eventually Consistency).

Đây không phải là điều kiện tiên quyết của CQRS, nhưng nó thường được sử dụng để cho phép bên Read side có thể scale (mở rộng) dễ dàng.

CQRS không yêu cầu bạn phải thực hiện Eventually Consistent. Bạn có thể sử dụng cùng một database và transaction để cập nhật Read Model hoặc sử dụng caching để có Strong Consistency.

## 3. Model phải dùng Event Sourcing

[Event Sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) là một cách rất hiệu quả để xây dựng cả Read Model và Write Model nhưng nó không bắt buộc phải có khi sử dụng CQRS.

Event Sourcing là một giải pháp lưu trữ dữ liệu theo lịch sử một cách chính xác, nhưng nó cũng giúp xây dựng Read Model dễ dàng hơn bởi vì bạn có thể tạo ra bất kỳ [projection](https://abdullin.com/post/event-sourcing-projections/) mong muốn từ những dữ liệu sự kiện theo lịch sử.

![CQRS Event sourcing](/images/cqrs-event-sourcing.png)

## 4. Command nên là Asynchronous

CQRS không bắt buộc Command phải được gửi theo kiểu _fire-and-forget_ (không quan tâm đến response).

Với các trường hợp tương tác cao, nhiều user thực hiện thay đổi vào cùng dữ liệu thì Asynchronous Command sẽ hiệu quả. Nó sẽ giúp ứng dụng dễ scale và không bị quá tải.

Tuy nhiên các Command mà không phản hồi lại thành công hay thất bại sẽ cần phải có những cách khác để cập nhật cho user kết quả của hành động. Nó có thể là qua email hoặc qua các thao tác phụ xử lý message lỗi.

## 5. CQRS chỉ hoạt động được với hệ thống Messaging

Nếu bạn đang tìm cách áp dụng một Read store theo cách *eventually consistent* hoặc xử lý Command theo kiểu bất đồng bộ thì dùng một _messaging framework_ có thể là một ý tưởng tốt.

![Messaging system](/images/messaging-queue.png)

Ngược lại, sử dụng một hệ thống messaging khi không cần thiết sẽ làm cho ứng dụng của bạn trở nên phức tạp và khó bảo trì hơn.

## 6. Cần phải sử dụng Domain Event với CQRS

Sử dụng Event để dựng Read Model là một phương pháp hiệu quả để giữ Read Model và Write Model được tách biệt.

Tuy nhiên nó không phải là cách duy nhất, và bạn có thể sử dụng nhiều method khác để tạo Read store, ví dụ như dựng trực tiếp từ dữ liệu quan hệ của Write Model.

_Hy vọng những chú ý trên đây sẽ giúp các bạn xây dựng hệ thống sử dụng CQRS một cách chính xác hơn, phù hợp với yêu cầu của ứng dụng._
