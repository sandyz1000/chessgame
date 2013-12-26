
/* Initialize the chessboard Class */

$(document).ready(function(){

	if(Chessboard.generateBoard()){

		Chessboard.initializedGamePeices();	
	}	

	$(".chessboard img").draggable({
		grid : [ 100, 100 ],
		addClasses: false,
		containment: ".chessboard",
		scope : "tasks",
		start : function(event, ui){
			peiceId = $(this).parent('div').attr('id');
			var peiceAry = Chessboard.BoardStatus[peiceId].split('-');
			Chessboard.peiceColor = peiceAry[0];
			if(Chessboard.peiceColor == 'B' && !Chessboard.PlayerStatus.black)
				return false;
			if(Chessboard.peiceColor == 'W' && !Chessboard.PlayerStatus.white)
				return false;
			Chessboard.peiceName = Chessboard.PeicesMap[peiceAry[1]];
			Chessboard.movesStatus = Peices.moves(peiceId, Chessboard.peiceName, Chessboard.BoardStatus, Chessboard.peiceColor);
			if(Chessboard.movesStatus) {
				$.each(Peices.moverAry, function(key, value){
					$(".chessboard").find('#'+value).css('background', '#47E54C');
					$(".chessboard").find('#'+value).addClass('drop');
				});
				$.each(Peices.attack, function(key, value){
					$(".chessboard").find('#'+value).css('background', '#FC6A6A');
					$(".chessboard").find('#'+value).addClass('drop');
				});
				
			}
		},
		stop : function(event, ui){
			if(Chessboard.movesStatus) {
				$.each(Peices.moverAry, function(key, value){
					$(".chessboard").find('#'+value).removeAttr('style');
					$(".chessboard").find('#'+value).removeClass('drop');
				});
				$.each(Peices.attack, function(key, value){
					$(".chessboard").find('#'+value).removeAttr('style');
					$(".chessboard").find('#'+value).removeClass('drop');
				});
				
			}
			Peices.moverAry.length = 0;
			Peices.attack.length = 0;
			Chessboard.movesStatus = false;
		},
		revert : 'invalid' //I won't revert if I am dropped
	});

	$('.drop').droppable({
		accept : 'img',
		addClasses: false,
		scope : "tasks",
		tolerance : "fit",
		greedy : true,
		drop : function(event, ui){
			var oldPosition = $(ui.draggable).parent('div').attr('id');
			var newPosition = $(this).attr('id');
			var boardStatus = false;
			var positionAry = Peices.moverAry.concat(Peices.attack);
			if(positionAry.indexOf($(event.target).attr("id")) == -1 ) {
				$(ui.draggable).draggable({ revert : true })
			} else {
	    		boardStatus = Chessboard.updateBoardStatus(newPosition, oldPosition);
	    		if(boardStatus) {
	    			Chessboard.PlayerStatus.white = (Chessboard.PlayerStatus.white) ? false : true;
	    			Chessboard.PlayerStatus.black = (Chessboard.PlayerStatus.black) ? false : true;
	    		}
	    		if(Peices.attack.length > 0 && $(event.target).children('img').attr('src').indexOf("king") != -1) {
	    			var rmvKing = $(event.target).children('img').remove();
	    			if(rmvKing)
	    				var confirmed=confirm("Game Over! Click OK to start a new game");
						if (confirmed) {
							location.reload();
						}
	    		} else if(Peices.attack.length > 0){
	    			$(event.target).children('img').remove();
	    		}	
	    		$(event.target).append($(ui.draggable).removeAttr('style'));
    		}
		}
	});

});
