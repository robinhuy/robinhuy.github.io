---
title: "Thủ thuật chèn ảnh trên Github"
date: 2020-07-18
draft: false
tags: ["Github"]
---

> Một mã nguồn tốt là mã nguồn có tài liệu hướng dẫn đầy đủ, dễ hiểu, giúp cho người đọc có thể dễ dàng theo dõi và sử dụng.

Với các mã nguồn trên [Github](https://github.com/) (hoặc các nền tảng tương tự) thì tài liệu hướng dẫn được viết luôn trong file README.md nằm ở ngay thư mục gốc của project. File này được viết bằng cú pháp [markdown](https://en.wikipedia.org/wiki/Markdown#:~:text=Markdown%20is%20a%20lightweight%20markup,using%20a%20plain%20text%20editor.), chứ không dùng Rich text editor nên cũng sẽ có 1 số hạn chế nhất định. Trong bài viết này mình sẽ hướng dẫn các bạn cách chèn ảnh (cả ảnh tĩnh lẫn ảnh động) vào trong file README.md trên Github để giúp tài liệu hướng dẫn mã nguồn trở nên sinh động và thu hút hơn.

## Chèn ảnh bằng cú pháp markdown

Cú pháp chèn ảnh trong markdown như sau:

```markdown
![alt](http://~)
```

- Phần trong dấu ngoặc vuông là thuộc tính alt của ảnh (mô tả ảnh, hiển thị khi ảnh bị lỗi).
- Phần trong dấu ngoặc tròn là đường dẫn ảnh.

Như vậy để chèn ảnh vào file README.md, chúng ta cần có đường dẫn của ảnh. Các bạn sẽ cần phải upload ảnh lên 1 hosting nào đó rồi lấy link về để chèn. Hoặc các bạn có thể upload luôn ảnh vào trong project, tuy nhiên cách này sẽ làm tăng dung lượng project nếu có nhiều ảnh, và cũng làm mã nguồn chứa thêm những file không cần thiết.

## Còn 1 cách khác mà ít người biết, đó là upload ảnh lên Github CDN

Vào phần tạo Issue của một project bất kỳ (có thể vào luôn project của mình).

Kéo thả ảnh vào trong phần mô tả issue hoặc một comment bất kỳ, ảnh này sẽ được upload lên github và chờ vài giây chúng ta sẽ có link ảnh (kèm luôn cú pháp markdown để hiển thị ảnh).

![Github React Native Expo](/images/insert-image-github-issues.png)

Sau đó bạn chỉ cần copy luôn vào trong file **README.md** là xong.

## Tùy chỉnh kích thước ảnh

Mặc định ảnh khi nhúng vào file README theo cú pháp markdown thì chúng ta không style được, mà nó sẽ có style mặc định là _max-width: 100%_ (để ảnh có thể thu nhỏ lại ở màn hình mobile).

Tuy nhiên trong 1 số trường hợp khi dùng ảnh to quá, chúng ta có thể muốn ảnh hiển thị lên nhỏ hơn so với kích thước gốc, hoặc là khi dùng nhiều ảnh mà muốn các ảnh có kích thước đều nhau, thì có thể viết code HTML như sau:

```html
<img src="https://..." alt="..." width="250" />
```

Dùng HTML attribute để giới hạn kích thước ảnh (ví dụ ở đây là 250px) và chỉ nên giới hạn kích thước theo chiều rộng, còn chiều cao thì để ảnh tự co giãn cho đung tỉ lệ.

Các bạn có thể tham khảo file README trong repository React Native Expo Example của mình tại đây: [https://github.com/robinhuy/react-native-expo-example](https://github.com/robinhuy/react-native-expo-example) (bấm vào file, chọn Raw để xem code).
