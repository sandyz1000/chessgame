/* Chessboard Class  */
var Chessboard = {
	
	peiceId : null,
	
	peiceColor : '',
	
	peiceName : '',

	movesStatus : false,

	BoardStatus : {
		'A0' : 'B-Ro',
		'A1' : 'B-Kn',
		'A2' : 'B-Bi',
		'A3' : 'B-Qu',
		'A4' : 'B-Ki',			
		'A5' : 'B-Bi',
		'A6' : 'B-Kn',
		'A7' : 'B-Ro',
		'B0' : 'B-Pa',
		'B1' : 'B-Pa',
		'B2' : 'B-Pa',
		'B3' : 'B-Pa',
		'B4' : 'B-Pa',
		'B5' : 'B-Pa',
		'B6' : 'B-Pa',
		'B7' : 'B-Pa',
		'G0' : 'W-Pa',
		'G1' : 'W-Pa',
		'G2' : 'W-Pa',
		'G3' : 'W-Pa',
		'G4' : 'W-Pa',
		'G5' : 'W-Pa',
		'G6' : 'W-Pa',
		'G7' : 'W-Pa',
		'H0' : 'W-Ro',
		'H1' : 'W-Kn',
		'H2' : 'W-Bi',
		'H3' : 'W-Qu',
		'H4' : 'W-Ki',			
		'H5' : 'W-Bi',
		'H6' : 'W-Kn',
		'H7' : 'W-Ro',
	},

	PlayerStatus : {
		white : true,
		black : false
	},

	RowBlock : {
		0 : 'A',
		1 : 'B',
		2 : 'C',
		3 : 'D',
		4 : 'E',
		5 : 'F',
		6 : 'G',
		7 : 'H',
	},

	PeicesMap : {
		'Pa' : 'Pawn',
		'Ro' : 'Rook',
		'Kn' : 'Knight',
		'Qu' : 'Queen',
		'Bi' : 'Bishop',
		'Ki' : 'King',
	},

	generateBoard : function(){

		var chessBoardContainer = $('.chessboard');
		for (var i in this.RowBlock) {  
			//Object.keys(Rowblock).length to get the length of an object
			var row = this.RowBlock[i];
			var rowContainer = document.createElement('div');
			rowContainer.setAttribute('class', 'board-row clearfix');
			var j = 0;
			while(j < 7){
				var whiteBox = document.createElement('div');
				var blackBox = document.createElement('div');
				whiteBox.setAttribute('class', 'white-box drop');
				blackBox.setAttribute('class', 'black-box drop');
				if (parseInt(i) % 2 == 0) {
					whiteBox.setAttribute('id', row+j);	
					blackBox.setAttribute('id', row+(j+1));
					rowContainer.appendChild(whiteBox);
					rowContainer.appendChild(blackBox);
				} else {
					blackBox.setAttribute('id', row+j);
					whiteBox.setAttribute('id', row+(j+1));	
					rowContainer.appendChild(blackBox);
					rowContainer.appendChild(whiteBox);
				}
				j += 2;
			};
			if(rowContainer)
				chessBoardContainer.append(rowContainer);
			rowContainer = null;
		};

		return true;
	},

	initializedGamePeices : function(){
		for (var key in this.BoardStatus) {
			//Split the string into peices name and color
			var path = 'images/';
			var nameColorAry = this.BoardStatus[key].split('-');
			var peiceProperty = this.PeicesMap[nameColorAry[1]];
			var peicesImg = null;
			if(nameColorAry[0] == 'B') {
				peicesImg = (Peices && Peices[peiceProperty]) ? Peices[peiceProperty].blackImg : '';
			} else {
				peicesImg = (Peices && Peices[peiceProperty]) ? Peices[peiceProperty].whiteImg : '';
			}
			var imgFile = document.createElement('img');
			imgFile.setAttribute('src', path+peicesImg);
			if(!peicesImg || peicesImg.length < 0)
				imgFile.setAttribute('alt', nameColorAry[0]+'-'+peiceProperty);
			$("#"+key).append(imgFile);
		}
	},

	updateBoardStatus : function(newPos, oldPos){  //eg: B-Ri

		if(this.BoardStatus.hasOwnProperty(oldPos)) {
			this.BoardStatus[newPos] = Chessboard.peiceColor+"-"+Chessboard.peiceName.substr(0,2);
			if(newPos != oldPos)
				delete this.BoardStatus[oldPos];
		}

		if(this.BoardStatus[newPos])
			return true;
		else
			return false;
	}

};





