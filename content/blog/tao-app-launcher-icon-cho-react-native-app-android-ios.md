---
title: "Tạo App Launcher icon cho React Native app (Android + iOS)"
date: 2022-08-08
draft: false
tags: ["React Native", "Android", "iOS"]
---

Trước khi đẩy app lên Store, chúng ta sẽ cần tạo App Launcher Icon (icon của ứng dụng trên máy của người dùng). App code bằng React Native sẽ có thể đẩy lên cả Google Play (Android) và App Store (iOS), do đó mình sẽ hướng dẫn cách tạo App Launcher Icon cho cả 2 hệ hiều hành trên.

Để tạo bộ icon cho các thiết bị với kích thước khác nhau (dùng cho cả trên store) thì chúng ta cần chuẩn bị sẵn 1 icon gốc với kích thước 1024x1024 pixels.

Sau đó dùng trang web sau để generate ra các bộ icons cho Android và iOS: [easyappicon.com](https://easyappicon.com/)*. Trang web này cho phép tạo ra cả icon cho iOS theo cả cách cổ điển lẫn hiện đại (bo tròn góc).

{{< figure src="/images/easyappicon.jpg" alt="Tạo App icon trên website easyappicon.com" title="Tạo App icon trên website easyappicon.com" >}}

## 1. App Launcher Icon cho iOS

### Bước 1

Tạo ra bộ icon với các kích thước khác nhau cho các loại thiết bị iOS. Có thể sử dụng website ở trên hoặc một số tool thay thế sau:
- App [Icon Set Creator](https://apps.apple.com/us/app/icon-set-creator/id939343785?mt=12) (trên App Store).
- Website [https://makeappicon.com/](https://makeappicon.com/), upload ảnh lên (JPG hoặc PNG) và nhập email để nhận bộ icon trên cả iOS lẫn Android.

### Bước 2

Bật XCode lên, mở project React Native (file [project] **.xcworkspace** trong thư mục ios).

Tìm đến thư mục **Images.xcassets**, sau đó kéo thả bộ icon đã được tạo từ bước 1 (thư mục **AppIcon.appiconset**) hoặc bấm vào biểu tượng dấu cộng ở góc dưới bên trái, chọn import.

![Import ios app launcher icon](/images/import-ios-app-launcher-icon.png)

Xong, build lại app để thấy kết quả 😎.

> 1 phút quảng cáo: Icon ở trên là mình tự chế cho app game [Master Mind X](https://play.google.com/store/apps/details?id=com.robinhuy.mastermindx) viết bằng React Native, anh chị em chơi thử rồi cho xin góp ý ở comment nhé, review ủng hộ 5 sao thì càng tốt *😆*

## 2. App Launcher Icon cho Android

### Bước 1

Tương tự như bên iOS, chúng ta cũng cần tạo ra bộ icon với các kích thước khác nhau cho các loại thiết bị Android. Có thể sử dụng website ở trên hoặc một số tool thay thế sau:
- Website [Android Assets Studio](<http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher>).
- Website [https://makeappicon.com/](https://makeappicon.com/).

### Bước 2

Giải nén bộ icon vừa download về, trong đó có thư mục res chứa các thư mục dạng: mipmap-hdpi, mipmap-mdpi, mipmap-xhdpi, ..., trong mỗi thư mục lại chứa file **ic_launcher** (tên mặc định). Copy (ghi đè) toàn bộ vào trong thư mục **android > app > src > main > res**.

Chú ý là có nhiều thiết bị Android sử dụng icon dạng hình tròn, nên chúng ta tạo thêm 1 bộ icon dạng tròn (Circle) và cũng copy như trên, tên icon mặc định sẽ là **ic_launcher_round**.

{{< figure src="/images/cau-hinh-android-app-launcher-icon.png" alt="Cấu hình android app launcher icon" title="Tên icon đã được khai báo sẵn trong file **AndroidManifest.xml**" >}}

{{< figure src="/images/android-import-icon.png" alt="Import icon Android" title="Import Icons" >}}

**Chú ý**: Theo khuyến nghị của Google thì nên thiết kế icon cho Android theo dạng hình vuông đầy đủ (không cần bo tròn), không đổ bóng, vì khi đẩy app lên Store thì Google sẽ tự áp dụng các kiểu hiệu ứng đó cho đồng nhất. Do đó nếu tạo icon từ trang [Android Assets Studio](<http://romannurik.github.io/AndroidAssetStudio/icons-launcher.html#foreground.type=image&foreground.space.trim=1&foreground.space.pad=0.25&foreColor=rgba(96%2C%20125%2C%20139%2C%200)&backColor=rgb(255%2C%20255%2C%20255)&crop=0&backgroundShape=square&effects=none&name=ic_launcher>) thì nên bỏ hết cấu hình phần Effect (để None).

Tham khảo thêm: [https://developer.android.com/google-play/resources/icon-design-specifications](https://developer.android.com/google-play/resources/icon-design-specifications)
