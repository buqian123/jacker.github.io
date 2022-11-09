window.onload = function () {
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }, {
        passive: false  // 关闭被动监听
    });
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
};
const time_update_list=[];let time_updater_init=!1;function updateTime(){var d=new Date((new Date).getTime()+288e5).toISOString().replace("T"," ");for(const item of time_update_list)for(const element of document.querySelectorAll(item.selector))element.innerText=d.slice(item.start,item.end)}let time_interval=1e3;function setDynamicTime(selector,start=0,end=19){time_update_list.push({selector:selector,start:start,end:end}),updateTime(),time_updater_init||(time_updater_init=!0,window.setInterval(updateTime,time_interval))}function setUpdateInterval(interval=1e3){time_interval=interval}function setStaticTime(selector,start=0,end=19,traceback_hours=0,traceback_range=0,filter=x=>x){for(const element of document.querySelectorAll(selector)){var hours=element.attributes["data-traceback-hours"]?.value?parseFloat(element.attributes["data-traceback-hours"]?.value)+(Math.random()-.5)*parseFloat(element.attributes["data-traceback-range"]?.value||0):traceback_hours+(Math.random()-.5)*traceback_range,hours=new Date((new Date).getTime()+288e5-3600*hours*1e3).toISOString().replace("T"," ");element.innerText=filter(hours.slice(start,end))}}const presetFilters={name:x=>2==x.length?x[0]+"*":x[0]+"*".repeat(x.length-2)+x.slice(-1),lastnameonly:x=>x[0]+"*".repeat(x.length-1),firstnameonly:x=>"*"+x.slice(1),lastcharonly:x=>"*".repeat(x.length-1)+x.slice(-1),idcard:(start=2,end=2,mask=18-start-end)=>x=>x.slice(0,start)+"*".repeat(mask)+x.slice(-end),phone:(start=3,end=4,mask=11-start-end)=>x=>x.slice(0,start)+"*".repeat(mask)+x.slice(-end)},fields={};function addStorageField(id,selector,name,placeholder,filter=x=>x,callback=()=>{}){var elements=document.querySelectorAll(selector),selector={selector:selector,placeholder:placeholder,filter:filter},init_value=(id in fields?fields[id].push(selector):fields[id]=[selector],localStorage.getItem(id)||placeholder);for(const element of elements)element.innerText=filter(init_value),element.addEventListener("click",()=>{var res=window.prompt("修改"+name+"：",localStorage.getItem(id)||placeholder);""==res||null==res?localStorage.removeItem(id):localStorage.setItem(id,res),callback(res||placeholder);for(const _item of fields[id])for(const _element of document.querySelectorAll(_item.selector))_element.innerText=_item.filter(res||_item.placeholder)});callback(init_value)}function navigateHome(){window.location.href="https://jackjen8.github.io/jacker.github.io/"}function navigateToTripCard(){window.location.href="https://jackjen8.github.io/jacker.github.io/trip-card/index.html"}
