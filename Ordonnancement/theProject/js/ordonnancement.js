
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
	
	sortDonnee(donnee);
}
	
	// impl. des algorithmes
	
	function fifo(donnee) {
		
		return donnee;
	}
	
	function pcter() {
		
		return donnee.sort();
	}

	function sortDonnee(donnee){
		
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

