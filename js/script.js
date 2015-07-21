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
	$('.checkbox').styler();

	// полет товара в корзину
	$(".goods__button._cart").click(function() {
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
				'z-index': '100'
			})
			.appendTo(this)
			.animate({
				opacity: 0.5,
				marginTop: $('.cart__info').offset().top - $(this).children('img').offset().top,
				marginLeft: $('.cart__info').offset().left - $(this).children('img').offset().left,
				width: 50,
				height: 50
			}, 860, function() {
				$(this).remove();
			});
	});

	// фильтр цены 
	$(function() {
		var min = $('#inp_min'),
			max = $('#inp_max'),
			slider = $("#slider-range").slider({
			range: true,
			min: 1,
			max: 10000,
			step: 100,
			values: [2000, 6000],
			slide: function(event, ui) {

				min.val(ui.values[ 0 ] - 1);
				max.val(ui.values[ 1 ] + 99);

				if (min.val() == 0) {min.val('1');}
			}
		});
		$('#inp_min').on('keyup', function() {
			slider.slider("values", 0, $(this).val());

			if (min.val() == 0) {
				min.val('1');
			}
		});

		$('#inp_max').on('keyup', function() {
			slider.slider("values", 1, $(this).val());
		});

	});

	// кастомный скролл
	(function($) {
		$(window).load(function() {
			$(".filter__brand").mCustomScrollbar();
		});
	})(jQuery);

});