function addVersionToURL(url) {
    const version = new Date().getTime();
    return url + '?v=' + version;
}

function loadPreloader() {
    console.log("Loading preloader...");
    fetch(addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/preloader.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('preloader-container').innerHTML = data;
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/preloader.css');
            document.head.appendChild(link);
            console.log("Preloader loaded.");
            checkPreloader();
        })
        .catch(error => {
            console.error('Error loading preloader:', error);
        });
}

function checkPreloader() {
    var loader = document.getElementById("preloader");
    if (loader) {
        console.log("Preloader element found.");
    } else {
        console.log("Preloader element not found.");
        setTimeout(checkPreloader, 100); // Kiểm tra lại sau 100ms
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOMContentLoaded event fired.");
    loadPreloader();
    
    fetch(addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/navbar.html'))
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            const script = document.createElement('script');
            script.src = addVersionToURL('https://cdn.a3sachhonaba.com/resource/a3sachhonaba.com/prefoonav/navbar.js');
            document.body.appendChild(script);
            console.log("Navbar loaded.");
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
            console.log("Footer loaded.");
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});

// Đảm bảo preloader được ẩn đi khi trang tải xong hoặc khi trang được phục hồi từ cache
window.addEventListener("load", function() {
    checkPreloader();
});
