---
title: "Học Go cấp tốc Phần 5:  Methods và Interfaces"
date: 2018-03-21
draft: false
tags: ["Go"]
---

Các phần trước:

[Phần 1: Packages, variables và functions](/blog/hoc-go-cap-toc-phan-1-packages-variables-va-functions).

[Phần 2: Điều khiển luồng với if, else, switch và defer](/blog/hoc-go-cap-toc-phan-2-dieu-khien-luong-voi-if-else-switch-va-defer).

[Phần 3: Arrays và Slices](/blog/hoc-go-cap-toc-phan-3-arrays-va-slices).

[Phần 4: Structs và Maps](/blog/hoc-go-cap-toc-phan-4-structs-va-maps).

![Học Go cấp tốc phần 5](/images/golang-thumb5.jpg)

## **Methods**

Trong Go không có _class_, chúng ta có thể dùng _struct_ thay cho _class_ như ở phần trước. Tuy nhiên trong _struct_ mới chỉ có thuộc tính chứ chưa có phương thức. Để ứng dụng được phương thức (method) như các ngôn ngữ hướng đối tượng khác ta sẽ cần khai báo _function_ kèm theo một tham số đặc biệt gọi là **receiver argument**. **Receiver argument** nằm ở giữa từ khóa **func** và **tên của function**, nó sẽ chỉ ra một _type_(thường là một _struct_) để áp dụng hàm này làm phương thức. Ví dụ:

```go
package main

import (
    "fmt"
    "math"
)

// Định nghĩa struct Vertex với 2 thuộc tính X và Y
type Vertex struct {
    X, Y float64
}

// Tạo phương thức Abs() cho struct Vertex (receiver argument)
func (v Vertex) Abs() float64 {
    return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

func main() {
    // Khởi tạo struct
    v := Vertex{3, 4}

    // Gọi phương thức Abs() của struct
    fmt.Println(v.Abs())
}
```

## **Interfaces**

**Interface** là một định nghĩa các tập hợp phương thức mà một đối tượng cần tuân thủ (tương tự như ở trong các ngôn ngữ hướng đối tượng khác). Khi một **type** có chứa các phương thức như đã khai báo trong **interface** thì nó đang triển khai (implement) **interface** đó. Ví dụ:

```go
package main

import "fmt"

// Định nghĩa interface I với 1 method là M()
type I interface {
    M()
}

// Định nghĩa struct T với 1 field là S kiểu string
type T struct {
    S string
}

// Định nghĩa phương thức M() cho struct T
// Struct T sẽ tự động implement interface I
func (t T) M() {
    fmt.Println(t.S)
}

func main() {
    // Khởi tạo biến i có kiểu là interface I
    var i I = T{"hello"}

    // Gọi phương thức M()
    i.M()
}
```

*Type* đã triển khai *interface* buộc phải có đầy đủ các *method* được định nghĩa trong *interface*. Ví dụ:

```go
package main

import "fmt"

// Định nghĩa interface I với 1 method là M() và N()
type I interface {
    M(),
    N()
}

// Định nghĩa struct T
type T struct {
    S string
}

// Định nghĩa phương thức M() cho struct T
// Struct T sẽ tự động implement interface I
func (t T) M() {
    fmt.Println(t.S)
}

func main() {
    // Khởi tạo biến i có kiểu là interface I
    var i I = T{"hello"}

    // Gọi phương thức M()
    i.M()

    // Kết quả sẽ báo lỗi vì struct T implement interface I,
    // nhưng không có đủ các method đã khai báo (thiếu method N())
}
```

Một _interface_ mà không có chứa _method_ nào thì gọi là _interface rỗng_ ({{< link link="https://tour.golang.org/methods/14" text="Emtpy Interface" >}}). Interface rỗng có thể lưu mọi loại dữ liệu nên thường được dùng trong trường hợp các hàm xử lý mà cần tham số động (không biết trước kiểu dữ liệu). Ví dụ:

```go
package main

import "fmt"

func main() {
	var i interface{}   // i là một empty interface

    // Họi hàm describe với tham số truyền vào là một số
	i = 42
	describe(i)

    // Họi hàm describe với tham số truyền vào là một chuỗi
	i = "hello"
	describe(i)
}

// Hàm describe có tham số truyền vào là một empty interface
// do đó khi thực thi ta có thể truyền vào kiểu dữ liệu nào cũng được
func describe(i interface{}) {
	fmt.Printf("(%v, %T)\n", i, i)
}
```

![golang](/images/gogo.png)

Series _Học Go cấp tốc_ sẽ tạm dừng ở đây. Mục đích là để các bạn làm quen và nắm được tổng quan của ngôn ngữ Go. Sẽ có một Series khác hướng dẫn chi tiết hơn về lập trình Golang dành cho những ai muốn tìm hiểu sâu hơn để áp dụng vào công việc thực tế.

Happy coding 😎
