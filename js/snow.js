function snowFall(t){t=t||{},this.maxFlake=t.maxFlake||300,/* 最多片数 */
this.flakeSize=t.flakeSize||10,/* 雪花形状 */
this.fallSpeed=t.fallSpeed||1,/* 坠落速度 */
this.flakes=[],/* 雪花数组 */
this.canvas=null,/* 画布 */
this.ctx=null,/* 上下文 */
this.loop=null,/* 动画循环 */
this.isRunning=!1}
/* 雪运动对象 */
function flakeMove(t,e,n,i){this.x=Math.floor(Math.random()*t),/* x坐标 */
this.y=Math.floor(Math.random()*e),/* y坐标 */
this.size=Math.random()*n+2,/* 形状 */
this.maxSize=n,/* 最大形状 */
this.speed=1*Math.random()+i,/* 坠落速度 */
this.fallSpeed=i,/* 坠落速度 */
this.velY=this.speed,/* Y方向速度 */
this.velX=0,/* X方向速度 */
this.stepSize=Math.random()/30,/* 步长 */
this.step=0}function isHomePage(){var t=window.location.pathname;return!("/"!==t&&"/index.html"!==t&&!t.endsWith("/index"))||!(!document.body.classList.contains("home")&&!document.body.classList.contains("index"))}function checkAndStartSnow(){
// 如果当前不是首页，停止雪花
isHomePage()?
// 如果是首页，启动雪花
snow&&!snow.isRunning&&setTimeout(function(){snow.start()},100):snow&&snow.isRunning&&snow.stop()}requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||window.oCancelAnimationFrame,snowFall.prototype.start=function(){this.isRunning&&this.stop(),this.isRunning=!0,this.createCanvas(),this.createFlakes(),this.drawSnow()},snowFall.prototype.createCanvas=function(){var t=document.getElementById("snowfall");t&&t.parentNode&&t.parentNode.removeChild(t);var e=document.createElement("canvas");e.id="snowfall",e.width=window.innerWidth,
// 使用整个文档的高度，包括滚动部分
e.height=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),e.setAttribute("style","position:fixed; top: 0; left: 0; z-index: 1; pointer-events: none;"),document.body.appendChild(e),this.canvas=e,this.ctx=e.getContext("2d");
/* 窗口大小改变的处理 */
var n,i=this;window.addEventListener("resize",function(){
// 防抖处理，避免频繁触发
clearTimeout(n),n=setTimeout(function(){if(i.canvas&&i.isRunning){var t=i.canvas.width;i.canvas.height;
// 当窗口缩小时，调整雪花位置，避免全部重置到顶部
if(i.canvas.width=window.innerWidth,i.canvas.height=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),t>i.canvas.width)for(var e=0;e<i.flakes.length;e++){var n=i.flakes[e];n.x>i.canvas.width&&(n.x=Math.random()*i.canvas.width),n.y>i.canvas.height&&(n.y=Math.random()*i.canvas.height)}}},150)})},flakeMove.prototype.update=function(t,e){
/* 左右摆动(余弦) */
this.velX*=.98,this.velY<=this.speed&&(this.velY=this.speed),this.velX+=Math.cos(this.step+=.05)*this.stepSize,this.y+=this.velY,this.x+=this.velX,(this.x>t||this.x<0||this.y>e)&&this.reset(t,e)},
/* 飞出边界-放置最顶端继续坠落 */
flakeMove.prototype.reset=function(t,e){this.x=Math.random()*t,this.y=-10,// 从稍微上方开始，避免突然出现
this.size=Math.random()*this.maxSize+2,this.speed=1*Math.random()+this.fallSpeed,this.velY=this.speed,this.velX=0,this.stepSize=Math.random()/30},flakeMove.prototype.render=function(t){var e=t.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);e.addColorStop(0,"rgba(255, 255, 255, 0.9)"),e.addColorStop(.5,"rgba(255, 255, 255, 0.5)"),e.addColorStop(1,"rgba(255, 255, 255, 0)"),t.save(),t.fillStyle=e,t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fill(),t.restore()},snowFall.prototype.createFlakes=function(){var t=this.maxFlake,e=this.flakes=[],n=this.canvas;e.length=0;for(var i=0;i<t;i++){var o=new flakeMove(n.width,n.height,this.flakeSize,this.fallSpeed);e.push(o)}},snowFall.prototype.drawSnow=function(){if(this.isRunning&&this.canvas){var t=this.maxFlake,e=this.flakes,n=this.ctx,i=this.canvas,o=this;n.clearRect(0,0,i.width,i.height);for(var s=0;s<t;s++)e[s].update(i.width,i.height),e[s].render(n);this.loop=requestAnimationFrame(function(){o.drawSnow()})}},snowFall.prototype.stop=function(){this.isRunning=!1,this.loop&&(cancelAnimationFrame(this.loop),this.loop=null);var t=document.getElementById("snowfall");t&&t.parentNode&&t.parentNode.removeChild(t),this.canvas=null,this.ctx=null,this.flakes=[]};var snow=new snowFall({maxFlake:150});
// 初始检查
"loading"===document.readyState?document.addEventListener("DOMContentLoaded",function(){checkAndStartSnow(),
// 监听滚动事件，更新画布高度
window.addEventListener("scroll",function(){if(snow&&snow.isRunning&&snow.canvas){var t=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);t!==snow.canvas.height&&(snow.canvas.height=t)}})}):checkAndStartSnow(),
// 监听Pjax页面切换
void 0===window.Pjax&&void 0===window.pjax||document.addEventListener("pjax:complete",function(){setTimeout(checkAndStartSnow,300);// 稍等页面渲染完成
}),
// 添加页面隐藏时停止雪花（切换到其他标签页时）
document.addEventListener("visibilitychange",function(){document.hidden?snow&&snow.isRunning&&snow.loop&&(cancelAnimationFrame(snow.loop),snow.loop=null):
// 重新显示时如果是首页，恢复动画
setTimeout(function(){isHomePage()&&snow&&snow.isRunning&&!snow.loop&&snow.drawSnow()},100)}),window.stopSnow=function(){snow&&snow.stop()},window.startSnow=function(){snow&&!snow.isRunning&&snow.start()};