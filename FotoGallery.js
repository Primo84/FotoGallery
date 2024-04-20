
const Gallery_Attr = {

    "Header" : 'rgb(34, 33, 35)',
    "Border" : 'rgb(20, 18, 22)',
    "Footer" : 'rgb(34, 33, 35)',
    "Text"  : 'rgb(239, 229, 229)',
    "Title" : 'source'                  //source or numeric
}

let MiniSlider_Attr = {
    "color" : "",
    "selColor" : "",
    "orinet" : ""
}

let $divObj = null;             // large image container
let $divImg = null;             // inner div large image
let $spanHead = null;           // large image hedaer
let $divFoot = null;            // large image footer
let $divSlider = null;          // small images container 

let $divRScroll = null;         // left scroll icon in larege image
let $divLScroll = null;         // right scroll icon in larege image

let $RScrollImg = null;         // left scroll icon image
let $LScrollImg = null;         // right scroll icon image

let CurrImg = 0;
let LowImg = 0 ;
let HiImg = 0;

let miniDiv_wh;                 // single small outer image width/height
let miniDivInner_wh             // single small inner image width/height
let sliderWH;                   // small images slider container outer width/height

let DivImgOuter_w               // Div large image outer width
let DivImgOuter_h               // Div large image outer height

let DivCont_w                   // Div large image container inner width
let DivCont_h                   // Div large image container inner width

let LargeImgOuter_w             // Large image outer width

let divSpan;                    // amount images in single view of slider container


let fSize = 0;                 // Gallery top title font size 

let ImgArr = [];                // larger images 
let ImgMiniArr = [];            // small images
let animateExecute = false;     // enable when animation is in running mode

let firstClick = false ;

function GalleryResize(event)
{
    let i;
    let posXY;

    DivCont_w = $($divObj).innerWidth();
    DivCont_h = $($divObj).innerHeight();

    $divImg.width(DivCont_w - 100);
    $divImg.height(DivCont_h - 96);

    DivImgOuter_w = $divImg.outerWidth();
    DivImgOuter_h = $divImg.outerHeight();

    LargeImgOuter_w = $(ImgArr[0]).outerWidth();

    $spanHead.width(DivCont_w - 84);
    $divFoot.width(DivCont_w - 84);
    $divImg.height(DivCont_h - 96);
    $divImg.width(DivCont_w - 100);

    $RScrollImg.css({
        "top" : `${($divRScroll.innerHeight()-34)/2}px`,
        "left" : `${$('div.R_Scroll').innerWidth() - 34}px`,
    });

    $LScrollImg.css({
        "top" : `${($divLScroll.innerHeight()-34)/2}px`,
        "left" : "10px",
    })

    const y = Math.floor($divImg.position()['top'] + DivImgOuter_h);

    $divFoot.css('top', y + 'px');
    
    ImgArr.forEach(($Img, index)=>{

        if(index < CurrImg)
            $Img.css("left", `-${LargeImgOuter_w + 12}px`);
         else if(index > CurrImg)
            $Img.css("left", `${LargeImgOuter_w + 12}px`);
    });
    
    ImgMiniArr.forEach(($DivM, index)=>{

        if(MiniSlider_Attr['orient'] == "horizontal")
         {  

            $DivM.innerWidth(($divSlider.innerWidth()-(divSpan * 6) - 6) / divSpan);
            $DivM.innerHeight($divSlider.innerHeight()-10);

            if(index == 0)
            {
                sliderWH = $divSlider.outerWidth();
                miniDiv_wh = ImgMiniArr[0].outerWidth();
                miniDivInner_wh = ImgMiniArr[0].innerWidth();
            }

            if(index < LowImg)
            {
                // posXY = 3;
                // $DivM.css("z-index", "0");
                posXY = (miniDiv_wh * - 1) - 3;
            }
            else if(index > HiImg)
            {
                posXY = sliderWH; // $divSlider.outerWidth();
                // $DivM.css("z-index", "0");
                // posXY = ((divSpan-1) * $DivM.innerWidth()) + (i * 6) + 3;
            }
            else
            {
                $DivM.css("z-index", "1");
                i = index - LowImg;
                posXY = (i * miniDivInner_wh) + (i * 6) + 3;
            }

            $DivM.css({

                "top" : "3px",
                "border" : CurrImg == index ? `3px solid ${MiniSlider_Attr['selColor']}` : `3px solid ${MiniSlider_Attr['color']}`,
                "left" : posXY + "px"

            })



         }
         else
         {
            $DivM.innerHeight(($divSlider.innerHeight()-(divSpan * 6) - 6) / divSpan);
            $DivM.innerWidth($divSlider.innerWidth() - 10);

            if(index == 0)
            {
                sliderWH = $divSlider.outerHeight();
                miniDiv_wh = ImgMiniArr[0].outerHeight();
                miniDivInner_wh = ImgMiniArr[0].innerHeight();
            }

            if(index < LowImg)
            {
                // posXY = 3;
                // $DivM.css("z-index", "0");
                posXY = (miniDiv_wh * - 1) - 2;
            }
            else if(index > HiImg)
            {
                posXY = sliderWH; // $divSlider.outerHeight() + 2 ;
                // $DivM.css("z-index", "0");
                // posXY = ((divSpan-1) * $DivM.innerHeight()) + (i * 6) + 3;
            }
            else
            {
                // $DivM.css("z-index", "1");
                i = index - LowImg;
                posXY = (i * miniDivInner_wh) + (i * 6) + 3;
            }

            $DivM.css({

                "left" : "3px",
                 "border" : CurrImg == index ? `3px solid ${MiniSlider_Attr['selColor']}` : `3px solid ${MiniSlider_Attr['color']}`,
                "top" : posXY + "px"

            })

         }
    });
    

}


