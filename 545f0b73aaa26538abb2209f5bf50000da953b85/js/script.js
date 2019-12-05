$(function () {

    $('#month').keypress(function (e) {
        var key = e.which;
        if (key == 13) {
            $('#btnSave').click();
            return false;
        }
    });

    $('#widget').hide();
    $("#btnSave").click(function () {
        $("#img-out").html();
        var month = $('#month').val();
        $('#month_text').text(month);
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

        if (month == 'Januar') {
            month = 'January'
        };

        if (month == 'Februar') {
            month = 'February'
        };

        if (month == 'März') {
            month = 'Spring'
        };

        if (month == 'Mai') {
            month = 'May'
        };

        if (month == 'Juni') {
            month = 'June'
        };

        if (month == 'Juli') {
            month = 'July'
        };

        if (month == 'Oktober') {
            month = 'October'
        };

        if (month == 'Dezember') {
            month = 'December'
        };

        console.log(month);

        toDataURL(
            '//source.unsplash.com/500x500/?' + month,
            function (dataUrl) {
                $('.bg').css("background-image", "url(" + dataUrl + ")");
            }
        )
        setTimeout(() => {
            html2canvas($("#widget"), {
                scale: 2,
                onrendered: function (canvas) {
                    theCanvas = canvas;
                    $("#img-out").html(canvas);
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