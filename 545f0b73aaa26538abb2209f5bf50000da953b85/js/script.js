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
                scale: 4,
                onrendered: function (canvas) {
                    theCanvas = canvas;
                    $("#img-out").html(canvas);

                    img = canvas.toDataURL("image/jpeg");
                    download(img, "modified.jpg", "image/jpeg");
                }
            });
            $('#widget').show();

        }, 3500);
        function download(strData, strFileName, strMimeType) {
            var D = document,
                A = arguments,
                a = D.createElement("a"),
                d = A[0],
                n = A[1],
                t = A[2] || "text/plain";
        
            //build download link:
            a.href = "data:" + strMimeType + "," + escape(strData);
        
        
            if (window.MSBlobBuilder) {
                var bb = new MSBlobBuilder();
                bb.append(strData);
                return navigator.msSaveBlob(bb, strFileName);
            } /* end if(window.MSBlobBuilder) */
        
        
        
            if ('download' in a) {
                a.setAttribute("download", n);
                a.innerHTML = "downloading...";
                D.body.appendChild(a);
                setTimeout(function() {
                    var e = D.createEvent("MouseEvents");
                    e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    a.dispatchEvent(e);
                    D.body.removeChild(a);
                }, 66);
                return true;
            } /* end if('download' in a) */
            ; //end if a[download]?
        
            //do iframe dataURL download:
            var f = D.createElement("iframe");
            D.body.appendChild(f);
            f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
            setTimeout(function() {
                D.body.removeChild(f);
            }, 333);
            return true;
        } /* end download() */
        
        setTimeout(() => {
            $('#widget').hide();
            $('#btnSave').text('Generate cover');
        }, 3600);

    });
});