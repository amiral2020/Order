/**
 * Created by AMIRAL on 14/01/2015.
 */

function algorithmesPeriodique() {

    var capacites = document.getElementsByName("capaciteFields[]");
    var periodes = document.getElementsByName("periodeFields[]");
    var deadlines = document.getElementsByName("echeanceFields[]");

    var donnee = Array();

    var nbrProc = capacites.length

    for(i=0 ; i < nbrProc; i++){
        donnee[i] = {
            name : "P"+i ,
            capacite : capacites[i].value,
            periode : periodes[i].value,
            deadline : deadlines[i].value,
            reste : capacites[i].value,
            nouveauDeadline : deadlines[i].value
        };

        console.log("name : "+donnee[i].name+"\tcapacite : "+donnee[i].capacite+"\tperiode : "+donnee[i].periode+"\t : "+donnee[i].deadline);
    }

    var optionsRadios = document.getElementsByName("optionsRadios_algoP");
    var choix;

    for(i = 0; i < optionsRadios.length; i++){
        if(optionsRadios[i].checked) choix = optionsRadios[i].value;
    }

    switch(choix){
        case "RMA" : {
            console.log("the RMA");
            donnee = rma(donnee);
            gant = gantRma(donnee);
            break;
        }
        case "DMA" : {
            console.log("the DMA");
            donnee = dma(donnee);
            gant = gantDma(donnee);
            break;
        }
        case "EDF" : {
            console.log("the PCTER");
            donnee = edf(donnee);
            gant = gantEdf(donnee);
            break;
        }
        case "TOURNIQUET" : {
            console.log("the TOURNIQUET");
            donnee = fifo(donnee);
            gant = tourniquet(donnee);
            break;
        }
    }


    showGant(gant);

}

function rma(donnees){
    console.log(donnees.length);
    var nbr = donnees.length;
    for(i = 0; i < nbr-1; i++){
        for(j = i+1; j < nbr; j++){

            console.log("periode i = "+donnees[i].periode+"\tperiode j = "+donnees[j].periode);

            if(parseInt(donnees[i].periode,10) > parseInt(donnees[j].periode,10)){
                console.log("true");
                temp = donnees[i];
                donnees[i] = donnees[j];
                donnees[j] = temp;
            }else{
                console.log("false");
            }

            console.log("i = "+i+"\t j = "+j);
            for(c = 0; c < donnees.length ; c++ ) {

                console.log("name : "+donnees[c].name+"\tcapacite : "+donnees[c].capacite+"\tperiode : "+donnees[c].periode+"\t : "+donnees[c].deadline);

            }
        }
    }

    console.log("donne sorted rma");
    for(d = 0; d < donnees.length ; d++ ) {

        console.log("name : "+donnees[d].name+"\tcapacite : "+donnees[d].capacite+"\tperiode : "+donnees[d].periode+"\t : "+donnees[d].deadline);

    }
    return donnees;
}


//sort
function dma(donnees){
    console.log(donnees.length);
    var nbr = donnees.length;
    for(i = 0; i < nbr-1; i++){
        for(j = i+1; j < nbr; j++){

            if(parseInt(donnees[i].deadline,10) > parseInt(donnees[j].deadline,10)) {
                temp = donnees[i];
                donnees[i] = donnees[j];
                donnees[j] = temp;
            }
        }
    }

    console.log("donne sorted dma");
    for(d = 0; d < donnees.length ; d++ ) {

        console.log("name : "+donnees[d].name+"\tcapacite : "+donnees[d].capacite+"\tperiode : "+donnees[d].periode+"\t : "+donnees[d].deadline);

    }
    return donnees;
}


//sort EDF
function edf(donnees){
    console.log(donnees.length);
    var nbr = donnees.length;
    for(var i = 0; i < nbr-1; i++){
        for(j = i+1; j < nbr; j++){

            if(parseInt(donnees[i].nouveauDeadline,10) > parseInt(donnees[j].nouveauDeadline,10)) {
                temp = donnees[i];
                donnees[i] = donnees[j];
                donnees[j] = temp;
            }
        }
    }

    return donnees;
}

function gantRma(donnee){
    var myGant = Array();
    var bool ;
    for(i=0 ; i < 20; i++){
        bool = true;
        for(o=0 ; o < donnee.length; o++){

            if(activation(i,donnee[o].periode)) {
                console.log("true");
                donnee[o].reste = donnee[o].capacite;
            }
            if(bool && donnee[o].reste!=0){
                myGant[i]=donnee[o].name;
                donnee[o].reste -= 1;
                bool = false;
            }else{
                if(bool)myGant[i] = "";
            }
        }
    }

    return myGant;
}


//
function gantDma(donnee){

    var myGant = Array();
    var bool ;
    for(i=0 ; i < 20; i++){
        bool = true;
        for(o=0 ; o < donnee.length; o++){

            if(activation(i,donnee[o].periode)) {
                console.log("true");
                donnee[o].reste = donnee[o].capacite;
            }
            if(bool && donnee[o].reste!=0){
                myGant[i]=donnee[o].name;
                donnee[o].reste -= 1;
                bool = false;
            }else{
                if(bool)myGant[i] = "";
            }
        }
    }

    return myGant;
}

//Gant EDF
function gantEdf(donnee){

    var myGant = Array();
    var nbr = donnee.length;

    var bool ;
    for(var i=0 ; i < 20; i++){

        console.log("in : "+i);

        for(c=0; c < nbr; c++){
            if(activation(i,donnee[c].periode)) {
                console.log("true");
                donnee[c].reste = donnee[c].capacite;
                if(i!=0)donnee[c].nouveauDeadline += donnee[c].periode;
            }
        }

        donnee = edf(donnee);
        bool = true;
        for(o=0 ; o < nbr; o++){

            if(bool && donnee[o].reste!=0){
                myGant[i]=donnee[o].name;
                donnee[o].reste -= 1;
                bool = false;
            }else{
                if(bool)myGant[i] = "";
            }
        }
    }

    return myGant;
}


function activation(i, periode){

    return ((i%periode) == 0);
}


function showGant(gant){
    var theTable = document.getElementById("ganttTable");
    theTable.innerHTML = "";
    var boool = true;
    var temmmp = gant[0];
    for(i=0; i < gant.length ; i++){
        console.log(gant[i]);
        if(gant[i]=="") theTable.innerHTML += '<td><button class="btn btn-danger btn-add" type="button"></button></td>';
        else
        {

            if(temmmp != gant[i]){
                if(boool) boool = false;
                else boool = true;
            }
            if(boool) theTable.innerHTML += '<td><button class="btn btn-success btn-add" type="button">'+gant[i]+'</button></td>';
            else theTable.innerHTML += '<td><button class="btn btn-primary btn-add" type="button">'+gant[i]+'</button></td>';
        }

        var temmmp = gant[i];
    }

    var theTableThTime = document.getElementById("ganttTableTime");
    theTableThTime.innerHTML = "";
    for(i=0; i < gant.length ; i++){
        theTableThTime.innerHTML +='<td>'+i+'</td>';
    }

}

