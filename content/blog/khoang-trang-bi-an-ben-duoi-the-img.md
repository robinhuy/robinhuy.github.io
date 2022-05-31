---
title: "Khoảng trắng bí ẩn bên dưới thẻ Img"
date: 2022-05-31T16:57:48+07:00
draft: false
tags: ["HTML", "CSS"]
---

Khi sử dụng thẻ **img** để chèn ảnh vào trang web, có 1 hiện tượng khá thú vị mà không phải ai cũng biết hoặc để ý đến. Đó là nếu bọc thẻ **img** bởi 1 thẻ **div** (hoặc bất kỳ 1 thẻ nào khác) thì sẽ xuất hiện 1 khoảng trắng nhỏ ở bên dưới ảnh.

![Học lập trình web HTML và CSS căn bản](https://media.techmaster.vn/api/fileman/Uploads/HTML/khoang-trang-bi-an-ben-duoi-the-img1.jpg)

Nếu chúng ta thiết lập **padding** cho thẻ **div** thì do khoảng trắng này mà khoảng cách phần bên dưới vẫn lớn hơn phần bên trên. Vậy khoảng trắng này từ đâu mà có?

![Học lập trình web HTML và CSS trực tuyến](https://media.techmaster.vn/api/fileman/Uploads/HTML/khoang-trang-bi-an-ben-duoi-the-img2.jpg)

Để hiểu rõ về vấn đề này, chúng ta phải nắm rõ về [HTML, CSS](https://techmaster.vn/khoa-hoc/25487/web-co-ban-html5-css3-va-javascript), đặc biệt là khái niệm về _Inline element_ và _Block element_.

Mặc định thẻ **img** trong HTML là một _Inline element_, tức là nó được coi như là text. Do đó nó sẽ được browser xử lý như với text thông thường. Đến đây ta lại phải biết một chút về text, một số khái niệm về text trong kỹ thuật in ấn:

- Trên cùng 1 dòng, các chữ cái sẽ nằm trên một đường thẳng gọi là **baseline**(đó cũng là giá trị mặc định của thuộc tính vertical-align trong CSS)
- Một số chữ cái, ký tự đặc biệt sẽ có 1 phần nằm dưới baseline ví dụ như y, j, p, g, ... và phần nằm dưới đó gọi là **descenders**(tương tự, có 1 phần nằm trên text gọi là **ascenders**)
  ![Descenders](/images/descenders.png)

Do đó trình duyệt sẽ tạo ra 1 khoảng trắng dành cho phần **descenders** của text, nếu chúng ta viết thêm 1 vài ký tự có descenders vào bên cạnh ảnh và tăng font-size của chúng lên, ta sẽ thấy rõ tại sao lại có khoảng trắng nhỏ bên dưới ảnh.

![Khoang trang bi an ben duoi the img](https://media.techmaster.vn/api/fileman/Uploads/HTML/khoang-trang-bi-an-ben-duoi-the-img4.jpg)

Vậy là chúng ta đã khám phá được khoảng trắng bí ẩn bên dưới thẻ img. Và để xử lý khoảng trắng đó ta có thể dùng các cách sau:

- Dùng thuộc tính **vertical-align** cho thẻ **img** với giá trị là **middle**.
- Dùng thuộc tính **line-height** cho thẻ **div** với giá trị là **0**.
- Chuyển **img** thành Block element với thuộc tính **display**.
