console.log("hi")

fetch('/weather').then((response)=>{
    response.json().then((data)=>{
        console.log(data);
    })
})