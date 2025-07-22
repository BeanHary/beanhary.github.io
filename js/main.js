document.addEventListener("DOMContentLoaded",function(){
// 检查当前文章是否有弹出窗口标记
const e=document.querySelector('meta[property="popup"]');if(e){const t=e.getAttribute("content"),n=document.getElementById("custom-popup"),o=document.getElementById("popup-message");n&&o&&(o.innerHTML=t,n.style.display="flex",
// 添加关闭功能
document.querySelector(".popup-close").addEventListener("click",function(){n.style.display="none"}),
// 点击背景关闭
n.addEventListener("click",function(e){e.target===this&&(n.style.display="none")}))}});