function miniDivClick(event)
{
    const miniDiv = event.target.parentElement;
    const index = parseInt($(miniDiv).attr('name'));
    let i;
    let txt = "";
    let txt1 = "";

    if(CurrImg != index)
    {
        ImgArr[CurrImg].fadeOut(500,()=>{

            ImgArr[index].hide();

            if(CurrImg < index)
                for(i = CurrImg; i < index; i++)
                    $(ImgArr[i]).css("left", `-${LargeImgOuter_w + 12}px`).show();
            else  
                for(i = CurrImg; i > index; i--)
                    $(ImgArr[i]).css("left", `${LargeImgOuter_w +12}px`).show();

            $(ImgArr[index]).css("left", "0px").fadeIn(500);

            $(ImgMiniArr[CurrImg]).css('border-color', MiniSlider_Attr['color']);
            $(ImgMiniArr[index]).css('border-color', MiniSlider_Attr['selColor']);

            CurrImg = index;

            if(Gallery_Attr['Title'] == "numeric")
                $spanHead.text(`${CurrImg+1}/${ImgArr.length}`);
            else
            {
                txt = $(ImgArr[CurrImg]).attr('src');
                txt1 = txt.slice(txt.indexOf("/") + 1, txt.length);
            
                $spanHead.text(txt1);
            }
        



        });
            
    }

}

function DivImgClick(event)
{
    const DivImg = event.target;

    if (DivImg.requestFullscreen) 
        DivImg.requestFullscreen();
    else if (DivImg.webkitRequestFullscreen)  /* Safari */
        DivImg.webkitRequestFullscreen();
    else if (DivImg.msRequestFullscreen)  /* IE11 */
         DivImg.msRequestFullscreen();
      

}

function scrollEnt(event)
{
     const divEl = event.target.firstChild;
    
     $(divEl).fadeIn();
    
}

function scrollLeave(event)
{
    const divEl = event.target.firstChild;

    $(divEl).fadeOut();
}

function imgEnt(event)
{
     const divEl = event.target;

     if(divEl.className == "R_Scroll")
        divEl.src = ".\\FotoGallery\\Icons\\R_Scroll_s.png";
    else if(divEl.className == "L_Scroll")
        divEl.src = ".\\FotoGallery\\Icons\\L_Scroll_s.png";
    else if(divEl.className == "R_Arrow")
        divEl.src = ".\\FotoGallery\\Icons\\R_Arrow_s.png";
    else if(divEl.className == "L_Arrow")
        divEl.src = ".\\FotoGallery\\Icons\\L_Arrow_s.png";
    
}

function imgLeave(event)
{
    const divEl = event.target;

     if(divEl.className == "R_Scroll")
        divEl.src = ".\\FotoGallery\\Icons\\R_Scroll_ns.png";
    else if(divEl.className == "L_Scroll")
        divEl.src = ".\\FotoGallery\\Icons\\L_Scroll_ns.png";
    else if(divEl.className == "R_Arrow")
        divEl.src = ".\\FotoGallery\\Icons\\R_Arrow_ns.png";
    else if(divEl.className == "L_Arrow")
        divEl.src = ".\\FotoGallery\\Icons\\L_Arrow_ns.png";
    
}



