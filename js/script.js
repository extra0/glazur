$(document).ready(function() {

	// ф-я разбивки на разряды
	function numberWithCommas(x) {
		return x.toString().replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "\$1 ");
	}

	// вызов фенсибокса
	$('.fancy').fancybox();

	//открываем телефоны в шапке
	$('.header__phone-link').click(function() {
		$(this).parent().hide();
		$('.header__phone-image').hide();
		$(this).parents('.header__phone-block').find('.hide').slideDown(500);
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
		var imgs = $(this).find(".goods__image");
		if (imgs.length == 2) {
			imgs.toggleClass("_not-active");
		}
	});

	$('.goods__bestseller').hover(function() {
		var imgs = $(this).find(".goods__bestseller-image");
		if (imgs.length == 2) {
			imgs.toggleClass("_not-active");
		}
	});

	// вращаем иконку в блоке интересного в футере
	$('.intresting__changer').hover(function() {
		$(this).toggleClass('_hover');
	});

	// открываем модальное окно входа / регистарции
	$('.enter').click(function() {
		$('body').prepend('<div class="wrap"></div>');
		$('body').scrollTop(0);
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
	$('.tabs').tabs({
		active: 2,
		show: {
			effect: "fade",
			duration: 800
		}
	});

	// маска на телефоны
	$('.mask').mask('+38 (999) 999 99 99');

	//  стилизация чекбоксов и селектов
	if ($('.checkbox, .select, .radio').length > 0) {
		$('.checkbox, .select, .radio').styler();
	}

	// полет товара в корзину
	$("._cart").click(function() {
		// клонирование картинки для полета
		$(this).parent().parent().find('.goods__item-link img:not(._not-active)').clone().css({
			'visibility': 'hidden',
			'position': 'absolute'
		}).removeAttr('class').appendTo($(this));

		// показываем кнопку ОФОРМИТЬ и скрывает текст под корзиной
		$('.cart__empty').hide();
		$('.button._cart').show().css('display', 'inline-block');

		// обработка полета
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

	// меняем блоки в разделе интересного в футере
	var i = 1,
		block = $('.intresting__inner'),
		num = block.length;
	$('.intresting__changer').click(function(event) {
		if (i < num) {
			block.eq(i - 1).removeClass('active');
			block.eq(i).toggleClass('active');
			i++;
		} else {
			i = 1;
			block.eq(0).addClass('active');
			block.eq(-1).removeClass('active');
		}
		return false;
	});

	// КОРЗИНА 
	//  расчет товаров в корзине 
	function calculator() {
		var totalSum = $('#price_total'),
			discountNum = $('#discount_input').attr('data-val'),
			cashNum = $('#cash-lk_input').attr('data-val'),
			sum = 0;

		// просчет общей суммы
		$('.order__price').each(function() {
			sum += parseFloat($(this).attr('data-total'));
			console.log(sum);
		});

		// вывод суммы в строку "всего:" 
		totalSum.html(sum);

		// просчет скидки
		$('#discount').html('- ' + Math.round(sum * discountNum));

		// вывод окончательной суммы
		$('#total').html(sum - Math.round(sum * discountNum) - cashNum);

		// выделяем разряды в цифрах
		$('#total').html(numberWithCommas($('#total').html()));
		totalSum.html(numberWithCommas(totalSum.html()));
		$('#discount').html(numberWithCommas($('#discount').html()));
		$('#cash-lk').html(numberWithCommas($('#cash-lk').html()));

	}
	var btn = $('.order__btn');

	// изменнеие значения input
	btn.on('click', function() {

		var input = $(this).parents('tr').find('input'),
			totalLine = $(this).parents('tr').find('.order__price');

		// изменяем значение в инпуте
		input.val(parseInt(input.val()) + parseInt($(this).attr('data-val')));

		if (input.val() < input.attr('data-min-val')) {
			input.val('1');
		}

		// изменяем значение общее по товару
		totalLine.attr('data-total', input.val() * parseInt(totalLine.attr('data-val')));

		calculator();
	})

	// удаляем элемент
	$('.order__delete').click(function() {
		$(this).parents('.order__line').remove();
		calculator();
	});

	// скрываем ненужные пункты при выборе доставки
	function filterDelivery() {
		var shop = $('#shop-styler'),
			city = $('#city-styler'),
			delivery = $('#delivery-styler');

		if (shop.hasClass('checked')) {
			shop.parents('.formalization__block').find('.formalization__table').hide();
		} else if (city.hasClass('checked')) {
			shop.parents('.formalization__block').find('.formalization__table').show();
			shop.parents('.formalization__block').find('.formalization__table-line').slice(0, 2).hide();
		} else {
			shop.parents('.formalization__block').find('.formalization__table').show();
			shop.parents('.formalization__block').find('.formalization__table-line').slice(0, 2).show();
		}
	}

	filterDelivery();

	$('.formalization__label').click(function() {
		filterDelivery();
	});

	// вызов innerzoom
	$("#img_01").elevateZoom({
		gallery: 'gallery',
		zoomType: "inner",
		cursor: 'pointer',
		galleryActiveClass: 'active',
		imageCrossfade: true,
		zoomWindowFadeIn: 500,
		zoomWindowFadeOut: 500,
		lensFadeIn: 500,
		lensFadeOut: 500
	});

	// показать\скрыть текст в описании
	$('.description__more').click(function() {
		$('.description__inner').toggleClass('show');
		$(this).toggleClass('show');
		if ($(this).hasClass('show')) {
			$(this).html('Скрыть текст');
		} else {
			$(this).html('Показать еще');
		}
		return false;
	});

});