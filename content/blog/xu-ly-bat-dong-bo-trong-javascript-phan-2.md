---
title: 'Xử lý bất đồng bộ trong JavaScript Phần 2'
date: 2024-09-09
draft: false
images: ['/images/xu-ly-bat-dong-bo-trong-javascript-phan-2.jpg']
tags: ['JavaScript']
---

Tiếp tục với [Xử lý bất đồng bộ trong JavaScript Phần 1](/blog/xu-ly-bat-dong-bo-trong-javascript-phan-1).

Phần này mình sẽ chuyển qua demo với Promise, Async await, ... cho nó quen thuộc.

## Lý thuyết

Lý thuyết thì các bạn có thể tra cứu tại đây [Promises, async/await](https://javascript.info/async).

Hoặc tiện hơn thì các bạn có thể hỏi ChatGPT:

![ChatGPT Promise](/images/chatgpt-promise.png)

## Ví dụ

Thay vì dùng các ví dụ như của ChatGPT, thì mình sẽ vẫn sử dụng các ví dụ như ở phần trước, chỉ thay _Callback_ bằng _Promise_ và _Async/await_.

Để giả lập thời gian thực thi của 1 hàm thì mình vẫn dùng hàm _delay_ như phần trước:

```javascript
function delay(x) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < x * 1000) {}
}
```

Vẫn là các hàm mô tả hành động trong quy trình luộc rau như sau:

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

Nếu để các hàm chạy tuần tự thì tổng thời gian sẽ là xấp xỉ **15 giây**. Mục tiêu là sửa lại sao cho tổng thời gian rút gọn lại chỉ còn khoảng **12 giây**, mà trình tự chạy các hàm vẫn phải hợp lý (ví dụ sơ chế rau xong thì mới luộc).

Để rút gọn bớt thời gian chạy chương trình thì chúng ta sẽ phải thực hiện nhiều hàm cùng một lúc. Ở đây ta thấy có thể vừa "sơ chế rau" vừa "đun sôi nước" được, nên ta sẽ thực hiện 2 việc này cùng lúc để tiết kiệm thời gian.

```javascript
console.time('run');

Promise.all([soCheRau(), dunSoiNuoc()])
  .then(() => {
    luocRau();
    votRau();
  })
  .then(() => {
    console.timeEnd('run');
  });
```

Đoạn code ở trên dùng hàm [Promise.all()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) để chạy đồng thời 2 hàm `soCheRau()` và `dunSoiNuoc()`. Sau khi cả 2 hàm cùng chạy xong thì mới chạy tiếp 2 hàm `luocRau()` và `votRau()`. Bây giờ copy code trên ném vào Console của Browser để chạy thử, và kết quả là:

![Kết quả thực thi lần 1](/images/javascript-async-3.png)

Vẫn tốn ~15 giây như cũ, chả tối ưu được tí nào, đúng là đời không như mơ 😂.

Vậy theo các bạn lỗi sai nằm ở đâu?

{{< figure src="/images/thinking.jpg" alt="Thinking ..." title="Thử suy nghĩ trong 5 phút trước khi đọc tiếp nhé!" >}}

Nếu chưa nghĩ ra thì các bạn có thể tra lại docs hoặc hỏi ChatGPT. Vấn đề ở đây là do các hàm ở trên của mình đều là các hàm **sync**, chứ không phải **async** nên sẽ không áp dụng `Promise.all()` được, vì `Promise.all()` cần truyền vào các **Promise** (kết quả của các hàm async). Vậy chúng ta cần phải viết lại các hàm trên thành các hàm async, ví dụ:

```javascript
function soCheRau() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Sơ chế rau.');
      resolve();
    }, 3000);
  });
}
```

Các bạn cũng có thể viết lại hàm `delay` thành *async* để tái sử dụng cho dễ. Ví dụ hàm `delay` phiên bản *async*:

```javascript
function delay(x) {
  return new Promise(resolve => setTimeout(resolve, x * 1000));
}
```

Sau khi viết lại các hàm thành *async* thì cũng cần sửa lại code `Promise.all()` ở trên một chút:

```javascript
console.time('run');

Promise.all([soCheRau(), dunSoiNuoc()])
  .then(() => {
    return luocRau();
  })
  .then(() => {
    return votRau();
  })
  .then(() => {
    console.timeEnd('run');
  });
```

Ở đây mình dùng [Promise Chaining](https://javascript.info/promise-chaining) để đảm bảo `luocRau()` và `votRau()` chạy tuần tự (nếu các bạn đã sửa nó thành async). Còn nếu 2 hàm `luocRau()` và `votRau()` vẫn là **sync** thì các bạn dùng luôn code cũ không cần **Promise Chaining**.

Chú ý khi dùng **Promise Chaining** thì mỗi một lần `.then` các bạn phải đảm bảo có `return` để trả về kết quả, nếu không rất dễ xảy ra lỗi. Mình đã từng fix nhiều bug do quên `return` dẫn đến sai logic code.

Xem lại kết quả sau khi tối ưu:

![Kết quả thực thi lần 2](/images/javascript-async-4.png)

Ok vậy là kết quả đã giống như phần 1, nhưng code dễ đọc và dễ hiểu hơn.

Các bạn cũng có thể viết theo kiểu **Async/await** thì code sẽ ngắn gọn hơn nữa:

```javascript
console.time('run');

await Promise.all([soCheRau(), dunSoiNuoc()]);
await luocRau();
await votRau();

console.timeEnd('run');
```

Chú ý là để dùng **await** thì bạn phải gọi trong 1 hàm có khai báo keyword **async**, nên trong thực tế ta thường viết như sau:

```javascript
async function start() {
  console.time('run');

  await Promise.all([soCheRau(), dunSoiNuoc()]);
  await luocRau();
  await votRau();

  console.timeEnd('run');
}

start();
```

Vậy là xong ví dụ đơn giản về **Promise**, **Async/await**.
Bây giờ các bạn thử làm tiếp bài tập ở phần trước nhưng dùng **Promise**, **Async/await** thay cho **Callback**.

> Viết lại chương trình mô tả quy trình luộc rau ở trên nhưng bước sơ chế rau sẽ tách ra thành vặt rau và rửa rau.
> Khi đó chúng ta cần cho _vatRau()_ + _ruaRau()_ + _dunSoiNuoc()_ chạy cùng lúc, nhưng vẫn phải đảm bảo _vatRau()_ chạy xong rồi mới đến _ruaRau()_.

## Xử lý lỗi

Trong quá trình chạy phần mềm kiểu gì cũng sẽ có lỗi. Chúng ta cần xử lý lỗi để không gây ảnh hưởng đến trải nghiệm người dùng.

Vẫn ví dụ trên, giả sử như đang rửa rau thì bị mất nước, chúng ta sẽ xử lý như nào?

```javascript
async function ruaRau() {
  console.log('Bắt đầu rửa rau.');
  await delay(2);
  throw Error('Mất nước!');
}
```

Nếu không có xử lý lỗi thì khi chạy đến hàm `ruaRau()` sẽ bị throw ra **Error** và có thể làm code logic phía sau không chạy tiếp gây ra lỗi chương trình.

![Xử lý lỗi async/await](/images/javascript-async-5.png)

Vậy chúng ta cần phải xử lý lỗi để nó không gây lỗi chương trình. Có thể là khi gặp lỗi thì thông báo lỗi cho user và dừng chương trình lại hoặc bỏ qua lỗi chạy tiếp code logic phía sau (rau bẩn tí vẫn ăn được 😂).

Để bắt lỗi thì nếu bạn dùng **Promise** chúng ta có [.catch()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch), còn nếu dùng **Async/await** thì dùng [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch). Ví dụ:

```javascript
async function soCheRau() {
  await vatRau();

  try {
    await ruaRau();
  } catch (error) {
    console.log(error);
  }

  console.log('Sơ chế rau xong.');
}
```

Như code ở trên thì đã có `try catch` cho bước rửa rau nên nếu bước đó có lỗi thì chương trình vẫn chạy tiếp được.
Chúng ta có thể `return` để code không chạy tiếp, hoặc trả về kết quả **true/false** để dùng ở các chỗ khác, ...
Hoặc cẩn thận hơn thì có thể try catch toàn bộ cả 2 lệnh await và khi có error thì hiển thị 1 thông báo chung chung đại loại như "Có lỗi trong quá trình sơ chế rau!".

## Một số bài học rút ra

Trên thực tế thì còn nhiều trường hợp xử lý phức tạp hơn, lúc này chúng ta sẽ phải dùng đến các hàm hỗ trợ của Promise như [.allSettled()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled), [.any()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any), [.race()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race), ... Tuy nhiên bài viết quá dài rồi nên mình sẽ chỉ tổng hợp lại một số bài học liên quan tới các ví dụ trên:

- Không phải cứ dùng keyword `async` thì hàm đó là **async**, nó chỉ là khai báo hàm và có thể dùng `await` bên trong hàm.
- Nếu một hàm trả về kết quả là một **Promise** thì hàm đó là **async**. Có thể `await` một **Promise** như một hàm **async**.
- Khi dùng **Promise**, **Async/await** thì phải chú ý các hàm đang thao tác là **sync** hay **async**.
- Dùng **Promise Chaining** nhớ đừng quên `return`.
- Luôn xử lý lỗi khi dùng **Promise** hoặc **Async/await** để đảm bảo chương trình không bị lỗi không mong muốn.

Nếu các bạn muốn tìm hiểu kỹ hơn thì có thể nghiên cứu thêm docs (các link trong bài) hoặc hỏi ChatGPT, ... hoặc comment xuống dưới bài viết để trao đổi thêm.

_Happy Coding_ 😁 _._
