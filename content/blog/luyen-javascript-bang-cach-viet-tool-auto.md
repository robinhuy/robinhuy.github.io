---
title: 'Luyện JavaScript bằng cách viết script auto cho game'
date: 2024-10-22
draft: false
images: ['/images/telegram-test-selector.png']
tags: ['JavaScript']
---

Thay vì các tutorial với các ví dụ basic nhàm chán, nay mình sẽ chuyển sang hướng dẫn lập trình bằng một cái thú vị hơn, đó là viết script auto cho game.

Game mà dùng JavaScript thì dễ nhất tất nhiên là dạng web base rồi.
Mình sẽ hướng dẫn với game này (tranh thủ kiếm ref trá hình 😂): {{< link link="https://t.me/seed_coin_bot/app?startapp=1369475670" text="https://t.me/seed_coin_bot/app?startapp=1369475670" >}}.

Game này là một mini app trên Telegram nên chỉ cần có tài khoản Telegram là chơi được, không cần cài cắm thêm gì cả (đỡ lo bị hack).

Và để có thể chạy script thì cần chạy game trên trình duyệt (browser) hoặc Telegram Desktop App (bật chế độ {{< link link="https://docs.ton.org/develop/dapps/telegram-apps/testing-apps#telegram-desktop-on-windows-linux-and-macos" text="Webview Inspecting" >}}).

Thao tác chạy tool rất đơn giản: Bật DevTools lên, vào tab Console, paste code vào và bấm enter. Phần còn lại tùy vào code của bạn 😁.

![Chạy script trên Telegram mini app](/images/telegram-run-script.png)

## Giới thiệu sơ qua về game

Game này cũng thuộc dạng game `play to earn` trên Telegram, nhưng thay vì chỉ thao tác đơn giản như các game `tap to earn` khác thì game này có tính giải trí cao hơn, chiến thuật hơn (cày sau có thể đuổi kịp hoặc vượt cày trước).

Ngoài ra trong game có hệ thống chợ (marketplace), nên có thể mua bán kiếm lời hoặc thực hành _mua đỉnh bán đáy_ hay các chiến thuật tài chính khác (om hàng, xả hàng, đẩy giá, ...).

![Marketplace trong Seed](/images/seed-marketplace-1.png)

## Mục đích của script

Với những người chuyên về MMO thì có nhiều tool để auto chơi game này nhưng chủ yếu các tool đó là auto các thao tác cơ bản và áp dụng để farm nhiều account.

Mình chỉ chơi 1 account cho vui, và cũng ngại cài tool vì sợ bị hack, nên các thao tác auto chỉ tự viết code và run trên Console cho an toàn. Dùng của nhà trồng được sẽ yên tâm hơn, nhân tiện ôn lại kiến thức luôn.

Script sẽ có tác dụng như nào tùy vào bạn muốn auto những thao tác gì. Giờ mình sẽ hướng dẫn các bạn thử auto một vài thao tác cơ bản vận dụng các kiến thức trong JavaScript, còn lại thì tùy vào sự sáng tạo của mỗi người.

## Thực hành

### Bước 1: Phân tích

Đầu tiên cần phải xem trong game có thao tác nào lặp đi lặp lại để có thể auto được hoặc dùng script sẽ hiệu quả hơn làm thủ công.
Với game này thì mình sẽ auto thao tác mua item trong Marketplace để có thể mua được nhiều item giá thấp (sau đó bán lại với giá cắt cổ).
Như vậy sẽ không phải ngồi canh nhìn mỏi mắt và bấm mỏi tay nữa, tỉ lệ mua trúng cao hơn (vì nhanh hơn bấm tay) và cũng đỡ bị nhầm lẫn hơn (không cần nhớ giá).

Để cho đơn giản thì sẽ bắt đầu từ màn hình Marketplace. Thao tác mua item bao gồm:

1. Chọn category (ví dụ chỉ mua rare worm), bật filter (thường là sắp xếp giá từ thấp đến cao).
2. Check giá vài item đầu tiên, nếu gặp item giá thấp hơn so với dự định thì bấm mua.
3. Sau khi bấm mua cần thêm một bước bấm confirm để xác nhận mua.
4. Reload lại danh sách để load item mới (hoặc chuyển sang category khác).
5. Quay trở lại bước thứ 2.

![Marketplace trong Seed](/images/seed-marketplace-2.png)

