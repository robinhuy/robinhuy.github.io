---
title: "Hướng dẫn sử dụng createAsyncThunk trong Redux Toolkit"
date: 2021-10-12
draft: false
images: ["/images/redux-toolkit.jpg"]
tags: ["ReactJS", "Redux Toolkit"]
---

Nếu bạn chưa từng sử dụng Redux Toolkit thì có thể xem bài hướng dẫn này trước: [Hướng dẫn sử dụng React Router và Redux Toolkit](/blog/huong-dan-su-dung-react-router-va-redux-toolkit).

Bài viết này mình sẽ hướng dẫn cách thực hiện các _async logic_ (xử lý bất đồng bộ) trong Redux Toolkit, cụ thể là sử dụng **createAsyncThunk** để kết nối với API login.

Ví dụ demo chúng ta có thể lấy luôn từ ví dụ trước rồi cải tiến thêm: {{< link link="https://stackblitz.com/edit/react-router-redux-toolkit?file=src/index.js" text="https://stackblitz.com/edit/react-router-redux-toolkit?file=src/index.js" >}}.

Đầu tiên là bổ sung giao diện để có thêm ô nhập mật khẩu vì khi gọi API sẽ cần có _email_ và _password_.

![Login form](/images/login-form-demo.png)

Bây giờ khi người dùng bấm nút Login, chúng ta sẽ gọi vào API để thực hiện login. Để gọi API thì chúng ta dùng luôn hàm {{< link link="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API" text="fetch()" >}} có sẵn. Lệnh **fetch()** là một lệnh async, nên sẽ không viết code logic vào trong action để cập nhật state như trước, mà chúng ta sẽ dùng hàm **createAsyncThunk** để tạo ra các async action.

Ví dụ tạo một async action (và export luôn ra ngoài để sử dụng ở Component):

```react
export const login = createAsyncThunk(
  // Tên action
  "user/login",

  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    // Gọi lên API backend
    const response = await fetch(
      "https://fake-rest-api-nodejs.herokuapp.com/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    // Convert dữ liệu ra json
    const jsonData = await response.json();

    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData);
    }

    // Còn không thì trả về dữ liệu
    return jsonData;
  }
);
```

Ví dụ trên sẽ tạo 1 request đến API backend: {{< link link="https://fake-rest-api-nodejs.herokuapp.com/login" text="https://fake-rest-api-nodejs.herokuapp.com/login" >}}, API này sẽ trả về thông tin user nếu đăng nhập thành công. Các bạn có thể tự tạo một API riêng bằng cách dùng tool này: {{< link link="https://github.com/robinhuy/fake-rest-api-nodejs" text="https://github.com/robinhuy/fake-rest-api-nodejs" >}} (xem hướng dẫn Tiếng Việt [tại đây](/blog/tao-1-rest-api-phuc-vu-cho-muc-dich-hoc-tap-trong-30-giay)).

Tiếp theo chúng ta sẽ tạo ra các extra Reducers dùng để xử lý các trạng thái của async action ở trên:

```react
// Tạo login action (async)
export const login = createAsyncThunk("user/login", {
  // Code như trên
});

export const userSlice = createSlice({
  name: "user",

  // Thêm 1 số state như trạng thái loading, báo lỗi và thông tin user đang đăng nhập
  initialState: {
    isLoading: false,
    errorMessage: "",
    currentUser: null,
  },

  // Các action bình thường (sync action)
  reducers: {
    // Logout không gọi API mà chỉ đơn giản là cập nhật state
    logout: (state) => {
      state.currentUser = null;
      state.errorMessage = "";
    },
  },

  // Code logic xử lý async action
  extraReducers: (builder) => {
    // Bắt đầu thực hiện action login (Promise pending)
    builder.addCase(login.pending, (state) => {
      // Bật trạng thái loading
      state.isLoading = true;
    });

    // Khi thực hiện action login thành công (Promise fulfilled)
    builder.addCase(login.fulfilled, (state, action) => {
      // Tắt trạng thái loading, lưu thông tin user vào store
      state.isLoading = false;
      state.currentUser = action.payload;
    });

    // Khi thực hiện action login thất bại (Promise rejected)
    builder.addCase(login.rejected, (state, action) => {
      // Tắt trạng thái loading, lưu thông báo lỗi vào store
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});
```

Sau khi code xong action thì chúng ta _dispatch_ như bình thường. Ví dụ truyền vào 1 object có chứa _email_ và _password_:

```react
<button onClick={() => dispatch(login({ email, password }))}>Login</button>
```

Sửa lại thêm một số logic khi có thêm các state như _isLoading_, _currentUser_, _errorMessage_, cái này thì các bạn hãy thử tự làm vì cách lấy state ra vẫn như cũ.

Tham khảo toàn bộ code mẫu tại đây: {{< link link="https://stackblitz.com/edit/react-router-redux-toolkit-fetch-api?file=src/App.js" text="https://stackblitz.com/edit/react-router-redux-toolkit-fetch-api?file=src/App.js" >}}.

Happy coding 😎
