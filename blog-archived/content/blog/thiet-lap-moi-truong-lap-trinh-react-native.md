---
title: 'Thiết lập môi trường lập trình React Native'
date: 2020-12-18
draft: false
tags: ['React Native']
---

## Nếu bạn dùng Mac

### Bước 1: Cài đặt chung

Cài **Node** và **Watchman** dùng Homebrew

```bash
brew install node
brew install watchman
```

Riêng với Node có thể cài trực tiếp bằng cách tải bộ cài tại đây {{< link link="https://nodejs.org/en/" text="https://nodejs.org/en" >}} (cài bản LTS) hoặc sử dụng {{< link link="https://github.com/nvm-sh/nvm" text="nvm" >}} nếu bạn muốn sử dụng node với các phiên bản khác nhau.

Cài **Java Development Kit** dùng Homebrew

```bash
brew install --cask adoptopenjdk/openjdk/adoptopenjdk8
```

Hoặc có thể tải bộ cài tại đây {{< link link="https://www.oracle.com/ae/java/technologies/javase/javase-jdk8-downloads.html" text="https://www.oracle.com/ae/java/technologies/javase/javase-jdk8-downloads.html" >}}.

### Bước 2: Cài môi trường phát triển cho iOS app

Đảm bảo máy đã cài {{< link link="https://apps.apple.com/us/app/xcode/id497799835?mt=12" text="Xcode" >}} (bản 9.4 hoặc mới hơn).

Cài Xcode Command Line Tools: Vào **Preferences...** → **Locations**

![Xcode command line tools](/images/xcode-command-line-tools.png)

Cài Simulator:

![Xcode simulator](/images/xcode-simulator.png)

Cài **CocoaPods** dùng Ruby (đã có sẵn trên Mac):

```bash
sudo gem install cocoapods
```

### Bước 3: Cài môi trường phát triển cho Android app

Download và cài đặt Android Studio: {{< link link="https://developer.android.com/studio/index.html" text="https://developer.android.com/studio/index.html" >}}. Bảo đảm rằng cài đặt đầy đủ các gói sau:

- Android SDK
- Android SDK Platform
- Android Virtual Device

Sau khi cài xong, bật phần quản lý SDK bằng cách mở Android Studio, chọn **Configure** → **SDK Manager**(hoặc chọn **Preferences...** → **Appearance & Behavior** → **System Settings** → **Android SDK**)

![Android Studio SDK manager](/images/android-studio-sdk-manager.png)

Chọn tab **SDK Platforms**, tích chọn **Show Package Details**, mở phần **Android 10.0 (Q)** và đảm bảo chọn những option sau:

- **Android SDK Platform 29**.
- **Intel x86 Atom_64 System Image** hoặc **Google APIs Intel x86 Atom System Image**.

![Android Studio install Android SDK](/images/android-studio-android-sdk.png)

Bấm Apply để bắt đầu download và cài đặt các tool đã chọn.

Cấu hình biến môi trường: Sửa file **$HOME/.bash_profile** hoặc **$HOME/.bashrc**(nếu bạn dùng trình shell khác không phải **bash** thì sửa file config tương ứng, ví dụ với **zsh** thì là **~/.zprofile** hoặc **~/.zshrc**)

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

Chạy lệnh **source** với file config vừa sửa để load vào shell đang chạy, ví dụ:

```bash
source $HOME/.bash_profile
```

## Nếu bạn dùng Windows

### Bước 1: Cài đặt chung

Cài đặt **Node** bằng cách tải bộ cài tại đây {{< link link="https://nodejs.org/en/" text="https://nodejs.org/en" >}} (cài bản LTS) và **Java Development Kit** bằng cách tải bộ cài tại đây {{< link link="https://www.oracle.com/ae/java/technologies/javase/javase-jdk8-downloads.html" text="https://www.oracle.com/ae/java/technologies/javase/javase-jdk8-downloads.html" >}}.

Hoặc có thể dùng {{< link link="https://chocolatey.org/" text="chocolatey" >}} để cài:

```bash
choco install -y nodejs.install openjdk8
```

### Bước 2: Cài môi trường phát triển cho Android app (trên Windows không chạy được iOS app)

Cài đặt **Android Studio** và **Android SDK** [tương tự trên Mac](#android-setup).

Cấu hình biến môi trường:

1. Mở **Windows Control Panel**.
2. Chọn **User Accounts**, sau đó tiếp tục chọn **User Acounts**.
3. Chọn **Change my environment variables**.
4. Chọn **New...** để tạo biến môi trường **ANDROID_HOME** trỏ vào thư mục cài Android SDK:
   {{< figure src="/images/config-android-home-windows.png" alt="Cấu hình Android Home trên Windows" title="Chú ý trên hình có \Users\hramos là đường dẫn mặc định của user hramos, sửa lại cho phù hợp" >}}

Thêm **platform-tools** vào **Path**:

1. Mở Windows Control Panel.
2. Chọn **User Accounts**, sau đó tiếp tục chọn **User Acounts**.
3. Chọn **Change my environment variables**.
4. Chọn **Path variable**.
5. Chọn **Edit**.
6. Chọn **New** và thêm **platform-tools** vào danh sách.

_Tham khảo: {{< link link="https://reactnative.dev/docs/environment-setup" text="https://reactnative.dev/docs/environment-setup" >}}._
