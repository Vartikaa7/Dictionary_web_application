
let btn=document.querySelector("button");
let def=document.querySelector(".data");
btn.addEventListener("click",()=>{
    let flag;
    inp=document.querySelector("input");
    let word=(inp.value).toLowerCase();
    if (word==""){
        alert("please write word")
        def.innerHTML="";
    }else{
        flag=0;
        for(let i=0;i<word.length;i++){
            if(word[i]==" "){
                flag=1;
                break
            }
            else if(word[i].charCodeAt()>=97 && word[i].charCodeAt()<=122){
                // console.log(word[i].charCodeAt());
            }
            else{
                flag=1;
                break
            }
        }
        if (flag==0){
            url=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            urlfetch(url);
        }else{
            alert("Enter valid word");
            def.innerHTML="";
        }
    }
});

function urlfetch(url){
    fetch(url).then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data);
        if (data.title==="No Definitions Found"){
            def.innerHTML=`No Definitions Found`;
        }else{
            let count=0;
            def.innerHTML="";
            console.log(data[0].meanings);
            let d=data[0].meanings;
            let table=document.createElement("table");
            table.innerHTML=`<tr><th>Sno</th><th>Parts of Speech</th><th>Defination</th>`;
            def.appendChild(table);
            while(count<=3 && count<d.length){
                let tr=document.createElement("tr");
                // console.log(d[count].partOfSpeech);
                // console.log(d[count].definitions[0].definition);
                tr.innerHTML=`<td>${count}</td><td>${d[count].partOfSpeech}</td><td>${d[count].definitions[0].definition}`;
                table.appendChild(tr);
                count++;
            }
        }
        
    }).catch((err)=>{
        console.log(err);

    })
}