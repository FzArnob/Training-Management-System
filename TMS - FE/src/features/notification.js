export function showNotification(msg, type){
    const list = document.getElementById("notification-box");
    const node = document.createElement("div");
    if(type === "success"){
        let icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-check"); 
        node.setAttribute("class", "notification-success"); 
        node.appendChild(icon);
        node.appendChild(document.createTextNode(" "+msg));
    } else if(type === "error"){
        let icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-times"); 
        node.setAttribute("class", "notification-error"); 
        node.appendChild(icon);
        node.appendChild(document.createTextNode(" "+msg));
    } else {
        let icon = document.createElement("i");
        icon.setAttribute("class", "fa fa-warning"); 
        node.setAttribute("class", "notification-warning"); 
        node.appendChild(icon);
        node.appendChild(document.createTextNode(" "+msg));
    }
    list.appendChild(node);
    setTimeout(() => {
        list.removeChild(list.firstElementChild);
    }, 3000);
}