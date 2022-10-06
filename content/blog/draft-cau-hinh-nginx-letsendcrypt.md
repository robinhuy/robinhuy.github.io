---
title: "Visual Studio Code tip trick"
date: 2022-08-08
draft: true
tags: ["Visual Studio Code"]
---

Cai nginx
Cau hinh tro vao website port 80

server {
        listen 80;
        server_name www.constantandco.com.au constantandco.com.au;

#       include snippets/letsencrypt.conf;
#       return 301 https://constantandco.com.au$request_uri;

        root /var/www/constantandco.com.au;
        index index.php;
}

note: can co domain


