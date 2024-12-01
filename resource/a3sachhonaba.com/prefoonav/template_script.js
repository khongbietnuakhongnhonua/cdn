function addVersionToURL(url) {
    const version = new Date().getTime();
    return url + '?v=' + version;
}

function loadPreloader() {
    fetch(addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/preloader.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('preloader').innerHTML = data;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/preloader.css');
            document.head.appendChild(link);
        })
        .catch(error => {
            console.error('Error loading preloader:', error);
        });
}

function hidePreloader() {
    const preloader = document.getElementById("preloader");
    preloader.style.display = "none";
}

function checkPageReload() {
    // Kiểm tra nếu trang được reload bằng F5 hoặc các nút tương tự
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        // Đặt cờ để hiển thị preloader trong 1 giây khi trang được reload
        sessionStorage.setItem('reloaded', 'true');
    } else {
        sessionStorage.removeItem('reloaded');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    checkPageReload();
    loadPreloader();
    
    fetch(addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/navbar.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            const script = document.createElement('script');
            script.src = addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/navbar.js');
            document.body.appendChild(script);
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });

    fetch(addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/footer.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data; // Nhúng nội dung vào footer-container
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/footer.css');
            document.head.appendChild(link);
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

// Đảm bảo preloader được ẩn đi khi trang tải xong hoặc khi trang được phục hồi từ cache
window.addEventListener('load', function() {
    var loader = document.getElementById("preloader");
    loader.style.display = "none";
});
window.addEventListener('pageshow', function() {
    var loader = document.getElementById("preloader");
    loader.style.display = "none";
});

// Thêm thời gian chờ tối đa để đảm bảo preloader được ẩn đi sau một khoảng thời gian nhất định
setTimeout(function() {
    var loader = document.getElementById("preloader");
    loader.style.display = "none";
}, 10000); // 10 giây
