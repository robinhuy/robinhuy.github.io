---
title: "Học Go cấp tốc Phần 1: Packages, variables và functions"
date: 2018-03-17
draft: false
tags: ["Go"]
---

> **Go**(hay thường được gọi là Golang) là một ngôn ngữ lập trình mã nguồn mở được tạo ở Google vào năm 2009 bởi Robert Griesemer, Rob Pike, và Ken Thompson. Nó được ra đời nhằm mục đích phát triển các trang web nhanh hơn, dễ dàng hơn và đáp ứng được yêu cầu truy cập lớn. Về lịch sử ra đời cũng như giới thiệu chi tiết hơn các bạn có thể xem ở {{< link link="https://en.wikipedia.org/wiki/Go_(programming_language)" text="wikipedia" >}} 😅

Để học **Go** thì chúng ta có nhiều nguồn và tài liệu khác nhau. Với những người đã biết ít nhất một ngôn ngữ lập trình thì có thể thực hành luôn theo theo {{< link link="https://tour.golang.org/welcome/1" text="Tour Golang" >}}, nó sẽ gồm các ví dụ và bài tập mẫu mô tả các chức năng cơ bản trong **Go** và đi kèm 1 editor online để chúng ta có thể thực hành luôn mà không cần cài đặt.

Trong quá trình học theo _Tour Golang_, mình sẽ viết bài tổng kết lại một số kiến thức cơ bản, điểm khác biệt của **Go** so với các ngôn ngữ khác (có thể sẽ sử dụng ví dụ khác với nguyên mẫu). Nếu bạn muốn học **Go** và thực hành luôn trên _Tour Golang_ thì có thể tham khảo series này (hoặc có thể đọc lướt qua để có một cái nhìn tổng quát về Go).

![Học Go cấp tốc phần 1](/images/golang-thumb1.jpg)

## **Packages**

Mọi chương trình viết từ Go đều được tạo bởi các _package_ và _package_ chính dùng để chạy là **main**.

Để sử dụng các _package_ khác thì chúng ta phải **import**, ví dụ muốn in 1 đoạn text ra console thì ta phải dùng _package_ {{< link link="https://golang.org/pkg/fmt/" text="fmt" >}}:

```go
package main

import "fmt"

func main() {
    fmt.Println("Lại là Hello World")
}
```

## **Variables**

Cú pháp của Go tương tự C nhưng cũng có nhiều điểm khác, ví dụ không có dấu **chấm phẩy** ở cuối các câu lệnh hay kiểu dữ liệu được **khai báo ở sau tên biến**. Về việc tại sao Go lại khai báo kiểu dữ liệu ngược so với hầu hết các ngôn ngữ khác các bạn tự tìm hiểu tại đây {{< link link="https://blog.golang.org/gos-declaration-syntax" text="Go's Declaration Syntax" >}}.

Khai báo biến trong Go ngoài việc cú pháp hơi dị một chút, còn đâu thì vẫn tương tự như các ngôn ngữ khác:

```go
// Khai báo biến message có kiểu dữ liệu string
var message string

// Khai báo 3 biến c, python, java đều có kiểu dữ liệu là bool
var c, python, java bool

// Khai báo 2 biến i, j có kiểu dữ liệu là int và khởi tạo luôn giá trị cho chúng
var i, j int = 1, 2

// Khai báo ngắn gọn biến k và khởi tạo giá trị luôn cho nó.
// Không dùng từ khóa var mà dùng dấu hai chấm, lúc này kiểu dữ liệu sẽ được ngầm định tùy theo giá trị của biến.
k := 3
```

Các kiểu dữ liệu trong Go, ở phần mô tả của _Tour of Go_ có liệt kê đầy đủ: {{< link link="https://tour.golang.org/basics/11" text="Go basic types" >}}

Khi khai báo biến mà không khởi tạo giá trị ban đầu cho nó thì biến đó sẽ có giá trị _**zero**_ tùy thuộc vào kiểu dữ liệu:

- **0** cho kiểu số.
- **false** cho kiểu boolean.
- **""** cho kiểu chuỗi.

Khi thực hiện tính toán giữa các biến với kiểu dữ liệu khác nhau sẽ cần ép kiểu (type conversions) theo công thức **T(v)** với **T** là kiểu dữ liệu (type) còn **v** là giá trị (value):

```go
i := 55      // kiểu int
j := 67.8    // kiểu float64
sum := i + int(j)  // Để tính tổng cần phải ép kiểu j về int (sum = 55 + 67)
fmt.Println(sum)   // Kết quả trả về là 122
```

Khai báo hằng số thì tương tự khai báo biến nhưng dùng từ khóa **const** và không dùng được cú pháp viết tắt **:=**

```go
const Pi = 3.14
```

## **Functions**

Khai báo hàm sử dụng từ khóa **func**, và chú ý tham số truyền vào cũng khai báo kiểu dữ liệu sau tên tham số:

```go
// Hàm tính tổng, có 2 tham số truyền vào với kiểu dữ liệu int và kết quả trả về cũng là int
func add(x int, y int) int {
    return x + y
}
```

Khi các tham số truyền vào cùng kiểu dữ liệu thì có thể viết tắt như sau:

```go
// Hàm tính tổng, có 2 tham số truyền vào với kiểu dữ liệu int và kết quả trả về cũng là int
func add(x, y int) int {
    return x + y
}
```

Điểm đặc biệt trong Go đó là function có thể **trả về nhiều kết quả**, ví dụ:

```go
package main

import "fmt"

// Hàm swap trả về kết quả là 2 chuỗi
func swap(x, y string) (string, string) {
	return y, x
}

func main() {
    // Gán kết quả của hàm swap vào 2 biến a và b
    a, b := swap("hello", "world")

    // In ra giá trị của a và b
    fmt.Println(a, b)
}
```

Kết quả trả về có thể đặt tên để sử dụng luôn trong hàm, ví dụ:

```go
// Hàm split khai báo 2 kết quả trả về là x và y có kiểu dữ liệu là int
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x

    // return có thể để trống, function sẽ tự động trả về x và y (không khuyến khích)
    return
}
```

Tiếp theo: [Phần 2: Điều khiển luồng với if, else, switch và defer](/blog/hoc-go-cap-toc-phan-2-dieu-khien-luong-voi-if-else-switch-va-defer).
