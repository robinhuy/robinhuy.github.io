---
title: "Hướng dẫn sử dụng RTK Query trong Redux Toolkit"
date: 2021-10-13
draft: false
images: ["/images/redux-toolkit.jpg"]
tags: ["ReactJS", "Redux Toolkit"]
---

{{< link link="https://redux-toolkit.js.org/rtk-query/overview" text="RTK Query" >}} là một addon trong bộ thư viện Redux Toolkit. Nó giúp chúng ta thực hiện data fetching một cách đơn giản hơn thay vì sử dụng _createAsyncThunk_ để thực hiện async action. Chú ý RTK Query là dùng để _query_ (kết nối API), chứ không phải dùng để code async trong Redux thay cho _createAsyncThunk_.

Nếu bạn chưa từng sử dụng Redux Toolkit thì có thể xem bài hướng dẫn này trước: [Hướng dẫn sử dụng React Router và Redux Toolkit](/blog/huong-dan-su-dung-react-router-va-redux-toolkit).

Còn nếu chưa biết cách dùng _createAsyncThunk_ thì xem bài hướng dẫn này: [Hướng dẫn sử dụng createAsyncThunk trong Redux Toolkit](/blog/huong-dan-su-dung-createasyncthunk-trong-redux-toolkit).

Chúng ta sẽ tiếp tục sử dụng ví dụ này để demo: [https://stackblitz.com/edit/react-router-redux-toolkit-fetch-api?file=src/App.js](https://stackblitz.com/edit/react-router-redux-toolkit-fetch-api?file=src/App.js). Trong code mẫu này có sử dụng createAsyncThunk và fetch API để kết nối đến API. Chúng ta sẽ thay thế phần kết nối API bằng RTK Query.

![Login form sử dụng ReactJS + Redux Toolkit + RTK Query](/images/redux-toolkit-login-form-demo.png)

Đầu tiên chúng ta tạo 1 file mới, tương tự như tạo một slice, và file này sẽ dùng để khai báo các lệnh gọi API. Ví dụ trong thư mục store tạo thêm file **api.js** với nội dung như sau:

```react
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  // Tương tự tên Slice khi tạo Slice thông thường
  reducerPath: "api",

  // Cấu hình chung cho tất cả request
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fake-rest-api-nodejs.herokuapp.com/",
  }),

  // Các endpoints (lệnh gọi request)
  endpoints: (builder) => ({}),
});
```

Nhúng API này vào trong store như một Slice, sửa file `store/index.js`:

```react
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    // Tạo thêm slice từ api
    [api.reducerPath]: api.reducer,

    // Slice thông thường
    user: userReducer,
  },

  // Thêm cấu hình middleware để dùng được các chức năng của RTK Query như caching, invalidation, polling, ...
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
```

Sau khi cấu hình xong, chúng ta có thể thêm các endpoint để thực hiện request đến API. Endpoint trong RTK Query phân làm 2 loại:

- {{< link link="https://redux-toolkit.js.org/rtk-query/usage/queries" text="Query" >}}: Dùng để lấy dữ liệu (có thể lưu cache).
- {{< link link="https://redux-toolkit.js.org/rtk-query/usage/mutations" text="Mutation" >}}: Dùng để cập nhật dữ liệu (validate cache).

Với request login thì mình sẽ dùng loại _mutation_, sửa lại phần **endpoints** của file `store/api.js`:

```react
export const api = createApi({
  ...
  endpoints: (builder) => ({
    // Tạo 1 request dạng mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: `login`,
        method: 'POST',
        body: credentials,
      }),
    }),

    getUsers: builder.query({
      query: () => `users`,
    }),
  }),
  ...
}

// Export ra ngoài thành các hooks để sử dụng theo cú pháp use + endpoints (login) + endpoints type (mutation)
export const { useLoginMutation } = api;
```

Sửa lại trang login, sử dụng mutation ở trên để gọi API:

```react
...
// Import hook để sử dụng
import { useLoginMutation } from '../store/api';

export default function Login() {
  // Sử dụng hook useLoginMutation sẽ trả về method login dùng để gọi request
  // kèm theo 1 số trạng thái như loading, dữ liệu hoặc lỗi trả về khi gọi request
  const [login, { isLoading, data, error }] = useLoginMutation();
  ...
  return (
    <>
      ...
      {/* Gọi login method lấy từ hook useLoginMutation() ở trên */}
      {/* Có thể sử dụng biến isLoading để hiển thị trạng thái loading thay cho state */}
      <button onClick={() => login({ email, password })} disabled={isLoading}>
        Login
      </button>
    </>
  );
}
```

Như vậy việc gọi API sẽ trở nên dễ dàng hơn. Bạn cũng có thể sử dụng biến `error` để hiển thị báo lỗi trên giao diện.

Trong trường hợp cần lưu dữ liệu vào trong store, ví dụ cập nhật state ở Slice khác thì làm tương tự như khi dùng _createAsyncThunk_. Sửa lại file `store/userSlice.js` để thêm logic lưu thông tin user sau khi user đăng nhập thành công:

```react
  extraReducers: (builder) => {
    // Xử lý logic khi endpoint login được fulfilled
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      // Lưu thông tin user vào state
      state.currentUser = action.payload;
    });
  },
```

Hoặc RTK Query cũng hỗ trợ lấy state từ Slice khác. Ví dụ sau khi login thành công thì các request đến private API cần có gửi thêm token. Chúng ta có thể lấy token từ trong userSlice (state currentUser).

Sửa lại hàm **fetchBaseQuery()** ở `store/api.js` để cho phép các request đều gửi kèm token nếu có:

```react
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fake-rest-api-nodejs.herokuapp.com/',

    // Xử lý header trước khi gửi request
    prepareHeaders: (headers, { getState }) => {
      // getState() giúp lấy ra toàn bộ state trong store
            // getState().user lấy ra state trong userSlice
      const token = getState().user.currentUser?.token;

      // Nếu có token thì thêm vào headers
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
```

Kiểm tra thử bằng cách tạo thêm 1 endpoint nữa để lấy ra danh sách user. Endpoint này là private và nếu không có token sẽ trả về lỗi 401. Bổ sung thêm endpoint `getUsers` vào file `store/api.js`:

```react {hl_lines=["7-9"]}
export const api = createApi({
  ...
  endpoints: (builder) => ({
    login: builder.mutation(...),

    // Thêm endpoint dạng query
    getUsers: builder.query({
      query: () => `users`,
    }),
  }),
  ...
}

// Export các hooks ra ngoài để sử dụng
export const { useLoginMutation, useGetUsersQuery } = api;
```

Sửa lại nội dung trang `Dashboard` (sau khi login thành công) để hiển thị thông tin users lấy từ API:

```react
...
import { useGetUsersQuery } from '../store/api';

export default function Dashboard() {
  // Sử dụng hook useGetUsersQuery để gọi API
  const { data, isLoading, error } = useGetUsersQuery();

  ...

  return (
    <>
      ...

      <h2>User List</h2>

      {isLoading ? (
        'fetching data ...'
      ) : (
        <ul>
          {data?.map((item) => (
            <li key={item.id}>
              {item.firstName} {item.lastName}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
```

Vậy là chúng ta đã làm xong một ứng dụng nhỏ sử dụng RTK Query cho việc fetching data. Addon này còn nhiều chức năng nữa như caching, prefetching, polling, code splitting, ... các bạn hãy đọc thêm document trên trang chủ của thư viện để áp dụng vào dự án.

Tham khảo toàn bộ code mẫu tại đây: [https://stackblitz.com/edit/react-router-redux-toolkit-fetch-api-2c64iz?file=src/App.js](https://stackblitz.com/edit/react-router-redux-toolkit-fetch-api-2c64iz?file=src/App.js).

Happy coding 😎
