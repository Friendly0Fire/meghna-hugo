/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
	let video = $('#hero-video')[0];
	if(video === undefined || video.readyState >= 4) {
		$('.preloader').fadeOut(100);
		if(video !== undefined)
			video.play();
	} else
		video.addEventListener('loadeddata', function() {
			$('.preloader').fadeOut(100);
			video.play();
		});
});

jQuery(function ($) {
	"use strict";

	$("#toc-toggle a").click(function(e) {
		e.preventDefault();
		$("#toc").toggleClass("toggled");
	});

	$(document).mouseup(function(e) {
		let tocToggle = $("#toc-toggle");
		if(tocToggle.is(e.target) || tocToggle.has(e.target).length != 0)
			return;

		let toc = $("#toc");
		if(toc.hasClass("toggled")) {
			if(!toc.is(e.target) && toc.has(e.target).length == 0)
				toc.removeClass("toggled");
		}
	})

	$(".image-callout-btn").click(function(e) {
		e.preventDefault();
		let baseCallout = $(this).parent(".image-callout");
		let baseImg = $(this).parents(".image-with-callouts");
		let darkening = baseImg.find(".image-darkening");

		darkening.toggleClass("image-callout-active");
		baseCallout.toggleClass("image-callout-active");
	});

	$(".image-darkening").click(function(e) {
		e.preventDefault();
		$(this).parents(".image-with-callouts").find(".image-darkening, .image-callout").removeClass("image-callout-active");
	});

	let effectiveTocLevel = 0;
	let lastTocLevel = 0;
	$(".guide-item").find("h1, h2, h3, h4, h5, h6").filter("[id]").each(function(index) {
		let slug = $(this).attr("id");
		$(this).append("<a class='header-link fas fa-link tooltipster' href='#' title='Copy link to clipboard'></a>").click(function(e) {
			e.preventDefault();
			navigator.clipboard.writeText(document.URL.replace(/#.*$/, "") + "#" + slug).then(() => {
				let instance = $(e.target).tooltipster('instance');
				instance.content("Copied!");
				instance.one('closing', function(e) {
					instance.content("Copy link to clipboard");
				});
			});
		});

		let typeNum = parseInt($(this).prop("nodeName").substring(1));
		if(typeNum > lastTocLevel) {
			effectiveTocLevel++;
		} else if(typeNum < lastTocLevel) {
			effectiveTocLevel = typeNum;
		}
		lastTocLevel = typeNum;

		let type = "heading" + effectiveTocLevel;
		$("#toc > .list-group").append('<a href="#' + slug + '" class="list-group-item list-group-item-action ' + type + '"><i class="fas fa-chevron-right"></i> ' + $(this).text() +'</a>')
	});

	/* ========================================================================= */
	/*	animation scroll js
	/* ========================================================================= */

	var html_body = $('html, body');
	$('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				html_body.animate({
					scrollTop: target.offset().top - 50
				}, 1500, 'easeInOutExpo');
				return false;
			}
		}
	});

	// easeInOutExpo Declaration
	jQuery.extend(jQuery.easing, {
		easeInOutExpo: function (x, t, b, c, d) {
			if (t === 0) {
				return b;
			}
			if (t === d) {
				return b + c;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});


	$('.tooltipster').tooltipster({
		trigger: 'custom',
		triggerOpen: {
			mouseenter: true,
			click: true,
			touchstart: true,
			tap: true
		},
		triggerClose: {
			scroll: true,
			mouseleave: true,
			touchleave: true
		}
	});

	$('.simple-video-play').click(function() {
		var icon = $(this).children('i');
		icon.toggleClass('fa-play');
		icon.toggleClass('fa-pause');
		var media = $(this).parents('.simple-video').children('video').get(0);
		if(media.paused)
			media.play();
		else
			media.pause();
	});

	$('.simple-video-rewind').click(function() {
		var media = $(this).parents('.simple-video').children('video').get(0);
		media.currentTime = 0;
	});

	var videoAutoplay = function() {
		var media = $('video').not("[autoplay='autoplay']");

		var scrollMid = $(window).scrollTop() + $(window).height() * 0.5;

		media.each(function(index, el) {
			var yTopMedia = $(this).offset().top;
			var yStartMedia = $(this).height() * 0.1 + yTopMedia;
			var yEndMedia = $(this).height() * 0.9 + yTopMedia;

			var playControl = $(this).parents('.simple-video').find('.simple-video-play > i');

			var doPlay = scrollMid < yEndMedia && scrollMid > yStartMedia;

			if(doPlay) {
				$(this).get(0).play();
				playControl.removeClass('fa-play');
				playControl.addClass('fa-pause');
			} else {
				$(this).get(0).pause();
				playControl.addClass('fa-play');
				playControl.removeClass('fa-pause');
			}
		});
	};

	$(document).on('scroll', videoAutoplay);
	videoAutoplay();
});