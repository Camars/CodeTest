$(document).ready(function () {
  loadProducts();
  $('body').on('click', function () {
    sumTotal();
  });
  if($('.in_cart').length === 0) {
    $('.js-subtotal_contents').html('Nothing here yet!');
    $('#js-subtotal').html('$0.00');
  }
  $(function () {
    $('.js-toggle').click(function () {
      if($('.in_cart').length === 0) {
        console.log('none here');
        $('.js-subtotal_contents').html('Nothing here yet!');
        $('#js-subtotal').html('$0.00');
      }
      $(this).text(function (i, text){
        if (text === 'Add to Cart') {
          $(this)
            .removeClass('btn-primary')
            .addClass('btn-secondary')
            .addClass('in_cart');
          return 'Remove Item';
        }
        else {
          $(this)
            .removeClass('btn-secondary')
            .addClass('btn-primary')
            .removeClass('in_cart');
          $('.js-subtotal_contents').html('Nothing here yet!');
          $('#js-subtotal').html('$0.00');
          return 'Add to Cart';
        }
      });
    });
  });
  function sumTotal () {
    var cart = [];
    var cart_products = [];
    var subtotal = 0;
    $('.in_cart').each(function (index) {
      var item_price = $(this).data('price');
      var item_title = $(this).data('title');
      var contents_cart = '<h5 class="c-title">' + item_title + '</h5>' + '<h6 class="c-price c-subtotal__price">$' + item_price + '</h6>';
      cart.push(item_price);
      cart_products.push(contents_cart);
      var total = 0;
      $.each(cart, function () {
          total += this;
      });
      subtotal = '$' + parseFloat(Math.round((total + 0.00001) * 100) / 100).toFixed(2);
      $('.js-subtotal_contents').html(cart_products);
      $('#js-subtotal').html(subtotal);
    });
  }
  function loadProducts () {
    $.getJSON('products.json', function (data) {
      $('#header').html(data.category);
      var products = data.products.map(function (products) {
        var meta = '<meta itemprop="image">';
        var image_source = '../images/' + products.image;
        var product_image = '<img class=img-responsive src="' + image_source + '"/>';
        var product_title = '<h4 class="c-title c-product_flex js-product_flex" itemprop="name">' + products.title + '</h4>';
        var price = parseFloat(products.price).toFixed(2);
        var product_price = '<h6 class="c-price text-center" itemprop="price">$' + price + '</h6>';
        var add_cart = 'Add to Cart';
        var add_cart_button = '<button class="c-button_flex btn btn-primary js-toggle" data-price="' + products.price + '" data-title="' + products.title + '">' + add_cart + '</button>';
        var info_box = '<div>' + product_title + product_price + '</div>';
        return meta + product_image + info_box + add_cart_button;
      });
      var index, len;
      var content = '<div class="c-product_container col-sm-4 col-md-4">' + products.join('</div><div class="c-product_container col-sm-4 col-md-4">') +'</div>';
      var list = $('<div />').html(content);
      for (index = 0, len = products.length; index < len; ++index) {
        $('#products').html(list);
      }
    });
  }
});
$(window).on('load', function () {
  var maxHeight = -1;
  $('.js-product_flex').each(function () {
    maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
  });
  $('.js-product_flex').each(function () {
    $(this).height(maxHeight);
  });
});
