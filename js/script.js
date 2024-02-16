$(function () {
    const animateCSS = (element, animation, prefix = 'animate__') =>
        new Promise((resolve, reject) => {
            const animationName = `${prefix}${animation}`;
            const node = document.querySelector(element);

            node.classList.add(`${prefix}animated`, animationName);

            function handleAnimationEnd() {
                node.classList.remove(`${prefix}animated`, animationName);
                node.removeEventListener('animationend', handleAnimationEnd);

                resolve('Animation ended');
            }

            node.addEventListener('animationend', handleAnimationEnd);
        });

    var restart = false;
  
    $('#text').keypress(function (e) {
        var key = e.which;
        if (key == 13) {



            animateCSS('#text_con', 'fadeOutDown').then((message) => {
                $('#text_con').hide();
                $('#picture_con').show();
                $('#picture_con').focus();
                animateCSS('#picture_con', 'fadeInDown');
            });



        }
    });

    $('#picture').keypress(function (e) {
        var key = e.which;
        if (key == 13) {

            animateCSS('#picture_con', 'fadeOutDown').then((message) => {
                $('#picture_con').hide();
                $('#btnSave').show();
                animateCSS('#btnSave', 'fadeInDown');
            });

            $('#btnSave').click();
            return false;
        }
    });

    $("#btnSave").click(function () {
        $("#img-out").html();
        var text = $('#text').val();
        var picture = $('#picture').val();
        if (text == '') {
            text = picture;
        }

        picture = encodeURIComponent(picture.trim())

        console.log(picture)

        $('#month').text(text);
        $('#btnSave').html('<div class="loader">Generating your awesome playlist cover<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>');

        function toDataURL(src, callback, outputFormat) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = function () {
                var canvas = document.createElement('CANVAS');
                var ctx = canvas.getContext('2d');
                var dataURL;
                canvas.height = this.naturalHeight;
                canvas.width = this.naturalWidth;
                ctx.drawImage(this, 0, 0);
                dataURL = canvas.toDataURL(outputFormat);
                callback(dataURL);
            };
            img.src = src;
            if (img.complete || img.complete === undefined) {
                img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
                img.src = src;
            }
        }

        toDataURL(
            '//source.unsplash.com/500x500/?' + picture,
            function (dataUrl) {
                $('.bg').css("background-image", "url(" + dataUrl + ")");
            }
        )
        setTimeout(() => {
            html2canvas($("#widget"), {
                scale: 4,
                onrendered: function (canvas) {
                    theCanvas = canvas;
                    $("#img-out").html(canvas);
                    var a = document.getElementById("download");
                    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")

                    a.download = text + '.jpg';
                }
            });

            animateCSS('#btnSave', 'fadeOutDown').then((message) => {
                $('#btnSave').hide();
                $('#widget_con').show();
                animateCSS('#widget_con', 'fadeInDown');
            });






        }, 3500);

        setTimeout(() => {
            $('#picture').blur();
            restart = true;

            $(document).on('keypress', function (e) {
                if (e.which == 13 && restart == true) {
                    restart = false;

                    $('body').addClass('overflow');

                    animateCSS('#widget_con', 'fadeOutDown').then((message) => {
                        $('#widget_con').hide();
                        $('#btnSave').show();
                        animateCSS('#btnSave', 'fadeInDown');
                        $('body').removeClass('overflow');
                    });





                    $('#btnSave').click();
                    return false;
                }
            });


            $(document).keyup(function(e) {
                if (e.keyCode === 27 && restart == true){location.reload();}
              });
        }, 3600);


    });
});
