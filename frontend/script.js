function game() {
	var ctx;
	var personImg;
	var personImgNS;
	var landColor="#EFEBE1";
	var parkColor="#CCDFA9";
	var waterColor="#A7BEE0";
	var borderColor="#DCD5CC";
	var canMove=1;
	var LAND=0;
	var PARK=1;
	var WATER=2;
	var outcome = ["It looks like you've come across a sketchy lady.<br/>I've got a bad feeling about this...","Outcome 2","Outcome 3"];
	var wagerFor = ["to try to get away", "to try to balh", "to try to ..."];
	//var good = ["You made a new friend!! You just doubled your money.", "You gota great massage!!! You just doubled your money!", "You had a great dinner with friend!!! Your just doubled our money."];
	//var bad = ["You got robbed by a tranny hooker. You just lost a quarter of your money!!", "You got caught with dope. You just lost half your money!!", "You got a stomach bug. You just lost half your money."];

	var map=[[1,2,0,0,0,2,0,0,0,0],
		 [0,0,2,0,2,0,0,0,0,0],
		 [0,0,0,2,0,0,0,0,1,0],
		 [0,0,0,0,0,0,0,0,0,0],
		 [0,0,0,1,0,0,0,0,0,0],
		 [2,0,0,0,0,0,0,0,0,2],
		 [0,2,0,0,0,0,0,0,2,0],
		 [2,0,0,0,0,0,0,2,0,0],
		 [0,0,0,0,0,0,2,0,1,0],
		 [0,0,0,0,0,0,0,2,0,0]];

	var ourX=9;
	var ourY=0;
	
	function drawThing(x,y,img) {
		ctx.drawImage(img, (10+87)*x, (10+61)*y);
	}	

	function drawTile(n,m) {
		if(map[m][n]==0) {
			ctx.fillStyle = landColor;
		}
		else if(map[m][n]==1) {
			ctx.fillStyle = parkColor;
		}	
		else if(map[m][n]==2) {
			ctx.fillStyle = waterColor;
		}
		ctx.fillRect(n*(10+87),m*(10+61),87,61);
		ctx.strokeStyle = borderColor;
		ctx.strokeRect(n*(10+87),m*(10+61),87,61);
	}	
	function blowupTile(n,m,r) {
		var t=0;
		targetN=n-r/2;
		targetM=m-r/2;
		if(targetN < 0) {
			targetN=0;
		}
		else if(targetN >= 10-r) {
			targetN=10-r;
		}
		if(targetM < 0) {
			targetM=0;
		}
		else if(targetM >= 10-r) {
			targetM=10-r;
		}
	
		var i=setInterval(function() {
			var curN=n + t*(targetN-n);
			var curM=m + t*(targetM-m);
			ctx.fillStyle = "#ccc";
			ctx.fillRect(10+curN*(10+87),10+curM*(10+61),87+(r*87-87)*t,61+(r*61-61)*t);
			t += .01;
			if(t>=1) {
				$(".overlay").css("background-color","#eee");
				$(".overlay").css("position","absolute");
				$(".overlay").css("border","1px black solid");
				$(".overlay").css("left",16+curN*(10+87) + "px");
				$(".overlay").css("top",16+curM*(10+61) + "px");
				$(".overlay").css("width",r*87  + "px");
				$(".overlay").css("height",r*61 + "px");
				var rnd=Math.random();
				rnd=Math.random();
				var oc;
				if(rnd<.33) {
					oc=0;
				}
				else if(rnd<.66) {
					oc=1;
				}
				else {
					oc=2;	
				}
				$(".first_line").html(outcome[oc]);	
				$(".second_line").html("Make a wager and try to get away!");
				$("#overlay").show();
				clearInterval(i);
				
				$("#bet").click(function() {
					$(".first_line").html("You wagered " + $("#amount").val() + " " + wagerFor[oc]);
					$(".second_line").html("It's time to play");
					$("#overlay").hide();
					$("#overlay2").show();
					$("#results").hide();
					var result;
					if(Math.random() > .5) {
						result=0;
					}
					else {
						result=1;
					}
					var t=0;
					$("#leftHand").css("background-image","paperClear.gif");
					$("#rightHand").css("background-image","paperClear.gif");
					$("#leftHand").show();
					$("#rightHand").show();
					
					var i=setInterval(function(){
						t += 1;
						var bi;
						if(t==0) {
							$("#leftHand").css("background-image","paperClear.gif");
							$("#rightHand").css("background-image","paperClear.gif");
						}
						else if(t==1) {
							$("#leftHand").css("background-image","rockFull.gif");
							$("#rightHand").css("background-image","rockFull.gif");
							
						}
						else if(t==2) {
							$("#leftHand").css("background-image","rockClear.gif");
							$("#rightHand").css("background-image","rockClear.gif");
							
						}
						if(t==3) {
							clearInterval(i);
							var parity=0;
							var leftImg, rightImg;
							var rnd=Math.random();
							if(rnd < .333) {
								leftImg="paper";
								if(result==0) {
									rightImg="rock";
								}
								else {
									rightImg="scissors";
								}
							}
							else if(rnd < .666) {
								leftImg="rock";
								if(result==0) {
									rightImg="paper";
								}
								else {
									rightImg="scissors";
								}
							}
							else {
								leftImg="scissors";
								if(result==0) {
									rightImg="paper";
								}
								else {
									rightImg="rock";
								}
							}
							var bi=setInterval(function(){
								if(parity==0) {
									$("#leftHand").css("background-image",leftImg + "Clear.gif");
									$("#rightHand").css("background-image",rightImg + "Clear.gif");
									parity=1;
								}
								else {
									$("#leftHand").css("background-image",leftImg + "Full.gif");
									$("#rightHand").css("background-image",rightImg + "Full.gif");
									parity=0;
								}
							},100);
							setTimeout(function(){
								clearInterval(bi);
								$(".overlay").hide();
								draw();
								canMove=1;
							},3000);
						}
					},500);
				});
			}
		},1);
	}
	function draw() {
		var canvas = document.getElementById("main_canvas");
 		ctx = canvas.getContext("2d");
		ctx.clearRect(0,0,960,700);
		ctx.beginPath();
		ctx.fillStyle = "white";
		ctx.fillRect(0,0,960,700);

		// 61px, 10px spacing vertical
		// 87px, 10px gutter	
		for(var n=0;n<10;n++) {
			for(var m=0;m<10;m++) {
				drawTile(n,m);
			}	
		}
		personImg = new Image();
		personImg.src='backpackerShadow.png';
		personImgNS = new Image();
		personImgNS.src='backpacker.gif'
		drawThing(ourX,ourY, personImg);
	}
	function load() {
		draw();
	}

	function rotateTile(n,m,dir) {
		var t=0.0;
		var i=setInterval(function(){
			t = t + 0.01;
			var xBase,yBase,x,y;

			xBase=n*(10+87);
			yBase=m*(10+61);
		
			if(dir==0 || dir==2) {
				x=xBase+87/2+(-87/2)*Math.abs(Math.cos(Math.PI*t));
				y=yBase;
				width=87*Math.abs(Math.cos(Math.PI*t));
				height=61;
			}
			else if(dir==1 || dir== 3) {
				x=xBase;
				y=yBase+61/2+(-61/2)*Math.abs(Math.cos(Math.PI*t));
				width=87;
				height=61*Math.abs(Math.cos(Math.PI*t));
			}
	
			ctx.fillStyle = "#ffffff";
			ctx.fillRect(xBase,yBase,87,61);
			if(t < 0.5) {
				if(map[m][n]==0) {
					ctx.fillStyle = landColor;
				}
				else if(map[m][n]==1) {
					ctx.fillStyle = parkColor;
				}	
				else if(map[m][n]==2) {
					ctx.fillStyle = waterColor;
				}	
			}
			else {
				ctx.fillStyle = "red";
			}
			ctx.fillRect(x,y,width,height);
			drawThing(n,m,personImg);
		
			if(t >= 1) {
				clearInterval(i);
				if(Math.random() > 0.5) {
					blowupTile(n,m,4);
				}
				else {
					draw();
					canMove = 1;
				}
			}
		},1);
	}
	function movePerson(x,y,toX,toY, dir) {
		var t=0;
		var i=setInterval(function(){
			t += .01;
			drawTile(x,y);
			ctx.fillStyle="#FFF";
			draw();
			drawTile(toX,toY);
			drawThing(x+t*(toX-x),y+t*(toY-y),personImgNS);
			if(t >= 1) {
				clearInterval(i);
				rotateTile(toX,toY,dir);
			}
		},1);
	}
	$(document).bind("keypress",function(e) {
		if(canMove==0) {
			return;
		}
		if(e.keyCode==37) {
			if(ourX > 0) {
				canMove=0;
				ourX = ourX - 1;
				movePerson(ourX+1,ourY,ourX,ourY,0);
			}
		}
		else if(e.keyCode==38) {
			if(ourY > 0) {
				canMove=0;
				ourY = ourY - 1;
				movePerson(ourX,ourY+1,ourX,ourY,1);
			}
		}
		else if(e.keyCode==39) {
			if(ourX < 9) {
				canMove=0;	
				ourX = ourX + 1;
				movePerson(ourX-1,ourY,ourX,ourY,2);
			}
		}
		else if(e.keyCode==40) {
			if(ourY < 9) {
				canMove=0;
				ourY = ourY + 1;
				movePerson(ourX,ourY-1,ourX,ourY,3);
			}	
		}
	});
	load();
}
$(document).ready(function(){
	game();
});
