var shoppingCartApp = angular.module("shoppingCartApp", ['ui.bootstrap','ui.router'])
.factory('cart', function() {
	return {
	};
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('signin', {
	    url: "/signin",
	    views: {
			'mainContainer': {
				templateUrl: "signin.html"

			}
		},
	  }).state('signUp', {
	    url: "/signUp",
	    views: {
			'mainContainer': {
				templateUrl: "signUp.html"
			}
		}
	  }).state('listing', {
		    url: "/listing",
		    views: {
				'mainContainer': {
					templateUrl: "studiolist.jsp"

				}
			},
			controller:'studioListingCtrl'
				
	  })
	  .state('calendar', {
		    url: "/calendar",
		    views: { 'mainContainer': {
					templateUrl: "calendar.jsp"
				}
			},
			controller:'calendarServerController'
		  
	  }).state('cart', {
	    url: "/cart",
	    views: {
			'mainContainer': {
				templateUrl: "cart.html"
					
			}
		},
		controller: 'cartCtrl'
		
		
			
	  }).state('checkout', {
		    url: "/checkout",
		    views: {
				'mainContainer': {
					templateUrl: "checkout.html"
				}
			},
			controller: 'checkoutCtrl'
			
	  }).state('pay', {
			    url: "/pay",
			    views: {
					'mainContainer': {
						templateUrl: "pay.html"
					}
				},
				controller: 'payCtrl'
				
	   })
})
.controller("maincontroller",function($scope,$state,$rootScope,cart){
  this.isSignup = false;
  var data =[{
	  	user:{ 
	  		username:"Randy Pond",
	  		pwd: "EBFNLL5m3$",
	  		card:{
	  			cardholder_name :"Randy Pond Photography",
	  			card_number :"5454676776763389",
	  			expire_date : '08/26',
				ccv : '338'
			},
			carttotal:''
	  		
	  	},

	  	studios:{}, //the cart object container attempt
	  	selected:"" //for studioId purposes
	
}];

cart = data;
$scope.cart = cart;


  $scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){ 
    // console.log("Success : ",event, toState, toParams, fromState, fromParams, options)
  })
  
  $scope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, options){ 
    // console.log("Error : ",toState)
  });
  
  $scope.$on('$stateChangeSuccess', function(event, current) {
    // console.log(event, current)
  });
  $state.go("signin");
  
}).controller('calendarServerController',function($scope,$http,cart){
	
	console.log('calendarServerController ' + cart);
	console.log( cart);
	console.log( $scope.cart);
	//scope vars defined in html jsp page 
	//to be injecteds into the calendar below to return vars between modal and calendar
	$scope.getTitle = "";
	$scope.getStudioTitle ="";
	$scope.getStartTime ="";
	$scope.getHoursSelected ="";
	$scope.getDate ="";
	$scope.getEndTime ="";
	$scope.setSelectedDate ="";
	$scope.end_time ="";
	$scope.start_time ="";
	$scope.event_date="";
	$scope.event_title="";
	$scope.event_color="#ccc";
	
	$scope.cart=$scope.cart;
	cart = $scope.cart;
	
	console.log( cart);
	
	$scope.cartItem ={};
	$scope.hoursCanBook= [	{ start: '08:00:00 AM', end:'10:00:00 AM', price: '$90.00',  avail: 'Y', selected:'' },
						      {	start: '10:00:00 AM',end:'12:00:00 AM', price: '$90.00', avail: 'Y', selected:''},
						      { start: '13:00:00 PM', end:'15:00:00 PM',price: '$90.00', avail: 'Y', selected:''},
						      { start: '15:00:00 PM',end:'17:00:00 PM', price: '$90.00', avail: 'Y', selected:''},
						      { start: '17:00:00 PM',end:'19:00:00 PM', price: '$90.00', avail: 'Y',  selected:''},
						      { start: '19:00:00 PM', end:'21:00:00 PM', price: '$90.00',avail: 'Y',selected:'' }
					      ];
	$scope.addNewEvent = $scope.addNewEvent; //refer to directive

	
}).directive("calendarShow", function($http) {
	  return { 
		    restrict: 'A',
		    link: function (scope, oElement, attrs) {
		      scope.resetVariables = function(){
		    	  scope.edit = true;
		          scope.getTitle = '';
		          scope.getStudioTitle='';
		          scope.getStartTime = "";
		          scope.getHoursSelected ="";
		          scope.getDate = "";
		          scope.getEndTime = "";
		          scope.setSelectedDate = "";
		          scope.end_time = "";
		          scope.start_time = "";
		          scope.event_date = "";
		          scope.event_title = "";
		          scope.event_color = "#ccc";
		          scope.cart = scope.cart;
		          scope.cartItem = {};
		          scope.hoursCanBook= [	{ start: '08:00:00 AM', end:'10:00:00 AM', price: '$90.00',  avail: 'Y', selected:'' },
										      {	start: '10:00:00 AM',end:'12:00:00 AM', price: '$90.00', avail: 'Y', selected:''},
										      { start: '13:00:00 PM', end:'15:00:00 PM',price: '$90.00', avail: 'Y', selected:''},
										      { start: '15:00:00 PM',end:'17:00:00 PM', price: '$90.00', avail: 'Y', selected:''},
										      { start: '17:00:00 PM',end:'19:00:00 PM', price: '$90.00', avail: 'Y',  selected:''},
										      { start: '19:00:00 PM', end:'21:00:00 PM', price: '$90.00',avail: 'Y',selected:'' }
			      ]
		      };
		    
		      
		      scope.init = function() {
		          var date = new Date();
		          var d = date.getDate();
		          var m = date.getMonth();
		          var y = date.getFullYear();
		          
		          
		          
		          var calendar = $('#calendar').fullCalendar({
		            header: {
		              left: 'prev,next',
		              center: 'title',
		              right: 'month,agendaDay'
		            },
		            timezone: "local",
		            editable:false,
		            selectable: true,
		            selectHelper: true,
		            select: function(start, end, allDay) {
		              $("#eventCreate").modal("show");
		              calendar.fullCalendar('unselect'); 
		            },
		            dayClick: function(date, jsEvent, view) {
		              scope.setSelectedDate = date.format("YYYY-MM-DD");
		              scope.$apply();
		            },
		        
		            eventClick: function(calEvent, jsEvent, view) {
		            	scope.getTitle = calEvent.title;
		                scope.getStudioTitle = calEvent.title;
		                scope.getDate = moment(calEvent.start).format("YYYY-MM-DD");
		                
		                //convert it back to hour minutes am/pm and compare to huorsAvail hour.start and select that box
		                const numb12 = moment(calEvent.start, ["h:mm A"]).format("HH:mm:ss");
		                if(numb12 >= '12:00:00'){
		              	  //append PM to
		              	  console.log(numb12 + " PM");
		              	  scope.getHourSelected = numb12 + " PM";
		                }else{
		              	  //append AM
		              	  console.log(numb12 + " AM");
		              	  scope.getHourSelected = numb12 + " AM";
		                }
		              //console.log("gethour selected "+scope.getHourSelected +" cal start"+ calEvent.start);
		                scope.hoursCanBook.forEach(function(hour) {
		              	  
		                	console.log("hr "+hour.start + " :: get hour Selected" + scope.getHourSelected);
		                  if (hour.start == scope.getHourSelected) {
		                  	hour.selected = true;

		                  }else{ hour.selected =false; }
		                  //otherwise clear select boxes
		                  console.log("hr "+hour.start + " :: hour.selected :: " + hour.selected);
		                });
		                
		                //console.log("gethour selected "+scope.getHourSelected +" cal start"+ calEvent.start);
		                
		              $("#eventDetails").modal("show");
		              scope.$apply();
		            },
		            events: function(start, end, timezone, callback) {
						$http({
							
							method: 'GET',
					
							url: 'CalendarEventController?action=LIST',
							
							}).then(function success(response) {
								//console.log(response);
								
								//deal with the extended hour return to events
								var events = [];
								$.map( response.data, function( r ) {
									if(r!==null){
										console.log(r);
										console.log(r.start);
				                        events.push({
				                            id: r.id,
				                            title: r.title,
				                            start: moment(r.start),
				                            end: moment(r.end),
				                            editable: (r.status) ? true : false,
				                            backgroundColor: r.bgColor,
				                            // how to get the hours into the selected etc? selected is incorrect?
				                            extraParams: {
				                            	hourstart: r.starthour,
				                            	hourend: r.endhour
				                            }		
				                            
				                            
				                        });
									}
								});
								
								callback(events); 
			            	
								
							
							}, function error(response) {

							});
		            	}
		            
		          });
		          }();
		      
		          scope.addNewEvent = function(){
		        	  var cartEvent = [];
		              //console.log("selected Date" + scope.setSelectedDate);
		            //  console.log( scope.event_title ); //is empty);
		              if (scope.event_title){
		      			var _eDate = moment(scope.setSelectedDate).format("YYYY-MM-DD");
		      			//console.log("date selected "+_eDate);
		      			
		      			var newBookings = [];
		                  scope.hoursCanBook.forEach(function(hour) {
		                  	
		                  //	console.log("hr selected"+hour.selected);
		                    if (hour.selected) {
		                    	 var newEvent = {};
				            	  var newCartItem = {};
				                  newEvent.title = scope.event_title;
				                  //newCartItem.user = user;
				            	  newCartItem.studioName = scope.event_title;
				            	  newCartItem.fulldate = _eDate;
				            	
				                 var hourStart =  hour.start.substring(0, hour.start.length-3);
				            	  hourStart = hourStart+":00";
				            	 // console.log("hourstart "+ hourStart);
				            	 var hourEnd = hour.end.substring(0, hour.end.length-3);
				            	  hourEnd = hourEnd+":00";
				            	  //console.log("hourend "+ hourEnd);
				            	  var startDate = _eDate+ " " + hourStart;
				            	 // alert(moment(startDate));
				            	  var endDate = _eDate+ " " + hourEnd;
				            	  var startDateMoment = moment(startDate);
				            	  var endDateMoment =  moment(endDate);
				            	  console.log(startDateMoment);
				            	 
				            	  newEvent.start = startDateMoment;
				                  newEvent.end = endDateMoment;
						      		
				                  newEvent.backgroundColor = scope.event_color;
				                  newEvent.allDay = false;
				                  
				                  newCartItem.start = moment(newEvent.start).format("YYYY-MM-DD HH:mm:ss");
					              newCartItem.end = moment(newEvent.end).format("YYYY-MM-DD HH:mm:ss");
				                  newCartItem.avail = hour.avail;
				                  newCartItem.price = hour.price;
				                  newCartItem.selected = 0; //true
				                  newCartItem.allDay = false
				                 
				                  newCartItem.bgColor = scope.event_color;
				                  
				                  newBookings.push(newEvent);
				                  cartEvent.push(newCartItem);
		                  	 
		                    }
		                  });
		                  
		                  scope.cart.push(cartEvent);

		                  newBookings.forEach(function (newEvent){
		                	console.log(newEvent.start);
		                  	angular.element("#calendar").fullCalendar('renderEvent',newEvent);

		                  });
		                  scope.resetVariables();
		                  $("#eventCreate").modal("hide");    
		      		 }
		              
		            };
		            scope.resetVariables();
		    }
		  }
		}).controller('signinController', ['$scope','$http',function($scope,$http, cart) {
			
			console.log('signinController');
			var user = $scope.user;
			$scope.cart[0].user.username = $scope.user.userName;
			$scope.cart[0].user.pwd = $scope.user.password;
			cosole.log("Username:" + $scope.cart[0].user.username +  " password: " + $scope.cart[0].user.pwd);
			cart = $scope.cart; 
			
		}]).controller('signUpCtrl', ['$scope','$http',function($scope,$http, cart) {
			console.log('signUpController');
			var user = $scope.user;
			$scope.cart[0].user.username = $scope.user.userName;
			$scope.cart[0].user.pwd = $scope.user.password;
			cosole.log("Username:" + $scope.cart[0].user.username +  " password: " + $scope.cart[0].user.pwd);
			cart = $scope.cart; 

			
		}])
		.controller('cartCtrl', ['$scope',function($scope, cart) {
			$scope.Studios = [{id:1, title:"Apothecary", description:"Wonderful sanitary environmet for blah bhal"}, 
								{id:2, title:"white Room", description:"Wonderful sanitary environmet for blah bhal"}
							];
			
			$scope.studio_name = "";
			//mess with this variable aka remove first row with user object before displaying
			$scope.bookingCart = [];
				//$scope.cart;
			var user={};
			if($scope.cart[0]!== null){
				user=$scope.cart[0];
				console.log(user);
			}
			var cost=0;
			//console.log($scope.cart.length);
			 $scope.cart.forEach(function(cartItem) {
				 //user = $scope.cart[0];
				 if(cartItem !== $scope.cart[0]){
					 cartItem.forEach(function(item){
						 var obj = {}
						 obj.studioName = item.studioName;
						 obj.price = item.price;
						 obj.start = moment(item.start["h:mm A"]).format("HH:mm:ss");
						 obj.end = moment(item.end, ["h:mm A"]).format("HH:mm:ss");
						 
						 $scope.bookingCart.push(obj);  //start //end formated
						 //console.log(item.price);
						 var int = parseInt(obj.price.substring(1,obj.price.length-3)) ;
						 cost = cost + int;
					 });
				 }
			 });
				
			
			
			
			
			$scope.total = cost;
			$scope.cart[0].user.carttotal = cost;
			$scope.studio_name = $scope.Studios[0].title;
			
			 cart = $scope.cart;
			 console.log("dont mess with cart."+ cart);
			 
		}]).controller('checkoutCtrl', ['$scope',function($scope, cart) {
			
			
			$scope.studio_name = "";
			//mess with this variable aka remove first row with user object before displaying
			$scope.bookingCart = [];
				//$scope.cart;
			var user={};
			if($scope.cart[0]!== null){
				user=$scope.cart[0];
				console.log(user);
			}
			var cost=0;
			//console.log($scope.cart.length);
			 $scope.cart.forEach(function(cartItem) {
				 //user = $scope.cart[0];
				 if(cartItem !== $scope.cart[0]){
					 cartItem.forEach(function(item){
						 var obj = {}
						 obj.studioName = item.studioName;
						 obj.price = item.price;
						 obj.start = moment(item.start,["h:mm A"]).format("HH:mm:ss");
						 obj.end = moment(item.end, ["h:mm A"]).format("HH:mm:ss");
						 
						 $scope.bookingCart.push(obj);  //start //end formated
						 //console.log(item.price);
						 var int = parseInt(obj.price.substring(1,obj.price.length-3)) ;
						 cost = cost + int;
					 });
				 }
			 });
				
			
			 if(user !==null){
				 var userName = $scope.cart[0].user.username;
					$scope.first_name = userName.substring(0,userName.indexOf(' '));
					$scope.last_name = userName.substring(userName.indexOf(' '),userName.length);
					$scope.insta = '';
					var card = $scope.cart[0].user.card;
					$scope.cardholder_name = card.cardholder_name;
					$scope.card_number =card.card_number;
					$scope.expire_date = card.expire_date;
					$scope.ccv = card.ccv;
			 }else{
				 //POTENTIAL TODO add name back to cart if user is null from the form fields
					$scope.cardholder_name = "Fake Photography";
					$scope.card_number = "5454676776763389";
			  		$scope.expire_date = '08/26';
			  		$scope.ccv = '338';	
			  		$scope.total = '999.99';//fake value
			
			 }
			$scope.bookingCart = $scope.cart;
			 console.log("dont mess with checkout." + $scope.bookingCart);
			 
			 cart = $scope.cart;
			 $scope.cart=cart;
			 
		}]).controller("payCtrl", ['$scope','$http', function($scope, $http, cart) {
			
			console.log($scope.cart);
			//click and have to log in -- amazon 
			$scope.bookingCart = $scope.cart;
			$scope.user = $scope.bookingCart[0].user.username;
			$scope.username = $scope.bookingCart[0].user.username;
			$scope.pwd = $scope.bookingCart[0].user.pwd;
			//peel off user from cart
			var cartArray = $scope.bookingCart.slice(1,$scope.bookingCart.length);
			
			 console.log("paid Service Announcement." + $scope.user);
			 console.log("paid Service Announcement." + $scope.username);
			 console.log("paid Service Announcement." + $scope.pwd);
			 console.log(cartArray);
			$scope.cardholder_name = $scope.bookingCart[0].user.card.cardholder_name;//"Randy Pond Photography";
			$scope.card_number = $scope.bookingCart[0].user.card.card_number;//"5454676776763389";
	  		$scope.expire_date = $scope.bookingCart[0].user.card.expire_date;//'08/26';
	  		$scope.ccv = $scope.bookingCart[0].user.card.ccv;//'338';	
	  		$scope.total = $scope.bookingCart[0].user.carttotal;
	  		var studios = [];
//	  		$scope.studios = $scope.bookingCart;
	  		for(var i=0; i<cartArray.length;i++){
	  			var cartStudios = cartArray[i];
	  			var studiosObj = {};
	  			for (var j=0; j < cartStudios.length; j++){
	  				var studio = cartStudios[j];
	  				
	  				studiosObj = {'studio' : studio};
	  				
	  				console.log(studio.studioName);
	  				console.log(studio.start);
	  				console.log(studio.end);
	  				console.log(studio.avail);
	  				console.log(studio.price);
	  				console.log(studio.selected);
	  				console.log(studio.allDay);
	  				studios.push(studiosObj);
	  				
	  			}
	  			console.log(studios);
	  			
	  		}

	  		console.log(JSON.stringify({studios}));
		
	  		
	  		var header_config = {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
					}
			};
		
	  		$scope.output_msg = null;
	  		
	  		
	  		
	  		
	  		var dataObject = JSON.stringify({'studios' : studios
//	            'id'  : $scope.user,
//	            'pwd': $scope.pwd,
//	            'username':$scope.username,
//		  		'cardholder_name' : $scope.cardholder_name,
//		  		'card_number' :$scope.card_number,
//		  		'expire_date' : $scope.expire_date,
//		  		'total': $scope.total,
//				'ccv' : $scope.ccv 
	           
	        });
	  		
	  		console.log(dataObject);
			
			$http({
				method: 'POST',
				url: 'CalendarEventController',
				data: dataObject,
				
				config: header_config
			}).then(
					function(response) {
						$scope.output_msg = response.data.msg;
						angular.element(document.getElementById("msg")).css("color", "green");
						console.log("Status Code= " + response.status + ", Status Text= " + response.statusText);
					},
					function(response) {
						$scope.output_msg = "Service unavailable. Please try again.";
						angular.element(document.getElementById("msg")).css("color", "red");
						console.log("Status Code= " + response.status + ", Status Text= " + response.statusText);
					});

	  		
	  		
	  		
		}]);

function getCartLines(){
	
//		username:"Randy Pond",
//		pwd:"EBFNLL5m3$",
//		cardholder_name:"Randy Pond Photography",
//		card_number:"5454676776763389", 
//		expire_date:"08/26",
//		ccv:"338",
//		carttotal:"90", 
//		studio:"Apothecary",
//		fulldate:"2020-06-29",
//		start:"2020-06-30T01:00:00.000",
//		end:"2020-06-30T03:00:00.000",
//		avail":"Y",
//		price":"$90.00",
//		selected:true,
//		allDay:false,
//		bgColor:"#b1de8c"
	
}