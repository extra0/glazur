$(document).ready(function(){

	//открываем телефоны в шапке
	$('.header__phone-link').click(function(){
		$(this).parent().hide();
		$('.header__phone-image').hide();
		$(this).parent().parent().find('.hide').slideDown(500);
		return false;
	});

	// выпадающее меню
	$('.menu__item').hover(function(){
		$(this).children('div').slideToggle(100);
	});

	// вызов слайдера
	$('.slider__wrap').bxSlider({
		controls: false,
		// pause: 3000,
		// auto: true,
		infiniteLoop: true
	});

	// замена изображений по ховеру
	$('.goods__item').hover(function(){
		$(this).find(".goods__image").toggleClass("_not-active");
	});

	$('.goods__bestseller').hover(function(){
		$(this).find(".goods__bestseller-image").toggleClass("_not-active");
	});

});