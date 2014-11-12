
function algorithmes(){
	
	var comingValue = document.getElementsByName("comingFields[]");
	var timeValue = document.getElementsByName("timeFields[]");
	
	var donnee = Array();
	
	for(i = 0; i <= theIProcessus ; i++ ) {
		donnee[i] = {
				name : "P"+i ,
				coming : comingValue[i].value,
				time : timeValue[i].value
		};
		
		console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
		
	
	}
	
	var optionsRadios = document.getElementsByName("optionsRadios");
	var choix;
	
	for(i = 0; i < optionsRadios.length; i++){
		if(optionsRadios[i].checked) choix = optionsRadios[i].value;
	}
	
	console.log(choix);
	
	var gant = Array();
	
	switch(choix){
		case "FIFO" : {
			console.log("the fifo");
			donnee = fifo(donnee);
			gant = firstGanntt(donnee)
		}
	}
	
	var theTable = document.getElementById("ganttTable");
	for(i=0; i < gant.length ; i++){
		console.log(gant[i]);
		if(gant[i]=="") theTable.innerHTML += '<td><button class="btn btn-danger btn-add" type="button"></button></td>';
		else theTable.innerHTML += '<td><button class="btn btn-success btn-add" type="button">'+gant[i]+'</button></td>';
	}
	
	var theTableThTime = document.getElementById("ganttTableTime");
	for(i=0; i < gant.length ; i++){
		theTableThTime.innerHTML +='<td>'+i+'</td>';
	}
	
//	console.log("pcter");
//	pcter(donnee);
//	
//	console.log("fifo");
//	fifo(donnee);
//	
//	console.log("pcte");
//	pcte(donnee);
}


	function firstGanntt(donnee){
		var gant = Array();
		var t = 0;
		for(i = 0; i < donnee.length; i++)
		{
			while(t < donnee[i].coming){
				gant[t] = "";
				t++;
			}
			for(j = 0; j < donnee[i].time; j++){
				gant[t] = donnee[i].name;
				t++;
			}
		}
		
		return gant;
	}
	
	// impl. des algorithmes
	
	function fifo(donnee) {
		
		for(i = 0; i < donnee.length; i++){
			for(j = i+1; j < donnee.length; j++){
				if(donnee[i].coming > donnee[j].coming){
					temp = donnee[i];
					donnee[i] = donnee[j];
					donnee[j] = temp;
				}
			}
		}
		
		console.log("donne sorted");
		for(i = 0; i <= theIProcessus ; i++ ) {

			console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
			
		}
		return donnee;
	}
	
	

	function pcter(donnee){
		
		for(i = 0; i < donnee.length; i++){
			for(j = i+1; j < donnee.length; j++){
				if(donnee[i].time > donnee[j].time){
					temp = donnee[i];
					donnee[i] = donnee[j];
					donnee[j] = temp;
				}
			}
		}
		
		console.log("donne sorted");
		for(i = 0; i <= theIProcessus ; i++ ) {

			console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
			
		}
		
		return donnee;
	}
	
	
	function pcte(donnee) {
	
		for(i = 0; i < donnee.length; i++){
			for(j = i+1; j < donnee.length; j++){
				if(donnee[i].coming < donnee[j].coming){
					temp = donnee[i];
					donnee[i] = donnee[j];
					donnee[j] = temp;
				}
			}
		}
		
		console.log("donne sorted");
		for(i = 0; i <= theIProcessus ; i++ ) {

			console.log("name : "+donnee[i].name+"\tcoming : "+donnee[i].coming+"\ttime : "+donnee[i].time);
			
		}
		return donnee;
	}
	
	
	function tourniquet(donnee) {
		
	//	var quantum = 1;
		var tempDonnee = Array();
		
		for(i; i<donnee.length;i++){
			
			if(donnee[i].time>1){
				
				donnee[i].time-= 1;
				tempDonnee[i] = donnee[i];
			
			}else{
				
				tempDonnee[i] = donnee[i];
				donnee.splice(donnee.indexOf(value), i); // make sure we delete it like this :3
			}
		}
		return tempDonnee;
		}
	

function tracerGanttChart() {
	
	var theDivChart = $("#ganttChart");
	for(i = 0; i <= theIProcessus ;i++){
		
	}
	
}

