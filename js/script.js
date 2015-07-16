$(document).ready(function(){

	//открываем телефоны в шапке
	$('.header__phone-link').click(function(){
		$(this).parent().hide();
		$('.header__phone-image').hide();
		$(this).parent().parent().find('.hide').slideDown(500);
	});

});