let apiKey='AIzaSyCZKNhsezUtpi0GwccsU5RK-lZGyora7YA'
let URL='https://youtube.googleapis.com/youtube/v3/videos'
let country=document.getElementById('country').value 


var options={
    part:'snippet',
    chart:'mostPopular',
    regionCode:country,
    key:apiKey,
    videoCategoryId:'0'
    
}
function getResult(URL,options){
    $.getJSON(URL,options,function(data){
        showResult(data)
        
    })
    
}
getResult(URL,options)

function showResult(data){
    console.log(data)
    let html=""
    index=1
    data.items.forEach(function(item){
        html+=`<a href='https://youtu.be/${item.id}' style="color:red;">${index}.${item.snippet.localized.title}<br></a>`
        console.log(item.snippet.localized.title,item.id)
        index=index+1
    })
    let note=document.getElementById("video")
    note.innerHTML=html
}

document.getElementById('country').addEventListener('change',function(){
    country=document.getElementById('country').value
    options.regionCode=country
    getResult(URL,options)

})
