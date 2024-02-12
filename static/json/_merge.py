import os
import json

# Đường dẫn tới thư mục category
folder_path = "./smartest"
# Đường dẫn tới file gộp
output_file = os.path.join(folder_path, "all_battle.json")

# Danh sách các file cần merge
files_to_merge = [
    "animals.json",
    "auto.json",
    "bloggers.json",
    "cooking.json",
    "economy.json",
    "fashion.json",
    "fishing.json",
    "games.json",
    "garden.json",
    "geography.json",
    "health.json",
    "history.json",
    "hunting.json",
    "movies.json",
    "music.json",
    "science.json",
    "space.json",
    "technology.json",
]

# Tạo danh sách để chứa các object từ các file được chỉ định
all_objects = []

# Duyệt qua từng file trong danh sách files_to_merge
for filename in files_to_merge:
    # Đường dẫn đầy đủ tới file
    file_path = os.path.join(folder_path, filename)
    
    # Kiểm tra nếu file tồn tại
    if os.path.exists(file_path):
        # Đọc nội dung file
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
            if isinstance(data, list):  # Kiểm tra nếu nội dung là mảng
                all_objects.extend(data)

# Ghi toàn bộ dữ liệu vào file mới
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(all_objects, file, ensure_ascii=False, indent=4)
