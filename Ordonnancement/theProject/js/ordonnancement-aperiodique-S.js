/**
 * Created by AMIRAL on 15/01/2015.
 */

function algorithmesAPeriodique() {

    var capacites = document.getElementsByName("capaciteFields_S[]");
    var periodes = document.getElementsByName("periodeFields_S[]");
    var deadlines = document.getElementsByName("echeanceFields_S[]");
    var aperiodiques = document.getElementsByName("aperiodiqueFields_S[]");

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



    var optionsRadios = document.getElementsByName("optionsRadios_algoAP_S");
    var choix;

    for(i = 0; i < optionsRadios.length; i++){
        if(optionsRadios[i].checked) choix = optionsRadios[i].value;
    }

    switch(choix){
        case "TempsCreux" : {
            console.log("the TempsCreux");
            donneePeriodique = edfAperiodiqueTempsCreux(donneePeriodique);
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