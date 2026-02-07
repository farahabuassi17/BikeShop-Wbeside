// تفعيل أيقونة اللينك عند الضغط على صورة المنشور
document.querySelectorAll('.clickable-post').forEach(post => {
    post.addEventListener('click', function() {
        // إزالة التفعيل من البقية (ليظهر واحد فقط في كل مرة)
        document.querySelectorAll('.clickable-post').forEach(p => p.classList.remove('active'));
        
        // إضافة التفعيل للصورة التي ضغطت عليها
        this.classList.add('active');
    });
});

// إخفاء الأيقونة عند الضغط في أي مكان خارج الصورة
document.addEventListener('click', function(e) {
    if (!e.target.closest('.clickable-post')) {
        document.querySelectorAll('.clickable-post').forEach(p => p.classList.remove('active'));
    }
});