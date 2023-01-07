---
title: "Các cách tạo web tĩnh với Github"
date: 2021-05-30
draft: false
images: ["https://pages.github.com/images/user-repo@2x.png"]
tags: ["Github"]
---

Bạn có 1 trang web tĩnh (static web chỉ gồm HTML CSS JS) và muốn đẩy lên mạng để chia sẻ cho người khác mà không mất phí? Hãy tận dụng Github - nền tảng lưu trữ, quản lý và chia sẻ mã nguồn mở hàng đầu hiện nay.

Ngoài việc lưu trữ và quản lý mã nguồn, Github còn cung cấp một dịch vụ cho phép hosting static web là {{< link link="https://pages.github.com/" text="Github Pages" >}}. Source code lưu trữ trực tiếp trên Github và truy cập thông qua tên miền miễn phí là _[username].github.io_. Ví dụ username trên github của bạn là _robinhuy_ thì bạn sẽ có 1 tên miền miễn phí là _https://robinhuy.github.io_.

> Nếu bạn chưa biết sử dụng Github hoặc chưa biết cách đẩy code lên Github thì tham khảo bài viết này [Các cách đẩy code lên Github](/blog/cac-cach-day-code-len-github).

## Cách 1: Tạo repository với tên trùng với tên miền Github Pages

Ví dụ bạn có username là _sophshep_, vậy chỉ cần tạo 1 public repository với tên là _sophshep.github.io_ và đẩy code web tĩnh lên đó là xong. Chúng ta sẽ có ngay 1 website và truy cập theo đường dẫn giống với vị trí của file HTML trong repository. Chú ý không viết sai chính tả.

![Github Pages 1](https://pages.github.com/images/user-repo@2x.png)

Với tên file là _index.html_ thì khi gõ lên trình duyệt có thể bỏ qua. Ví dụ gõ _https://sophshep.github.io/_ và _https://sophshep.github.io/index.html_ thì kết quả là như nhau.

## Cách 2: Tạo một repository với tên bất kỳ khác tên miền Github Pages

Tạo 1 public repository và đẩy code web tĩnh lên. Sau đó vào mục **Settings** của repository đó để bật cấu hình Github Pages.

Kéo xuống phần Github Pages, chọn chuyển qua trang cấu hình cho Github Pages.

![Github Pages settings 1](/images/github-pages-settings-1.png)

Chọn branch mà bạn muốn đẩy code lên (thường là _main_ hoặc _master_), sau đó bấm **Save**.

![Github Pages settings 2](/images/github-pages-settings-2.png)

Sau khi cấu hình xong, chúng ta coi như repository hiện tại là một thư mục con của repository _https://[username].github.io_ và truy cập tương tự.

Ví dụ tên repository là _my-website_ thì sẽ truy cập địa chỉ là _https://[username].github.io/my-website/_ (trong repository có file _index.html_).

## Cách 3: Sử dụng website raw.githack.com

Sử dụng website {{< link link="https://raw.githack.com/" text="https://raw.githack.com" >}}, chúng ta có thể xem kết quả hiển thị của bất kỳ file HTML trong bất kỳ repository nào.

Tuy nhiên trang web có thể sẽ bị lỗi hiển thị nếu như bị sai đường dẫn (do đường dẫn bị thay đổi khi xem qua _raw.githack.com_).

![Xem nội dung file HTML trên trang raw.githack.com](/images/raw-githack.png)

Ngoài 3 cách trên, nếu bạn còn biết cách nào nữa thì hãy comment chia sẻ xuống dưới nhé.
