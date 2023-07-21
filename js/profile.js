function change_breadcrumb_news(name){
    let breadcrumb = document.getElementsByClassName('breadcrumb')[0];
    breadcrumb.innerHTML = "<a href='profile.html'><img src='imgs/html_icon.png' class='file_icon'>\ profile.html\ </a> > <a href='#"+name+"'>"+name+"</a>";
    console.log(breadcrumb.innerHTML);
};