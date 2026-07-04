---
title: "Sử dụng cơ sở dữ liệu Oracle với Entity Framework"
date: 2017-12-11
draft: false
tags: ["Database", "Entity Framework"]
---

Thông thường khi làm dự án với Entity Framework, chúng ta hay dùng cơ sở dữ liệu (CSDL) MS SQL Server. Tuy nhiên tùy theo yêu cầu công việc, bạn có thể sẽ phải làm việc với các cơ sở dữ liệu khác. Bài viết này mình sẽ chia sẻ 1 số kinh nghiệm của bản thân khi phải làm việc với CSDL **Oracle** (cụ thể là Oracle phiên bản 11g).

![Oracle Database](/images/oracle-database.jpg)

### **Cài đặt provider**

Để cài đặt provider thì chúng ta có thể cài đặt qua **NuGet** hoặc download trên trang chủ của Oracle. Nhưng do tính chất công việc cần bảo mật, mình không được sử dụng internet nên chọn cách sử dụng bộ cài **ODAC** trên Oracle: {{< link link="http://www.oracle.com/technetwork/topics/dotnet/utilsoft-086879.html" text="http://www.oracle.com/technetwork/topics/dotnet/utilsoft-086879.html" >}}. Các bạn có thể sử dụng phiên bản ODAC 11.2 trở lên, ở đây mình dùng hẳn luôn bản mới **ODAC 12c Release 4** vì nó có tính tương thích ngược.

Để cài ODAC thì các bạn chỉ cần giải nén file tải về và chạy tệp **setup.exe** (Oracle Universal Installer), nhưng sẽ có 1 số lưu ý sau:

- Nếu trên máy đã có ODAC bản cũ thì cần gỡ ra trước khi cài mới bằng cách sử dụng **Universal Installer** (Windows Start Menu -->  All Programs --> Oracle - --> Oracle Installation Products --> Universal Installer).

- Khi cài đến phần chọn thư mục cài đặt (Specify Installation Location) thì cần chú ý trong đường dẫn không được phép chứa các ký tự đặc biệt (ví dụ như dấu cách). Có thể lúc cài thì vẫn cài được nhưng sau đó sẽ bị lỗi (mình đã bị dính lỗi này khi sử dụng Windows Built-in Account có username chứa dấu cách).

![Install ODAC](/images/install-odac.png)

### **Một số khác biệt khi sử dụng CSDL Oracle**

- Trong Oracle không dùng khái niệm database như các CSDL khác mà sử dụng khái niệm **Schemas**, và Schemas tương ứng với **Users**. Tức là ở trong MS SQL Server chúng ta tạo mới một database thì ở đây chúng ta tạo mới một user (schema). Ví dụ chúng ta cần tạo một ứng dụng quản lý sinh viên thì thay vì tạo database _student_, chúng ta tạo mới một user tên là _student_.

- Tất cả tên bảng trong schema không được vượt quá 30 ký tự.

- Lỗi **ORA-01918: user "dbo" does not exist** khi sử dụng EF Migration, đó là do Oracle hiểu nhầm _dbo.table_name_ là bảng _table_name_ trong schema _dbo_. Sửa bằng cách đổi lại schema trong class **DbContext** bằng cách ghi đè phương thức **OnModelCreating**, ví dụ schema của mình là ROBIN (chú ý viết hoa):

```cs
public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext() : base("ROBIN", throwIfV1Schema: false)
    {
    }

    public static ApplicationDbContext Create()
    {
        return new ApplicationDbContext();
    }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.HasDefaultSchema("ROBIN");
    }
}
```

Hy vọng một số kinh nghiệm trên đây sẽ giúp những ai mới làm việc với Oracle giảm bớt thời gian tìm hiểu cài đặt hay fix những bug kể trên.