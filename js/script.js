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
		$(this).find('.dropdown-menu__list').slideToggle(100);
	});

	// вызов слайдера
	$('.slider__wrap').bxSlider({
		controls: false,
		pause: 3000,
		auto: true,
		infiniteLoop: true
	});

	// замена изображений по ховеру
	$('.goods__item').hover(function(){
		$(this).find(".goods__image").toggleClass("_not-active");
	});

	$('.goods__bestseller').hover(function(){
		$(this).find(".goods__bestseller-image").toggleClass("_not-active");
	});

	// вращаем иконку в блоке интересного в футере
	$('.intresting__changer').hover(function(){
		$(this).toggleClass('_hover');
	});

	// открываем модальное окно входа / регистарции
	$('.enter').click(function(){
		$('body').prepend('<div class="wrap"></div>');
		$('.modal__window').slideDown(500);
		return false;
	});

	// закрываем модальное окно по клику вне его области
	$(document).click(function(event) {
	    if ($(event.target).closest(".modal__window").length) return;
	            $('.modal__window').slideUp(500);
	            $('.wrap').remove();
	            indexClick = 0;
	    event.stopPropagation();
	});

	// вызываем табы
	$('#tabs').tabs({
		active: 2,
		show: { effect: "fade", duration: 800 }
	});

	// маска на телефоны
	$('.mask').mask('+38 (999) 999-99-99');

	//  стилизация чекбоксов и селектов
	$('.checkbox').styler();

	// меняем блоки по клику в интересном
	var total = $('.intresting__inner').length,
		index = $('.intresting__inner').index();

	$('.intresting__changer').click(function(){

		return false;
	});

});