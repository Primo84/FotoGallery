#FotoGallery

FotoGallery is a component to create a images view scroller.

It's created from JavaScript and JQuery code.

To use must join JQuery libs first, and FotoGalerry.js and FotoGallery.css files.

Below is example how join mantadory files and libs for use a FotoGallery component.

        ***Join JQuery and FotoGallery libs example***


        <link rel = "stylesheet" href = "https://primo84.github.io/FotoGallery/FotoGallery.css">

        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        

        <script src = "https://primo84.github.io/FotoGallery/FotoGallery.js" type ="text/javascript"></script>


Gallery component is created by calling InitGallery(...) function from  JQuery div selector.

First must created a div object and then call by using JQuery selector InitGallery(...).


        ***Init FotoGallery example***

         <div id = 'foto'></div>

         $('#id').InitGallery(...)



InitGallery() takes two arguments:

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







