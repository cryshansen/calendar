<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--  <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> --%>

<a type="button" href="#/cart">Add to Cart</a>
 <div class="container" style="width:100%;" ng-controller="calendarServerController">
 <div id="eventDetails" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{getTitle}}</h4>
      </div>
      <div class="modal-body form-group">
        
        <div class="pull-right btn btn-info btn-fab" ng-click="edit = !edit"><i class="fa fa-pencil" aria-hidden="true"></i></div>
        <div>Date :{{getDate}}
        </div>
        <div class="container" style="width:70%;">
	        	<div class="row header">
	        	 	<div class="col">Shoot Start</div>
			  		<div class="col">End</div>  
			  		<div class="col">Price</div>
			  		<div class="col">Book</div>
			  </div>
				<div class="row" ng-repeat="hour in hoursCanBook">
	   				<div class="col">{{hour.start}}</div>
				  	<div class="col taken">{{hour.end}}</div>
				  	<div class="col taken">{{hour.price}}</div> 
				  	<div class="col taken">{{hour.avail}}</div>
	   				<div class="col">
	   				
       					<div ng-if="hour.avail == 'Y' ">
            				<input type='checkbox' value='{{ hour.start }}' ng-model='hour.selected'> Book it!
					    </div>
					    <div ng-if="hour.avail == 'N' ">
					       Already Booked!
					    </div>
						   				
					</div>
				</div>	
		</div>
      </div>
      <div class="modal-footer">
        <button ng-if="edit" type="button" class="btn btn-default btn-raised" data-dismiss="modal">Close</button>
        <button ng-if="edit" type="button" class="btn btn-danger btn-raised">Delete</button>
        <button ng-if="!edit" type="button" class="btn btn-primary btn-raised" ng-click="edit = !edit">Save</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->

<div id="eventCreate" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">New Event</h4>
      </div>
      <div class="modal-body form-group">
        <div>Event Title :
          <input type="text" name="event_title" class="form-control" ng-model="event_title">
        </div>
        <div>Date :
          <input type="text" name="event_date" class="form-control"  value="{{setSelectedDate}}" disabled ng-model="setSelectedDate">
        </div>
        <div class="grid-container" style="width:70%;">
        	<div class="grid-header row">
        	 	<div class="item2">Shoot Start</div>
		  		<div class="item3">End</div>  
		  		<div class="item4">Price</div>
		  		<div class="item5">Book</div>
		  </div>
			<div class="hoursCanBook  row" ng-repeat="hours in hoursCanBook">
				<div class="item6 taken">{{hours.start}}</div>
				  <div class="item7 taken">{{hours.end}}</div>
				  <div class="item8 taken">{{hours.price}}</div> 
				  <div class="item8 taken">{{hours.avail}}</div>
				  <div class="form-check">
				    <input type="checkbox" class="form-check-input" id="hourCheck" ng-model="hours.selected">
				    <label class="form-check-label" for="hourCheck">Book It!</label>
				  </div>
				  <div class="item9 taken"><span class="plus" ng-click="_addTime('8')" ></span></div>
			</div>
		</div>
        <div>Event Color :
          <input type="color" name="favcolor" class="form-control" value="#ccc" ng-model="event_color">

        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default btn-raised" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary btn-raised" ng-click="addNewEvent()">Save</button>
      </div>
    </div>
    <!-- /.modal-content -->
  </div>
  <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
  <div><h2>Booking Events List</h2></div>
     <div class="row">
        <div class="col-xs-12 col-md-12 col-sm-12 col-lg-12">
			<div id="calendar" calendar-show></div>
		</div>		
	</div>	
</div>	
	
		

