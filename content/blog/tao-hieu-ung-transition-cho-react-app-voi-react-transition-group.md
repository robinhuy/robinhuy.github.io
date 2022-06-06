---
title: "Tạo hiệu ứng transition cho React App với React Transition Group"
date: 2021-12-14
draft: false
tags: ["ReactJS"]
---

Để cho các App React hoạt động mượt mà hơn, đẹp hơn, trải nghiệm người dùng tốt hơn, ... thì nên có thêm các hiệu ứng animation, transition.

Bài viết này mình sẽ hướng dẫn các bạn sử dụng thư viện [React Transition Group](https://reactcommunity.org/react-transition-group/) để tạo hiệu ứng transition một cách nhanh chóng.

Để cho tiện thì mình sẽ demo code trên [stackblitz.com](https://stackblitz.com/). Trong ví dụ sẽ sử dụng cả React Router v6 để cấu hình multiple page, và có hiệu ứng transition giữa các page. Dưới đây là danh sách các dependencies sử dụng trong ví dụ demo:

![Danh sách dependencies](/images/react-transition-group-demo.png)

## Cấu hình React Router (v6)

React Transition Group cung cấp cho chúng ta 4 Component để hỗ trợ cho việc tạo transition, do đó mình sẽ tạo ra 4 page để demo, và có transition giữa các page.

Tạo ra 4 function Component rỗng đại diện cho mỗi page là `Home.js`, `Page1.js`, `Page2.js`, `Page3.js`. Ví dụ Component Home:

```jsx
import React from 'react';

export default function Home() {
    return (
        <h1>Home Page</h1>
    )
}
```

Sau đó cấu hình Router cho website ở `App.js`:

```jsx
import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Page1 from './pages/page1/Page1';
import Page2 from './pages/page2/Page2';
import Page3 from './pages/page3/Page3';

export default function App() {
  return (
    <BrowserRouter>
      {/* Tạo menu */}
      <nav
        style={{
          borderBottom: 'solid 1px',
          padding: '1rem 0',
        }}
      >
        <Link to="/">Home</Link>
        {' | '}
        <Link to="/page1">Page 1</Link>
        {' | '}
        <Link to="/page2">Page 2</Link>
        {' | '}
        <Link to="/page3">Page 3</Link>
      </nav>

      {/* Cấu hình Route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>
    </BrowserRouter>
  );
}
```

Sau khi cấu hình xong chúng ta có 1 website đơn giản gồm 4 trang, và có menu để chuyển trang.

![React Router v6 demo](/images/react-router-demo.png)

Tiếp theo mình sẽ demo các Component mà React Transition Group cung cấp.

## Transition Component

Dùng để tạo transition cho một Component khi nó thay đổi trạng thái (thường là chuyển đổi giữa mount và unmount).

Ví dụ sau sẽ tạo hiệu ứng transition khi Component xuất hiện (enter) và biến mất (exit):

```jsx
import React, { useState } from 'react';
import { Transition } from 'react-transition-group';

// Tạo một biến lưu thời gian chạy transition
const duration = 1000; // 1000ms = 1s

// Có 4 trạng thái chính của một Transition
// => Tạo ra một object để style cho các trạng thái này
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export default function Home() {
  // Tạo state để ẩn hiện Component
  const [isShow, setShow] = useState(false);

  return (
    <div>
      <h1>Home</h1>

      {/* Sử dụng component Transition để tạo hiệu ứng transition */}
      <Transition in={isShow} timeout={duration}>
        {/* Nội dung bên trong là 1 hàm với tham số là state của Transition (4 state) */}
        {(state) => (
          {/* Component sẽ hiển thị (hoặc biến mất) dựa vào state isShow */}
          {/* Sử dụng inline style để tạo style transition */}
          <div
            style={{
              transition: `opacity ${duration}ms ease-in-out`,
              opacity: 0,
              ...transitionStyles[state],
            }}
          >
            Component content
          </div>
        )}
      </Transition>

      <br />

      {/* Bấm nút để hiển thị Component */}
      <button onClick={() => setShow(true)}>Show</button>

      {/* Bấm nút để ẩn Component */}
      <button onClick={() => setShow(false)}>Hide</button>
    </div>
  );
}
```

## CSSTransition Component

Sử dụng CSS để tạo Transition. Compnent này tương tự Component Transition và kế thừa các thuộc tính của Component Transition.

Ví dụ sau tạo hiệu ứng tương tự như ví dụ trước, nhưng sử dụng CSS ở một file riêng:

```jsx
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
// Nhúng CSS từ file vào Component
import './style.css';

export default function Page1() {
  // Tạo state để ẩn hiện Component
  const [isShow, setShow] = useState(false);

  return (
    <div>
      <h1>Page 1</h1>

      {/* Sử dụng component CSSTransition để tạo hiệu ứng transition */}
      {/* Chú ý classNames my-node sẽ được sử dụng ở file CSS để style */}
      <CSSTransition in={isShow} timeout={1000} classNames="my-node">
        <div className="content">Component content</div>
      </CSSTransition>

      <br />

      <button onClick={() => setShow(true)}>Show</button>
      <button onClick={() => setShow(false)}>Hide</button>
    </div>
  );
}```

```CSS
/* Thêm CSS để ban đầu ẩn luôn Component */
.content {
  opacity: 0;
}

/* Sử dụng class my-node và kèm thêm các suffix để style */

/* -enter: Component bắt đầu xuất hiện */
.my-node-enter {
  opacity: 0;
}

/* -enter-active: Component đang xuất hiện */
.my-node-enter-active {
  opacity: 1;
  transition: opacity 1000ms;
}

/* -enter-done: Component kết thúc hiệu ứng xuất hiện */
.my-node-enter-done {
  opacity: 1;
}

/* -exit: Component bắt đầu biến mất */
.my-node-exit {
  opacity: 1;
}

/* -exit-active: Component đang biến mất */
.my-node-exit-active {
  opacity: 0;
  transition: opacity 1000ms;
}

/* -exit-done: Component kết thúc hiệu ứng biến mất */
.my-node-exit-done {
  opacity: 0;
}
```

## SwitchTransition Component

Sử dụng khi muốn điều khiển việc render Component theo state với 2 chế độ `in-out` và `out-in` (dùng kết hợp với Transition hoặc CSSTransition).

Ví dụ sau sẽ tạo transition khi thay đổi trạng thái của Component, nội dung của Component thay đổi kèm hiệu ứng transition:

```jsx
import React, { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';
import './style.css';

export default function Home() {
  const [state, setState] = useState(false);

  return (
    <div>
      <h1>Page 2</h1>

      {/* Thử thay mode="in-out" để xem hiệu ứng transition khác nhau */}
      <SwitchTransition mode="out-in">
        <CSSTransition
          // Dùng key để phân biệt các trạng thái
          key={state ? 'out' : 'in'}

                    // Sử dụng event transitionend để đánh dấu kết thúc transition
          addEndListener={(node, done) =>
            node.addEventListener('transitionend', done)
          }

                    // Tạo hiệu ứng fade transition theo class "fade"
          classNames="fade"
        >
          <button onClick={() => setState((state) => !state)}>
            {state ? 'Goodbye!' : 'Hello!'}
          </button>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
}
```

```css
.fade-enter{
  opacity: 0;
}
.fade-exit{
  opacity: 1;
}
.fade-enter-active{
  opacity: 1;
}
.fade-exit-active{
  opacity: 0;
}
.fade-enter-active,
.fade-exit-active{
  transition: opacity 500ms;
}
```

## TransitionGroup Component

Sử dụng để tạo hiệu ứng transition cho 1 danh sách (list) các Component. Ví dụ demo mình lấy luôn trên docs của thư viện nhưng tối giản đi một chút:

```jsx
import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { nanoid } from 'nanoid';
import './style.css';

export default function Page3() {
  // Tạo ra một list, sử dụng nanoid() để sinh unique id cho item
  const [items, setItems] = useState([
    { id: nanoid(), text: 'Buy eggs' },
    { id: nanoid(), text: 'Pay bills' },
    { id: nanoid(), text: 'Invite friends over' },
    { id: nanoid(), text: 'Fix the TV' },
  ]);

  return (
    <div>
      <h1>Page 3</h1>

      <TransitionGroup className="todo-list">
        {/* Render list, mỗi item trong list bọc trong Component CSSTransition */}
        {items.map(({ id, text }) => (
                    // Lấy id của item làm key cho CSSTransition
          <CSSTransition key={id} timeout={500} classNames="item">
            <div className="container">
              {text}
              <button
                className="btn-remove"
                onClick={() =>
                  setItems((items) => items.filter((item) => item.id !== id))
                }
              >
                &times;
              </button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <button
        className="btn-add"
        onClick={() => {
          const text = prompt('Enter some text');
          if (text) {
            setItems((items) => [...items, { id: nanoid(), text }]);
          }
        }}
      >
        Add Item
      </button>
    </div>
  );
}
```

```css
/* Style */
.container {
  margin: 15px 0;
}
.btn-remove {
  margin-left: 0.5rem;
}
.btn-add {
  margin-top: 0.5rem;
}

/* Transition */
.item-enter {
  opacity: 0;
}
.item-enter-active {
  opacity: 1;
  transition: opacity 500ms ease-in;
}
.item-exit {
  opacity: 1;
}
.item-exit-active {
  opacity: 0;
  transition: opacity 500ms ease-in;
}
```

## Transition giữa các Page

Để tạo transition giữa các page ta có thể dùng Component TransitionGroup. Tuy nhiên cần có **key** phân biệt giữa các Component được render. Mình sử dụng đường dẫn để làm **key**, do đó cần sử dụng thêm hook `useLocation` của React Router để lấy ra được đường dẫn.

Hook `useLocation` chỉ sử dụng được khi nằm trong Component `BrowserRouter` nên chúng ta phải tạo thêm 1 Component con để tạo transition. Tạo thêm một Component là `RoutesWithTransition`:

```jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Home from './pages/Home';
import Page1 from './pages/page1/Page1';
import Page2 from './pages/page2/Page2';
import Page3 from './pages/page3/Page3';
import './style.css';

export default function RoutesWithTransition() {
  // Lấy ra location dùng hook useLocation
  const location = useLocation();

  return (
    <TransitionGroup>
            {/* Dùng location.pathname làm key */}
      <CSSTransition key={location.pathname} classNames="slide" timeout={300}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
```

Sau đó đổi lại phần cấu hình routes ở `App.js` sử dụng Component trên:

```jsx
...
    <BrowserRouter>
      <nav>...</nav>

      {/* Config routes */}
      <RoutesWithTransition />
    </BrowserRouter>
...
```

Tham khảo toàn bộ code mẫu tại đây: [https://stackblitz.com/edit/react-transition-group-react-router-v6?file=src/App.js](https://stackblitz.com/edit/react-transition-group-react-router-v6?file=src/App.js).

Happy coding 😎