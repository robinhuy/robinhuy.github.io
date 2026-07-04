---
title: 'Xử lý bất đồng bộ trong JavaScript Phần 1'
date: 2024-02-25
draft: false
images: ['/images/xu-ly-bat-dong-bo-trong-javascript-phan-1.jpg']
tags: ['JavaScript']
---

Lập trình bất đồng bộ (_asynchronous programming_) là một trong những vấn đề cơ bản trong JavaScript, nhưng không phải ai cũng hiểu cặn kẽ, đa số chỉ làm theo thói quen.
Mình đã làm một số dự án maintain và thấy rất nhiều lỗi khi xử lý bất đồng bộ khiến cho chương trình bị chạy chậm hoặc bị sai logic. Lúc mới phát triển dự án thì sẽ chưa thấy ảnh hưởng gì nhưng sau khi dữ liệu đủ lớn thì sẽ gây giật, lag hoặc một số bug tiềm ẩn.

Mình viết bài viết này để chia sẻ lại những hiểu biết cũng như kinh nghiệm của mình trong việc xử lý bất đồng bộ, hy vọng sẽ giúp các bạn tránh được các lỗi kể trên.

## Lý thuyết

Trước tiên chúng ta sẽ ôn lại 1 chút lý thuyết cơ bản về bất đồng bộ trong JavaScript.

Thông thường khi viết ứng dụng, ta sẽ thực thi các hàm một cách tuần tự, từ trên xuống dưới như sau:

```javascript
func1();
func2();
func3();
```

Đây gọi là xử lý đồng bộ (_synchronous_, viết tắt là _sync_). Code kiểu này đơn giản và dễ đọc, nhưng trong nhiều trường hợp, nếu viết như vậy lại làm chương trình chạy chậm đi.

Chúng ta có thể viết cách khác để cho các hàm này chạy song song (parallel), không theo thứ tự từ trên xuống nữa và chạy luôn cùng lúc. Như vậy tốc độ chương trình sẽ nhanh hơn, các hàm sẽ không cần phải đợi nhau nữa (blocking). Đây được gọi là hàm chạy bất đồng bộ (_asynchronous_, viết tắt là _async_).

Lập trình bất đồng bộ sẽ khó hơn vì có thể khi đọc code thì thấy thứ tự gọi hàm là func1, func2, func3 nhưng vì các hàm này chạy cùng 1 lúc nên có thể func3 lại chạy xong trước làm ảnh hưởng đến luồng logic.

Trong JavaScript sẽ có các hàm có sẵn là chạy _sync_ hoặc _async_.
Ví dụ các hàm xử lý chuỗi, số, ... là _sync_: toUpperCase(), substr(), ...
Các hàm viết theo dạng callback thì là _async_: setTimeout(), fetch(), ...

Hoặc như trong NodeJS các bạn sẽ thấy cùng 1 tác vụ nhưng lại có đến 2 hàm như để ghi file chúng ta có {{< link link="https://nodejs.org/docs/latest/api/fs.html#fswritefilefile-data-options-callback" text="fs.writeFile" >}} (async) và {{< link link="https://nodejs.org/docs/latest/api/fs.html#fswritefilesyncfile-data-options" text="fs.writeFileSync" >}} (sync). Hàm async sẽ được khuyến khích hơn vì nó không làm chương trình bị block như sync. Ví dụ trường hợp thao tác đọc ghi file bị lỗi hoặc quá lâu thì chương trình sẽ bị block, phải chờ quá trình này hoàn tất mới thực hiện được các tác vụ phía sau.

Ok, lý thuyết chỉ tìm hiểu đến đây thôi, còn về lý thuyết sâu hơn như blocking, non blocking, event loop, ... các bạn hãy tự tìm hiểu thêm nhé. Vì lý thuyết nhiều quá thì sẽ dễ gây buồn ngủ nên chúng ta chuyển qua phần ví dụ thực hành luôn.

## Ví dụ

Dưới đây sẽ là một số hàm sẽ được sử dụng trong các ví dụ:

- {{< link link="https://www.w3schools.com/jsref/met_win_settimeout.asp" text="setTimeout" >}}: Là một hàm built in chạy bất đồng bộ, dùng để trì hoãn (delay) việc thực thi hàm sau 1 khoảng thời gian.

- Hàm này thì là hàm tự chế để thay thế cho _setTimeout_ ở trên nhưng là chạy theo kiểu đồng bộ, có tác dụng chờ x giây để giả lập thời gian thực thi của 1 hàm.

```javascript
function delay(x) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < x * 1000) {}
}
```

- {{< link link="https://www.w3schools.com/jsref/met_console_time.asp" text="console time()" >}}: Để tính thời gian chạy chương trình.

Ok, bây giờ sẽ đến phần ví dụ thực tế.
Mình sẽ viết một chương trình mô tả quy trình luộc rau, vì chắc ~~AI~~ ai cũng biết luộc rau rồi 😂.

Ta sẽ có các hàm mô tả hành động như sau:

```javascript
function soCheRau() {
  delay(3);
  console.log('Sơ chế rau.');
}

function dunSoiNuoc() {
  delay(4);
  console.log('Đun sôi nước.');
}

function luocRau() {
  delay(5);
  console.log('Luộc rau.');
}

function votRau() {
  delay(3);
  console.log('Vớt rau, để nguội.');
}
```

Mỗi hàm mình giả lập chạy mất vài giây (còn trong thực tế thì sẽ là 5-10 phút cho 1 công đoạn).

Thực thi chương trình:

```javascript
console.time('Total time');
soCheRau();
dunSoiNuoc();
luocRau();
votRau();
console.timeEnd('Total time');
```

Vậy tổng thời gian sẽ là xấp xỉ **15 giây** (3+4+5+3). Các bạn có thể copy các đoạn code ở trên chạy thử ở Console của Browser để thử nghiệm.

