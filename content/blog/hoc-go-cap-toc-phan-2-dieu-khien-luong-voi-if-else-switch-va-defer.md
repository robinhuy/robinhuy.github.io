---
title: "Học Go cấp tốc Phần 2:  Điều khiển luồng với if, else, switch và defer"
date: 2018-03-18
draft: false
tags: ["Go"]
---

_Phần trước: [Học Go cấp tốc Phần 1: Packages, variables và functions](/blog/hoc-go-cap-toc-phan-1-packages-variables-va-functions)._

Phần tiếp theo chúng ta sẽ cùng tìm hiểu {{< link link="https://tour.golang.org/flowcontrol/1" text="cách điều khiển luồng (flow control)" >}} trong Go.

![Học Go cấp tốc phần 2](/images/golang-thumb2.jpg)

## **Vòng lặp**

Trong Go chỉ có 1 kiểu vòng lặp là sử dụng **for**. Cách dùng tương tự các ngôn ngữ khác nhưng phần khai báo biến, điều kiện lặp, ... không cần đặt trong cặp ngoặc tròn:

```go
// Tính tổng các số từ 0 - 9
sum := 0
for i := 0; i < 10; i++ {
    sum += i
}
fmt.Println(sum)
```

Vòng lặp **for** khi chỉ có điều kiện lặp thì hoạt động giống **while** trong các ngôn ngữ khác:

```go
sum := 0
for sum < 10 {
    sum += 1
}
fmt.Println(sum)
```

## **Điều kiện**

Lệnh điều kiện trong Go sử dụng **if**, **else**, **switch**, và cũng như vòng lặp **for** chúng ta không cần cặp ngoặc tròn.

Với câu lệnh **if** chúng ta có thể khai báo biến ngay trong câu lệnh điều kiện, và biến này sẽ chỉ hoạt động ở trong block của lệnh **if** hoặc **else**:

```go
import (
    "fmt"
    "math"
)

func pow(x, n, limit float64) float64 {
    // Khai báo biến v trong lệnh điều kiện của if sẽ chỉ sử dụng được trong block if hoặc else
    if v := math.Pow(x, n); v < limit {
        return v
    } else {
        fmt.Printf("%g >= %g\n", v, limit)
	}

	// Không sử dụng được biến v ở bên ngoài, ví dụ return v sẽ báo lỗi
	return lim
}
```

Lệnh **switch** tương tự các ngôn ngữ khác, tuy nhiên có một số điểm khác biệt:

- Biểu thức trong **switch** không được sử dụng hằng số (constant).
Không cần lệnh **break** trong mỗi **case**(mặc định các case tự break). Do đó chỉ có trường hợp thỏa mãn đầu tiên được chạy (tính từ trên xuống dưới). Ví dụ:

  ```go
  switch num := 10; {
      case num < 50:
          fmt.Printf("%d < 50\n", num)   // In ra 10 < 50
      case num < 100:
          fmt.Printf("%d < 100\n", num)  // Lệnh này không chạy mặc dù cũng thỏa mãn điều kiện
      default:
          fmt.Printf("I don't know", num)
  }
  ```

- Có thể sử dụng nhiều điều kiện trong một **case**,hoặc sử dụng từ khóa **fallthrough** để cho phép chạy tiếp xuống câu lệnh tiếp theo:

  ```go
  num := 10;

  switch {   // Tương đương với switch true
      case num >= 0 && num <= 50:
          fmt.Printf("%d < 50 \n", num)   // In ra 10 < 50
          fallthrough
      case num < 100:
          fmt.Printf("%d < 100 \n", num)  // In ra 10 < 100
      default:
          fmt.Printf("I don't know", num)
  }
  ```

## **Trì hoãn**

Trì hoãn (defer) là một khái niệm khá mới trong điều khiển luồng. Nó cho phép một câu lệnh được gọi ra nhưng không thực thi ngay mà hoãn lại đến khi các lệnh xung quanh trả về kết quả. Ví dụ:

```go
package main

import "fmt"

func main() {
    defer fmt.Println("World")   // Hoãn lệnh in ra chữ "World"
    fmt.Println("Hello")        // In ra chữ "Hello"
    // Kết quả cuối cùng là "Hello World"
}
```

![stack](/images/stack-visualize.jpg)

Các lệnh được gọi qua từ khóa **defer** sẽ được đưa vào một **stack**, tức là hoạt động theo cơ chế vào sau ra trước (last-in-first-out). Lệnh nào **defer** sau sẽ được thực thi trước, giống như xếp 1 chồng đĩa thì chiếc đĩa sau cùng (ở trên cùng) sẽ được lấy ra trước. Ví dụ:

```go
package main

import "fmt"

func main() {
    for i := 0; i < 10; i++ {
        defer fmt.Println(i)   // In ra giá trị của biến i
    }

    // Kết quả trả về ngược so với vòng lặp:
    // 9 8 7 6 5 4 3 2 1 0
}
```

_Chú ý là khi gọi lệnh **defer** thì giá trị của biến trong câu lệnh sẽ là giá trị tại thời điểm gọi chứ không phải giá trị tại thời điểm thực thi_.

Tiếp theo: [Phần 3: Arrays và Slices](/blog/hoc-go-cap-toc-phan-3-arrays-va-slices).
