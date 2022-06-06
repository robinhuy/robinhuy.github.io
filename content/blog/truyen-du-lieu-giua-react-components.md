---
title: "Truyền dữ liệu giữa React Components"
date: 2019-11-27
draft: false
tags: ["ReactJS"]
---

_Bài viết được biên dịch và tóm tắt lại từ_ [_https://towardsdatascience.com_](https://towardsdatascience.com/passing-data-between-react-components-parent-children-siblings-a64f89e24ecf) _, code demo được chuyển sang dùng Hooks._

Xử lý dữ liệu trong React có thể hơi khó khăn một chút, nhưng cũng không quá phức tạp. Tôi đã tổng kết lại 3 cách để truyền dữ liệu giữa các Component trong React:

1. Từ Parent (Component cha) đến Child (Component con) sử dụng Props.
2. Từ Child đến Parent sử dụng Callbacks.
3. Giữa các Siblings (anh em, họ hàng, hàng xóm, ...)
   - Kết hợp cách 1 và 2.
   - Sử dụng [Redux](https://redux.js.org/)(hoặc các thư viện có chức năng tương tự).
   - Sử dụng [Context API](https://reactjs.org/docs/context.html) của React.

## 1. Từ Parent đến Child sử dụng Props

Giả sử ứng dụng có cấu trúc Component như sau:

![React component structure](/images/react-component-structure.png)

Đây là trường hợp phổ biến và dễ nhất khi truyền dữ liệu trong React.

```react
import React, {useState} from 'react';

function Parent() {
  const [data, setData] = useState('Hello World')

  return (
    <div>
      <Child1/>   // Không truyền dữ liệu
      <Child2 dataFromParent="Hello" />   // Truyền dữ liệu qua Props
      <Child2 dataFromParent={data} />   // Truyền dữ liệu qua Props
    </div>
  );
}
```

Ở Child component chỉ cần dùng *props.dataFromParent* để lấy dữ liệu đã được truyền từ Parent ( _dataFromParent_ chỉ như một biến, một thuộc tính tự mình đặt ra để truyền dữ liệu qua _props_):

```react
function Child2(props) {
  return (
    <div>
      Dữ liệu nhận được từ Parent: {props.dataFromParent}
    </div>
  );
}
```

## 2. Từ Child đến Parent sử dụng Callbacks

Để truyền dữ liệu từ Child lên Parent chúng ta thực hiện theo các bước sau:

**Bước 1**: Định nghĩa 1 callback function ở Parent component, function này sẽ có tham số để chứa dữ liệu được truyền đi từ Child component.

**Bước 2**: Truyền callback function đã được định nghĩa ở trên vào Child component qua props (tương tự truyền dữ liệu từ Parent đến Child).

```react
import React, {useState} from 'react';

function Parent() {
  const [message, setMessage] = useState('')

  callbackFunction = (childData) => {
    setMessage(childData)
  },

  return (
    <div>
      <Child parentCallback={callbackFunction}/>
      <p> {message} </p>
    </div>
  );
}
```

**Bước 3**: Ở Child component truyền dữ liệu ngược lại Parent bằng cách gọi _props.callback(dataToParent)_

```react
function Child(props) {
  sendData = () => {
    props.parentCallback("Message from Child");
  },

  return (
    // Gọi function sendData bất cứ khi nào bạn muốn truyền dữ liệu lên Parent component (khi có sự kiện xảy ra như onClick, onChange, ...)
  )
};
```

## Truyền dữ liệu giữa các Siblings

### Cách 1: Kết hợp 2 cách truyền dữ liệu ở trên

Cách này chỉ dùng trong trường hợp đơn giản, không nên sử dụng trong trường hợp các Component lồng nhiều cấp (cây gia phả quá lớn, họ hàng bắn đại bác không tới), vì code sẽ trùng lặp nhiều và khó theo dõi luồng dữ liệu.

![React state 1](/images/react-state-1.gif)

### Cách 2: Sử dụng một Global store (Redux) để quản lý State cho tất cả các Component cần truyền dữ liệu và tương tác với nhau

![React state 2](/images/react-state-2.gif)

### Cách 3: Sử dụng Context API của React

![React Context API](/images/react-state-3.png)

Tham khảo thêm 1 số bài viết giới thiệu về React Context API:

- [Using Context in React](https://medium.com/@wisecobbler/using-context-in-react-56a8e7da5431)
- [React Context API — A Replacement for Redux?](https://blog.bitsrc.io/react-context-api-a-replacement-for-redux-6e20790492b3)
- [You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)
