---
title: "Ref và Reactive trong Vue 3"
date: 2023-02-04
draft: false
images: ["/images/vue-3-ref-vs-reactive.png"]
tags: ["Vue 3"]
---

Trong Vue 3 có hai {{< link link="https://vuejs.org/api/reactivity-core.html" text="Reactivity API" >}} mà dễ làm newbie gây nhầm lẫn khi sử dụng đó là {{< link link="https://vuejs.org/api/reactivity-core.html#ref" text="ref" >}} và {{< link link="https://vuejs.org/api/reactivity-core.html#reactive" text="reactive" >}}. Bài viết này mình sẽ hướng dẫn cách sử dụng 2 API trên, kèm một số so sánh với Vue 2 cho những ai mới chuyển từ Vue 2 lên Vue 3.

## Ref

Ví dụ đơn giản khi thay đổi một _reactive state_ bằng Vue 2:

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },

  methods: {
    increaseCount() {
      this.count++;
    },
  },
};
</script>

<template>
  <h1>Count: {{ count }}</h1>
  <button @click="increaseCount">Increase Count</button>
</template>
```

Chức năng tương tự nhưng sử dụng **ref()** trong Vue 3:

```vue
<script setup>
import {ref} from "vue";

// Tạo 1 reactive state count = 0 (count ở đây là một Proxy object chứ không phải number)
const count = ref(0);

const increaseCount = () => {
  // Tăng giá trị của count bằng cách cập nhật giá trị thuộc tính value
  count.value++;
};
</script>

<template>
  <h1>Count: {{ count }}</h1>
  <button @click="increaseCount">Increase Count</button>
</template>
```

Để hiểu rõ hơn về nguyên lý hoạt động của **ref()**, các bạn nên tìm hiểu thêm về {{< link link="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy" text="Proxy trong Javascript" >}}.

**Một số chú ý về ref():**

- Chúng ta có thể lưu dữ liệu gì vào _ref object_ cũng được.

- Ref object là _mutable_, khi cần thay đổi giá trị thì có thể thay đổi trực tiếp thuộc tính **value** của nó. Tuy nhiên khi dùng ref object ở template thì chúng ta không cần **.value** vì nó được tự động _unwrap_.

## Reactive

Trong đa số trường hợp, chúng ta chỉ cần dùng **ref()** là đủ. Vậy dùng **reactive()** để làm gì?

**reactive()** hoạt động tương tự **ref()** nhưng nó chỉ nhận tham số là object, không nhận các kiểu dữ liệu _primitives_ (number, string, boolean). Và chúng ta thay đổi giá trị của _reactive object_ bằng cách thay đổi các thuộc tính của nó (thay vì thay đổi thuộc tính _value_ như _ref_). Ví dụ ở trên viết lại bằng **reactive()**:

```vue
<script setup>
import {reactive} from "vue";

// Tạo 1 reactive state có thuộc tính count = 0
const state = reactive({ count: 0 });

const increaseCount = () => {
  // Tăng giá trị của thuộc tính count
  state.count++;
};
</script>

<template>
  <h1>Count: {{ state.count }}</h1>
  <button @click="increaseCount">Increase Count</button>
</template>
```

Về bản chất **ref()** là một hàm wrap lại **reactive** (bên trong _ref()_ sử dụng _reactive()_), nên trong đa số trường hợp chúng ta có thể sử dụng hầu hết **ref()** cho đồng bộ và đỡ phải nhớ nhiều, chỉ cần chú ý khi thay đổi giá trị của _ref object_ phải thông qua thuộc tính _value_. Bạn cũng có thể dùng **reactive** khi muốn tạo 1 state tập trung để đỡ phải tạo nhiều biến, ví dụ:

```javascript
// Dùng ref()
const isLoading = ref(false);
const isError = ref(false);
const user = ref({
  name: "Robin",
  role: "Admin",
});

// Dùng reactive()
const state = reactive({
  isLoading: false,
  isError: false,
  user: {
    name: "Robin",
    role: "Admin",
  },
});
```

Chú ý khi dùng **reactive** chúng ta chỉ được truyền vào một object và khi update thì sẽ update các thuộc tính của object đó, chứ không dùng phép gán trực tiếp vào _reactive object_. Ví dụ như sau là sai:

```vue {hl_lines=["11"]}
<script setup>
import {reactive} from "vue";

// Tạo 1 reactive object user
const user = reactive({ name: "Robin", role: "Admin" });

const updateUser = () => {
  // Ví dụ dữ liệu mới lấy từ form, api, ... sau đó update trực tiếp bằng phép gán

  // Code sai
  user = { name: "Huy", role: "Staff" };
};
</script>

<template>
  <h1>User name: {{ user.name }}</h1>
  <h1>User role: {{ user.role }}</h1>

  <button @click="updateUser">Update</button>
</template>
```

Ở dòng 20 ví dụ trên là code sai do chúng ta gán giá trị cho biến user thành một object mới. Nếu ở lúc khai báo dùng `const` thì sẽ báo lỗi luôn, còn nếu dùng `let` thì code đúng cú pháp nhưng khi bấm nút thì giao diện không update do biến **user** không còn là _reactive object_ nữa, chỉ là một object bình thường. Có thể sửa lại bằng cách cập nhật từng thuộc tính một:

```javascript
user.name = "Huy";
user.role = "Staff";
```

Hoặc sử dụng `ref()`:

```vue {hl_lines=["5", "9"]}
<script setup>
import {ref} from "vue";

// Tạo 1 ref object user
const user = ref({ name: "Robin", role: "Admin" });

const updateUser = () => {
  // Cập nhật ref object qua thuộc tính value
  user.value = { name: "Huy", role: "Staff" };
};
</script>

<template>
  <h1>User name: {{ user.name }}</h1>
  <h1>User role: {{ user.role }}</h1>

  <button @click="updateUser">Update</button>
</template>
```
