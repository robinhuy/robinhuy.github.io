---
title: "Hướng dẫn sử dụng React Router và Redux Toolkit"
date: 2021-04-29
draft: false
tags: ["ReactJS", "Redux Toolkit", "React Router"]
---

Với những người mới học React thì {{< link link="https://redux.js.org/" text="Redux" >}} thực sự là một cơn ác mộng. Cũng giống như bạn đang code jQuery quen và chuyển sang React, đang chỉnh sửa DOM trực tiếp lại phải chuyển qua dùng state, …

Vậy để làm quen với Redux một cách nhanh nhất, chúng ta sẽ thử làm 1 ứng dụng đơn giản như sau:

- Một website có 2 trang: Dashboard và Login.
- Ở trang login cho phép nhập username, và khi chuyển qua trang Dashboard thì hiển thị username đó, nếu không nhập gì thì hiển thị là “Guest”.
- Demo: [https://react-router-redux-toolkit.stackblitz.io](https://react-router-redux-toolkit.stackblitz.io).

Yêu cầu cần biết kiến thức cơ bản về React như state, props, function component, …

## Bước 1: Tạo project

Các bạn có thể tạo project local bằng [create-react-app](https://github.com/facebook/create-react-app) hoặc code online trên [stackblitz.com](https://stackblitz.com/).

Sau khi tạo project thì cài các thư viện cần thiết: react-router-dom, @reduxjs/toolkit và react-redux

```bash
yarn add react-router-dom @reduxjs/toolkit react-redux
```

{{< figure src="/images/react-router-redux-toolkit-demo.png" alt="Stackblitz react redux" title="Trên stackblitz thì thêm thư viện ở mục Dependencies" >}}

## Bước 2: Cấu hình router

Để tạo một website có nhiều page, mình sử dụng thêm thư viện [React Router](https://reactrouter.com/).

Trong ví dụ có 2 trang là Dashboard và Login, thì chúng ta tạo 2 function component tương ứng cho 2 trang, và cấu hình router (đường dẫn cho các trang) ở root component là App như sau:

```react
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.js";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Redirect to="/login" />
      </Switch>
    </Router>
  );
}
```

Đoạn code trên có ý nghĩa: Nếu người dùng truy cập website theo đường dẫn _“/login”_ thì sẽ hiển thị nội dung của Login component, _“/dashboard”_ thì hiển thị nội dung của Dashboard component, còn các trường hợp khác thì sẽ chuyển về đường dẫn _“/login”_ (redirect).

Component Login và Dashboard đặt trong thư mục **pages** và có nội dung đơn giản như sau:

```react
// pages/Login.js

import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  // Khởi tạo state lưu giá trị người dùng nhập vào ô input username
  const [username, setUsername] = useState("");

  // Sử dụng hook useHistory() của react-router-dom để chuyển hướng người dùng sang trang khác
  const history = useHistory();

  // Hàm xử lý khi người dùng bấm nút login
  function handleLogin() {
      // Chuyển hướng họ sang trang dashboard
      history.push("/dashboard");
  }

  return (
    <>
      <h1>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
      />{" "}
      <button onClick={handleLogin}>Login</button>
    </>
  );
}
```

```react
// pages/Dashboard.js

import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <h1>Dashboard</h2>
      <h2>Welcome Guest</h2>
      <Link to="/login">Log out</Link>
    </>
  );
}
```

Mục tiêu cần làm tiếp theo là khi người dùng nhập dữ liệu vào ô input ở trang Login sau đó bấm nút login thì chuyển qua trang Dashboard, và ở trang này hiển thị được giá trị vừa nhập chỗ “Welcome Guest”. Để làm được chức năng này thì có nhiều cách, và trong bài này thì mình sẽ hướng dẫn cách sử dụng Redux. Tham khảo thêm bài viết [Truyền dữ liệu giữa các Component trong React](/blog/truyen-du-lieu-giua-react-components).

## Bước 3: Cấu hình Redux Store

Để truyền dữ liệu giữa các Component dễ hơn thì chúng ta dùng Redux, và cụ thể hơn trong ví dụ này chúng ta dùng [Redux Toolkit](https://redux-toolkit.js.org/) để cấu hình nhanh hơn và dễ hơn dùng Redux Core.

Các bạn hình dung Redux Store như 1 nơi lưu state global mà tất cả các Component trong phạm vi của Store đều có thể truy xuất để lấy dữ liệu hoặc cập nhật dữ liệu. Giao diện của các Component đó cũng sẽ được tự động cập nhật khi state thay đổi.

Với các dự án lớn thì trong Store có thể chia ra nhiều Slice (nhóm các state theo chức năng). Với ví dụ đơn giản này thì chúng ta chỉ cần 1 Slice, tạo Slice là **userSlice** tương tự như sau:

```react
// store/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Khởi tạo state cho slice, có thể kèm giá trị mặc định ban đầu
const initialState = {
  username: "Guest", // State username với giá trị mặc định là "Guest"
  // Có thể khai báo nhiều state khác nữa
};

// Cấu hình slice
export const userSlice = createSlice({
  name: "user", // Tên của slice, mỗi slice đặt 1 tên khác nhau để phân biệt
  initialState,
  // Reducers chứa các hàm xử lý cập nhật state
  reducers: {
    updateUsername: () => {},
  },
});

// Export action ra để sử dụng cho tiện.
export const { updateUsername } = userSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectUsername = (state) => state.user.username;

// Export reducer để nhúng vào Store
export default userSlice.reducer;
```

Tạo 1 file để cấu hình Store:

```react
// store/index.js

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer, // Khai báo 1 slide tên là user với giá trị là userReducer được export ở file userSlice
    // Có thể khai báo nhiều slide khác tương tự
  },
});
```

Khai báo phạm vi sử dụng Store, ở đây mình dùng cho toàn bộ website nên sẽ khai báo ở file **index.js**:

```react
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

import App from "./App";

// Bọc App component vào trong Store Provider để App và toàn bộ Component con đều có thể truy xuất đến Store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

## Bước 4: Tương tác với Redux Store

Để cập nhật state trong Store thì chúng ta cần dispatch action tương ứng được khai báo trong phần reducers của slice.

Sửa lại Login Component như sau:

```react
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// Import hook useDispatch từ react-redux và action updateUsername từ userSlice
import { useDispatch } from "react-redux";
import { updateUsername } from "../store/userSlice";

export default function Login() {
const [username, setUsername] = useState("");
const history = useHistory();

const dispatch = useDispatch();

function handleLogin() {
  // Dispatch action updateUsername vào store, action này có payload (dữ liệu đi kèm) là username
  dispatch(updateUsername(username));

  history.push("/dashboard");
}

...

}
```

Sửa lại nội dung hàm **updateUsername** trong reducers của **userSlice**:

```react
reducers: {
  // Hàm có 2 tham số là state hiện tại và action truyền vào
  updateUsername: (state, action) => {
    // Cập nhật state username với giá trị truyền vào qua action (action.payload)
    // Chạy thử console.log(action) để xem chi tiết giá trị action truyền vào
    state.username = action.payload;
  };
}
```

Chú ý là khi cập nhật state chúng ta có thể thay đổi trực tiếp state chứ không như khi dùng local state trong Component, đó là do Redux Toolkit sử dụng thêm thư viện [immer](https://github.com/immerjs/immer). Và ở trong các reducer này chúng ta chỉ viết code sync chứ không viết code async. Để viết code async các bạn tham khảo bài viết sau [Hướng dẫn sử dụng createAsyncThunk trong Redux Toolkit](/blog/huong-dan-su-dung-createasyncthunk-trong-redux-toolkit) hoặc [Hướng dẫn sử dụng RTK Query trong Redux Toolkit](/blog/huong-dan-su-dung-rtk-query-trong-redux-toolkit).

Tiếp theo sửa lại Dashboard component để hiển thị giá trị state **username** ra ngoài màn hình:

```react
import React from "react";
import { Link } from "react-router-dom";

// Import hook useSelector từ react-redux và hàm selectUsername từ userSlice
import { useSelector } from "react-redux";
import { selectUsername } from "../store/userSlice";

export default function Dashboard() {
// Lấy ra state username từ store
// Hàm useSelector cần truyền vào 1 hàm callback có tham số là root state và trả về state cần lấy
const username = useSelector(selectUsername);

return (
    <>
      <h1>Dashboard</h2>

      {/* In biến username ra màn hình */}
      <h2>Welcome {username}</h2>

      <Link to="/login">Log out</Link>
    </>
  );
}
```

Vậy là chúng ta đã hoàn thành ứng dụng demo sử dụng React Router và Redux Toolkit. Các bạn có thể xem toàn bộ code mẫu tại đây: [https://stackblitz.com/edit/react-router-redux-toolkit?file=src/index.js](https://stackblitz.com/edit/react-router-redux-toolkit?file=src/index.js).

Happy coding 😎
