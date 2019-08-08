var count= 1;
var completeContent= ``;
var name= '';
var personName= '';
var twoToOne= 0;

window.onload = function(){

var elem = document.getElementById('name');

elem.onkeyup = function(e){

    if(e.keyCode == 13){
       searchPersonality();
        }

    }
}

function nextTwenty(){

    count+=1;
    completeContent= ``;
    name= personName;
    searchPersonality();
    document.getElementById('message').innerHTML= "";
}

function previousTwenty(){

    if(count>1 && count!=2){
        count-=1;
        completeContent= ``;
        name= personName;

        searchPersonality();

    }
    else if(count ==2 && count>1){
        count-=1;
        completeContent= ``;
        name= personName;
        twoToOne++;

        searchPersonality();
        
    }
    else{

        document.getElementById('message').innerHTML= "Already at first Page!";

    }

}

function searchPersonality()
{
       
        if(count == 1 && twoToOne==0 && name==personName){
            document.getElementById("imgg").style.display= "block";
            document.getElementById('imgg').src= "images/loadingg.gif";
        }

        document.getElementById("result-box").style.display= "flex";

        personName= document.getElementById("name").value;
        //name= personName;

        if(name != personName)
        {
            count= 1;
        }

        if(personName == ''){
            document.getElementById('result-box').innerHTML= 'Please provide a name';
        }
        else{

                completeContent=``;
            
            fetch(`https://api.github.com/search/users?q=${personName}+in&per_page=20&page=${count}`)
                .then(res => res.json())
                .then(data => {

                    var total_pages= Math.ceil(data.total_count/20);
                    console.log(total_pages);

                    if(count!=1){
                            completeContent= ``;
                    }

                    if(count<= total_pages ){
                    
                            for(var i=0; i<20; i++){

                                fetch(`https://api.github.com/users/${data.items[i].login}`)
                                    .then(res2 => res2.json())
                                    .then(data2 => {
                                            console.log(data2);

                                            completeContent+= `<div class="result-divs tr">
                                                    <div class="elements td"><img class="img" src="${data2.avatar_url}" id="image"/></div>
                                                    <div class="elements td"><h2 id="username">${data2.name}</h2></div>
                                                    <div class="elements td"><h2 id="usercreated">Account created:<br/> ${data2.created_at}</h2></div>
                                                    <div class="elements td"><a id="userlink" href="${data2.html_url}" target="_blank">Click to visit</a></div>
                                                    <div class="elements td"><a id="userrepo" href="${data2.html_url}?tab=repositories" target="_blank">Click to explore</a></div>
                                                </div><br/>`;

                                                document.getElementById('result-box').innerHTML= completeContent;

                                            }

                                    );
                                        
                                }   

                    }
                    else{   
                            document.getElementById('result-box').innerHTML= 'NO MORE DATA FOUND';  
                    }
                    
                    //document.getElementById('result-box').innerHTML= '';  

                }
        
            );

                document.getElementById('next-button').style.display= 'flex';
                document.getElementById('previous-button').style.display= 'flex';
        }
    
    }