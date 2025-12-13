/* 控制下雪 */
function snowFall(t){
/* 可配置属性 */
t=t||{},this.maxFlake=t.maxFlake||500,/* 最多片数 */
this.flakeSize=t.flakeSize||10,/* 雪花形状 */
this.fallSpeed=t.fallSpeed||1}
/* 兼容写法 */
/* 创建画布 */
function snowCanvas(){
/* 添加Dom结点 */
var t=document.createElement("canvas");t.id="snowfall",t.width=window.innerWidth,
// 使用整个文档的高度，包括滚动部分
t.height=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight),t.setAttribute("style","position:fixed; top: 0; left: 0; z-index: 1; pointer-events: none;"),document.getElementsByTagName("body")[0].appendChild(t),this.canvas=t,this.ctx=t.getContext("2d"),
/* 窗口大小改变的处理 */
window.onresize=function(){t.width=window.innerWidth,
// 更新高度为整个文档的高度
t.height=Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)}}
/* 雪运动对象 */function flakeMove(t,e,n,i){this.x=Math.floor(Math.random()*t),/* x坐标 */
this.y=Math.floor(Math.random()*e),/* y坐标 */
this.size=Math.random()*n+2,/* 形状 */
this.maxSize=n,/* 最大形状 */
this.speed=1*Math.random()+i,/* 坠落速度 */
this.fallSpeed=i,/* 坠落速度 */
this.velY=this.speed,/* Y方向速度 */
this.velX=0,/* X方向速度 */
this.stepSize=Math.random()/30,/* 步长 */
this.step=0/* 步数 */,this.canvas=null}
/* 创建雪花-定义形状 */
function createFlakes(){for(var t=this.maxFlake,e=this.flakes=[],n=this.canvas,i=0;i<t;i++){var o=new flakeMove(n.width,n.height,this.flakeSize,this.fallSpeed);o.canvas=n,// 设置canvas引用
e.push(o)}}
/* 画雪 */function drawSnow(){var t=this.maxFlake,e=this.flakes;ctx=this.ctx,canvas=this.canvas,that=this,
/* 清空雪花 */
ctx.clearRect(0,0,canvas.width,canvas.height);for(var n=0;n<t;n++)e[n].update(),e[n].render(ctx);
/*  一帧一帧的画 */this.loop=requestAnimationFrame(function(){drawSnow.apply(that)})}
/* 调用及控制方法 */requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(t){setTimeout(t,1e3/60)},cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame||window.oCancelAnimationFrame,
/* 开始下雪 */
snowFall.prototype.start=function(){
/* 创建画布 */
snowCanvas.apply(this),
/* 创建雪花形状 */
createFlakes.apply(this),
/* 画雪 */
drawSnow.apply(this)},flakeMove.prototype.update=function(){this.x,this.y
/* 左右摆动(余弦) */;this.velX*=.98,this.velY<=this.speed&&(this.velY=this.speed),this.velX+=Math.cos(this.step+=.05)*this.stepSize,this.y+=this.velY,this.x+=this.velX;
/* 飞出边界的处理 - 使用当前画布的尺寸，而不是全局canvas变量 */
var t=this.canvas?this.canvas.width:window.innerWidth,e=this.canvas?this.canvas.height:Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight);(this.x>=t||this.x<=0||this.y>=e||this.y<=0)&&this.reset(t,e)},
/* 飞出边界-放置最顶端继续坠落 */
flakeMove.prototype.reset=function(t,e){this.x=Math.floor(Math.random()*t),this.y=0,this.size=Math.random()*this.maxSize+2,this.speed=1*Math.random()+this.fallSpeed,this.velY=this.speed,this.velX=0},
// 渲染雪花-随机形状（此处可修改雪花颜色！！！）
flakeMove.prototype.render=function(t){var e=t.createRadialGradient(this.x,this.y,0,this.x,this.y,this.size);e.addColorStop(0,"rgba(255, 255, 255, 0.9)"),/* 此处是雪花颜色，默认是白色 */
e.addColorStop(.5,"rgba(255, 255, 255, 0.5)"),/* 若要改为其他颜色，请自行查 */
e.addColorStop(1,"rgba(255, 255, 255, 0)"),/* 找16进制的RGB 颜色代码。 */
t.save(),t.fillStyle=e,t.beginPath(),t.arc(this.x,this.y,this.size,0,2*Math.PI),t.fill(),t.restore()};var snow=new snowFall({maxFlake:500});
// 只在首页启动
function checkAndStartSnow(){
// 判断是否为首页（根据你的Hexo主题选择一种方式）
// 方式1：通过URL判断（最简单）
var t=window.location.pathname;"/"!==t&&"/index.html"!==t||snow.start();
// 方式2：通过body的class判断（推荐，更准确）
// if (document.body.classList.contains('home') || 
//     document.body.classList.contains('index')) {
//     snow.start();
// }
}
// 初始检查
snow.start(),
// 添加一个简单的停止方法
window.stopSnow=function(){snow&&snow.loop&&(cancelAnimationFrame(snow.loop),snow.loop=null);var t=document.getElementById("snowfall");t&&t.remove()},checkAndStartSnow(),
// 监听Pjax页面切换
document.addEventListener("pjax:complete",function(){
// 先停止动画
window.stopSnow(),
// 重新检查是否为首页
checkAndStartSnow()});