---
title: "Học Go cấp tốc Phần 3:  Arrays và Slices"
date: 2018-03-19
draft: false
tags: ["Go"]
---

Các phần trước:

[Phần 1: Packages, variables và functions](/blog/hoc-go-cap-toc-phan-1-packages-variables-va-functions).

[Phần 2: Điều khiển luồng với if, else, switch và defer](/blog/hoc-go-cap-toc-phan-2-dieu-khien-luong-voi-if-else-switch-va-defer).

![Học Go cấp tốc phần 3](/images/golang-thumb3.jpg)

## **Arrays**

Array (mảng) trong Go tương tự các ngôn ngữ khác, tuy nhiên nó có **kích thước cố định** (fixed size) và các phần tử bên trong phải **cùng loại dữ liệu**. Ví dụ:

```go
// Khởi tạo một mảng gồm 2 string
var a [2]string

// Gán giá trị cho các phần tử trong mảng
a[0] = "Hello"
a[1] = "World"

// In kết quả ra console
fmt.Println(a[0], a[1])
fmt.Println(a)

// Khởi tạo một mảng gồm 6 số int và gán luôn giá trị cho nó
primes := [6]int{2, 3, 5, 7, 11, 13}
fmt.Println(primes)

// Khởi tạo mảng nhưng không ghi rõ kích thước (thay bằng dấu ba chấm),
// trình biên dịch sẽ tự hiểu dựa vào số phần tử đã khai báo
numbers := [...]int{12, 78, 50}
fmt.Println(numbers)
```

Không giống đa số các ngôn ngữ khác, Array trong Go không phải là dạng tham chiếu (reference types) mà là dạng tham trị (value types). Khi gán giá trị nó cho một biến mới thì nó sẽ tạo ra một bản copy của Array cũ, và mọi thay đổi ở Array mới không ảnh hưởng gì đến Array cũ:

```go
a := [...]int{1, 2, 3, 4, 5}
b := a   // b là một array mới có giá trị giống a
b[0] = 9   // Thay đổi giá trị một phần tử của b

fmt.Println("a is ", a)   // In ra 1 2 3 4 5
fmt.Println("b is ", b)   // In ra 9 2 3 4 5
```

## **Slices**

Slice là một tham chiếu đến Array, nó mô tả một phần (hoặc toàn bộ) Array. Nó có kích thước động nên thường được sử dụng nhiều hơn Array.

Slice có thể tạo ra từ một Array bằng cách cung cấp 2 chỉ số (low và high) xác định vị trí phần tử trong Array. Ví dụ:

```go
// Khởi tạo Array primes
primes := [6]int{2, 3, 5, 7, 11, 13}

// Khởi tạo Slice s bằng cách cắt từ phần tử ở vị trí 1 (low) đến phần tử ở vị trí 3 (high - 1) của Array primes
var s []int = primes[1:4]

// In ra giá trị của Slice s
fmt.Println(s)   // Giá trị của s là [3, 5, 7]
```

![Slice & Array](/images/go-slice-array.jpg)

Một Slice sẽ có 2 thuộc tính là **length**(len)và **capacity**(cap). **Length** là số phần tử chứa trong Slice, còn **capacity** là số phần tử chứa trong Array mà Slice tham chiếu đến (bắt đầu tính từ phần tử đầu tiên của Slice). Để lấy ra _length_ của Slice ta dùng hàm **len()**, còn để lấy ra _capacity_ thì ta dùng hàm **cap()**. Ví dụ:

```go
s := []int{2, 3, 5, 7, 11, 13}

s = s[0:0]   // s = [], len(s) = 0, cap(s) = 6
s = s[0:4]   // s = [2, 3, 5, 7], len(s) = 4, cap(s) = 6
s = s[2:4]   // s = [5, 7], len(s) = 2, cap(s) = 4, cap được tính từ vị trí số 2 trở đi
s = s[0:4]   // s = [5, 7, 11, 13], len(s) = 4, cap(s) = 4
```

