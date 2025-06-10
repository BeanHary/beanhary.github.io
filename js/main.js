document.addEventListener('DOMContentLoaded', function () {
    // 检查当前文章是否有弹出窗口标记
    const popupMeta = document.querySelector('meta[property="popup"]');

    if (popupMeta) {
        const popupContent = popupMeta.getAttribute('content');
        const popup = document.getElementById('custom-popup');
        const popupMessage = document.getElementById('popup-message');

        if (popup && popupMessage) {
            popupMessage.innerHTML = popupContent;
            popup.style.display = 'flex';

            // 添加关闭功能
            document.querySelector('.popup-close').addEventListener('click', function () {
                popup.style.display = 'none';
            });

            // 点击背景关闭
            popup.addEventListener('click', function (e) {
                if (e.target === this) {
                    popup.style.display = 'none';
                }
            });
        }
    }
});