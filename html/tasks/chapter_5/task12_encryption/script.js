var encForm = document.getElementById("encrypt");
var emess = document.getElementById("emess");
var eciph = document.getElementById("enum");
var etext = document.getElementById("etext");
encForm.onsubmit=function(evt){
    evt.preventDefault();
    etext.innerHTML = encrypt(emess.value, parseInt(eciph.value));
}

var decForm = document.getElementById("decrypt");
var dmess = document.getElementById("dmess");
var dciph = document.getElementById("dnum");
var dtext = document.getElementById("dtext");
decForm.onsubmit=function(evt){
    evt.preventDefault();
    dtext.innerHTML = decrypt(dmess.value, parseInt(dciph.value));
}

function mod(x,n){
    return ((x%n)+n)%n;
}


function encrypt(mess,number){
    messArray=mess.split('');
    result=[];

    for (i in messArray){
        x=messArray[i].charCodeAt(0);

        if (x>64 && x<91){
            x-=64;
            x+=number;
            x=mod(x,26);
            x+=64;
        } else if (x>96 && x<123){
            x-=96;
            x+=number;
            x=mod(x,26);
            x+=96;
        }
        result.push(String.fromCharCode(x));
    }
    result = result.join("");
    return result;

}

function decrypt(mess,number){
    messArray=mess.split('');
    result=[];

    for (i in messArray){
        x=messArray[i].charCodeAt(0);

        if (x>64 && x<91){
            x-=64;
            x-=number;
            x=mod(x,26);
            x+=64;
        } else if (x>96 && x<123){
            x-=96;
            x-=number;
            x=mod(x,26);
            x+=96;
        }
        result.push(String.fromCharCode(x));
    }
    result = result.join("");
    return result;
}