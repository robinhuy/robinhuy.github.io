import os
import json

# Đường dẫn tới thư mục category
folder_path = "./smartest"

# Tạo dictionary để lưu số lượng object trong mỗi file
file_counts = {}

# Duyệt qua từng file trong thư mục
for filename in os.listdir(folder_path):
    if filename.endswith(".json"):
        # Đường dẫn đầy đủ tới file
        file_path = os.path.join(folder_path, filename)
        
        # Đọc nội dung file
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
            if isinstance(data, list):  # Kiểm tra nếu nội dung là mảng
                # Tên file không chứa đuôi
                file_name_without_ext = os.path.splitext(filename)[0].replace("_", " ").title()
                # Lưu số lượng object
                file_counts[file_name_without_ext] = len(data)

# Sắp xếp kết quả từ lớn đến bé
sorted_counts = sorted(file_counts.items(), key=lambda x: x[1], reverse=True)

# In ra kết quả
for name, count in sorted_counts:
    print(f"- {name}: {count}")