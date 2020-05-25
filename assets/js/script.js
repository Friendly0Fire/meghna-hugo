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
		$(this).append("<a class='header-link fas fa-link tooltipster' href='#' title='Copy link to clipboard'></a>");

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

});