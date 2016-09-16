//Assignment - Yadwinderpal Singh
//script

var $currentView;

$(document).ready(function () {

    /*============================================
	Start Preloader
	==============================================*/

    animateLoaderS1();

    /*============================================
	Style Switcher
	==============================================*/


    $('#toggle-switcher').click(function () {
        if ($(this).hasClass('opened')) {
            $(this).removeClass('opened');
            $('#style-switcher').animate({
                'right': '-140px'
            });
        } else {
            $(this).addClass('opened');
            $('#style-switcher').animate({
                'right': '-15px'
            });
        }
    });

    $('#style-switcher li').click(function (e) {
        e.preventDefault();

        var index = ($(this).index() + 1);
        var stylesheet = 'style-' + index + '.css';

        $('#page-loader').fadeIn(10);

        setTimeout(function () {

            $('link#theme').attr('href', 'css/' + stylesheet);
            $('.logo img').attr('src', 'images/logo-' + index + '.png');
            $('#toggle-switcher img').attr('src', 'images/styler-' + index + '.png')

            $('#style-switcher li').removeClass('active');
            $('#style-' + index).addClass('active');
            $('#content').removeAttr('class').addClass('style-' + index);
            $('link#favicon').attr('href', 'images/favicon-' + index + '.ico');

            setTimeout(function () {
                $('#page-loader').fadeOut(10);
            }, 500);
        }, 500);



    });

    /*============================================
	Hide Preloader
	==============================================*/

    setTimeout(function () {
        $('#page-loader').fadeOut();
    }, 1500);


    /*============================================
	Page Load
	==============================================*/

    $('.nav li a').click(function (e) {
        e.preventDefault();
        var value = $(this).attr('data-link');
        var activeItem = activateNav(value);
        var $this = $(this);

        if (activeItem != undefined) {
            setTimeout(function () {
                loadPage($this);
            }, 500);
        }
    });
    
    $('[data-link="home"]').trigger('click');
    
});


/*============================================
    Preloader Methods
==============================================*/

function animateLoaderS1() {
    $('.page-loader-s-1').css('opacity', 0.5);
    $('.page-loader-s-2').css('opacity', 1);
    $('.page-loader-s-3').css('opacity', 1);
    setTimeout(function () {
        animateLoaderS2();
    }, 500);
}

function animateLoaderS2() {
    $('.page-loader-s-1').css('opacity', 1);
    $('.page-loader-s-2').css('opacity', 0.5);
    $('.page-loader-s-3').css('opacity', 1);
    setTimeout(function () {
        animateLoaderS3();
    }, 500);
}

function animateLoaderS3() {
    $('.page-loader-s-1').css('opacity', 1);
    $('.page-loader-s-2').css('opacity', 1);
    $('.page-loader-s-3').css('opacity', 0.5);
    setTimeout(function () {
        animateLoaderS1();
    }, 500);
}

/*============================================
    Page Methods
==============================================*/

function activateNav(link) {
    var activeItem = $('.navbar .active a').attr('data-link');
    if (link != activeItem) {
        $('.navbar li').removeClass('active');
        $('[data-link=' + link + ']').parent().addClass('active');
        activeItem = link;
    }
    return activeItem;
}

function loadPage($project) {
    var projectLink = $project.attr('href').replace(/[#?]/g, '');
    $currentView = $project.attr('data-link');
    $('#content').load(projectLink, function () {
        $('body').removeAttr('class').addClass($currentView);
        afterPageLoad();
    });
}

function afterPageLoad() {
    if ($currentView == "contactus") {
        
        /*============================================
        Contact Form
        ==============================================*/

        $('#contact-form .form-control').each(function () {
            if ($.trim($(this).val()) == '') {
                $(this).removeClass('input-filled');
            } else {
                $(this).addClass('input-filled');
            }
        });

        $('#contact-form .form-control').on('blur', function () {
            if ($.trim($(this).val()) == '') {
                $(this).removeClass('input-filled');
            } else {
                $(this).addClass('input-filled');
            }
        });
    }
}