Trong thực tế nếu bạn luộc rau theo cách trên thì khả năng cao là sẽ bị bố mẹ mắng vì không biết cách sắp xếp thời gian 😅.

Như vậy để tối ưu thời gian, mình sẽ chuyển qua cách làm đồng thời nhiều việc cùng 1 lúc.
Viết lại chương trình trên theo cách asynchronous như sau (dùng setTimeout và hàm callback):

```javascript
function soCheRau(callback) {
  setTimeout(() => {
    console.log('Sơ chế rau.');

    if (callback) callback();
  }, 3000);
}

function dunSoiNuoc(callback) {
  setTimeout(() => {
    console.log('Đun sôi nước.');

    if (callback) callback();
  }, 4000);
}

function luocRau(callback) {
  setTimeout(() => {
    console.log('Luộc rau.');

    if (callback) callback();
  }, 5000);
}

function votRau(callback) {
  setTimeout(() => {
    console.log('Vớt rau, để nguội.');

    if (callback) callback();
  }, 3000);
}
```

Các hàm trên được viết lại theo kiểu callback, tức là cho phép truyền vào tham số là 1 hàm, và sẽ gọi lại (callback) hàm đó sau khi thực hiện xong code logic nào đó. Ở trên mình đặt luôn tên hàm là callback, còn thực tế các bạn có thể đặt tùy theo ngữ cảnh.

Bây giờ các hàm này đã chạy bất đồng bộ, nên nếu chúng ta gọi như này:

```javascript
console.time('run');
soCheRau();
dunSoiNuoc();
luocRau();
votRau();
console.timeEnd('run');
```

Kết quả sẽ ra như này:
![Kết quả thực thi lần 1](/images/javascript-async-1.png)

_console.timeEnd_ còn chạy trước các _console.log_ khác và các bước lung tung không theo đúng trình tự, vớt rau trước cả khi nước sôi 😂.

Đó là vì các hàm này chạy đồng thời cùng lúc, không phụ thuộc lẫn nhau, dẫn đến kết quả không như ý muốn.
Trong thực tế chúng ta có thể tối ưu quá trình luộc rau bằng cách vừa sơ chế rau vừa đun sôi nước, nhưng cũng phải chờ nước sôi thì mới luộc rau và luộc rau xong thì mới vớt rau.

Do đó mình sẽ viết lại chương trình để gọi đồng thời 2 hàm _soCheRau()_ và _dunSoiNuoc()_ cùng lúc. Sau đó khi cả 2 hàm đã chạy xong thì lại gọi tuần tự các hàm _luocRau()_ và _votRau()_:

```javascript
console.time('run');

// Thêm một biến đếm để kiểm tra số hàm callback đã thực hiện
let count = 0;

// Hàm này để kiểm tra khi có 2 hàm callback đã thực hiện (soCheRau() và dunSoiNuoc())
function checkCallback() {
  count++;

  // Nếu đã có 2 hàm callback được gọi thì tiếp tục thực hiện các hàm tiếp theo
  if (count === 2) {
    // Gọi hàm luocRau() và truyền callback là hàm votRau() để khi luộc rau xong thì mới vớt rau
    luocRau(() => {
      votRau(() => {
        // Vớt rau xong thì kết thúc chương trình
        console.timeEnd('run');
      });
    });
  }
}

// Thực thi 2 hàm soCheRau và dunSoiNuoc cùng lúc, với callback là hàm checkCallBack ở trên
soCheRau(checkCallback);
dunSoiNuoc(checkCallback);
```

Kết quả:

![Kết quả thực thi lần 2](/images/javascript-async-2.png)

Như vậy các hàm vẫn chạy đúng trình tự mong muốn và chúng ta đã rút ngắn tổng thời gian xuống còn khoảng **12 giây**, tiết kiệm được 3 giây.

Trong thực tế nếu số lượng các hàm lớn thì hiệu suất (performance) sẽ được cải thiện đáng kể so với cách gọi tuần tự. Ví dụ như trong một màn hình cần gọi rất nhiều API, nếu cứ viết theo thói quen dùng **async await** và cứ await lần lượt từng lệnh call API thì đó lại chính là lập trình theo kiểu đồng bộ làm trang web load rất lâu.

Lập trình bất đồng bộ cũng sẽ có nhược điểm là khó xử lý hơn, đặc biệt nếu chúng ta chỉ dùng callback như ví dụ ở trên, sẽ dẫn đến callback hell khiến code vừa khó đọc vừa khó bảo trì. Các bạn thử tăng độ khó của ví dụ trên lên sẽ thấy code khó hơn và callback hell rõ ràng hơn:

> Viết lại chương trình mô tả quy trình luộc rau ở trên nhưng bước sơ chế rau sẽ tách ra thành vặt rau và rửa rau.
> Khi đó chúng ta cần cho _vatRau()_ + _ruaRau()_ + _dunSoiNuoc()_ chạy cùng lúc, nhưng vẫn phải đảm bảo _vatRau()_ chạy xong rồi mới đến _ruaRau()_.

{{< figure src="/images/callback-hell.jpg" alt="Callback Hell" title="Callback Hell" >}}

Giờ đến lúc các bạn nên tự thực hành để hiểu rõ hơn về lập trình bất đồng bộ với callback trong JavaScript.
Phần tiếp theo mình sẽ hướng dẫn tiếp về lập trình bất đồng bộ với **Promise**, **async await** và các cách **"bắt lỗi"** (handling error) để chương trình chạy chuẩn hơn.

See you again!

Tiếp theo: [Xử lý bất đồng bộ trong JavaScript Phần 2](/blog/xu-ly-bat-dong-bo-trong-javascript-phan-2).
