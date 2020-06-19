$(function () {
    $('#picture').hide();
    $('#btnSave').hide();
    $('#widget_con').hide();
    var restart = false;

    $('#text').keypress(function (e) {
        var key = e.which;
        if (key == 13) {


            const element1 = document.querySelector('#text');
            element1.classList.add('animate__animated', 'animate__fadeOutDown');

            element1.addEventListener('animationend', () => {
                $('#text').hide();
                $('#picture').show();
                $('#picture').addClass('animate__animated animate__fadeInDown');

            });



        }
    });
    $('#picture').keypress(function (e) {
        var key = e.which;
        if (key == 13) {

            const element2 = document.querySelector('#picture');
            element2.classList.add('animate__animated', 'animate__fadeOutDown');

            element2.addEventListener('animationend', () => {
                $('#picture').hide();
                $('#btnSave').show();
                $('#btnSave').addClass('animate__animated animate__fadeInDown');

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

        $('#month').text(text);
        $('#btnSave').html('<div class="loader">Loading<span class="loader__dot">.</span><span class="loader__dot">.</span><span class="loader__dot">.</span></div>');

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
            const element = document.querySelector('#btnSave');
            element.classList.add('animate__animated', 'animate__fadeOutDown');

            element.addEventListener('animationend', () => {
                $('#btnSave').hide();
                $('#widget_con').show();
                $('#widget_con').addClass('animate__animated animate__fadeInDown');

            });



        }, 3500);

/*                 setTimeout(() => {
                    $('#picture').blur();
                    restart = true;

                    $(document).on('keypress',function(e) {
                        if(e.which == 13 && restart == true) {
                            restart = false;
                            $('#widget_con').removeClass('animate__animated animate__fadeInDown');
                            $('#btnSave').removeClass('animate__animated animate__fadeOutDown');
                            const element3 = document.querySelector('#widget_con');
                            element3.classList.add('animate__animated', 'animate__fadeOutDown');
                
                            element3.addEventListener('animationend', () => {
                                $('#widget_con').hide();
                                $('#btnSave').show();
                                $('#btnSave').addClass('animate__animated animate__fadeInDown');
                
                            });
                

                
                
                            $('#btnSave').click();
                            return false;
                        }
                    });
                }, 3600); */
        

    });
});