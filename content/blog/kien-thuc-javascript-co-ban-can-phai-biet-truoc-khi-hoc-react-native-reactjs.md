---
title: "Kiến thức Javascript cơ bản cần phải biết trước khi học React Native / ReactJS"
date: 2021-01-20
draft: false
tags: ["JavaScript", "React Native", "ReactJS"]
---

> ReactJS là một Javascript framework rất phổ biến với giới lập trình Web Frontend hiện nay, số lượng tuyển dụng lập trình viên ReactJS cũng rất lớn. Do đó nhiều người mới học Web Frontend sau khi học xong một chút HTML CSS JS là muốn nhảy vào lập trình ReactJS ngay. Điều này dẫn đến hệ lụy là các bạn sẽ bị hổng kiến thức cơ bản, hoặc khi học ReactJS sẽ rất chật vật vì không hiểu cú pháp, không hiểu bản chất, ...

Vậy trước khi học ReactJS hoặc React Native, các bạn nên nẵm vững HTML CSS và những kiến thức sau trong JavaScript (ngoài các kiến thức ban đầu như biến, vòng lặp, điều kiện, ...):

- Variable scope và closure.

- Import và Exports.

- Arrow function.

- Destructuring assignment.

- Rest parameters and spread syntax.

- Các hàm xử lý mảng như map, filter, reduce, push, splice, ...

- ES6/ES7 Class (mặc dù hiện tại code ReactJS đang dần chuyển sang hướng function nhưng vẫn nên biết).

![Newbie học Javascript, ReactJS, React Native](/images/newbie-frog.jpg)

### Variable scope và closure

Cần nắm vững khái niệm Scope (code block, nested function, ...) trong Javascript. Khai báo biến thì sử dụng **let** thay cho **var** (kiểu cũ), với hằng số hoặc _[magic number](https://en.wikipedia.org/wiki/Magic_number_(programming))\_ thì dùng **const**.

Khái niệm closure thì hơi khó hiểu nhưng cũng nên tìm hiểu trước để khi gặp không bị bỡ ngỡ 😅.

_Tham khảo [Variable scope, closure](https://javascript.info/closure)._

### Import và Exports

Trong các project chúng ta sẽ có nhiều file để đảm bảo code ngắn gọn và dễ bảo trì. Cần chú ý giữa **named export** và **default export**.

Ví dụ:

```javascript
/*
 * File util.js
 */

// export một mảng
export let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// export một hằng số
export const YEAR = 2020;

// export một class
export class User {
  constructor(name) {
    this.name = name;
  }
}
```

```javascript
// Import ở 1 file khác để sử dụng

import { month, YEAR, User } from "./util.js";
```

_Tham khảo [Import - Export](https://javascript.info/import-export)._

### Arrow function

**Arrow function** được sử dụng khá nhiều bởi cách viết ngắn gọn và không có "this".

Ví dụ với function thông thường:

```javascript
function sum(a, b) {
  return a + b;
}
```

Viết lại bằng **arrow function**:

```javascript
const sum = (a, b) => a + b;
```

_Tham khảo [Arrow function basics](https://javascript.info/arrow-functions-basics) và [Arrow function revisited](https://javascript.info/arrow-functions)._

### Destructuring assignment

Là cú pháp cho phép tách các object, array ra thành các biến, giúp cho code ngắn gọn hơn thay vì khai báo biến nhiều lần. Ví dụ hay sử dụng trong ReactJS:

```javascript
// Không sử dụng destructuring assignment
function MyComponent(props) {
  let navigation = props.navigation;
  let route = props.route;

  ...
}

// Sử dụng destructuring assignment
function MyComponent({navigation, route}) {
  ...
}
```

Hoặc khi sử dụng useState hook:

```javascript
function MyComponent() {
  const [count, setCount] = React.useState(0);
}
```

_Tham khảo [Destructuring assignment](https://javascript.info/destructuring-assignment)_.

### Rest parameters and spread syntax

**Rest parameters** cho phép chúng ta viết 1 hàm với số lượng tham số là linh động (không biết trước). Ví dụ:

```javascript
function sumAll(...args) {
  // args là tên biến đại diện cho mảng các tham số
  let sum = 0;

  for (let arg of args) sum += arg;

  return sum;
}

alert(sumAll(1)); // 1
alert(sumAll(1, 2)); // 3
alert(sumAll(1, 2, 3)); // 6
```

hoặc:

```javascript
function showName(firstName, lastName, ...otherNames) {
  alert(firstName + " " + lastName); // Robin Huy

  // Rest parameters ...otherNames đại diện cho các tham số còn lại ngoài 2 tham số đầu tiên
  // ví dụ ở đây otherNames sẽ là ["Robin", "Huy"]
  alert(otherNames[0]); // Chris
  alert(otherNames[1]); // Robert
  alert(otherNames.length); // 2
}

showName("Robin", "Huy", "Chris", "Robert");
```

**Spread syntax** có cú pháp và cách hoạt động gần giống như **rest parameters**, nó cho phép "duỗi" một object hoặc array ra thành nhiều biến. Ví dụ:

```javascript
// Hàm Math.max cần truyền vào các số để tính max
alert(Math.max(1, 3, 5, 2)); // Trả về 5

// Tuy nhiên nếu có 1 mảng các số thì chúng ta có thể spread mảng đó ra để sử dụng hàm Math.max
const numbers = [1, 3, 5, 2];
alert(Math.max(numbers)); // Trả về NaN
alert(Math.max(...numbers)); // Trả về 5
```

_Tham khảo [Rest parameters and spread syntax](https://javascript.info/rest-parameters-spread)_.

### Các hàm xử lý mảng

Code ReactJS sẽ phải làm việc với mảng rất nhiều nên phải sử dụng thành thạo các phương thức xử lý mảng như: map, filter, reduce, push, splice, ...

Ví dụ sử dụng phương thức **map** kết hợp **arrow function**:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);
```

Hoặc sử dụng **filter** để lọc phần tử ra khỏi mảng:

```javascript
// Xóa 1 sản phẩm ra khỏi mảng các sản phẩm dựa theo ID truyền vào
function removeProduct(productId) {
  const newProducts = products.filter((product) => product.id !== productId);

  setProducts(newProducts);
}
```

_Tham khảo [Array methods](https://javascript.info/array-methods)_.

---

Trên đây là một vài kiến thức cơ bản mình nghĩ newbie cần phải biết trước khi học ReactJS. Nếu các bạn thấy còn thiếu thì góp ý bổ sung giúp mình ở phần bình luận bên dưới nhé 😘.
