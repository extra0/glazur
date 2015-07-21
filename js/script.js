$(document).ready(function() {

	//открываем телефоны в шапке
	$('.header__phone-link').click(function() {
		$(this).parent().hide();
		$('.header__phone-image').hide();
		$(this).parent().parent().find('.hide').slideDown(500);
		return false;
	});

	// выпадающее меню
	$('.menu__item').hover(function() {
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
	$('.goods__item').hover(function() {
		$(this).find(".goods__image").toggleClass("_not-active");
	});

	$('.goods__bestseller').hover(function() {
		$(this).find(".goods__bestseller-image").toggleClass("_not-active");
	});

	// вращаем иконку в блоке интересного в футере
	$('.intresting__changer').hover(function() {
		$(this).toggleClass('_hover');
	});

	// открываем модальное окно входа / регистарции
	$('.enter').click(function() {
		$('body').prepend('<div class="wrap"></div>');
		$('.modal__window').slideDown(500);
		return false;
	});

	// открываем модальное окно отзывов
	$('.main__link').click(function() {
		$(this).next('div').slideToggle(500);
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
		show: {
			effect: "fade",
			duration: 800
		}
	});

	// маска на телефоны
	$('.mask').mask('+38 (999) 999-99-99');

	//  стилизация чекбоксов и селектов
	$('.checkbox, select').styler();

	//  клонирование элементов для функции полета
	function cloneImg() {
		$('.goods__item-link').each(function(){
			$(this).children('img:first-child').clone().css({
				'visibility': 'hidden',
				'position': 'absolute'
			}).removeAttr('class').appendTo('a._cart');
		});
		// $('a._cart img:first-child').addClass('fly');
		// $('a._cart').children().not('.fly').remove();
	}
	cloneImg();

	// полет товара в корзину
	$("a._cart").click(function() {
		$("html, body").animate({
			scrollTop: 0
		}, 1000)
		setTimeout(function() {
			$('.cart__info').addClass('_full');
		}, 1200)
		$(this).children('img')
			.clone()
			.css({
				'position': 'absolute',
				'z-index': '100',
				'visibility': 'visible'
			})
			.appendTo(this)
			.animate({
				opacity: 0.5,
				marginTop: $('.cart__info').offset().top - $(this).children('img').offset().top + 30,
				marginLeft: $('.cart__info').offset().left - $(this).children('img').offset().left + 30,
				width: 50,
				height: 50
			}, 860, function() {
				$(this).remove();
			});
	});


	// кастомный скролл в фильтре
	(function($) {
		$(window).load(function() {
			$(".filter__brand").mCustomScrollbar();
		});
	})(jQuery);

});