![Confirm modal](/images/seed-confirm-modal.png)

Như vậy mình có thể thực hiện bước thứ 2 đến 5 trong 1 vòng lặp, có thể cho chạy n lần hoặc trong n phút tùy vào code logic.

### Bước 2: Chạy thử cơ bản

Trước khi thực hiện lặp thì phải code thử và đảm bảo các bước chạy ổn, sau đó mới đưa các bước lặp vào trong vòng lặp.

Bước 1 không cần lặp đi lặp lại nên tạm bỏ qua, mình sẽ làm từ bước 2.

Chúng ta dùng DevTools để xem cấu trúc DOM của giao diện trước, sau đó phân tích và chọn ra các selector phù hợp.

Để cho nhanh chúng ta có thể inspect thẳng vào một element, sau đó chuột phải và chọn **Copy JS Path** để lấy ra code selector của element đó.

![Copy JS Path](/images/copy-js-path.png)

Paste thử vào console xem có select được item hay không. Nếu select được thì selector này có thể dùng được (mặc dù hơi dài).

![Test JS Path](/images/telegram-test-selector.png)

Thử lấy ra text bên trong element bằng thuộc tính `.innerText`.

```js
const itemPriceElement = document.querySelector(...); // Lấy selector từ DevTools
const itemPrice = parseFloat(itemPriceElement?.innerText);
```

Ok vậy là chúng ta đã lấy ra được giá tiền của item đầu tiên. Làm tương tự các bạn có thể lấy ra được giá của các item tiếp theo.
Chú ý là selector do DevTools chọn ra sẽ rất dài và có thể không tối ưu, các bạn có thể tự tối ưu lại, miễn sao cho select đúng item mình cần.

Giờ đến bước so sánh, cần đặt ra 1 giá mà bạn sẽ mua khi gặp item với mức giá thấp hơn, có thể tạo 1 hằng số, ví dụ:

```js
const MAX_PRICE = 1;
```

Sau đó so sánh giá trị của giá tìm được với MAX_PRICE, nếu nhỏ hơn hoặc bằng thì thực hiện thao tác mua.

Để thực hiện thao tác mua thì chúng ta cần chọn được nút **Buy**, lấy selector thì làm tương tự như trên.
Sau đó dispatch một event click để giả lập thao tác người dùng bấm nút. Ở đây mình dùng method `click()` cho đơn giản, các bạn có thể dùng {{< link link="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent" text="dispatchEvent" >}} nếu muốn tùy chỉnh giống người dùng thật hơn.

```js
const btnBuyElement = document.querySelector(...); // Lấy selector từ DevTools
if (itemPrice <= MAX_PRICE) {
  btnBuyElement.click();
}
```

Chạy thử code trên console nếu modal confirm xuất hiện là ok.

Tiếp theo làm tương tự chúng ta dispatch event click vào nút confirm (Yep!) là xong thao tác mua cơ bản.

### Bước 3: Đưa vào vòng lặp

Cái này thì tùy vào bạn muốn chạy vòng lặp theo số lần hay theo thời gian. Theo cách nào cũng được nhưng cần chú ý:

- Các thao tác này sẽ thực hiện call API, và sẽ mất thời gian chứ không thực hiện ngay lập tức.
- Khi màn hình đang loading thì không nên thao tác gì cả.

Vậy nên chúng ta sẽ cần phải có thời gian chờ, thời gian delay giữa các thao tác.
Ví dụ như sau khi bấm nút Buy xong thì phải chờ Confirm modal xuất hiện đã rồi mới tìm và bấm nút confirm.

Để đơn giản thì chúng ta có thể dùng hàm `setTimeout()` để chờ. Và viết dưới dạng Promise cho dễ xử lý code logic:

```js
async function delay(x) {
  return new Promise((resolve) => setTimeout(resolve, x * 1000));
}
```

Sau đó chúng ta có thể viết code dạng như này:

```js
const COUNT = 100; // Ví dụ chạy 100 lần

for (let i = 0; i < COUNT; i++) {
  try {
    await reloadPage();
    await delay(1); // Chờ 1 giây để hiển thị danh sách item

    await buyItem();
    await delay(3); // Chờ 3 giây để load confirm modal

    await confirmBuy();
    await delay(2); // Chờ 2 giây để api gọi xong (có thể thành công hoặc thất bại)
  } catch (error) {
    console.log(error);
    return;
  }
}
```

