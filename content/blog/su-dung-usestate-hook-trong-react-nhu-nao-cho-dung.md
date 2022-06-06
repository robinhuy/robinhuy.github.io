---
title: "Sử dụng useState() Hook trong React như nào cho đúng?"
date: 2021-02-22
draft: false
tags: ["ReactJS"]
---

Để quản lý State trong React Function Component, chúng ta dùng Hook [useState()](https://reactjs.org/docs/hooks-state.html).

Hàm **useState** trả về 1 mảng 2 phần tử, phần tử đầu tiên là để khởi tạo state, phần tử thứ 2 là hàm để cập nhật state. Tham số truyền vào hàm useState là giá trị khởi tạo của state. Ví dụ:

![React Hook useState](/images/react-hook-usestate.png)

## Khai báo State

Phải khai báo useState ở **top level** của một Function Component (hoặc một custom Hook), không khai báo ở trong một scope nào khác như vòng lặp, điều kiện, hay function con. Ví dụ khai báo state như sau là **sai**:

```jsx
export default function App() {
  function handleClick() {
    const [count, setCount] = useState(0);  // Phải khai báo state ở top-level của Function component
  }

  ...
}
```

Có thể khai báo nhiều biến state khác nhau. Ví dụ:

```jsx
export default function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <div>
      <p>{count1}</p>
      <p>{count2}</p>
    </div>
  );
}
```

## Cập nhật State

Mỗi khi state được cập nhật thì Component sẽ **re-render** (function được chạy lại và giao diện được cập nhật lại theo state). Cần chú ý là không được thay đổi trực tiếp biến state (immutable) mà phải cập nhật thông qua hàm cập nhật state.

Ví dụ như sau là **sai**:

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    count++; // Không được thay đổi trực tiếp state như này
  }

  return (
    <div>
      <p>{count}</p>
      <p>
        <button onClick={handleClick}>Increase count</button>
      </p>
    </div>
  );
}
```

Ví dụ như này là **đúng**:

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // Thay đổi state bằng cách gọi hàm setCount
  }

  return (
    <div>
      <p>{count}</p>
      <p>
        <button onClick={handleClick}>Increase count</button>
      </p>
    </div>
  );
}
```

Chú ý với các state là **array** hoặc **object** thì nên copy giá trị ra 1 biến mới để không làm thay đổi giá trị cũ (pass by reference). Ví dụ:

```jsx
export default function App() {
  const [arr, setArr] = useState([1, 2, 3]);

  // Cách sai
  function addItemToArray1(item) {
    arr.push(item); // Hàm push làm thay đổi giá trị của state arr
    setArr(arr); // React không phát hiện có sự thay đổi state nào nên không cập nhật lại giao diện
  }

  // Cách đúng
  function addItemToArray2(item) {
    setArr([...arr, item]); // Không thay đổi trực tiếp state arr mà tạo ra 1 mảng mới bằng spread syntax
  }
}
```

## Cập nhật state sử dụng callback function

Thay vì cập nhật state bằng cách truyền vào giá trị mới, thì chúng ta có thể cập nhật state bằng cách truyền vào một hàm callback (có tham số là giá trị cũ) và trả về kết quả là giá trị mới. Ví dụ:

```jsx
setCount((prevCount) => prevCount + 1);
```

Dùng cách này thì khi cập nhật state sẽ đảm bảo giá trị mới phụ thuộc vào giá trị cũ chứ không phụ thuộc vào giá trị của state ở thời điểm hiện tại. Tham khảo thêm [https://reactjs.org/docs/hooks-reference.html#usestate](https://reactjs.org/docs/hooks-reference.html#usestate).

Ví dụ với ứng dụng đếm số lượt bấm nút, nếu sửa lại hàm tăng số lượt bấm thành tăng số lượt bấm sau 1 khoảng thời gian (ví dụ 3 giây).

Nếu cập nhật state bằng cách sau thì khi người dùng bấm nút nhiều lần trong khoảng thời gian 3 giây, thì sau 3 giây giá trị của state cũng chỉ tăng lên 1 (lấy giá trị của state ở thời điểm hiện tại cộng thêm 1).

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount(count + 1); // Thay đổi state dựa theo giá trị của state hiện tại
    }, 3000);
  }

  return (
    <div>
      <p>{count}</p>
      <p>
        <button onClick={handleClick}>Increase count after 3 seconds</button>
      </p>
    </div>
  );
}
```

Nếu cập nhật state bằng cách truyền vào một hàm thì trong 3 giây delay, người dùng bấm nút bao nhiêu lần thì giá trị của state sẽ tăng lên bấy nhiêu.

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setTimeout(() => {
      setCount((prevCount) => prevCount + 1); // Thay đổi state dựa theo giá trị của state trước đó
    }, 3000);
  }

  return (
    <div>
      <p>{count}</p>
      <p>
        <button onClick={handleClick}>Increase count after 3 seconds</button>
      </p>
    </div>
  );
}
```

Như vậy tùy từng trường hợp mà chúng ta sẽ lựa chọn cách sử dụng sao cho hợp lý.

_Code demo: [https://codepen.io/robinhuy/pen/MWjEaYx?editors=0010](https://codepen.io/robinhuy/pen/MWjEaYx?editors=0010)._