Khi tạo Slice ta có thể bỏ qua các chỉ số _low_ và _high_, khi đó Go sẽ tự sử dụng giá trị mặc định: **0** cho _low_ và **length của Slice** cho _high._ Ví dụ:

```go
s := []int{2, 3, 5, 7, 11, 13}

s = s[:0]   // s = [0:0]
s = s[:4]   // s = [0:4]
s = s[2:]   // s = [2:len(s)] => s = [2:4]
s = s[:4]   // s = [0:4]
```

Ngoài việc tạo Slice như trên, chúng ta có thể tạo theo các cách sau:

- Khai báo như một mảng nhưng không chỉ ra kích thước mảng:

  ```go
  q := []int{2, 3, 5, 7, 11, 13}
  ```

- Sử dụng hàm **make()** với công thức sau:

  ```go
  func make([]T, len, cap) []T
  ```

  ```go
  a := make([]int, 5)     // len(a)=5
  b := make([]int, 0, 5)  // len(b)=0, cap(b)=5
  ```

Slice có *zero value* là **nil** (length = 0 và capacity = 0), **nil** tương đương với giá trị **null** trong các ngôn ngữ lập trình khác.

Do Slice chỉ là tham chiếu đến Array, do đó thay đổi giá trị của Slice sẽ làm thay đổi giá trị của Array mà nó tham chiếu đến. Nếu có nhiều Slice cùng tham chiếu đến một Array thì khi thay đổi giá trị một Slice có thể làm thay đổi giá trị các Slice khác. Ví dụ:

```go
numbers := [4]int{1, 2, 3, 4}

a := numbers[0:2]   // a = [1, 2]
b := numbers[1:3]   // b = [2, 3]

b[0] = 5   // Thay đổi giá trị phần tử đầu tiên của Slice b

fmt.Println(a, b)    // a = [1, 5], b = [5, 3]
fmt.Println(numbers)   // numbers = [1, 5, 3, 4]
```

## **Append**

Để bổ sung thêm phần tử cho slice, ta dùng hàm **append()** với công thức sau:

```go
func append(s []T, vs ...T) []T
```

Hàm này sẽ trả về một slice có chứa toàn bộ các phần tử của slice ban đầu và các phần tử mới thêm vào. Trong trường hợp slice ban đầu có sức chứa nhỏ (Array mà nó tham chiếu đến có size nhỏ), một Array mới có kích thước lớn hơn sẽ được tạo ra và slice mới sẽ tham chiếu đến Array đó.

```go
var s []int

// Append có thể hoạt động với nil slice.
s = append(s, 0)   // s = [0]

// Append thêm một phần tử vào slice.
s = append(s, 1)   // s = [0, 1]

// Append thêm nhiều phần tử vào slice.
s = append(s, 2, 3, 4)   // s = [0, 1, 2, 3, 4]
```

## **Range**

**Range** là một hình thức của vòng lặp **for** dùng để duyệt qua một _slice_ hoặc _map_(sẽ nhắc đến ở phần sau). Mỗi một vòng lặp sẽ trả về 2 giá trị: Giá trị đầu tiên là chỉ số (vị trí) của phần tử, và giá trị thứ hai là bản sao của phần tử đó (cùng giá trị). Ví dụ:

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {
    fmt.Printf("i = %d, v = %d \n", i, v)
}
```

Trong trường hợp khi lặp chỉ sử dụng 1 trong 2 giá trị trả về thì ta sẽ bỏ qua giá trị còn lại bằng cách thay tên biến bằng ký tự gạch dưới (vì nếu không thì khi biên dịch sẽ báo lỗi biến được định nghĩa mà không sử dụng). Ví dụ:

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for _, v := range pow {
    fmt.Printf("v = %d \n", v)
}
```

Tiếp theo: [Phần 4: Structs và Maps](/blog/hoc-go-cap-toc-phan-4-structs-va-maps).