function mouseclick(event)
{
    let i;
    let index;
    let scrollCount;
    let posXY;
    let atrrPos = "";
    let txt = "";
    let txt1 = "";

    if(!firstClick)
    {
        firstClick = true;

        MiniSlider_Attr['orient'] == "horizontal" ? atrrPos = "left" : atrrPos = "top";

         posXY = sliderWH + 2;

        for(i=divSpan; i < ImgArr.length; i++)
            ImgMiniArr[i].css(atrrPos, posXY);
        

    }

    if(animateExecute) return;

    if(event.target.className == "R_Scroll" || event.target.className == "R_Arrow")
    {

        if(ImgArr.length > CurrImg + 1)
        {
            animateExecute = true;

            ImgArr[CurrImg].animate({
                'left' : `-=${LargeImgOuter_w + 12}px` 

            }, 400, 'linear',()=>{

                CurrImg ++ ;

                ImgArr[CurrImg].animate({
                    'left' : '0px' 

                },300, 'linear', () => animateExecute = false)

                if(Gallery_Attr['Title'] == "numeric")
                    $spanHead.text(`${CurrImg+1}/${ImgArr.length}`);
                else
                {
                    txt = $(ImgArr[CurrImg]).attr('src');
                    txt1 = txt.slice(txt.indexOf("/") + 1, txt.length);
                
                    $spanHead.text(txt1);
                }

                if(ImgMiniArr.length <= 0 ) 
                {
                    animateExecute = false;
                    return;
                }

                $(ImgMiniArr[CurrImg - 1]).css('border-color', MiniSlider_Attr['color']);
                $(ImgMiniArr[CurrImg]).css('border-color', MiniSlider_Attr['selColor']);

                if(CurrImg > HiImg)
                {
                    scrollCount = ImgArr.length - CurrImg;

                    scrollCount > divSpan ? scrollCount = divSpan : scrollCount = scrollCount;
                    

                    for(i = LowImg; i < LowImg + scrollCount ; i++)
                    {

                        if(MiniSlider_Attr['orient'] == "horizontal")

                            $(ImgMiniArr[i]).animate({

                                "left" : `-${miniDiv_wh + 3 }px`
                                
                            }, 300, 'linear');

                        else

                            $(ImgMiniArr[i]).animate({

                                "top" : `-${miniDiv_wh + 3 }px`
                                
                            }, 300, 'linear');
                
                    }

                    LowImg += scrollCount;
                    HiImg += scrollCount;

                    for(index = LowImg; index <= HiImg; index++)
                    {
                        i = index - LowImg;
                        posXY = (i * miniDivInner_wh) + (i * 6) + 3;

                        if(MiniSlider_Attr['orient'] == "horizontal")

                            $(ImgMiniArr[index]).animate({

                                "left" : posXY + "px"
                                
                            }, 300, 'linear');
                        else
                            $(ImgMiniArr[index]).animate({

                                "top" : posXY + "px"
                                
                            }, 300, 'linear');

                    }

                }

            })

        }
    }
    else
    {
        if(CurrImg > 0)
        {

            animateExecute = true;

            ImgArr[CurrImg].animate({
                'left' : `+=${LargeImgOuter_w + 12}px` 

            }, 400, 'linear',()=>{

                CurrImg -- ;

                ImgArr[CurrImg].animate({
                    'left' : '0px' 

                },300, 'linear', () => animateExecute = false)

                if(Gallery_Attr['Title'] == "numeric")
                    $spanHead.text(`${CurrImg+1}/${ImgArr.length}`);
                else
                {
                    txt = $(ImgArr[CurrImg]).attr('src');
                    txt1 = txt.slice(txt.indexOf("/") + 1, txt.length);
                
                    $spanHead.text(txt1);
                }

                if(ImgMiniArr.length <= 0 ) 
                {
                    animateExecute = false;
                    return;
                }

                if(ImgMiniArr.length <= 0 ) return;

                $(ImgMiniArr[CurrImg + 1]).css('border-color', MiniSlider_Attr['color']);
                $(ImgMiniArr[CurrImg]).css('border-color', MiniSlider_Attr['selColor']);            

                if(CurrImg < LowImg)
                {
                    CurrImg >= divSpan - 1 ? scrollCount = divSpan : scrollCount = CurrImg + 1;

                    if(MiniSlider_Attr['orient'] == "horizontal")

                    for(i = HiImg; i > HiImg - scrollCount ; i--)
                        $(ImgMiniArr[i]).animate({

                            "left" : `${sliderWH +3}px`
                            
                        }, 200, 'linear');
                    
                    else
                        for(i = HiImg; i > HiImg - scrollCount ; i--)
                        $(ImgMiniArr[i]).animate({

                            "top" : `${sliderWH +3}px`
                            
                        }, 200, 'linear');

                    LowImg -= scrollCount;
                    HiImg -= scrollCount;

                    for(index = HiImg; index >= LowImg; index--)
                    {
                        i = index - LowImg;
                        posXY = (i * miniDivInner_wh) + (i * 6) + 3;

                        if(MiniSlider_Attr['orient'] == "horizontal")
                            $(ImgMiniArr[index]).animate({

                                "left" : posXY + "px"
                                
                            }, 200, 'linear');
                        else
                            $(ImgMiniArr[index]).animate({

                                "top" : posXY + "px"
                                
                            }, 200, 'linear');

                    }

                }

            })

        }

    }

}