Các bạn tự implement các hàm chi tiết nhé.

### Bước 4: Tối ưu code

Còn nhiều thứ phải tối ưu như xử lý ngoại lệ, thêm random giả lập như người chơi thật (để đỡ bị ban nếu game check quá kỹ), ...
Ở đây mình sẽ hướng dẫn tối ưu phần `setTimeout` để luyện skill JavaScript async.

Vấn đề gặp phải: Dùng `setTimeout` thì chỉ đặt 1 khoảng thời gian cảm tính, ví dụ delay 1-2 giây.
Nhưng nếu mạng lag chẳng hạn thì sẽ không xử lý được hoặc delay lâu quá thì tốn thời gian.

Thay vì thế mình sẽ dùng `setInterval` với thời gian cực nhỏ để liên tục kiểm tra DOM xem đã xuất hiện element mong muốn hay chưa.
Ví dụ với thao tác confirm thì sẽ chờ cho đến khi thấy element button confirm, sau đó mới thực hiện thao tác bấm confirm:

```js
function checkAndClickConfirmButton() {
  const interval = setInterval(() => {
    const confirmButton = document.querySelector(...);

    // Nếu tìm thấy nút confirm thì click và xóa bỏ interval
    if (confirmButton) {
      confirmButton.click();
      clearInterval(interval);
    }
  }, 200); // Mỗi 200 mili giây kiểm tra một lần
}
```

Như vậy dù mạng nhanh hay chậm thì script của chúng ta vẫn chạy ổn.

Tuy nhiên nếu dùng `setInterval` dạng callback như trên mà cho vào vòng lặp thì sẽ rất khó xử lý nên chúng ta viết lại dưới dạng Promise như `setTimeout` ở trên:

```js
async function checkAndClickConfirmButton() {
  return new Promise((resolve) => { // Trả về kết quả là một Promise
    const interval = setInterval(() => {
      const confirmButton = document.querySelector(...);

      if (confirmButton) {
        confirmButton.click();
        clearInterval(interval);
        resolve(); // Hoàn thành Promise
      }
    }, 200);
  });
}
```

Các bạn có thể bổ sung thêm logic **reject** nếu chờ quá lâu mà không thấy nút confirm (mạng lag, web bị treo, ...) và nhớ có `try catch` đầy đủ khi gọi hàm.

Code sau khi tối ưu sẽ tương tự như sau:

```js
const COUNT = 100; // Ví dụ chạy 100 lần

for (let i = 0; i < COUNT; i++) {
  try {
    await reloadPage();
    await waitListItemLoaded(); // Chờ cho đến khi hiển thị danh sách item

    await buyItem();
    await checkAndClickConfirmButton(); // Chờ confirm modal hiển thị và bấm vào nút confirm

    await waitNotify(); // Chờ đến khi hiển thị thông báo mua thành công hoặc thất bại
  } catch (error) {
    console.log(error);
    return;
  }
}
```

Các bạn có thể tham khảo thêm 2 bài viết sau cũng về JavaScript async nếu rảnh:
- [Xử lý bất đồng bộ trong JavaScript Phần 1](/blog/xu-ly-bat-dong-bo-trong-javascript-phan-1)
- [Xử lý bất đồng bộ trong JavaScript Phần 2](/blog/xu-ly-bat-dong-bo-trong-javascript-phan-2)

## Tổng kết

Vậy là chúng ta đã tạo được 1 script đơn giản để giúp tự động hóa việc mua item trong game nhàn hơn, dễ thành công và chính xác hơn.

Chúng ta cũng có thể áp dụng kỹ thuật trên để viết script auto cho các thao tác khác hoặc một số game khá nổi tiếng và gameplay đơn giản khác như: {{< link link="https://t.me/major/start?startapp=1369475670" text="Mayor" >}}, {{< link link="https://t.me/blum/app?startapp=ref_y1YcpTzgXe" text="Blum" >}}, {{< link link="https://t.me/memefi_coin_bot/main?startapp=r_9b1f4db154" text="MemeFi" >}}, ...

Chúc các bạn vừa chơi game ra tiền vừa nắm vững hơn kiến thức JavaScript (*đừng quên bấm vào các link game ở trên để ủng hộ tác giả 1 ref*).
