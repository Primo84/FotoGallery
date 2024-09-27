#FotoGallery


Click link below to see how it's work...

    https://primo84.github.io/Piccante/Galery.html


Here is a full code a FotoGallery component....

    https://github.com/Primo84/FotoGallery.git
        


FotoGallery is a component, to create a images view scroller.

It's created from JavaScript and JQuery code.

To use, must join JQuery libs first, and FotoGalerry.js and FotoGallery.css files.

Below is example how join mantadory files, and libs to use a FotoGallery component.

        ***Join JQuery and FotoGallery libs example***


        <link rel = "stylesheet" href = "https://primo84.github.io/FotoGallery/FotoGallery.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        

        <script src = "https://primo84.github.io/FotoGallery/FotoGallery.js" type ="text/javascript"></script>


Gallery component is creating by calling InitGallery(...) function, from JQuery div selector.

First must create a div object, and then call by using JQuery selector InitGallery(...).


        ***Init FotoGallery example***

         <div class = 'foto'></div>

         $('div.foto').InitGallery(...)



InitGallery() takes two parameters:

    1 - array contains a images file paths

        for example : 

        arrSrc =[

            ".../img1.jpg",
            ".../img2.jpg,
            "..../img3.jpg
        ]

    2 - object {...} with a colors and attrinutes as below. 

        {
            "Header" : 'rgb(34, 33, 35)',    
            "Border" : 'rgb(20, 18, 22)',           
            "Footer" : 'rgb(34, 33, 35)',
            "Text"  : 'rgb(239, 137, 12)',
            "Title" : 'source'
        }

        "Header" - header color
        "Border" - border color
        "Footer" - footer color
        "Text"   - title text color
        "Title"  - title text mode :
        
                 'source'   - title contain a file name of current image
                 'numeric'  - title contain a index of current image for example : "2/10"
                 'none'     - component not have a title

Last step is add GalleryResize() callback function to Body elemnt in html document as below:

            ***Add GalleryResize() callback function example***

                    <BODY onresize = "GalleryResize()">

                                    or

                    <script type = "text/javascript">
                         
                         function BodyResize(){
                            ...
                            GalleryResize();
                         }

                    </script>

                    <BODY onresize = "BodyResize()">

You can also create a mini slider wich contains a small images. Minislider require that Gallery must be created first.

To init a minislider must call InitMinislider() from JQuery div selector

It's takes two arguments:

    1 - amount of small images in single view
    2 - string that contains "vertical" or "horizontal" mode

Below is example how perform initation of mini slider component

         ***Mini slider initation example***


                <div class = 'minislider'></div>

                $('div.minislider').InitMinislider(4, "vertical");



Below is a full example, wich show a initation procedures to create gallery and mini slider component :



                        ***Initation FotoGallery full example***

                        -Html Document-

            <BODY onresize = "GalleryResize()">

                <div class = 'foto'></div>
                <div class = 'MiniSlider'></div>


            </BODY>


                        -Java script source-

            const imgSrc = [
                                "./Gallery/1.jpg",
                                "./Gallery/2.jpg",
                                "./Gallery/3.jpg",
                                "./Gallery/4.jpg",
                                "./Gallery/5.jpg",
                                "./Gallery/6.jpg",
                                "./Gallery/7.jpg",
                                "./Gallery/8.jpg",
                                "./Gallery/9.jpg",
                                "./Gallery/10.jpg"
                            ]
            

            $(document).ready(() => {


                                    $('div.foto').InitGallery(imgSrc, {

                                        "Header" : 'rgb(34, 33, 35)',
                                        "Border" : 'rgb(20, 18, 22)',
                                        "Footer" : 'rgb(34, 33, 35)',
                                        "Text"  : 'rgb(239, 137, 12)',
                                        "Title" : 'source'
                                    });

                                    $('div.MiniSlider').InitMinislider(4, "vertical");

                                })




