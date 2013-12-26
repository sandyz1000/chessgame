/* Class Peice */

var Peices = {

	attack : [],

	movesGraph : ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],

	moverAry : [],

	Peice : "",

	peiceColor : '',

	moves : function(id, value, obj, color){
			var yCordinate = null;
			var xCordinate = null;
			this.Peice = value;
			Peices.moverAry.length = 0;
			Peices.attack.length = 0;
			if(color == 'W'){
				this.movesGraph = this.movesGraph.reverse();
			} 
			yCordinate = this.movesGraph.indexOf(id[0]);
			xCordinate = parseInt(id[1]);
			Peices[value].moveOperation(color, obj, yCordinate, xCordinate);
			if(this.moverAry.length > 0 || this.attack.length > 0)
				return true;
			else
				return false;
		},

	Pawn : {
		peice : 'Pa',
		blackImg : 'pawn-b.png',
		whiteImg : 'pawn-w.png',
		forwardAndBackwardMoves : function(yAxis, xAxis, obj, backNSidesMoves){
			var yCor = null;
			var xCor = null;
			var downMoves = Peices.movesGraph[yAxis-1];
			var upMoves = Peices.movesGraph[yAxis+1];
			var cordinateAry = [];
			if(backNSidesMoves){
				cordinateAry = [ Peices.movesGraph[yAxis]+(xAxis+1), Peices.movesGraph[yAxis]+(xAxis-1), downMoves+(xAxis) ];
			}
			cordinateAry.push(upMoves+(xAxis));
			for ( key in cordinateAry) {
				var value = cordinateAry[key];
				if(cordinateAry[key].toString() != "NaN" &&  Peices.Peice.toUpperCase() == "KING" && obj[value] && obj[value][0] != Peices.peiceColor){
					Peices.attack.push(value);
				}
				if(cordinateAry[key].toString() != "NaN" && !obj[value]) {
					Peices.moverAry.push(value);
				}
			};
		},	
		crossMoves : function(yAxis, xAxis, obj, downCross){
			var yCor = null;
			var xCor = null;
			var upRightCross = Peices.movesGraph[yAxis+1]+(xAxis+1);
			var upLeftCross = Peices.movesGraph[yAxis+1]+(xAxis-1);
			var downRightCross = Peices.movesGraph[yAxis-1]+(xAxis+1);
			var downLeftCross = Peices.movesGraph[yAxis-1]+(xAxis-1);
			var cordinateAry = [];
			if(downCross){
				cordinateAry = [downRightCross, downLeftCross];
			}
			if(Peices.Peice.toUpperCase() == "PAWN" && obj[upRightCross] && obj[upRightCross][0] != Peices.peiceColor){
				cordinateAry.push(upRightCross);
			} 
			if(Peices.Peice.toUpperCase() == "PAWN" && obj[upLeftCross] && obj[upLeftCross][0] != this.peiceColor) {
				cordinateAry.push(upLeftCross);
			}
			if(Peices.Peice.toUpperCase() == "KING") {
				cordinateAry.push(upRightCross);
				cordinateAry.push(upLeftCross);
			}
			
			for ( key in cordinateAry) {
				var value = cordinateAry[key];
				if(value.toString() != "NaN" && (value.indexOf('8') == -1 || value.indexOf('-') == -1) && obj[value] && obj[value][0] != Peices.peiceColor ){
					Peices.attack.push(value);
				}
				if(value.toString() != "NaN" && (value.indexOf('8') == -1 || value.indexOf('-') == -1) && !obj[value]) {
					Peices.moverAry.push(value);
				}
			};
		},
		moveOperation : function(color, obj, yAxis, xAxis){
			Peices.peiceColor = color;
			this.forwardAndBackwardMoves(yAxis, xAxis, obj, false);
			this.crossMoves(yAxis, xAxis, obj, false);
			if(Peices.peiceColor == 'W' && Peices.Peice.toUpperCase() == 'PAWN'){
				Peices.movesGraph.reverse();
			}
		}
	},
	
	Rook : {
		peice : 'Ro',
		blackImg : 'rook-b.png',
		whiteImg : 'rook-w.png',
		moveOperation : function(color, obj, yAxis, xAxis){
			Peices.peiceColor = color;
			var case1yAxis = case2yAxis = case3yAxis = case4yAxis = yAxis;
			var case1xAxis = case2xAxis = case3xAxis = case4xAxis = xAxis; 
			var cordinate = null;
			while(case1yAxis <= (Peices.movesGraph.length-1) ){
				var yCor = Peices.movesGraph[case1yAxis+1];
				var xCor = case1xAxis;
				cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]){
					Peices.moverAry.push(cordinate);
				}
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}					

				case1yAxis++;
			}
			while(case2xAxis <= 7){

				var yCor = Peices.movesGraph[case2yAxis];
				var xCor = case2xAxis + 1;
				cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}				

				case2xAxis++;
			}
			while(case3yAxis >= 0){

				var yCor = Peices.movesGraph[case3yAxis-1];
				var xCor = case3xAxis;
				if(!yCor)
					break;
				cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}

				case3yAxis--;
			}
			while(case4xAxis >= 0){

				var yCor = Peices.movesGraph[case4yAxis];
				var xCor = case4xAxis-1;
				if(xCor == -1)
					break;
				cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}			
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}

				case4xAxis--;
			}

			if(this.peiceColor == 'W' && Peices.Peice.toUpperCase() == 'ROOK'){
				Peices.movesGraph.reverse();
			}
		}
	},

	Knight : {
		peice : 'Kn',
		blackImg : 'knight-b.png',
		whiteImg : 'knight-w.png',
		moveOperation : function(color, obj, yAxis, xAxis){
			Peices.peiceColor = color;
			var case1yAxis = case2yAxis = case3yAxis = case4yAxis = yAxis;
			var case1xAxis = case2xAxis = case3xAxis = case4xAxis = xAxis; 
			
			while(case1yAxis < yAxis+2 && case1xAxis == xAxis) {
				var yCor = Peices.movesGraph[yAxis+2];
				if(!yCor)
					break;
				var cordinateAry = [yCor+(xAxis+1), yCor+(xAxis-1)];
				for(key in cordinateAry){
					var value = cordinateAry[key];
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && obj[value] && obj[value][0] != Peices.peiceColor){
						Peices.attack.push(value);
					}
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && !obj[value]){
						Peices.moverAry.push(value);
					}
				}

				case1yAxis +=2;
			}

			while(case2yAxis > yAxis-2 && case2xAxis == xAxis) {
				var yCor = Peices.movesGraph[yAxis-2];
				if(!yCor)
					break;
				var cordinateAry = [yCor+(xAxis+1), yCor+(xAxis-1)];
				for(key in cordinateAry){
					var value = cordinateAry[key];
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && obj[value] && obj[value][0] != Peices.peiceColor){
						Peices.attack.push(value);
					}
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && !obj[value]){
						Peices.moverAry.push(value);
					}
				}
				case2yAxis -= 2;
			}

			while(case3yAxis == yAxis && case3xAxis < xAxis+2) {
				var xCor = xAxis+2;
				if(xCor < 0 || xCor > 7)
					break;
				var cordinateAry = [ Peices.movesGraph[(yAxis+1)]+xCor, Peices.movesGraph[(yAxis-1)]+xCor ];
				for(key in cordinateAry){
					var value = cordinateAry[key];
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && obj[value] && obj[value][0] != Peices.peiceColor){
						Peices.attack.push(value);
					}
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && !obj[value]){
						Peices.moverAry.push(value);
					}
				}
				
				case3xAxis+=2;
			}

			while(case4yAxis == yAxis && case4xAxis > xAxis-2){
				var xCor = xAxis-2;
				if(xCor < 0 || xCor > 7)
					break;
				var cordinateAry = [ Peices.movesGraph[(yAxis+1)]+xCor, Peices.movesGraph[(yAxis-1)]+xCor ];
				for(key in cordinateAry){
					var value = cordinateAry[key];
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && obj[value] && obj[value][0] != Peices.peiceColor){
						Peices.attack.push(value);
					}
					if(value.toString() != "NaN" && (value.indexOf('8') == -1 || !value.indexOf('-') == -1) && !obj[value]){
						Peices.moverAry.push(value);
					}
				}
				
				case4xAxis-=2;
			}

			if(Peices.peiceColor == 'W' && Peices.peiceColor.toUpperCase() == 'KNIGHT'){
				Peices.movesGraph.reverse();
			}
		}
	},

	Bishop : {
		peice : 'Bi',
		blackImg : 'bishop-b.png',
		whiteImg : 'bishop-w.png',
		moveOperation : function(color, obj, yAxis, xAxis){
			Peices.peiceColor = color;
			var case1yAxis = case2yAxis = case3yAxis = case4yAxis = yAxis;
			var case1xAxis = case2xAxis = case3xAxis = case4xAxis = xAxis;
			
			while(case1yAxis <= (Peices.movesGraph.length-1) && case1xAxis <= 7){
				var yCor = Peices.movesGraph[case1yAxis+1];
				var xCor = case1xAxis + 1;
				var cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}			
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}
				case1xAxis++;
				case1yAxis++;
			}
			while(case2yAxis <= (Peices.movesGraph.length-1) && case2xAxis >= 0){

				var yCor = Peices.movesGraph[case2yAxis+1];
				var xCor = case2xAxis-1;
				if(xCor == -1)
					break;
				var cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}			
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}
				case2xAxis--;
				case2yAxis++;
			}
			while(case3yAxis >= 0 && case3xAxis <= 7){

				var yCor = Peices.movesGraph[case3yAxis-1];
				var xCor = case3xAxis + 1;
				if(!yCor)
					break;
				var cordinate = yCor+xCor;
				if(cordinate.toString() != "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}			
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}
				case3xAxis++;
				case3yAxis--;
			}
			while(case4yAxis >= 0 && case4xAxis >= 0){

				var yCor = Peices.movesGraph[case4yAxis-1];
				var xCor = case4xAxis-1;
				if(xCor == -1)
					break;
				if(!yCor)
					break;
				var cordinate = yCor+xCor;
				if(cordinate.toString() !== "NaN" && obj[cordinate] && obj[cordinate][0] != Peices.peiceColor) {
					Peices.attack.push(cordinate);
					break;
				}
				if(cordinate.toString() != "NaN" && !obj[cordinate]) {
					Peices.moverAry.push(cordinate);	
				}				
				if(obj[cordinate] && obj[cordinate][0] == Peices.peiceColor){
					break;
				}
				case4xAxis--;
				case4yAxis--;
			}

			if(Peices.peiceColor == 'W' && Peices.Peice.toUpperCase() == 'BISHOP'){
				Peices.movesGraph.reverse();
			}
		}
	},

	King : {
		peice : 'Ki',
		blackImg : 'king-b.png',
		whiteImg : 'king-w.png',
		moveOperation : function(color, obj, yAxis, xAxis){
			Peices.peiceColor = color;
			Peices.Pawn.forwardAndBackwardMoves(yAxis, xAxis, obj, true);
			Peices.Pawn.crossMoves(yAxis, xAxis, obj, true);
			if(Peices.peiceColor == 'W' && Peices.Peice.toUpperCase() == 'KING'){
				Peices.movesGraph.reverse();
			}
		}
	},

	Queen : {
		peice : 'Qu',
		blackImg : 'queen-b.png',
		whiteImg : 'queen-w.png',
		moveOperation : function(color, obj, yAxis, xAxis){
			Peices.peiceColor = color;
			Peices.Bishop.moveOperation(color, obj, yAxis, xAxis);
			Peices.Rook.moveOperation(color, obj, yAxis, xAxis);
			if(Peices.peiceColor == 'W' && Peices.Peice.toUpperCase() == 'QUEEN'){
				Peices.movesGraph.reverse();
			}
		}
	},	

}