$(document).ready(function() {

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
	$('.checkbox, .select, .radio').styler();

	// полет товара в корзину
	$("a._cart").click(function() {
		// клонирование картинки для полета
		$(this).parent().parent().find('.goods__item-link img:not(._not-active)').clone().css({
			'visibility': 'hidden',
			'position': 'absolute'
		}).removeAttr('class').appendTo($(this));

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

	//---------  корзина 

		$(function() {
			// Калькулятор
			function calculate(el, btn) {

				// Запоминаем данные
				//-----------------------------------------------------------------------------------------------------------------         
				var priceAtribut = 'data-val'; // Атрибут с ценами у блоков
				var cartTotal = $('.total_price p'); // Елемент

				var elem = {
					parentModule: $(el).parents('cart'), // Родительский блок корзины
					btn: $(btn), // Текущая кнопка которая была нажата
					inpt: $(el).find('.input-counts'), // Инпут с количеством
					inptMinVal: $(el).find('.input-counts').data('min-val'), // NEW Минимальное количество
					inptMaxVal: $(el).find('.input-counts').data('max-val'), // NEW Максимальное количество
					priceBase: $(el).find('.string-elem-price-base'), // Базовая цена товара
					priceTotal: $(el).find('.string-elem-price-total'), // Общая сумма товара
				};

				//функция: проверка количества товаров, если к-во = 0, прекращаем работу скрипта
				//-----------------------------------------------------------------------------------------------------------------
				(function checkCounts() {
					if(elem.btn.hasClass(elem.inpt.attr('class'))) { // NEW
						elem.inpt.attr('data-val',elem.inpt.val()); // NEW
						var thisCounts = (elem.btn.val() - 0); // NEW
						if(elem.inpt.val() < elem.inptMinVal) { // NEW
							elem.inpt.val(elem.inptMinVal) // NEW
						} // NEW
					}  else { // NEW
						var thisCounts = (elem.inpt.val() - 0) + (elem.btn.attr(priceAtribut) - 0);
					}
					
					if (elem.btn != null && thisCounts >= elem.inptMinVal && thisCounts <= elem.inptMaxVal) {
						goCheck(thisCounts)
					} 
				}());

				(function delItem() {
					if (btn == null) {
						var	a=el.find('.cartdel').data('a'),
							id=el.find('.cartdel').data('id'),
							type=el.find('.cartdel').data('t');
						if (confirm(a)) {
							$.ajax
							    ({
							        type: "POST",
							        url: "/cartdel/",
							        data: {
							            id:id,
							            type:type,
							        },
							        cache: false,
							        async: false,
							        success: function(result)
							        {   
							        	console.log(result);
							        }
							    })
							el.remove();
							checkTotalSumm();
						}
						else {
							return false;
						}
					}
				}());

				//функция: Калькуляции и пересчета!
				//-----------------------------------------------------------------------------------------------------------------
				function goCheck(counts) {

					// Запись количества в инпут текущего товара
					elem.inpt.val(counts);
					// Запись общей суммы текущего товара, исходя из количества             
					elem.priceTotal.html(numberWithCommas(Math.ceil(counts * (elem.priceBase.attr(priceAtribut) - 0)*100)/100));
					// Запись общей суммы текущего товара, исходя из количества в атрибут datavalue 
					elem.priceTotal.attr(priceAtribut, counts * (elem.priceBase.attr(priceAtribut) - 0));

					checkTotalSumm();
					$('#total').attr('data-t', number_norm($('.total_price p').html()));
				}

				// Функция которая делает общий пересчет общей суммы каждого товара, и записывает результат.
				//-----------------------------------------------------------------------------------------------------------------
				function checkTotalSumm() {
					var totalSumm = 0;
					$('.' + elem.priceTotal.attr('class')).each(function() {
						totalSumm += $(this).attr(priceAtribut) - 0;
					});
					cartTotal.html(numberWithCommas(Math.ceil(totalSumm * 100)/100));
				}

				// удаляем пробелы из строки
				function number_norm( str ) {
					return str.replace(/\s+/g, '');
				}

			}

			// Запуск функции калькулятора
			$('.number button').click(function() {
				calculate($(this).parents('.item'), this);
			});
			$('.loot_input').change(function() {
				calculate($(this).parents('.item'), this);
			});
			$('td.delete span').click(function() {
				calculate($(this).parents('.item'), null);
			});

		});

});