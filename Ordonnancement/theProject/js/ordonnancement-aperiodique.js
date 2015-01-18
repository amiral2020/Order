/**
 * Created by AMIRAL on 14/01/2015.
 */

function algorithmesAPeriodique() {

    var capacites = document.getElementsByName("capaciteFields_[]");
    var periodes = document.getElementsByName("periodeFields_[]");
    var deadlines = document.getElementsByName("echeanceFields_[]");
    var aperiodiques = document.getElementsByName("aperiodiqueFields_[]");

    var donnee = Array();

    var nbrProc = capacites.length

    for(i=0 ; i < nbrProc; i++){
        donnee[i] = {
            name : "P"+i ,
            capacite : capacites[i].value,
            periode : periodes[i].value,
            deadline : deadlines[i].value,
            reste : capacites[i].value,
            nouveauDeadline : deadlines[i].value,
            aperiodique : aperiodiques[i].checked
        };

        console.log("name : "+donnee[i].name+"\tcapacite : "+donnee[i].capacite+"\tperiode : "+donnee[i].periode+"\t : "+donnee[i].deadline);
    }


    var donneePeriodique = Array();
    var donneeAperiodique = Array();

    for(i=0 ; i < nbrProc; i++){
        if(!donnee[i].aperiodique){
            donneePeriodique[donneePeriodique.length] = donnee[i];
        }else{
            donneeAperiodique[donneeAperiodique.length] = donnee[i];
        }
    }



    var optionsRadios = document.getElementsByName("optionsRadios_algoAP");
    var choix;

    for(i = 0; i < optionsRadios.length; i++){
        if(optionsRadios[i].checked) choix = optionsRadios[i].value;
    }

    switch(choix){
        case "AP" : {
            console.log("the AP");
            donneePeriodique = rmaAperiodique(donneePeriodique);
            donneeAperiodique = fifoAperiodique(donneeAperiodique);
            gant = gantRmaAperiodique(donneePeriodique,donneeAperiodique);

            break;
        }
        case "SSCU" : {
            console.log("the SSCU");
            donnee = dma(donnee);
            gant = gantDma(donnee);
            break;
        }
        case "SDIF" : {
            console.log("the SDIF");
            donnee = edf(donnee);
            gant = gantEdf(donnee);
            break;
        }
        case "SSPO" : {
            console.log("the SSPO");
            donnee = llf(donnee);
            gant = gantLlf(donnee);
            break;
        }
    }


    showGant(gant);

}

function rmaAperiodique(donnees){
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


//sort fifo Aperiodique
function fifoAperiodique(donnees){

    var nbr = donnees.length;
    for(i = 0; i < nbr-1; i++) {
        for (j = i + 1; j < nbr; j++) {

            if (parseInt(donnees[i].periode, 10) > parseInt(donnees[j].periode, 10)) {
                temp = donnees[i];
                donnees[i] = donnees[j];
                donnees[j] = temp;
            }
        }
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

//sort llf
function llf(donnees, t){
    console.log(donnees.length);
    var nbr = donnees.length;
    for(var i = 0; i < nbr-1; i++){
        for(j = i+1; j < nbr; j++){

            if(parseInt(donnees[i].nouveauDeadline-t-donnees[i].reste,10) > parseInt(donnees[j].nouveauDeadline-t-donnees[j].reste,10)) {
                temp = donnees[i];
                donnees[i] = donnees[j];
                donnees[j] = temp;
            }
        }
    }

    return donnees;
}

function gantRmaAperiodique(donneePeriodique, donneeAperiodique){
    var myGant = Array();
    var bool ;
    for(i=0 ; i < 20; i++){
        bool = true;
        for(o=0 ; o < donneePeriodique.length; o++){

            if(activation(i,donneePeriodique[o].periode)) {
                console.log("true");
                donneePeriodique[o].reste = donneePeriodique[o].capacite;
            }
            if(bool && donneePeriodique[o].reste!=0){
                myGant[i]=donneePeriodique[o].name;
                donneePeriodique[o].reste -= 1;
                bool = false;
            }else{
                if(bool)myGant[i] = "";
            }
        }

        if(bool){
            for(var j=0; j < donneeAperiodique.length; j++){
                if(donneeAperiodique[j].periode <= i && donneeAperiodique[j].reste!=0){
                    myGant[i] = donneeAperiodique[j].name;
                    donneeAperiodique[j].reste--;
                }
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


//Gant LLF
function gantLlf(donnee){

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

        donnee = llf(donnee,i);
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


