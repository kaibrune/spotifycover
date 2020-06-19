$(function () {

    $('#showsettings').click(function () {
        $('#settings').show();
        $('#standard').hide();
    })

    $('.input').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $('#btnSave').click();
            return false;
        }
    });
    $("#download").hide()
    $('#widget').hide();
    $("#btnSave").click(function () {
        $("#img-out").html();
        var text = $('#text').val();
        var picture = $('#picture').val();
        if(text == ''){
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
                    $("#download").show()
                    var a = document.getElementById("download");
                    a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream")

                    a.download = text + '.jpg';
                }
            });
            $('#widget').show();

        }, 3500);

        setTimeout(() => {
            $('#widget').hide();
            $('#btnSave').text('Generate cover');
        }, 3600);

    });
});