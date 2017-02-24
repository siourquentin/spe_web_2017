var $ = require('jquery');

function getXMLHttpRequest() 
{
    var xhr = null;

    if (window.XMLHttpRequest || window.ActiveXObject) 
    {
        if (window.ActiveXObject) 
        {
            try 
            {
                xhr = new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch(e)
            {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        } 
        else 
        {
            xhr = new XMLHttpRequest();
        }
    }
    else 
    {
        alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
        return null;
    }

    return xhr;
}

function request(url, callback, async) 
{
    var xhr = getXMLHttpRequest();

    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) 
        {
            callback(xhr.responseText);
        }
    };

    xhr.open("GET", url, async);
    xhr.send(null);
}

function readData(sData) 
{
    // On peut maintenant traiter les données sans encombrer l'objet XHR.
    if (sData == "OK")
    {
        alert("C'est bon");
    } 
    else 
    {
        alert("Y'a eu un problème");
    }
}

/* METHODE JQUERY */
$(function() 
{
	// Méthode Javascript
	// var products = null;
	// request('datas/products.json', function(data)
	// {	
	// 	products = JSON.parse(data);
	// }, false);

	// Méthode Jquery
	$.ajax(
	{
		url: "datas/products.json", 
		async:false
	}).done(function(data) 
	{
       	products = data;
    }).fail(function(data) 
	{
		console.log(result);
	});

	var html = '';
	var $productsList = $('.Productslist');

 	$.each(products, function(i, product)
	{	
		// Création du li
		$('<li/>', { class: 'Productlist-item' }).appendTo($productsList);
		// Création du img
		$('<img/>', 
			{ 
				class: 'ProductList-productVisual', 
				src: product.visual, 
				'data-srchover': product.visualHover
			}).appendTo($('.Productlist-item:last-child'));
		// Création name
		$('<p/>', { class: 'ProductList-productName', text: product.name}).appendTo($('.Productlist-item:last-child'));
		// Création price
		$('<p/>', { class: 'ProductList-productPrice', text: product.price}).appendTo($('.Productlist-item:last-child'));
		// Création color
		$('<p/>', { class: 'ProductList-productColor', text: product.color}).appendTo($('.Productlist-item:last-child'));
	});
	
	function setsrc($element)
	{
		var currentImg = $element.attr('src');
		var srcHover = $element.attr('data-srchover');
     	$element.attr('src', srcHover);
     	$element.attr('data-srchover', currentImg);
	}

   	$(".ProductList-productVisual").mouseover(function() 
   	{
		setsrc($(this));
	}).mouseout(function() 
	{
    	setsrc($(this));
	}) 
});