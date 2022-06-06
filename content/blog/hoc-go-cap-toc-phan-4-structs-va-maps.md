---
title: "Học Go cấp tốc Phần 4:  Structs và Maps"
date: 2018-03-20
draft: false
tags: ["Go"]
---

Các phần trước:

[Phần 1: Packages, variables và functions](/blog/hoc-go-cap-toc-phan-1-packages-variables-va-functions).

[Phần 2: Điều khiển luồng với if, else, switch và defer](/blog/hoc-go-cap-toc-phan-2-dieu-khien-luong-voi-if-else-switch-va-defer).

[Phần 3: Arrays và Slices](/blog/hoc-go-cap-toc-phan-3-arrays-va-slices).

![Học Go cấp tốc phần 4](/images/golang-thumb4.jpg)

## **Structs**

Tương tự C, một **struct** trong Go là tập hợp các trường (field) do người dùng tự định nghĩa. Mỗi trường có thể có kiểu dữ liệu khác nhau, thậm chí có thể là một **struct**. Trong Go không có **class** như các ngôn ngữ hướng đối tượng, do đó chúng ta có thể dùng **struct** thay cho **class**. Ví dụ:

```go
package main

import "fmt"

// Định nghĩa một struct với từ khóa type
type Student struct {
	name string
	age int
}

func main() {
    // Khởi tạo biến s1 có giá trị là struct Student
    s1 := Student{"Robin", 30}   // {"Robin", 30}

    // Khởi tạo biến s2 có giá trị là struct Student với 1 field là name
    // Field còn lại sẽ có giá trị mặc định (zero value)
    s2 := Student{name: "Robin"}   // {"Robin", 0}

    // Khởi tạo biến s3 có giá trị là struct Student và không khai báo giá trị cho trường nào
    s3 := Student{}   // {"", 0}

    // Thay đổi giá trị field trong struct
    s3.name = "Robert"
    s3.age = 25

    fmt.Println(s3)   // s3 = {"Robert", 25}
}
```

Struct có thể so sánh được nếu các field của nó có thể so sánh được, và 2 biến kiểu struct có giá trị giống nhau nếu toàn bộ các field có giá trị giống nhau:

```go
package main

import (
	"fmt"
)

type Student struct {
	name string
	age int
}

func main() {
	s1 := Student{"Steve", 30}
	s2 := Student{"Steve", 30}
    s3 := Student{"Job", 30}

	if s1 == s2 {
		fmt.Println("s1 = s2")   // s1 bằng s2
	} else {
		fmt.Println("s1 != s2")
	}

	if s2 == s3 {
		fmt.Println("s2 = s3")
	} else {
		fmt.Println("s2 != s3")   // s2 khác s3
	}
}
```

## **Maps**

Map là một tập hợp các phần tử được lưu trữ dưới dạng **key - value.** **Key** trong map có kiểu dữ liệu so sánh được và không bị trùng lặp _._ Để tạo _map_ ta dùng hàm **make()** với công thức như sau:

```
make(map[type of key]type of value
```

```go
// Định nghĩa biến demoMap có kiểu dữ liệu map với key kiểu string và value kiểu int
var demoMap map[string]int

// Map không so sánh được như struct, nhưng có thể dùng toán tử == để kiểm tra nil
if demoMap == nil {
    fmt.Println("Map có giá trị nil.")

    // Tạo Map bằng hàm make
    demoMap = make(map[string]int)
}
```

Thêm phần tử hoặc thay đổi giá trị của một phần tử trong _map_ **m** ta dùng công thức:

```
m[key] = value
```

```go
// Khởi tạo map
languages := make(map[string]float32)

// Thêm phần tử vào map
languages["go"] = 0.63
languages["java"] = 1.03

// Cập nhật lại giá trị của phần tử "go"
languages["go"] = 0.73

fmt.Println(languages)   // map[go:0.73 java:1.03]
```

Để xóa phần tử trong _map_ thì ta dùng hàm **delete()** và cung cấp **key** của phần tử cần xóa. Ví dụ xóa phần tử có _key = "go"_  trong _map languages_:

```go
delete(languages, "go")
```

Để truy xuất đến phần tử trong _map_, ta gọi _map_ kèm theo **key** của phần tử. Nếu **key** đó không tồn tại thì ta sẽ thu được giá trị là **zero value** (tùy theo kiểu dữ liệu). Ví dụ:

```go
m := make(map[string]int)

m["Answer"] = 42
fmt.Println(m["Answer"])   // Lấy giá trị của phần tử có key = "Answer", kết quả là 42

delete(m, "Answer")
fmt.Println(m["Answer"])   // Phần tử có key = "Answer" đã bị xóa, kết quả là 0 (zero value của int)
```

Để kiểm tra xem một phần tử có tồn tại trong _map_ hay không, ta sẽ lấy cùng lúc 2 kết quả khi truy xuất đến phần tử trong _map_. Giá trị đầu tiên giống ví dụ trên, giá trị thứ 2 sẽ là **true** nếu phần tử có trong _map_ và **false** nếu phần tử không tồn tại (gần giống callback error trong javascript).

```go
// Tiếp theo ví dụ trên
v, ok := m["Answer"]
fmt.Println("Giá trị của phần tử là: ", v)   // v = 0
fmt.Println("Kiểm tra phần tử có tồn tại hay không: ", ok)   // ok = false
```

Tiếp theo: [Phần 5: Methods và Interfaces](/blog/hoc-go-cap-toc-phan-5-methods-va-interfaces).