function ImgLoop(src)
{
   let Img = new Image();
   let txt = "";
   let txt1 = "";

   Img.src = src;

   $divImg.append($(Img));

   LargeImgOuter_w = $(Img).outerWidth();

   ImgArr.push($(Img));

   $(Img).click(DivImgClick);

   if(ImgArr.length > 1)
   {
        $(Img).css('left', DivImgOuter_w + 'px');
    
   }

    if(Gallery_Attr['Title'] == "numeric")
        $spanHead.text(`1/${ImgArr.length}`);
   else
   {
        txt = $(ImgArr[0]).attr('src');
        index = txt.indexOf('/');
        txt1 = txt.slice(txt.indexOf("/") + 1, txt.length);

        $spanHead.text(txt1);
   }

   

}


$.fn.InitGallery = function(ImgSrc = [], GalleryAttr={

    "Header" : 'rgb(34, 33, 35)',
    "Border" : 'rgb(20, 18, 22)',
    "Footer" : 'rgb(34, 33, 35)',
    "Text"  : 'rgb(239, 229, 229)',
    "Title" : 'source'
} )
{
    $divObj = $(this);

    DivCont_h = $($divObj).innerHeight();
    DivCont_w = $($divObj).innerWidth();

    Gallery_Attr['Header'] = GalleryAttr['Header'];
    Gallery_Attr['Border'] = GalleryAttr['Border'];
    Gallery_Attr['Footer'] = GalleryAttr['Footer'];
    Gallery_Attr['Text'] = GalleryAttr['Text'];
    Gallery_Attr['Title'] = GalleryAttr['Title'];

    // $divObj.css(Gallery_Attr);

    $divObj.append("<div class = 'FotoGallery'></div>");
    $divObj.append("<span class = 'FotoGallery_Header'>0/0</span>");
    $divObj.append("<div class = 'FotoGallery_Footer'></div>");


    $divImg = $('div.FotoGallery');
    $spanHead = $('span.FotoGallery_Header');
    $divFoot = $('div.FotoGallery_Footer');

    $spanHead.width(DivCont_w - 84);
    $divFoot.width(DivCont_w - 84);
    $divImg.height(DivCont_h - 96);
    $divImg.width(DivCont_w - 100);

    DivImgOuter_w = $divImg.outerWidth();
    DivImgOuter_h = $divImg.outerHeight();


            // Append scrools to large image div element


    $divObj.append("<div class = 'R_Scroll'><img class = 'R_Scroll' src = '.\\FotoGallery\\Icons\\R_Scroll_ns.png'></div>");


    $divRScroll = $('div.R_Scroll');
    $RScrollImg = $('div.R_Scroll img');

    $RScrollImg.css({
        "top" : `${($divRScroll.innerHeight()-34)/2}px`,
        "left" : `${$('div.R_Scroll').innerWidth() - 34}px`,
        "width" : "24px",
        "height" : "34px"
    }).click(mouseclick).hover(imgEnt, imgLeave);


    $divObj.append("<div class = 'L_Scroll'><img class = 'L_Scroll' src = '.\\FotoGallery\\Icons\\L_Scroll_ns.png'></div>");


    $divLScroll = $('div.L_Scroll');
    $LScrollImg = $('div.L_Scroll img');

    $LScrollImg.css({
        "top" : `${($divLScroll.innerHeight()-34)/2}px`,
        "left" : "10px",
        "width" : "24px",
        "height" : "34px"
    }).click(mouseclick).hover(imgEnt, imgLeave);


                // Append scrools arrowns to footer large image div element



    $divFoot.append("<div class = 'R_Arrow'><img class = 'R_Arrow' src = '.\\FotoGallery\\Icons\\R_Arrow_ns.png'></div>");
    $divFoot.append("<div class = 'L_Arrow'><img class = 'L_Arrow' src = '.\\FotoGallery\\Icons\\L_Arrow_ns.png'></div>");



    $spanHead.css('background-color', Gallery_Attr['Header']);
    $divImg.css('border-color', Gallery_Attr['Border']);
    $divFoot.css('background-color', Gallery_Attr['Footer']);
    $spanHead.css('color', Gallery_Attr['Text']);

    const y = Math.floor($divImg.position()['top'] + DivImgOuter_h);

    $divFoot.css('top', y + 'px');

    // $divRScroll.click(mouseclick);

    $divRScroll.hover(scrollEnt, scrollLeave);
    $divLScroll.hover(scrollEnt, scrollLeave);
    $('div.R_Arrow').hover(imgEnt, imgLeave).click(mouseclick);
    $('div.L_Arrow').hover(imgEnt, imgLeave).click(mouseclick);

    if(ImgSrc.length > 0)

    ImgSrc.forEach(ImgLoop);
    
}


