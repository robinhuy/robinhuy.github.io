---
title: "Tùy chỉnh Visual Studio Code khi lập trình ASP.NET Core"
date: 2018-01-13
draft: false
tags: ["Visual Studio Code", "ASP.NET"]
---

> ASP.NET Core là một open-source web framework mới của Microsoft. Nó cho phép phát triển và chạy ứng dụng web đa nền tảng. Giờ đây bạn có thể lập trình .NET trên cả Linux và MacOS.

Để lập trình chúng ta có thể sử dụng **Visual Studio** (trên Windows) hoặc **Visual Studio for Mac** (trên Mac). Ngoài ra chúng ta cũng có thể dùng **Visual Studio Code** (VS Code) để lập trình trên cả Windows, MacOS và Linux. VS Code là một Editor hoàn toàn miễn phí và chạy rất nhẹ. Các chức năng của nó cũng khá đầy đủ và có thể cài thêm các Extension để hỗ trợ, bổ sung thêm tính năng tùy vào từng dự án.

Dưới đây là một số cấu hình, tùy chỉnh của mình cho VS Code khi lập trình ASP.NET Core.

## 1. Cài đặt Extension

Có nhiều Extension hỗ trợ cho việc lập trình ASP.NET Core, tuy nhiên đến thời điểm hiện tại thì có Extension **C#** (ms-vscode.csharp) là được dùng nhiều nhất và được khuyến cáo sử dụng.

![vs-code-extension](/images/vscode-extension.png)

## 2. Tùy chỉnh phím tắt

Việc thiết lập phím tắt sẽ giúp bạn code nhanh hơn. Chúng ta có thể sửa lại các phím tắt mặc định theo ý mình bằng cách chọn **File / Preferences / Keyboard Shortcuts**. Tìm đến chức năng muốn thiết lập, chọn biểu tượng Edit hoặc bấm Enter để gán phím tắt cho chức năng đó.

![vscode-keybinding](/images/vscode-keybinding.png)

Nếu thiết lập sai (ví dụ bị trùng phím tắt), ta có thể khôi phục lại như cũ bằng cách bấm chuột phải vào chức năng và chọn **Reset Keybinding**.

## 3. Cấu hình Editor

VS Code cho phép chúng ta tùy chỉnh việc hiển thị, cách thức làm việc, ... trong phần **File / Preferences / Settings**. Để cấu hình chúng ta sẽ khai báo các thuộc tính và giá trị trong một file JSON. Chúng ta sẽ copy cấu hình mặc định (Default Setings) sang bên User Settings (hoặc Workspace Settings) với các giá trị mới. Với các cấu hình giống nhau thì VS Code sẽ nhận các giá trị theo mức độ ưu tiên **Workspace Settings** > **User Settings** > **Default Setings**.

![vscode-setting](/images/vscode-setting.png)

## 4. Cấu hình launch.json

Đây là file cấu hình chạy Debug ứng dụng trên VS Code (nằm trong thư mục .vscode của project). Các bạn có thể tham khảo tài liệu chi tiết [ở đây](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations). Với ứng dụng ASP.NET Core thì khi bật Debug, mặc định nó sẽ mở một tab mới trên trình duyệt. Để bỏ chức năng này thì chúng ta sửa lại cấu hình **launchBrowser** enabled thành **false**:

```json
...
    "launchBrowser": {
        "enabled": false,
        ...
    }
...
```

## 5. Cấu hình task.json

Task là một chức năng của VS Code cho phép chúng ta tích hợp thêm các External Tools vào trong project như MSbuild, Grunt, Gulp, ... và chúng ta sẽ cấu hình trong file .vscode/task.json. Tham khảo tài liệu chi tiết [ở đây](https://code.visualstudio.com/docs/editor/tasks).

Trong project ASP.NET Core thì cần sửa lại cấu hình của **msCompile** để khi compile lỗi chúng ta có thể chuyển nhanh sang đoạn code gây lỗi.

{{< figure src="/images/vscode-debug-problem-1.png" alt="VSCode debug problem 1" title="Khi gặp lỗi có thể bấm vào các dòng thông báo để bật nhanh đoạn code bị lỗi" >}}

Mặc định **msCompile** dùng kiểu đường dẫn đầy đủ, nên có thể sẽ gặp lỗi không mở được file:

{{< figure src="/images/vscode-debug-problem-2.png" alt="VSCode debug problem 2" title="Không mở được file do hiểu nhầm đường dẫn" >}}

Sửa lại cấu hình trong file **task.json** sang kiểu đường dẫn tương đối (relative):

```json
...
    "problemMatcher":  {
        "base": "$msCompile",
        "fileLocation": ["relative", "${workspaceRoot}"]
    }
...
```

_Trên đây là một số kinh nghiệm của mình khi thiết lập môi trường làm việc ASP.NET Core với Visual Studio Code. Các bạn có thể tham khảo để setup cho mình một môi trường phát triển tiện lợi và phù hợp nhất._

_Happy Coding_ 😁 _._
