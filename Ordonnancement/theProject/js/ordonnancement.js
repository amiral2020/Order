
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
	
	
	
}

function tracerGanttChart() {
	
	var theDivChart = $("#ganttChart");
	for(i = 0; i <= theIProcessus ;i++){
		
	}
	
}