$.fn.InitMinislider = function(span=3, orient="horizontal", color = "rgb(34, 33, 35)", selColor = "rgb(239, 229, 229)")
{
    let i = 0;
    let $miniDiv = null;
    let $NewImg = null;
    let posXY = 0;

    $divSlider = $(this);
    divSpan = span;

    $divSlider.css("overflow", "hidden");


    if(orient != "vertical" && orient != "horizontal")
        orient = "horizontal";

    HiImg = (LowImg = (Math.floor(CurrImg / span)) * span) + span -1;

    if(HiImg > ImgArr.length -1)
        HiImg = ImgArr.length -1;

    MiniSlider_Attr['color'] = color;
    MiniSlider_Attr['selColor'] = selColor;
    MiniSlider_Attr['orient'] = orient;


    ImgArr.forEach((img, index) =>{
        
        $miniDiv = $('<div class = "MiniSlider"></div>');

        $miniDiv.attr('name', index);

        $miniDiv.click(miniDivClick);

         if(orient == "horizontal")
         {
            $miniDiv.innerWidth(($divSlider.innerWidth()-(span * 6) - 6) / span);
            $miniDiv.innerHeight($divSlider.innerHeight()-10);

            if(index < LowImg)
            {
                posXY = 3;
                $miniDiv.css("z-index", "0");
            //  posXY = $miniDiv.outerWidth() * - 1;
            }
            else if(index > HiImg)
            {
                // posXY = $divSlider.outerWidth() + 2 ;
                $miniDiv.css("z-index", "0");
                posXY = ((span-1) * $miniDiv.innerWidth()) + (i * 6) + 3;
            }
            else
            {
                $miniDiv.css("z-index", "1");
                i = index - LowImg;
                posXY = (i * $miniDiv.innerWidth()) + (i * 6) + 3;
            }

            $miniDiv.css({

                "top" : "3px",
                "border" : CurrImg == index ? `3px solid ${selColor}` : `3px solid ${color}`,
                "left" : posXY + "px"

            })

         }
         else
         {
            $miniDiv.innerHeight(($divSlider.innerHeight()-(span * 6) - 6) / span);
            $miniDiv.innerWidth($divSlider.innerWidth() - 10);

            if(index < LowImg)
            {
                posXY = 3;
                $miniDiv.css("z-index", "0");
            //  posXY = $miniDiv.outerWidth() * - 1;
            }
            else if(index > HiImg)
            {
                // posXY = $divSlider.outerWidth() + 2 ;
                $miniDiv.css("z-index", "0");
                posXY = ((span-1) * $miniDiv.innerHeight()) + (i * 6) + 3;
            }
            else
            {
                $miniDiv.css("z-index", "1");
                i = index - LowImg;
                posXY = (i * $miniDiv.innerHeight()) + (i * 6) + 3;
            }

            $miniDiv.css({

                "left" : "3px",
                "border" : CurrImg == index ? `3px solid ${selColor}` : `3px solid ${color}`,
                "top" : posXY + "px"

            })

         }

    
        $NewImg = img.clone();

         $($NewImg).css({
            "left" : "0px",
            "top" : "0px",
            "width" : "100%",
            "height" : "100%"
         })

         $miniDiv.append($($NewImg));

         ImgMiniArr.push($($miniDiv));

         $divSlider.append($($miniDiv));
         
    })

    if(orient == "horizontal")
    {
        miniDiv_wh = ImgMiniArr[0].outerWidth();
        miniDivInner_wh = ImgMiniArr[0].innerWidth();
        sliderWH = $divSlider.outerWidth();
    }
    else
    {
        miniDiv_wh = ImgMiniArr[0].outerHeight();
        miniDivInner_wh = ImgMiniArr[0].innerHeight();
        sliderWH = $divSlider.outerHeight();
    }

}
