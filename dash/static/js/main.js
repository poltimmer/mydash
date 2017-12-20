/*jslint browser: true*/
/* eslint-env browser, es6 */
/*global $*/

$(document).ready(
    function () {

        $.fn.changeElementType = function (newType) { //a plugin I found online. This entire function is copied.
            var attrs = {};

            $.each(this[0].attributes, function (idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });

            this.replaceWith(function () {
                return $("<" + newType + "/>", attrs).append($(this).contents());
            });
        };


        $(document).on('click', '#toDoList li', function () {
            $('#editing').blur();
            let action = $(this).children('span').text();
            $(this).children('span').attr('id', 'editing');
            $(this).children('span').changeElementType('input');
            $('#editing').focus();
            $('#editing').val(action);
            $('#editing').next('.closeBtn').before('<div class="color-tag red"></div><div class="color-tag orange"></div><div class="color-tag green"></div><div class="color-tag blue"></div>')

        });

        $(document).on('click', '.red', function () {
            $('#editing').parent().css('border-color', 'red')
            $('#editing').blur();
        });

        $(document).on('click', '.orange', function () {
            $('#editing').parent().css('border-color', 'orange')
            $('#editing').blur();
        });

        $(document).on('click', '.green', function () {
            $('#editing').parent().css('border-color', '#00b500')
            $('#editing').blur();
        });

        $(document).on('click', '.blue', function () {
            $('#editing').parent().css('border-color', 'blue')
            $('#editing').blur();
        });

        $(document).on('focusout', '#editing', function () {
            let newAction = $(this).val();
            if (newAction.replace(/\s+/g, '') !== '') {
                $('#editing').text(newAction);
                $('input[id=editing]').changeElementType('span');
                $('#editing').attr('id', '');
            } else {
                $('#editing').parent().remove();
            }
            $('.color-tag').remove();
        });

        $(document).on('keydown', '#editing', function () {
            if (event.keyCode === 13) {
                $('#editing').blur();
            }
        });

        /*$('.addBtn').click(
            function () {
                var toAdd = $('input[id=myInput]').val();
                if (toAdd.replace(/\s+/g, '') !== '') {
                    $('#toDoList').append('<li><span>' + toAdd + '</span><i class="closeBtn fa fa-times-circle fa-lg"></i></li>');
                }
                $("#myInput").val("");
            }); */

        $("input[id=myInput]").keydown(function (event) {
            if (event.keyCode === 13) {
                $(".addBtn").click();
            }
        });

        $('input[id=google-box]').keydown(function (event) {
            if (event.keyCode === 13) {
                var search = $('input[id=google-box]').val();
                window.location.href = "https://www.google.com/search?q=" + search;
            }
        });

        $(document).on('click', '.to-do li .closeBtn', function () {
            $(this).parent().remove();
        });

        $('#toDoList').sortable();

        $.getJSON('https://api.openweathermap.org/data/2.5/weather?id=2747350&APPID=7ab4eadd5d34faceb2b0296029151c28&units=metric', function (forecast) {
            var temp = Math.round(forecast.main.temp * 10) / 10;
            var icon2 = forecast.weather[0].id;
            let desc = forecast.weather[0].description;

            $('#weathericon2').addClass('owf-' + icon2);
            $("#temp").text(temp);
            $('#weather-desc').text(desc.replace('intensity ', ''));
        });

        $.getJSON('https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=01fd538a56fe4ac68464f6ab4f273f24', function (news) {
            for (let i in news.articles) {
                let title = news.articles[i].title;
                let desc = news.articles[i].description;
                let imgUrl = news.articles[i].urlToImage;
                let url = news.articles[i].url;
                $('#news-list').append('<li><a href="' + url + '"><img  class="news-img" src="' + imgUrl + '"><p class="news-title">' + title + '</p><p class="news-description">' + desc + '</p></a></li>');
            }

        });

        $('#addform').submit(function (event) {
          event.preventDefault();
        });

    }
);
