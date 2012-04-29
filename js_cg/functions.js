// remap jQuery to $
(function($){})(window.jQuery);


/* trigger when page is ready */
$(document).ready(function (){
	initialize();
});

function initialize() {

	//Click on nav to load external content through AJAX
	$('#topnav a, #bottomnav a').not('#bottomnav #fbcallus a').click(function(e){
		e.preventDefault();
		$('<div></div>').attr('id', 'spinner').appendTo('#pages'); //spinner
		$('#pages').load( e.target.href + ' #loadcontent', function() { //stop spinner
			fadespinner();
			foodclicks();
			tabclicks();
		}); //pages finished loading
	}); //clicked on nav

	$(document).scroll(function() {
		scrollfix();
	});

	$(window).bind('orientationchange', function() {
		//reset the overlay's width, height and position
		$('#overlay').css('width', window.innerWidth+ 'px');
		$('#overlay').css('height', window.innerHeight+ 'px');
		$('#overlay').css('top', window.pageYOffset+ 'px'); 

		centerimage();
	});


	foodclicks();
	tabclicks();
}


function centerimage(){
	//center the image
	$('#overlayimg').css('top',((window.innerHeight - $('#overlayimg').outerHeight()) / 2)+'px');
	$('#overlayimg').css('left',((window.innerWidth - $('#overlayimg').outerWidth()) / 2)+'px');
}

function scrollfix() {
	ismobile=whichmobile();
	if ((ismobile=='ipad')||(ismobile=='iphone')||(ismobile=='android 2')) {
		$('footer').css('top',(window.pageYOffset + window.innerHeight-$('footer').height()) + 'px'); // scroll the footer navigation
		$('#overlay').css('top', window.pageYOffset+ 'px'); // scroll the overlay so it stays centered
		$('#overlay').css('height',window.innerHeight+"px"); //make the overlay the height of the device
	}
}


function whichmobile() {
	var useragentstring=navigator.userAgent.toLowerCase();
	var mobilelist=new Array("iphone os 5","ipad; cpu os 5","iphone","ipad","android 2","android","blackberry","palmos");
	for (var device in mobilelist) {	
		if (useragentstring.indexOf(mobilelist[device])>=0) {
			return mobilelist[device];
			break;
		}
	}	
}


function tabclicks() {
	$('#tabs li').click(function(e){
		$('#tabs li').attr("class","");
		$(this).attr('class', 'tapped');
		
		whichpage=$(this).attr('id').substr(3); //get the name of the page to turn on
		$('#pages section').attr('class','columnlist hide'); //hide all of the lists
		$('#pages #'+whichpage).attr('class','columnlist show');
	});
}

function foodclicks() {
	//click on foodlist items to see them larger image onscreen
	$('.columnlist li').click(function(e){
		
		//Add the Overlay
		$('<div></div>').attr('id', 'overlay').appendTo('body').hide().fadeIn("slow");

		//Handle clicks on the overlay
		$('#overlay').click(function(e){
			$('#overlay').fadeOut('slow', function() {
				$(this).remove();
			}); //fadeout
		}); //overlayclick

		//Make a copy of the info area and place within the overlay
		$(this).children('.info').clone().appendTo('#overlay');

		//Add the spinner while the image loads
		$('<div></div>').attr('id', 'spinner').appendTo('#overlay');

		//Calculate the name of the high res image
		largeimage=$(this).children('img').attr('src');
		largeimage=largeimage.substr(0, largeimage.length-7)+'.jpg';

		//Load the Image
		$('<img>').attr('src',largeimage).attr('id', 'overlayimg').appendTo('#overlay').load(function(){
			fadespinner();
			
			centerimage();
			
			//Click to return
			$('<div></div>').attr('id', 'clicktoreturn')
			.appendTo('#overlay').hide().delay(500).fadeIn(400).delay(1500).fadeOut(400); //continue all at once.
		});
	}); //foodlist click
}



//fade spinner graphic
function fadespinner() {
	$('#spinner').fadeOut('slow', function() { //stop spinner
		$(this).remove();
	}); //remove spinner
}
