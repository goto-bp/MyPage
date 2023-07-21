let is_open = [false, false, false, false, false];

if (navigator.userAgent.match(/iPhone|Android.+Mobile/))
{
    alert("This site is not supported on mobile devices.");
}

slide(0);

let file_names= [
    document.getElementById('load_one').title,
    document.getElementById('load_two').title
]

try
{
    $("#load_one").load(file_names[0] + " #main_window");
    $("#load_two").load(file_names[1] + " #main_window");
}
catch(error)
{
    console.log(error);
}

let file_content = [
document.getElementById("load_one").getElementsByClassName("main_window")[0],
document.getElementById("load_two").getElementsByClassName("main_window")[0]
];


function icon_open(num)
{
    const side_icon = document.getElementsByClassName("side_icon")[num];
    const file = document.getElementsByClassName("file")[num];

    side_icon.style.opacity = "1";
    side_icon.style.borderLeftColor = "#FFF";

    file.style.display = "block";
}

function icon_close(num)
{
    const side_icon = document.getElementsByClassName("side_icon")[num];
    const file = document.getElementsByClassName("file")[num];

    side_icon.style.opacity = "0.5";
    side_icon.style.borderLeftColor = "rgba(0, 0, 0, 0)";

    file.style.display = "none";
}

function slide(num)
{
    
    const vs_sub_bar = document.getElementsByClassName("vs_sub_bar")[0];
    const main_window = document.getElementsByClassName("main_window")[0];
    const breadcrumb = document.getElementsByClassName("breadcrumb")[0];
    

    for(let i = 0; i < 5; i++)
    {
        if(i != num)
        {
            if(is_open[i])
            {
                icon_close(i);
            }
            is_open[i] = false;
        }
    }

    if(!is_open[num])
    {
        vs_sub_bar.style.left = "17.5%";

        main_window.style.left = "17.5%";
        main_window.style.width = "82.5%";

        breadcrumb.style.left = "17.5%";


        icon_open(num);
    }
    else
    {
        vs_sub_bar.style.left = "2.5%";

        main_window.style.left = "2.5%";
        main_window.style.width = "97.5%";

        breadcrumb.style.left = "2.5%";
        
        icon_close(num);
    }

    is_open[num] = !is_open[num];
    

}

function find_character_in_html(character)
{
    const html = document.getElementsByClassName("main_window")[0];
    const html_text = html.innerHTML;

    const span_start = "<span style=\"background-color: rgba(255, 133, 84, 0.5);\">";
    const span_end = "</span>";

    let tmp = html_text;


    if(html_text.indexOf(span_start) != -1)
    {
        let regexp_start = new RegExp(span_start.replace("(", "\\(").replace(")", "\\)"), "g");
        let regexp_end = new RegExp(span_end, "g");

        tmp = html_text.replace(regexp_start ,"").replace(regexp_end ,"");
    }


    find_character_in_other_html(character);
    if(!character)
    {
        html.innerHTML = tmp;
        return -1;
    }

    let index = tmp.indexOf(character);
    let character_num = 0;

    if(index != -1)
    {
        var reg = "(<\/?[^>]+?>)|"+ character;
        var regex = new RegExp(reg, "g");
        html.innerHTML = tmp.replace(regex, function(match, p1) {
          if (p1) {
            return match;
          } else {
            return span_start + character + span_end;
          }
        });
    }
    else
    {
        html.innerHTML = tmp;
    }
    

    return character_num;
}

function find_character_in_other_html(character)
{
    let index_text = document.getElementsByClassName("main_window")[0].innerText;

    let index_m = index_text.indexOf(character);

    let indexs = [];
    for (let i = 0; i < file_content.length; i++)
    {
        indexs[i] = file_content[i].indexOf(character);
    }

    let language = document.getElementsByTagName("html")[0].getAttribute("lang");

    let elem = document.getElementsByClassName("search_result")[0];

    elem.innerHTML = "";

    if(!character)
    {
        return -1;
    }

    if(language == "jp")
    {
        if(index_m >= 0)
        {
            elem.innerHTML += "このページに見つかりました．<br>";
        }

        for (let i = 0; i < file_names.length; i++)
        {
            if(indexs[i] >= 0)
            {
                elem.innerHTML += "<a href='"+ file_names[i] +"' style='color:rgb(44, 134, 255)'>"+ file_names[i] +"</a>に見つかりました．<br>";
            }
        }
    }
    else
    {
        if(index_m >= 0)
        {
            elem.innerHTML += "found on this page.<br>";
        }

        for (let i = 0; i < file_names.length; i++)
        {
            if(indexs[i] >= 0)
            {
                elem.innerHTML += "found on <a href='"+ file_names[i] +"' style='color:rgb(44, 134, 255)'>"+ file_names[i] +"</a>.<br>";
            }
        }
    }

}

window.addEventListener('DOMContentLoaded', () => {
  
    let input_name = document.getElementById("search_box_id");

    input_name.addEventListener("input",function(){
        find_character_in_html(this.value);
    });
});
  
setTimeout(() => {
    try
    {
        file_content[0] = document.getElementById("load_one").getElementsByClassName("main_window")[0].innerText;
        file_content[1] = document.getElementById("load_two").getElementsByClassName("main_window")[0].innerText;
    }
    catch(error)
    {
        file_content[0] = "";
        file_content[1] = "";
    }

    find_character_in_html(document.getElementById("search_box_id").value);

}, 1000);
