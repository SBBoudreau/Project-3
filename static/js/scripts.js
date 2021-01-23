/*!
    * Start Bootstrap - Freelancer v6.0.5 (https://startbootstrap.com/theme/freelancer)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
    */
    (function($) {
    "use strict"; // Start of use strict
  
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: (target.offset().top - 71)
          }, 1000, "easeInOutExpo");
          return false;
        }
      }
    });
  
    // Scroll to top button appear
    $(document).scroll(function() {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $('.scroll-to-top').fadeIn();
      } else {
        $('.scroll-to-top').fadeOut();
      }
    });
  
    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
  
    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
      target: '#mainNav',
      offset: 80
    });
  
    // Collapse Navbar
    var navbarCollapse = function() {
      if ($("#mainNav").offset().top > 100) {
        $("#mainNav").addClass("navbar-shrink");
      } else {
        $("#mainNav").removeClass("navbar-shrink");
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  
    // Floating label headings for the contact form
    $(function() {
      $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
      }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
      }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
      });
    });
  
  })(jQuery); // End of use strict


    
    
    $('#clickMe').on('click', event=>{
      var inputVal = $('#url_image').val()
      console.log(inputVal)
      var default_img = "../static/img/unknown_pokemon.jpg";
      if (inputVal != "") {
            document.getElementById("imageid").src=inputVal;
            document.getElementById("second_img").src=inputVal
            $.ajax({
              method:'POST',
              data:inputVal,
              url: "/image"
            }).done(function(data){
              console.log(data)
              var sentence = data["prediction"]
              var split_pred = sentence.split(" ");
              $("#pokemon_pred").text(sentence)
              $("#portfolioModal3Label").text(split_pred[6])
              console.log(split_pred[6])
              get_pokemon_info(split_pred[6]);
            })
          } else {
            image_carousel = {1: "static/img/4b8beb8543974b00b9bd7c41e57a4d47.jpg",
                              2: "static/img/04fba859a3f04ca1ae3b6fc54f4cb9bd.jpg",
                              3: "static/img/0448e4da6f1540c896827e6b4e1e7660.jpg",
                              4: "static/img/80656364b8714f7cb66e14c19ad42b26.jpg",
                              5: "static/img/4e37157e3877445b93b6f1926a426fd3.jpg"}
            selected_num = Math.floor((Math.random() * 5) + 1);
            document.getElementById("imageid").src= "../" + image_carousel[selected_num];
            document.getElementById("second_img").src= "../" + image_carousel[selected_num]
            $.ajax({
              method:'POST',
              data:image_carousel[selected_num],
              url: "/image"
            }).done(function(data){
              console.log(data)
              var sentence = data["prediction"]
              var split_pred = sentence.split(" ");
              $("#pokemon_pred").text(sentence)
              $("#portfolioModal3Label").text(split_pred[6])
              console.log(split_pred[6])
              get_pokemon_info(split_pred[6]);
            })
          }

})


function get_pokemon_info(d){

  d3.csv("../static/data/pokemon.csv",function(data) {
        if(data.name===d){
          //console.log(data.Sp_Atk)
          //CODE FOR GAUGE HERE
          var data = [
            {
              x: ['HP', 'Attack', 'Defense','Special Attack','Special Defense','Speed'],
              y: [data.hp,data.attack,data.defense,data.sp_attack,data.sp_defense,data.speed],
              type: 'bar',
              text:[data.hp,data.attack,data.defense,data.sp_attack,data.sp_defense,data.speed],
              textposition:'auto'
            }
          ];

          var layout = { 
            font: {size: 16},
            xaxis: {
                  showgrid: false
                  },
            yaxis: {
                  showgrid: false,
                  showline: true,
                  showticklabels:false,
                  visible:false
                  }};
          
          var config = {responsive: true}
          
          
          Plotly.newPlot('stats', data,layout, config);





        }
  });

  d3.csv("../static/data/pokemon2.csv",function(data_des) {
    if(data_des.name===d){
      $("#pokedescription").text(data_des.description);

    }

  });


}