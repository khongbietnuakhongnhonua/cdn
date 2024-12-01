// Kết hợp preloader.js và template_script.js

function addVersionToURL(url) {
    const version = new Date().getTime();
    return url + '?v=' + version;
}

function loadPreloader() {
    fetch(addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/preloader.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('preloader-container').innerHTML = data;
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
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 1000); // 1 giây để hoàn thành hiệu ứng fade-out
    }
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

window.addEventListener('load', function() {
    if (sessionStorage.getItem('reloaded')) {
        setTimeout(hidePreloader, 1000); // Giới hạn preloader trong 1 giây nếu trang đã load trước đó
    } else {
        hidePreloader();
    }
});

window.addEventListener('pageshow', function(event) {
    // Giới hạn preloader trong 1 giây nếu trang được phục hồi từ cache
    setTimeout(hidePreloader, 1000);
});
